const compendium_type = "RollTable";

(async ()=>{
  let packs = game.packs.filter(p=> p.entity === compendium_type)
  let pack_choice = await choose (
    packs.map(p=> ([p.collection, p.title])),
    `Choose Rolltable Pack : `
  );

  let pack = packs.find(p=> p.collection === pack_choice);
  let contents = await pack.getContent();

  let table_choice = await choose (
    contents.map(table=> ([table.id, table.name])),
    `Choose Table to Roll : `
  );

  let table = contents.find(table=> table.id === table_choice);

  table.draw();
})();

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