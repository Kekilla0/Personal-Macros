/*
  Get Table Text
*/
function getTableText({name  = ``} = {})
{
  return game.tables.getName(name).roll().results[0].text;
}
