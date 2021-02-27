/*
  Toggle Compendium Display
*/
function togglePack({ key })
{
  let pack = game.packs.get(key);
  pack.rendered ? pack.close() : pack.render(true);
  return pack;
}

async function getItem({ key = ``, name = ``, id = `` })
{
  let contents = await game.packs.get(key).getContents();

  return name === `` 
    ? contents.find(i=>i.id === id) 
    : contents.find(i=>i.name === name)
}

async function getAll({ key })
{
  let pack = game.packs.get(key);
  return await pack.getContent();
}