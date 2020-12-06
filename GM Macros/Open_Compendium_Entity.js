const compendium_types = ["JournalEntry" /* ... and other entity types*/ ];

(async ()=>{
  let packs = game.packs.filter(p=> compendium_types.includes(p.entity))
  let pack_choice = await choose (packs.map(p=> ([p.collection, p.title])),`Choose Compendium : `);

  let pack = packs.find(p=> p.collection === pack_choice);
  let contents = await pack.getContent();

  let choice = await choose (
    contents.map(content=> ([content.id, content.name])),
    `Choose Entity to Open : `
  );

  let entity = contents.find(content=> content.id === choice);

  entity.sheet.render(true);
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