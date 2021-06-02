let keys = ["dnd5e.items"];
let journal = game.journal.getName("Discerning Merchants Price Guide");
let content = journal.data.content;
let arr = getArray(content);

for(let ele of arr)
    await checkItem(ele);

function getArray(content){
  return Array.from($(content)[0].rows).map(row => {
    let [ name, price ] = row.outerText.split(`\n`).filter(x => x != "");
    return { name , price : Number(price) };
  });
}

async function checkItem({ name, price }){
    let items = await findItemsInCompendiums({ keys, name });
    if(!items) return;
    items = items.filter(item => item.data.data.price !== price);
    if(items.length === 0 ) return;
    for(let item of items)
        await item.update({ "data.price" : price });
}

async function findItemsInCompendiums({ keys = [], name = ""}){
  keys = keys instanceof Array ? keys : [keys];  
  let output = [];

  for(let key of keys){
    let pack = game.packs.get(key);
    let index = pack.index ?? (await pack.getIndex());
    let itemID = index.find(i=>i.name.toLowerCase() === name.toLowerCase())?._id;
    if(itemID)
      output.push(await pack.getEntity(itemID));
  }
  return output;
}