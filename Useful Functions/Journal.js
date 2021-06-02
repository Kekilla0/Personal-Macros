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

/*
  Journal Macro Arguments?
*/
{
  let args = Array.from($(event.target).parent()).reduce((a,v)=>{
    let b = v.outerText.split(`-`);
    b.shift();
    return [...a, ...b]
  }, []);
}