/*
  Toggle Compendium Display
*/
function togglePack({ key })
{
  let pack = game.packs.get(key);
  pack.rendered ? pack.close() : pack.render(true);
  return pack;
}