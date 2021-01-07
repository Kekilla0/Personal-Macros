const directions = [
  { weight : 1, text : "in the same hex"},
  { weight : 1, text : "one hex northwest"},
  { weight : 1, text : "two hexes northwest"},
  { weight : 1, text : "one hex northwest, one hex north"},
  { weight : 1, text : "one hex northwest, one hex southwest"},
  { weight : 1, text : "one hex north"},
  { weight : 1, text : "two hexes north"},
  { weight : 1, text : "one hex northeast"},
  { weight : 1, text : "one hex northeast, one hex north"},
  { weight : 1, text : "two hexes northeast"},
  { weight : 1, text : "one hex northeast, one hex southeast"},
  { weight : 1, text : "one hex southwest"},
  { weight : 1, text : "two hexes southwest"},
  { weight : 1, text : "one hex southwest, one hex south"},
  { weight : 1, text : "one hex south"},
  { weight : 1, text : "two hexes south"},
  { weight : 1, text : "one hex southeast"},
  { weight : 1, text : "two hexes southeast"},
  { weight : 1, text : "one hex southeast, one hex south"},
];

const resources = [
  { weight : 1, text : `Dead Animal` },
  { weight : 2, text : `Minerals` },
  { weight : 1, text : `Special Wood` },
  { weight : 2, text : `Plants` },
  { weight : 2, text : `Herbs` },
];

const creatures = [
  { weight : 1, text : `` },
];

const traps = [
  { weight : 1, text : `` },
]

/*
  if you want to use this you need to edit the folder portion
*/
const features = [
  { weight : 2, text : ` Ruins`, folder : [`Random Dungeons`,`Random Castle`,`Random Monastery`,`Random Prisons`,`Random Temple`]},
  { weight : 2, text : ` Caves`, folder : [`Random Cavern`,`Random Sewers`,`Random Prisons`,`Random Mines`]},
  { weight : 3, text : ` Natural Feature`, folder : [`Desert`,`Forest`,`Swamp`,`Plains`,`Mountains`,`Jungle`]},
  { weight : 2, text : ` Lair`, folder : `Monsters`},
  { weight : 2, text : ` Campsite`, folder : [`Military Camps`, `Merchant Caravans`, `Travel Complications`, `Campsite`]},
  { weight : 2, text : ` Signs of a nearby settlement`, folder : null},
  { weight : 2, text : ` Settlement`, folder : `Simple Settlement`},
  { weight : 1, text : ` Magical Area`, folder : [`Shadowy Desert`, `Enchanted Forest`, `Haunted Forest`, `Frozen Lands`, `Swamp`, `Tropical Grasslands`]},
  { weight : 3, text : ` Resource : ${gVal(resources)}`, folder : null},
  { weight : 2, text : ` Tracks : ${gVal(creatures)}`, folder : null},
  { weight : 3, text : ` Enemy : ${gVal(creatures)}`, folder : null},
  { weight : 1, text : ` Trap : ${gVal(traps)}`, folder: null},
  { weight : 1, text : ` Fantastical Location`, folder : `Magic` },
];

(async ()=>{
  let message = Array(qRoll(`2d4`))
    .fill(0)
    .map(e=>{
      let roll = qRoll(`1d20`);
      if(roll < 12) return ``;

      let feature = gVal(features), direction = gVal(directions), major = roll === 20 ? ` - (Major)` : ``;

      let header = `<h2>${feature} ${direction} ${major}</h2>`;
      let body = `${getTableText(feature)}`;

      return `${header}${body}`
    })
    .filter(e=> e !== ``)
    .join(``);

  /*
    Display to a Journal Entry instead of a Chat Message
  */  
  let journal = game.journal.getName(`Random Hex Grid Output`);
  if(journal) await journal.delete();

  await JournalEntry.create({ content : message || `You find nothing interesting in this area.`, folder : ``, name : `Random Hex Grid Output`});
})();


function qRoll(rollString = ``)
{
  return (new Roll(rollString).roll().total);
}

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

  shuffle(fun_arr);

  return fun_arr[qRoll(`1d${fun_arr.length}-1`)];
}

function shuffle(arr = [])
{
  let ci = arr.length, ri, temp;

  while(0 !== ci)
  {
    ri = qRoll(`1d${ci}-1`);
    ci -= 1;

    temp = arr[ci], arr[ci] = arr[ri], arr[ri] = temp;
  }

  return arr;
}

async function wait(ms = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

function getText(table_id)
{
  try {
    return game.tables.get(table_id).roll().results[0].text;
  }catch (error) { console.error (`${table_id} has had an error.`);}
}

/*
  check to see if the folder given has folders inside of it --- if so randomly choose 1, if no folders inside of it --- roll all tables inside of it
*/
function getTableText(feature= ``)
{
  let { folder } = features.find(f=> f.text === feature);

  if(!folder) return ``;
  if(folder instanceof Array) folder = gVal(folder);

  folder = game.folders.getName(folder);

  let folders = game.folders.filter(f=>f.parent === folder.id), value = ``;

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
    let return_message = `
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
    return return_message;
  }
}