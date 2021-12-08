function toggleJournal({ name }){
  let journal = game.journal.getName(name);
  if(!journal) return console.error(`No Journal Entry by the name of ${name}`);

  journal.sheet.rendered ? journal.sheet.close() : journal.sheet.render(true);
  return journal;
}