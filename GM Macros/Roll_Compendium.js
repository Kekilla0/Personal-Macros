const compendium_type = "RollTable";

(async ()=>{
  let packs = game.packs.filter(p=> p.entity === compendium_type)
  let pack_choice = await choose (
    packs.map(p=> ([p.collection, p.title])),
    `Choose Rolltable Pack : `
  );

  let pack = packs.get(pack_choice);
  let index = await pack.getIndex();

  let table_choice = await choose (
    index.map(table=> ([table.id, table.name])),
    `Choose Table to Roll : `
  );

  await pack.getEntry(table_choice).draw();
})();