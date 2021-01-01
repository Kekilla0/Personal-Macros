(async ()=>{
  let [type, size] = await qDialog({
    data : [
      {type : `select`, label : `Store Type : `, options : [`Adventuring Supplies`,`Alchemist`,`Herbalist`,`Blacksmith`,`Armory`]},
      {type : `select`, label : `Store Size : `, options : [`Small`, `Basic`,`Urban`,`Premium`]}
    ],
    title : `CAW Inventory Dialog`
  });

  let inventory = [];

  Object.entries(items).forEach(([key,value])=>{
    let avail = value.stores.find(i=>i.name === type);

    if(avail && avail[size] !== 0)
    {
      let num = new Roll(avail[size]).roll().total;
      if(num > 0)
        inventory.push({name : key, cost : value.cost, weight : value.weight, units : num });
    }
  });

  /*
    Add total Gold
    Roll Random Characteristics of the Shop/Shopkeep
  */
  let random_characteristics = [];

  Array(new Roll(`1d8`).roll().total).fill(0).map(async (r)=>{
    let {name, text} = await getTableResult({name : `random`});
    random_characteristics.push(`<tr><td style="width:10%">${name.charAt(0).toUpperCase() + name.slice(1)} : </td><td style="width:75%">${text}</td></tr>`);
  });

  await wait(10*random_characteristics.length);

  let content = `
  <table>
    <tr><td style="width:10%">Race : </td><td style="width:75%">${(await getTableResult({name : `race`})).text}</td></tr>
    ${random_characteristics.join(``)}
  <table>
  <table>
    <tr>
      <th>Name</th>
      <th>Cost</th>
      <th>Weight</th>
      <th>Units</th>
    </tr>
    ${inventory.map(({name,cost,weight,units})=> `<tr><td>${name}</td><td>${cost}</td><td>${weight}</td><td>${units}</td></tr>`).join(``)}
  </table>`;

  let journal = game.journal.getName(`${type} ${size}`);
  if(journal) await journal.delete();

  journal = await JournalEntry.create({ content , folder : ``, name : `${type} ${size}`});

  //display journal
})();

async function qDialog({data, title = `Quick Dialog`} = {})
{
  data = data instanceof Array ? data : [data];

  let value = await new Promise((resolve) => {
    let content = `
    <table style="width:100%">
      ${data.map(({type, label, options}, i)=> {
        if(type.toLowerCase() === `select`)
        {
          return `<tr><th style="width:50%"><label>${label}</label></th><td style="width:50%"><select id="${i}qd">${options.map((e,i)=> `<option value="${e}">${e}</option>`).join(``)}</td></tr>`;
        }else if(type.toLowerCase() === `checkbox`){
          return `<tr><th style="width:50%"><label>${label}</label></th><td style="width:50%"><input type="${type}" id="${i}qd" ${options || ``}/></td></tr>`;
        }else{
          return `<tr><th style="width:50%"><label>${label}</label></th><td style="width:50%"><input type="${type}" id="${i}qd" value="${options instanceof Array ? options[0] : options}"/></td></tr>`;
        }
      }).join(``)}
    </table>`;

    new Dialog({
      title, content,
      buttons : {
        Ok : { label : `Ok`, callback : (html) => {
          resolve(Array(data.length).fill().map((e,i)=>{
            let {type} = data[i];
            if(type.toLowerCase() === `select`)
            {
              return html.find(`select#${i}qd`).val();
            }else{
              switch(type.toLowerCase())
              {
                case `text` :
                case `password` :
                case `radio` :
                  return html.find(`input#${i}qd`)[0].value;
                case `checkbox` :
                  return html.find(`input#${i}qd`)[0].checked;
                case `number` :
                  return html.find(`input#${i}qd`)[0].valueAsNumber;
              }
            }
          }));
        }}
      }
    }).render(true);
  });
  return value;
}

