/*
  Compendium to Table

  Choose a compendium, from the given types, to create a table with all the items (links) in.
*/
let compendium_types = ["Item"];

pick_compendium();

async function pick_compendium()
{
  let packs = game.packs.filter(p=>(game.user.isGM || !p.private) && compendium_types.includes(p.entity));
  let pack_choice = await choose(packs.map(p=> ([p.collection, p.title])), `Choose a compendium to create a table from : `);
  let data = await create_Data(packs.find(p=> p.collection === pack_choice));

  RollTable.create(data);
}

async function choose(options = [], prompt = ``)
{
  let value = await new Promise((resolve, reject) => {

    let dialog_options = (options[0] instanceof Array)
      ? options.map(o => `<option value="${o[0]}">${o[1]}</option>`).join(``)
      : options.map(o => `<option value="${o}">${o}</option>`).join(``);
  
    let content = `${prompt}<br><select id="choice">${dialog_options}</select>`;
  
    new Dialog({
      content, 
      buttons : { OK : {label : `OK`, callback : async (html) => { resolve(html.find('#choice').val()); } } }
    }).render(true);
  });
  return value;
}

async function create_Data(pack)
{
  let index = Array.from(await pack.getIndex()), range = 0, type = 2, weight = 1; //fix this

  return {
    name : `${pack.title} Table`,
    formula : `d${index.length}`,
    replacement : true,
    displayRoll : true,
    results : index.map(i=>{
      range++;
      return {
        collection : pack.collection,
        drawn : false,
        img : i.img,
        range : [range, range],
        resultId : i._id,
        text : i.name,
        type,
        weight
      };
    })
  };
}