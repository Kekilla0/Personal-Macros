const compendium_types = ["JournalEntry", /* ... and other entity types*/ ];

(async ()=>{
  let packs = game.packs.filter(p=> compendium_types.includes(p.entity))
  let pack_choice = await choose (packs.map(p=> ([p.collection, p.title])),`Choose Compendium : `);

  let pack = packs.get(pack_choice);
  let index = await pack.index();

  let choice = await choose (
    index.map(i=> ([i.id, i.name])),
    `Choose Entity to Open : `
  );

  (await pack.getEntry(choice)).sheet.render(true);
})();