async function getTableResult({name  = ``} = {})
{
  const tableNames = {
    eyes : `d20 Eyes: The person has...`,
    ears : `d12 Ears: The person has...`,
    mouth : `d10 Mouth: The person has...`,
    nose : `d12 Nose: The person has...`,
    chin : `d8 Chin or jaw: He/she has...`,
    hair : `d20 Hair: The person has...`,
    height : `d6 Height: The person is...`,
    body : `d20 Body: The person’s body is...`,
    hands : `d6 Hands: The person has...`,
    scar : `d4 Scar: The person has...`,
    tattoo : `d12 Tattoo: The person has...`,
    clothes : `d8 Clothes: The person’s clothing is...`,
    calm : `d32 Calm Trait: When calm, the person is typically...`,
    stress : `d32 Stress Trait: When stressed, the person often becomes...`,
    mood : `d20 Mood: Now, the person is...`,
    faith : `d8 Faith: The person is a...`, 
    prejudice : `d6 Prejudice: The person is prejudice against...`,
    flaw : `d20 Flaw: The person...`,
    mannerism : `d50 Mannerisms`,
    race : `d20 Race : The person's linage is...`
  };

  if(name === `random`) name = Object.keys(tableNames)[new Roll (`1d19-1`).roll().total];

  let { results } = await game.tables.getName(tableNames[name]).draw({displayChat : false});

  console.log(name, " : " ,results[0].text);

  return { name, text : results[0].text };
}

async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

const available_gold = {
  Small : 100, Basic : 200, Urban : 5000, Premium : 10000
}

