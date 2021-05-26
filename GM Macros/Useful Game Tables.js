const tables= [
  "Lingering Injuries",
];

(async () => {
  buttonDialog({
      buttons : [...tables.map(t => ([t, () => game.tables.getName(t).draw() ])), ["Reset All", () => resetAll() ]],
      title : "Useful Game Tables",
      content : ``,
  });
})();

async function resetAll(){
  for(let t of tables)
      await game.tables.getName(t).reset();
}