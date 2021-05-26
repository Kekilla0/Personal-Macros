captureClick(executePOI);
ui.notifications.warn("Click Hex to begin.");

function executePOI(){
  const mouseCenter = getMousePosition();
  const PointsOfInterests = getPOI(mouseCenter);

  createJournals(PointsOfInterests);
}

function getMousePosition() {
  const mousePos = () => canvas.app.renderer.plugins.interaction.mouse.getLocalPosition(canvas.app.stage);
  const centerGrid = (p) => canvas.grid.getCenter(p.x,p.y);
  const mouseCenter = centerGrid(mousePos());
  return { x : mouseCenter[0], y : mouseCenter[1] };
}

function captureClick(fn, remove = true)
{
  $(document.body).on("click", event => {
    if(remove) $(document.body).off("click");
    ui.notifications.notify("Click Captured");
    fn(event);
  });
}

function getPOI(mouseCenter)
{
  const directions = [
    { weight : 1, text : "in the same hex", shift : [`M`]},
    { weight : 1, text : "one hex northwest", shift : [`NW`]},
    { weight : 1, text : "two hexes northwest", shift : [`NW`, `NW`]},
    { weight : 1, text : "one hex northwest, one hex north", shift : [`NW`,`N`]},
    { weight : 1, text : "one hex northwest, one hex southwest", shift : [`NW`, `SW`]},
    { weight : 1, text : "one hex north", shift : [`N`]},
    { weight : 1, text : "two hexes north", shift : [`N`, `N`]},
    { weight : 1, text : "one hex northeast", shift : [`NE`]},
    { weight : 1, text : "one hex northeast, one hex north", shift : [`NE`, `N`]},
    { weight : 1, text : "two hexes northeast", shift : [`NE`, `NE`]},
    { weight : 1, text : "one hex northeast, one hex southeast", shift : [`NE`,`SE`]},
    { weight : 1, text : "one hex southwest", shift : [`SW`]},
    { weight : 1, text : "two hexes southwest", shift : [`SW`, `SW`]},
    { weight : 1, text : "one hex southwest, one hex south", shift : [`SW`,`S`]},
    { weight : 1, text : "one hex south", shift : [`S`]},
    { weight : 1, text : "two hexes south", shift : [`S`,`S`]},
    { weight : 1, text : "one hex southeast", shift : [`SE`]},
    { weight : 1, text : "two hexes southeast", shift : [`SE`,`SE`]},
    { weight : 1, text : "one hex southeast, one hex south", shift : [`SE`, `S`]},
  ];
  
  const features = [
    { weight : 2, text : `Ruins`, icon : `icons/svg/ruins.svg`, folder : [`Random Dungeons`,`Random Castle`,`Random Monastery`,`Random Prisons`,`Random Temple`]},
    { weight : 2, text : `Caves`, icon : `icons/svg/cave.svg`, folder : [`Random Cavern`,`Random Sewers`,`Random Prisons`,`Random Mines`]},
    { weight : 3, text : `Natural Feature`, icon : `icons/svg/waterfall.svg`, folder : [`Desert`,`Forest`,`Swamp`,`Plains`,`Mountains`,`Jungle`]},
    { weight : 2, text : `Lair`, icon : `icons/svg/skull.svg`, folder : game.folders.getName(`Monsters`).children.map(e=> e.name)},
    { weight : 2, text : `Campsite`, icon : `icons/svg/fire.svg`, folder : [`Military Camps`, `Merchant Caravans`, `Travel Complications`, `Campsite`]},
    { weight : 2, text : `Signs of settlement`, icon : `icons/svg/hanging-sign.svg`, folder : null},
    { weight : 2, text : `Settlement`, icon : `icons/svg/village.svg`, folder : `Simple Settlement`},
    { weight : 1, text : `Magical Area`, icon : `icons/svg/radiation.svg`, folder : [`Shadowy Desert`, `Enchanted Forest`, `Haunted Forest`, `Frozen Lands`, `Swamp`, `Tropical Grasslands`]},
    { weight : 3, text : `Resource`, icon : `icons/svg/oak.svg`, folder : [`FRUITS`, `VEGETABLES`, `SEAFOOD`, `MEATS` ]},
    { weight : 2, text : `Tracks`, icon : `icons/svg/pawprint.svg`, folder : game.folders.getName(`Monsters`).children.map(e=> e.name)},
    { weight : 3, text : `Enemy`, icon : `icons/svg/combat.svg`, folder : game.folders.getName(`Monsters`).children.map(e=> e.name)},
    { weight : 1, text : `Trap`, icon : `icons/svg/trap.svg`, folder: null},
    { weight : 1, text : `Fantastical Location`, icon : `icons/svg/temple.svg`, folder : game.folders.getName(`Magic`).children.map(e=> e.name) },
  ];

  return Array(qRoll(`2d4`))
    .fill(0)
    .map((e,i,a)=>{
      let roll = qRoll(`1d20`);
      if(roll < 12) return ``;

      let {direction, center} = getUniqueDirection();

      let feature = features.weighted("weight").shuffleSort().random().text; 
      let major = roll === 20 ? ` - (Major)` : ``;
      let header = getHeader();
      let body = getBody();
      let icon = getIcon();

      return { header, body, direction, center, feature, icon };

      function getUniqueDirection(){
        const direction = directions.weighted("weight").shuffleSort().random().text;

        if(a.find(ele=> ele.direction === direction)) return getUniqueDirection();
        let { shift } = directions.find(ele=> ele.text === direction);
        let center = shift.reduce((acc, val) => getShift(acc,val), mouseCenter);

        [center.x, center.y] = canvas.grid.getCenter(center.x, center.y);

        /*
        center = canvas.grid.getCenter(center.x, center.y);
        center = { x : center[0], y : center[1] };
        */

        return {direction, center};

        function getShift(centerPoint, shiftDirection)
        {
          const shift = { 
            M :   { x :  0, y :  0 }, 
            N :   { x :  0, y : -1 }, 
            NE :  { x : -1, y :-.5 }, 
            SE :  { x : -1, y : .5 }, 
            S :   { x :  0, y :  1 }, 
            SW :  { x :  1, y : .5 }, 
            NW :  { x :  1, y :-.5 },
          };
          const {w,h} = canvas.grid;
          let {x,y} = shift[shiftDirection];
      
          x = (x*w) + centerPoint.x;
          y = (y*h) + centerPoint.y;
      
          //let center = canvas.grid.getCenter(x,y);
      
          return { x , y };
        }
      }
      function getIcon(){
        return features.find(e=>e.text === feature).icon;
      }
      function getBody(){
        let { folder } = features.find(f => f.text === feature);

        if(!folder) return ``;
        if(folder instanceof Array) folder = folder.shuffleSort().random();
        folder = game.folders.getName(folder);
        if(!folder) return ``;

        return `        
        <table style="border:1px solid black; border-collapse: collapse">
          <tr>
            <td style="border:1px solid black;" colspan=2><h3>${folder.name}</h3></td>
          </tr>
          ${folder.getTableText().reduce((acc, val) =>{
            return acc += `
              <tr>
                <td style="border:1px solid black;">${val.name}</td>
                <td style="border:1px solid black;">${val.text}</td>
              </tr>`
          }, ``)}
        </table>`;
      }
      function getHeader(){
        return `<h2>${feature} ${direction} ${major}</h2>`
      }
    })
    .filter(e=> e !== "");

  function qRoll(rollString = ``){
    return (new Roll(rollString).evaluate({async : false}).total);
  }
}

