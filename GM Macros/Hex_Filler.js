const mouseCenter = getMousePosition();
const PointsOfInterests = getPOI();

createJournals();

function getMousePosition() {
  const mouse = canvas.app.renderer.plugins.interaction.mouse;
  const mousePos = mouse.getLocalPosition(canvas.app.stage);
  const mouseCen = canvas.grid.getCenter(mousePos.x, mousePos.y);
  return { x : mouseCen[0], y : mouseCen[1] };
}

function getPOI()
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
  
  //add icons
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

      let feature = gVal(features), major = roll === 20 ? ` - (Major)` : ``;
      let header = `<h2>${feature} ${direction} ${major}</h2>`;
      let body = `${getTableText(feature)}`;

      //sendMessage({content : `Center : ${Math.floor(center.x), Math.floor(center.y)} <br> ${feature}`});

      return { header, body, direction, center, feature, icon : getIcon() };

      function getUniqueDirection()
      {
        let direction = gVal(directions);

        if(a.find(ele=> ele.direction === direction)) return getUniqueDirection();
        let {shift} = directions.find(ele=> ele.text === direction);
        let center = shift.reduce((acc, val)=> getShift(acc,val), mouseCenter);

        return {direction, center};
      }
      function getShift(centerPoint, shiftDirection)
      {
        const shift = { 
          M :   { x : 0, y : 0  }, 
          N :   { x : 0, y : -1 }, 
          NE :  { x :-1, y :-.5 }, 
          SE :  { x :-1, y : .5 }, 
          S :   { x : 0, y :  1 }, 
          SW :  { x :  1, y : .5}, 
          NW :  { x :  1, y :-.5}
        };
        const {w,h} = canvas.grid;
        let {x,y} = shift[shiftDirection];
    
        x = (x*w) + centerPoint.x;
        y = (y*h) + centerPoint.y;
    
        let center = canvas.grid.getCenter(x,y);
    
        return { x : center[0], y : center[1] };
      }
      function getIcon()
      {
        return features.find(e=>e.text === feature).icon;
      }
    })
    .filter(e=> e !== "");

  function gVal(arr = [])
  {
    let fun_arr = [];

    for(let val of arr)
    {
      if(val.weight !== undefined)
      {
        for(let i = 0; i< val.weight; i++) fun_arr.push(val.text);
      }  
    }

    if(fun_arr.length == 0) fun_arr = arr;

    fun_arr.shuffle();

    return fun_arr[qRoll(`1d${fun_arr.length}-1`)];
  }
  function getTableText(feature= ``)
  {
    let { folder } = features.find(f=> f.text === feature);

    if(!folder) return ``;
    if(folder instanceof Array) folder = gVal(folder);

    folder = game.folders.getName(folder);

    let folders = game.folders.filter(f=>f.parent === folder.id);

    if(folders.length > 0)
    {
      return folders
        .map(f=> `${getHTML(f.content), f.name}`)
        .join(`<br>`);
    }else{
      return `${getHTML(folder.content,folder.name)}<br>`;
    }

    function getHTML(content, name)
    {
      return `
        <table style="border:1px solid black; border-collapse: collapse">
          <tr>
            <td style="border:1px solid black;" colspan=2><h3>${name}</h3></td>
          </tr>
          ${content.map(rt=>{
            return `
              <tr>
                <td style="border:1px solid black;">${rt.name}</td>
                <td style="border:1px solid black;">${getText(rt.id)}</td>
              </tr>`
          }).join(``)}
        </table>
      `;
    }
    function getText(table_id)
    {
      try {
        return game.tables.get(table_id).roll().results[0].text;
      }catch (error) { console.error (`${table_id} has had an error.`);}
    }
  }
  function qRoll(rollString = ``)
  {
    return (new Roll(rollString).roll().total);
  }
}

async function createJournals()
{
  if(PointsOfInterests.length === 0 ) return await sendMessage({ content : `No POI Created.` });

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

    await Note.create({
      entryId : journal.id,
      fontSize : 20,
      icon : POI.icon,
      //icon : "icons/svg/hanging-sign.svg",
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
  }
}

async function sendMessage({ content, whisper = ChatMessage.getWhisperRecipients("GM"), speaker = ChatMessage.getSpeaker() }={})
{
  return await ChatMessage.create({ content, whisper, speaker });
}


