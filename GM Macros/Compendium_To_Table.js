/*
  data : {
    name : ``,
    results : [
      collection : ``,
      drawn : false, 
      img : ``,
      range : [x, x],
      resultId : ``,
      text : ``,
      type : 2, 
      weight : 1
    ];
  }
*/
let compendium_types = ["Item"];

pick_compendium();

async function pick_compendium()
{
  let packs = game.packs.filter(p=>(game.user.isGM || !p.private) && compendium_types.includes(p.entity));

  let pack_choice = await choose(packs.map(p=> { return [p.collection, p.title]}), `Choose a compendium to create a table from : `);

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
  let contents = await pack.getContent(), range = -1, type = 2, weight = 1;

  return {
    name : `${pack.title} Table`,
    formula : `d${contents.length}`,
    replacement : true,
    displayRoll : true,
    results : contents.map(content=>{
      range++;
      return {
        collection : pack.collection,
        drawn : false,
        img : content.img,
        range : [range, range],
        resultId : content.id,
        text : content.name,
        type,
        weight
      };
    })
  };
}