async function createJournals(PointsOfInterests){
  const wait = async (ms) => new Promise((resolve)=> setTimeout(resolve, ms));
  if(PointsOfInterests.length === 0 ) return await sendMessage({ content : `No POI Created.` });

  let entries_created = [];

  for(let POI of PointsOfInterests)
  {
    let folder = game.folders.find(f=>f.name === POI.feature);
    if(!folder) folder = await Folder.create({ name : POI.feature, type : `JournalEntry`, parent : `8bs20nImQpzZgmju`});
    let number = folder.content.length + 1;

    let journal = await JournalEntry.create({ 
      content : `${POI.header}${POI.body}`, 
      folder : folder.id, 
      name : `${POI.feature} ${number}`
    });

    ui.notifications.warn(`Created New Journal : ${POI.feature} ${number}`);
    await wait(200);

    //add link to journal here to entries_created
    entries_created.push(`Created ${POI.feature} @ [${Math.round(POI.center.x)},${Math.round(POI.center.y)}] :<br>@JournalEntry[${journal.id}]`);

    await Note.create({
      entryId : journal.id,
      fontSize : 20,
      icon : POI.icon,
      iconSize : 32,
      textAnchor : 1, 
      textColor : "#FFFFFF",
      x : POI.center.x,
      y : POI.center.y, 
      iconTint : "",
      text : "",
      flags : {
        pinfix : {
          maxZoomLevel : 3, 
          minZoomLevel : 0.1,
          showName : false
        }
      } 
    });

    ui.notifications.warn(`Created New Note for ${POI.feature} ${number} : `);
    await wait(200);
  }
  //sendMessage with all entries created
  sendMessage({ content : ["Macro Complete", ...entries_created].join(`<hr>`) });

}

async function sendMessage({ content, whisper = ChatMessage.getWhisperRecipients("GM"), speaker = ChatMessage.getSpeaker() }={})
{
  return await ChatMessage.create({ content, whisper, speaker });
}


