const config = {
  ["Color Progression"] : ["Black", "Blue", "Purple", "Red", "Orange", "Yellow", "Green"],
  elementsAdded : 0,
  elementsAllowed : 0,
  size : {
    small : `4d20`, medium : `8d20`,  large : `12d20`,  huge : `16d20`,
  }
};

const fn = {
  wait : async (ms) => new Promise((resolve)=> setTimeout(resolve, ms)),
  log : (...args) => args.forEach(m => console.log(`${this.name} Macro | `, m)),
  message : (...args) => ChatMessage.create({content : args.join(`<br>`)}),
}

/*
  name : [
    element = { text, weight, reaction }
  ];
*/
const tables = {
  ["Starting Area"] : [
    {text : "Square 20x20 ft; passage on each wall", weight : 1, reaction : ["Passage", "Passage", "Passage"]},
    {text : "Square 20x20 ft; door on two walls, passage in third wall", weight : 1, reaction : ["Door Type","Door Type","Passage"]},
    {text : "Square 40x40 ft; doors on three walls", weight : 1, reaction : ["Door Type","Door Type","Door Type",]},
    {text : "Rectangle, 80x20 ft; with row of pillars down the middle; two passages leading from each long wall, doors on each short wall;", weight : 1, reaction : ["Passage","Passage","Door Type"]},
    {text : "Rectangle, 20x40 ft; passage on each wall", weight : 1, reaction : ["Passage","Passage","Passage"]},
    {text : "Circle, 40 ft diameter; one passage at each cardinal direction", weight : 1, reaction : ["Passage","Passage","Passage"]},
    {text : "Circle, 40 ft diameter; one passage in each cardinal direction; well in the middle of room", weight : 1, reaction : ["Passage","Passage","Passage", "Possible Stairs"]},
    {text : "Square, 20x20ft; door on a wall, passage on a third wall, secret door on fourth wall", weight : 1, reaction : ["Door Type", "Passage", "Secret Door"]},
    {text : "Passage, 10 ft wide; T intersection;", weight : 1, reaction : ["Passage", "Passage"]},
    {text : "Passage, 10 ft wide; four-way intersection;", weight : 1, reaction : ["Passage", "Passage", "Passage"]},
  ],
  ["Passage"] : [
    {text : "Continue straight 30 ft., no doors or side passages;", weight : 2, reaction : ["Passage"]},
    {text : "Continue straight 20 ft., door to the right, then an additional 10 ft. ahead;", weight : 1, reaction : ["Door Type", "Passage"]},
    {text : "Continue straight 20 ft., door to the left, then an additional 10 ft. ahead;", weight : 1, reaction : ["Door Type", "Passage"]},
    {text : "Continue straight 20 ft.; passage ends in a door;", weight : 1, reaction : ["Door Type",]},
    {text : "Continue straight 20 ft.; side passage to the right, then an additional 10 ft. ahead;", weight : 1, reaction : ["Passage", "Passage"]},
    {text : "Continue straight 20 ft.; side passage to the left, then an additional 10 ft. ahead;", weight : 1, reaction : ["Passage", "Passage"]},
    {text : "Continue straight 20 ft.; comes to a dead end;", weight : 1, reaction : ["Dead End"]},
    {text : "Continue straight 20 ft.; then the passage turns left and continues 10 ft.;", weight : 1, reaction : ["Passage"]},
    {text : "Continue straight 20 ft.; then the passage turns right and continues 10 ft.;", weight : 1, reaction : ["Passage"]},
    {text : "Stairs", weight : 1, reaction : ["Stairs"]},
  ],
  ["Passage Width"] : [
    {text : "5 ft.;", weight : 2, reaction : []},
    {text : "10 ft.;", weight : 10, reaction : []},
  ],
  ["Door Type"] : [
    {text : "Wooden;", weight : 10, reaction : ["Beyond a Door"]},
    {text : "Wooden, barred or locked;", weight : 2, reaction : ["Beyond a Door"]},
    {text : "Stone;", weight : 1, reaction : ["Beyond a Door"]},
    {text : "Stone, barred or locked;", weight : 1, reaction : ["Beyond a Door"]},
    {text : "Iron;", weight : 1, reaction : ["Beyond a Door"]},
    {text : "Iron, barred or locked;", weight : 1, reaction : ["Beyond a Door"]},
    {text : "Portcullis;", weight : 1, reaction : ["Beyond a Door"]},
    {text : "Portcullis, locked in place;", weight : 1, reaction : ["Beyond a Door"]},
    {text : "Secret Door;", weight : 1, reaction : ["Beyond a Door"]},
    {text : "Secret Door, barred or locked;", weight : 1, reaction : ["Beyond a Door"]},
  ],
  ["Beyond a Door"] : [
    {text : "Passage extending 10 ft., then T intersection extending 10 ft. to the right and left;", weight : 2, reaction : ["Passage", "Passage"]},
    {text : "Passage 20 ft. strait ahead;", weight : 6, reaction : ["Passage"]},
    {text : "Chamber;", weight : 10, reaction : ["Chamber"]},
    {text : "Stairs", weight : 1, reaction : ["Stairs"]},
    {text : "False door with trap;", weight : 1, reaction : ["None"]},  //or Trap
  ],
  ["Chamber"] : [
    {text : "Square, 20x20 ft.;", weight : 2, reaction : ["Chamber Exits, Normal"]}, //this would roll specific to the type of dungeon
    {text : "Square, 30x30 ft.;", weight : 2, reaction : ["Chamber Exits, Normal"]},
    {text : "Square, 40x40 ft.;", weight : 2, reaction : ["Chamber Exits, Large"]},
    {text : "Rectange, 20x30 ft.;", weight : 2, reaction : ["Chamber Exits, Normal"]},
    {text : "Rectange, 30x40 ft.;", weight : 2, reaction : ["Chamber Exits, Normal"]},
    {text : "Rectange, 40x50 ft.;", weight : 2, reaction : ["Chamber Exits, Large"]},
    {text : "Rectange, 50x80 ft.;", weight : 1, reaction : ["Chamber Exits, Large"]},
    {text : "Circle, 30 ft. diameter;", weight : 1, reaction : ["Chamber Exits, Normal"]},
    {text : "Circle, 50 ft. diameter;", weight : 1, reaction : ["Chamber Exits, Large"]},
    {text : "Octagon, 40x40 ft.;", weight : 1, reaction : ["Chamber Exits, Large"]},
    {text : "Octagon, 60x60 ft.;", weight : 1, reaction : ["Chamber Exits, Large"]},
    {text : "Trapezoid, roughly 40x60 ft.;", weight : 1, reaction : ["Chamber Exits, Large"]},
  ],
  ["Chamber Exits, Normal"] : [
    {text : "", weight : 5, reaction : ["None"]},
    {text : "", weight : 6, reaction : ["Exit Location"]},
    {text : "", weight : 4, reaction : ["Exit Location", "Exit Location"]},
    {text : "", weight : 3, reaction : ["Exit Location", "Exit Location", "Exit Location"]},
  ],
  ["Chamber Exits, Large"] : [
    {text : "", weight : 3, reaction : ["None"]},
    {text : "", weight : 4, reaction : ["Exit Location"]},
    {text : "", weight : 5, reaction : ["Exit Location", "Exit Location"]},
    {text : "", weight : 4, reaction : ["Exit Location", "Exit Location", "Exit Location"]},
    {text : "", weight : 1, reaction : ["Exit Location", "Exit Location", "Exit Location", "Exit Location"]},
  ],
  ["Exit Location"] : [
    {text : "Wall opposite entrance", weight : 7, reaction : ["Exit Type"]},
    {text : "Wall left entrance", weight : 5, reaction : ["Exit Type"]},
    {text : "Wall right entrance", weight : 5, reaction : ["Exit Type"]},
    {text : "Same wall as entrance", weight : 3, reaction : ["Exit Type"]},
  ],
  ["Exit Type"] : [
    {text : "Door", weight : 10, reaction : ["Beyond a Door"]},
    {text : "Corridor, 10ft. long;", weight : 10, reaction : ["Passage"]},
  ],
  ["Stairs"] : [
    {text : "Down one level to a chamber;" , weight : 4, reaction : ["Chamber"]},
    {text : "Down one level to a passage 20 ft. long;" , weight : 4, reaction : ["Passage"]},
    {text : "Down two levels to a chamber;" , weight : 1, reaction : ["Chamber"]},
    {text : "Down two levels to a passage 20 ft. long;" , weight : 1, reaction : ["Passage"]},
    {text : "Down three levels to a chamber;" , weight : 1, reaction : ["Chamber"]},
    {text : "Down three levels to a passage 20 ft. long;" , weight : 1, reaction : ["Passage"]},
    {text : "Up one level to a chamber;" , weight : 1, reaction : ["Chamber"]},
    {text : "Up one level to a passage 20 ft. long;" , weight : 1, reaction : ["Passage"]},
    {text : "Up one to a dead end;" , weight : 1, reaction : ["Dead End"]},
    {text : "Chimney up one level to a passage 20 ft. long;" , weight : 1, reaction : ["Passage"]},
    {text : "Chimney up two levels to a passage 20 ft. long;" , weight : 1, reaction : ["Passage"]},
    {text : "Shaft down one level to a chamber;" , weight : 1, reaction : ["Chamber"]},
    {text : "Shaft down two levels to a chamber;" , weight : 1, reaction : ["Chamber"]},
  ],
  ["Possible Stairs"] : [
    { text : "There may be a way down from here...", weight : 4, reaction : ["Stairs"]},
    { text : "There is nothing here.", weight : 16, reaction : ["None"]},
  ],
  ["Dead End"] : [
    { text : "Secret Door", weight : 1, reaction : ["Beyond a Door"]},
    { text : "Nothing", weight : 9, reaction : ["None"]}, 
  ],
};

/*
  Dialog
    [Size, Type]
*/
buildDungeon();

async function buildDungeon(str = ""){
  if(str === ""){
    config.elementsAllowed = new Roll(config.size.small).evaluate({ async : false }).total;
  }else{
    if(config.elementsAdded === config.elementsAllowed || str === "None") return;
    config.elementsAdded += 1;
  }

  str = str === "" ? "Starting Area" : str;
  let {text, reaction} = tables[str].weighted("weight").shuffle().random();
  fn.log(str, text, reaction);
  for(let e of reaction)
    await buildDungeon(e);
}