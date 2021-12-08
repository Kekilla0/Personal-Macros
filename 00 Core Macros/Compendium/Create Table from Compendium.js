/**
 * Create Compendium from Table
 * 
 * Choose a compendium, to create a table with all the items links in.
 * 
 * Dependancies : Choose Function
 */

const choice = await choose(game.packs.map(p => ([p.collection, p.title])), `Choose a compendium : `);
const data = await createData(game.packs.get(choice));

await RollTable.create(data);


async function createData(pack){
  await pack.getIndex();

  let defaults = {
    range : 0, type : 2, weight : 1,
  };

  return {
    name : `${pack.title} Table`,
    formula : `d${pack.index.size}`,
    replacement : true,
    displayRoll : true,
    results : Array.from(pack.index).map(i => {
      defaults.range++;
      return {
        collection : pack.collection,
        drawn : false,
        img : i.img,
        resultId : i._id,
        text : i.name,
        range : [defaults.range, defaults.range],
        type : defaults.type,
        weight : defaults.weight,
      }
    })
  }
}

async function choose(options = [], prompt = ``){
  return new Promise((resolve) => {

    let dialog_options = (options[0] instanceof Array)
      ? options.map(o => `<option value="${o[0]}">${o[1]}</option>`).join(``)
      : options.map(o => `<option value="${o}">${o}</option>`).join(``);
  
    let content = `
    <table style="width=100%">
      <tr><th>${prompt}</th></tr>
      <tr><td><select id="choice">${dialog_options}</select></td></tr>
    </table>`;
  
    new Dialog({
      content, 
      buttons : { OK : {label : `OK`, callback : async (html) => { resolve(html.find('#choice').val()); } } }
    }).render(true);
  });
}