const items = {
  //Armor
  //Light
  "Padded Armor" : 
  {
    cost : `5 gp`,
    weight : `8 lb.`, 
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
    ]
  },
  //Medium
  "Chain Shirt" : 
  {
    cost : `10 gp`,
    weight : `20 lb.`,
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`},
      { name : `Blacksmith`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
      { name : `Armory`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+2`, Premium : `1d4+3`},
    ]
  },
  "Scale Mail" : 
  {
    cost : `50 gp`,
    weight : `45 lb.`,
    stores: [
      { name : `Blacksmith`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
      { name : `Armory`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+2`, Premium : `1d4+3`},
    ]
  },
  "Breastplate" : 
  {
    cost : `400 gp`,
    weight : `20 lb.`,
    stores: [
      { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4+1`},
      { name : `Armory`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`},
    ]
  },
  "Half plate" : 
  {
    cost : `750 gp`,
    weight : `40 lb.`,
    stores: [
      { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`},
      { name : `Armory`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`},
    ]
  },
  //Heavy
  "Ring Mail" : 
  {
    cost : `30 gp`,
    weight : `40 lb.`,
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`},
      { name : `Blacksmith`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
      { name : `Armory`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+2`, Premium : `1d4+3`},
    ]
  },
  "Chain mail" : 
  {
    cost : `75 gp`,
    weight : `55 lb.`,
    stores: [
      { name : `Blacksmith`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`},
      { name : `Armory`, Small : 0, Basic : `1d4`, Urban : `1d4`, Premium : `1d4`},
    ]
  },
  "Split" : 
  {
    cost : `200 gp`,
    weight : `60 lb.`,
    stores: [
      { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`},
      { name : `Armory`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4`},
    ]
  },
  "Plate" : 
  {
    cost : `1500 gp`,
    weight : `65 lb.`,
    stores: [
      { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`},
      { name : `Armory`, Small : 0, Basic : 0, Urban : `1d4-2`, Premium : `1d4-1`},
    ]
  },
  //Shield
  "Buckler" : 
  {
    cost : `8 gp`,
    weight : `3 lb.`,
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`},
      { name : `Blacksmith`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
      { name : `Armory`, Small : 0, Basic : `1d4`, Urban : `1d4`, Premium : `1d4`},
    ]
  },
  "Shield" : 
  {
    cost : `10 gp`,
    weight : `6 lb.`,
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`},
      { name : `Blacksmith`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`},
      { name : `Armory`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`},
    ]
  },
  "Tower Shield" : 
  {
    cost : `20 gp`,
    weight : `30 lb.`,
    stores: [
      { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`},
      { name : `Armory`, Small : 0, Basic : 0, Urban : `1d4-2`, Premium : `1d4-1`},
    ]
  },
  //Weapons
  //Simple Melee Weapons
  "Dagger" : 
  {
    cost : `2 gp`,
    weight : `1 lb.`,
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
      { name : `Blacksmith`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+2`, Premium : `1d4+4`},
      { name : `Armory`, Small : `2d4`, Basic : `2d4+1`, Urban : `2d4+2`, Premium : `2d4+4`},
    ]
  },
  "Handaxe" : 
  {
    cost : `5 gp`,
    weight : `2 lb.`,
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
      { name : `Blacksmith`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+2`, Premium : `1d4+4`},
      { name : `Armory`, Small : `2d4`, Basic : `2d4+1`, Urban : `2d4+2`, Premium : `2d4+4`},
    ]
  },
  "Quarterstaff" : 
  {
    cost : `2 sp`,
    weight : `4 lb.`,
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`}
    ]
  },
  "Spear" : 
  {
    cost : `1 gp`,
    weight : `3 lb.`,
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`},
      { name : `Blacksmith`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
      { name : `Armory`, Small : `1d4`, Basic : `2d4`, Urban : `2d4+1`, Premium : `2d4+2`},
    ]
  },
  "Javelin" : 
  {
    cost : `5 sp`,
    weight : `2 lb.`,
    stores: [
      { name : `Blacksmith`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
      { name : `Armory`, Small : `2d4-1`, Basic : `2d4`, Urban : `2d4+1`, Premium : `2d4+2`},
    ]
  },
  "Light hammer" : 
  {
    cost : `2 gp`,
    weight : `2 lb.`,
    stores: [
      { name : `Blacksmith`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+2`, Premium : `1d4+3`},
      { name : `Armory`, Small : `1d4-1`, Basic : `1d4-1`, Urban : `1d4-1`, Premium : `1d4-1`},
    ]
  },
  "Mace" : 
  {
    cost : `5 gp`,
    weight : `4 lb.`,
    stores: [
      { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4+1`, Premium : `1d4+2`},
      { name : `Armory`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4`},
    ]
  },
 "Sickle" : 
  {
    cost : `1 gp`,
    weight : `2 lb.`,
    stores: [
      { name : `Blacksmith`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+2`, Premium : `1d4+3`},
      { name : `Armory`, Small : `1d4-1`, Basic : `1d4-1`, Urban : `1d4-1`, Premium : `1d4-1`},
    ]
  },
  //Simple Ranged Weapons
  "Shortbow" : 
  {
    cost : `25 gp`,
    weight : `5 lb.`,
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
    ]
  },
  "Crossbow, light" : 
  {
    cost : `25 gp`,
    weight : `5 lb.`,
    stores: [
      { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4+1`, Premium : `1d4+2`},
      { name : `Armory`, Small : 0, Basic : `1d4`, Urban : `1d4`, Premium : `1d4`},
    ]
  },
  "Dart" : 
  {
    cost : `5 cp`,
    weight : `1/4 lb.`,
    stores: [
      { name : `Blacksmith`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+2`, Premium : `1d4*3`},
    ]
  },
  //Martial Melee Weapons
  "Longsword" : 
  {
    cost : `15 gp`,
    weight : `3 lb.`,
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`},
      { name : `Blacksmith`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
      { name : `Armory`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
    ]
  },
  "Shortsword" : 
  {
    cost : `10 gp`,
    weight : `2 lb.`,
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`}
    ]
  },
  "Battleaxe" : 
  {
    cost : `10 gp`,
    weight : `4 lb.`,
    stores: [
      { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4+1`, Premium : `1d4+2`},
      { name : `Armory`, Small : 0, Basic : `1d4`, Urban : `1d4`, Premium : `1d4`},
    ]
  },
  "Flail" : 
  {
    cost : `10 gp`,
    weight : `2 lb.`,
    stores: [
      { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`},
    ]
  },
  "Glaive" : 
  {
    cost : `20 gp`,
    weight : `6 lb.`,
    stores: [
      { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`},
      { name : `Armory`, Small : 0, Basic : `1d4`, Urban : `1d4`, Premium : `1d4`},
    ]
  },
  "Greataxe" : 
  {
    cost : `30 gp`,
    weight : `7 lb.`,
    stores: [
      { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`},
      { name : `Armory`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`},
    ]
  },
  "Greatsword" : 
  {
    cost : `50 gp`,
    weight : `6 lb.`,
    stores: [
      { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`},
      { name : `Armory`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`},
    ]
  },
  "Halberd" : 
  {
    cost : `20 gp`,
    weight : `6 lb.`,
    stores: [
      { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`},
      { name : `Armory`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`},
    ]
  },
  "Lance" : 
  {
    cost : `10 gp`,
    weight : `6 lb.`,
    stores: [
      { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`},
      { name : `Armory`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4`},
    ]
  },
  "Maul" : 
  {
    cost : `10 gp`,
    weight : `10 lb.`,
    stores: [
      { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`},
      { name : `Armory`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`},
    ]
  },
  "Morning Star" : 
  {
    cost : `15 gp`,
    weight : `4 lb.`,
    stores: [
      { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`},
      { name : `Armory`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`},
    ]
  },
  //Martial Ranged Weapons
  "Longbow" : 
  {
    cost : `50 gp`,
    weight : `2 lb.`,
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`}
    ]
  },
  "Net" : 
  {
    cost : `1 gp`,
    weight : `3 lb.`, 
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
    ]
  },
  //Ammunition
  "Arrows" : 
  {
    cost : `1 gp`,
    weight : `1 lb.`, 
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
    ]
  },
  "Arrows, Acid (5)" : 
  {
    cost : `2 gp`,
    weight : `1/2 lb.`, 
    stores: [
      { name : `Alchemist`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+2`}
    ]
  },
  "Bolts, Acid (5)" : 
  {
    cost : `2 gp`,
    weight : `1/2 lb.`, 
    stores: [
      { name : `Alchemist`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+2`}
    ]
  },
  "Sling Bullets, Acid (5)" : 
  {
    cost : `2 gp`,
    weight : `1/2 lb.`, 
    stores: [
      { name : `Alchemist`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+2`}
    ]
  },
  "Arrows, Cold (5)" : 
  {
    cost : `2 gp`,
    weight : `1/2 lb.`, 
    stores: [
      { name : `Alchemist`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+2`}
    ]
  },
  "Bolts, Cold (5)" : 
  {
    cost : `2 gp`,
    weight : `1/2 lb.`, 
    stores: [
      { name : `Alchemist`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+2`}
    ]
  },
  "Sling Bullets, Cold (5)" : 
  {
    cost : `2 gp`,
    weight : `1/2 lb.`, 
    stores: [
      { name : `Alchemist`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+2`}
    ]
  },
  "Arrows, Fire (5)" : 
  {
    cost : `2 gp`,
    weight : `1/2 lb.`, 
    stores: [
      { name : `Alchemist`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+2`}
    ]
  },
  "Bolts, Fire (5)" : 
  {
    cost : `2 gp`,
    weight : `1/2 lb.`, 
    stores: [
      { name : `Alchemist`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+2`}
    ]
  },
  "Sling Bullet, Fire (5)" : 
  {
    cost : `2 gp`,
    weight : `1/2 lb.`, 
    stores: [
      { name : `Alchemist`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+2`}
    ]
  },
  //Item
  "Backpack" : 
  {
    cost : `2 gp`,
    weight : `5 lb.`,  
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
    ]
  },
  "Bedroll" : 
  {
    cost : `1 gp`,
    weight : `7 lb.`, 
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
    ]
  },
  "Map Case" : 
  {
    cost : `1 gp`,
    weight : `1 lb.`,  
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
    ]
  },
  "Climber's Kit" : 
  {
    cost : `25 gp`,
    weight : `12 lb.`,  
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`}
    ]
  },
  "Clothes, Traveler's" : 
  {
    cost : `2 gp`,
    weight : `4 lb.`,  
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
    ]
  },
  "Crowbar" : 
  {
    cost : `2 gp`,
    weight : `5 lb.`,  
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
    ]
  },
  "Fishing Tackle" : 
  {
    cost : `1 gp`,
    weight : `4 lb.`, 
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
    ]
  },
  "Flask" : 
  {
    cost : `2 cp`,
    weight : `1 lb.`, 
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
      { name : `Alchemist`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
      { name : `Herbalist`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`}
    ]
  },
  "Grappling Hook" : 
  {
    cost : `2 gp`,
    weight : `4 lb.`, 
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`}
    ]
  },
  "Hammer" : 
  {
    cost : `1 gp`,
    weight : `3 lb.`,  
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`}
    ]
  },
  "Hammock" : 
  {
    cost : `5 gp`,
    weight : `1 lb.`, 
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`}
    ]
  },
  "Healer's Kit" : 
  {
    cost : `5 gp`,
    weight : `3 lb.`,  
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`},
      { name : `Herbalist`, Small : 0, Basic : `1d4-1`, Urban : `1d4+1`, Premium : `1d4+3`}
    ]
  },
  "Hunting Trap" : 
  {
    cost : `5 gp`,
    weight : `25 lb.`, 
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+3`, Premium : `1d4+5`}
    ]
  },
  "Lamp" : 
  {
    cost : `5 sp`,
    weight : `1 lb.`, 
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+2`, Premium : `1d4+3`}
    ]
  },
  "Lantern, Bullseye" : 
  {
    cost : `10 gp`,
    weight : `2 lb.`,  
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+2`}
    ]
  },
  "Lantern, Hooded" : 
  {
    cost : `5 gp`,
    weight : `2 lb.`, 
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+2`}
    ]
  },
  "Mess kit" : 
  {
    cost : `2 sp`,
    weight : `1 lb.`,  
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
    ]
  },
  "Pick, Miner's" : 
  {
    cost : `2 gp`,
    weight : `10 lb.`,  
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
    ]
  },
  "Piton" : 
  {
    cost : `5 cp`,
    weight : `1/4 lb.`, 
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
    ]
  },
  "Pole" : 
  {
    cost : `5 cp`,
    weight : `7 lb.`, 
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+2`}
    ]
  },
  "Potion of Healing" : 
  {
    cost : `50 gp`,
    weight : `1/2 lb.`,  
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+2`},
      { name : `Herbalist`, Small : 0, Basic : `1d4`, Urban : `1d4+2`, Premium : `1d4+3`}
    ]
  },
  "Pouch" : 
  {
    cost : `5 sp`,
    weight : `1 lb.`, 
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
    ]
  },
  "Purification Kit" : 
  {
    cost : `5 gp`,
    weight : `3 lb.`,  
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`},
      { name : `Herbalist`, Small : 0, Basic : `1d4`, Urban : `1d4+2`, Premium : `1d4+4`},
      { name : `Alchemist`, Small : 0, Basic : `1d4`, Urban : `1d4+2`, Premium : `1d4+4`}
    ]
  },
  "Quiver" : 
  {
    cost : `1 gp`,
    weight : `5 lb.`,  
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+3`, Premium : `1d4+5`}
    ]
  },
  "Quiver Scabbard" : 
  {
    cost : `10 gp`,
    weight : `2 lb.`, 
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`}
    ]
  },
  "Rations" : 
  {
    cost : `5 sp`,
    weight : `2 lb.`, 
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
    ]
  },
  "Rope, Hempen" : 
  {
    cost : `1 gp`,
    weight : `10 lb.`, 
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+2`, Premium : `1d4+3`}
    ]
  },  
  "Rope, Silk" : 
  {
    cost : `10 gp`,
    weight : `5 lb.`, 
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+2`}
    ]
  },
  "Sack" : 
  {
    cost : `1 cp`,
    weight : `1/2 lb.`, 
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
    ]
  },
  "Shovel" : 
  {
    cost : `2 gp`,
    weight : `5 lb.`,  
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
    ]
  },
  "Signal Whistle" : 
  {
    cost : `5 cp`,
    weight : ``,  
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
    ]
  },
  "Spyglass" : 
  {
    cost : `1000 gp`,
    weight : `1 lb.`,  
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`}
    ]
  },
  "Tent, four-person" : 
  {
    cost : `4 gp`,
    weight : `40 lb.`,  
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
    ]
  },
  "Tent, two-person" : 
  {
    cost : `2 gp`,
    weight : `20 lb.`,  
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+3`}
    ]
  },
  "Tinderbox" : 
  {
    cost : `5 sp`,
    weight : `1 lb.`,  
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
    ]
  },
  "Torch" : 
  {
    cost : `1 cp`,
    weight : `1 lb.`,  
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
    ]
  },
  "Waterskin" : 
  {
    cost : `2 sp`,
    weight : `5 lb.`,  
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
    ]
  },
  "Whetstone" : 
  {
    cost : `1 cp`,
    weight : `1 lb.`,   
    stores: [
      { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+3`}
    ]
  },
  "Acid (vial)" : 
  {
    cost : `25 gp`,
    weight : `1 lb.`,   
    stores: [
      { name : `Alchemist`, Small : `1d4-1`, Basic : `1d4x2`, Urban : `1d4x3`, Premium : `1d4x5`}
    ]
  },
  "Alchemist Fire (flask)" : 
  {
    cost : `50 gp`,
    weight : `1 lb.`,   
    stores: [
      { name : `Alchemist`, Small : 0, Basic : `1d4-1`, Urban : `1d4x2`, Premium : `1d4x5`}
    ]
  },
  "Antitoxin (vial)" : 
  {
    cost : `50 gp`,
    weight : ``,   
    stores: [
      { name : `Alchemist`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+3`, Premium : `1d4+5`},
      { name : `Herbalist`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+3`, Premium : `1d4+5`}
    ]
  },
  "Bottle, Glass" : 
  {
    cost : `2 gp`,
    weight : `2 lb.`,   
    stores: [
      { name : `Alchemist`, Small : `1d4`, Basic : `1d4+2`, Urban : `1d4+3`, Premium : `1d4+5`},
      { name : `Herbalist`, Small : `1d4`, Basic : `1d4+2`, Urban : `1d4+3`, Premium : `1d4+5`}
    ]
  },
  "Component Pouch" : 
  {
    cost : `25 gp`,
    weight : `2 lb.`,   
    stores: [
      { name : `Herbalist`, Small : `1d4`, Basic : `1d4+2`, Urban : `1d4+3`, Premium : `1d4+5`}
    ]
  },
  "Oil (flask)" : 
  {
    cost : `1 sp`,
    weight : `1 lb.`,   
    stores: [
      { name : `Alchemist`, Small : 0, Basic : `1d4-1`, Urban : `1d4+1`, Premium : `1d4+3`},
      { name : `Herbalist`, Small : 0, Basic : `1d4-1`, Urban : `1d4+1`, Premium : `1d4+3`}
    ]
  },
  "Perfume (vial)" : 
  {
    cost : `5 gp`,
    weight : ``,   
    stores: [
      { name : `Herbalist`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+2`}
    ]
  },
  "Poison, basic (vial)" : 
  {
    cost : `100 gp`,
    weight : ``,   
    stores: [
      { name : `Herbalist`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
    ]
  },
  "Vial" : 
  {
    cost : `1 gp`,
    weight : ``,   
    stores: [
      { name : `Herbalist`, Small : `1d4`, Basic : `1d4+2`, Urban : `1d4+4`, Premium : `1d4+5`},
      { name : `Alchemist`, Small : `1d4`, Basic : `1d4+2`, Urban : `1d4+4`, Premium : `1d4+5`}
    ]
  },
  //Tools
  "Cartographer's Tools" : 
  {
    cost : `15 gp`,
    weight : `6 lb.`,  
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
    ]
  },
  "Navigator's Tools" : 
  {
    cost : `25 gp`,
    weight : `2 lb.`,   
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`}
    ]
  },
  "Alchemist's Tools" : 
  {
    cost : `50 gp`,
    weight : `8 lb.`,   
    stores: [
      { name : `Alchemist`, Small : 0, Basic : `1d4`, Urban : `1d4+2`, Premium : `1d4+3`}
    ]
  },
  "Herbalism Kit" : 
  {
    cost : `5 gp`,
    weight : `3 lb.`,   
    stores: [
      { name : `Alchemist`, Small : 0, Basic : `1d4-1`, Urban : `1d4+1`, Premium : `1d4+2`},
      { name : `Herbalist`, Small : 0, Basic : `1d4-1`, Urban : `1d4+1`, Premium : `1d4+2`}
    ]
  },
  //Tack, Harness
  "Bit and bridle" : 
  {
    cost : `2 gp`,
    weight : `1 lb.`,  
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
    ]
  },
  //Saddles
  "Saddle, Riding" : 
  {
    cost : `10 gp`,
    weight : `25 lb.`,   
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
    ]
  },
  "Saddlebags" : 
  {
    cost : `4 gp`,
    weight : `8 lb.`,  
    stores: [
      { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
    ]
  },
  //Miscellaneous
  "Alchemical Reagents" : 
  {
    cost : `See Unit`,
    weight : ``,  
    stores: [
      { name : `Alchemist`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+2`, Premium : `1d4+3`},
      { name : `Herbalist`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`}
    ]
  },
  "Spell Components" : 
  {
    cost : `See Spell`,
    weight : ``,  
    stores: [
      { name : `Herbalist`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+2`, Premium : `1d4+3`},
      { name : `Alchemist`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`}
    ]
  },
}