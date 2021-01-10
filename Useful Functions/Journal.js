/*
  Toggle Journal Display
    accepts the name of the journal entry
    opening will return the journal entity
*/
function toggleJournal({ name })
{
  let journal = game.journal.getName(name);
  journal.sheet.rendered ? journal.sheet.close() : journal.sheet.render(true);
  return journal;
}