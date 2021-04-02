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
  let pack = game.packs.get(key);
  let contents = await pack.getContents();

  return name === `` 
    ? contents.find(i=>i.id === id) 
    : contents.find(i=>i.name === name)
}

async function getAll({ key })
{
  let pack = game.packs.get(key);
  return await pack.getContent();
}

async function searchItem({ keys = [], name = ""}){
  keys = keys instanceof Array ? keys : [keys];  

  for(let key of keys)
  {
    let pack = game.packs.get(key);
    let itemID = (await pack.getIndex()).find(i=>i.name === name)?._id;
    if(itemID)
      return await pack.getEntity(itemID);
  }
}