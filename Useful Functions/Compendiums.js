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

async function findItemInCompendium({ keys = [], name = "", id = ""}){
  keys = keys instanceof Array ? keys : [keys];  

  for(let key of keys)
  {
    let pack = game.packs.get(key);
    let itemID = id ?? (await pack.getIndex()).find(i=>i.name === name)?._id;
    if(itemID)
      return await pack.getEntity(itemID);
  }
}

async function getIndex({ keys , name = "", }){
  keys = keys instanceof Array ? keys : [keys];  

  for(let key of keys)
  {
    let pack = game.packs.get(key);
    let pack_index = pack.index.length > 1 ? pack.index : (await pack.getIndex());
    let item_index = pack_index.find(i=>i.name.toLowerCase() === name.toLowerCase());
    if(item_index)
      return {
        comp_link : `@Compendium[${key}.${item_index._id}]{${item_index.name}}`,
        img_link : `<img src="${item_index.img}" width="25" height="25">`,
        key : key,
        img : item_index.img,
        name : item_index.name,
        _id : item_index._id,
      };
  }
  return undefined;
}

async function getEntityFromLink({ link }){
  let [scope, key, id] = link.match(/\[(.*?)\]/g)[0].split('.');
  return await searchItem({ keys : [`${scope}.${key}`], id });
}