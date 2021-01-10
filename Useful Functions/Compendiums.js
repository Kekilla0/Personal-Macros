/*
  Toggle Compendium Display
*/
function toggleDisplay({ key })
{
  let pack = game.packs.get(key);
  return pack.rendered ? pack.close() : pack.render(true);
}