async function toggleEquip({ actor, item }= {}){
  if(item.constructor.name !== "Item5e")
    item = actor.items.get(item) ?? actor.items.getName(item);

  if(!item) return console.error(`Unable to find ${item}`);
  if(item?.data?.data?.equipped == undefined) return error.console(`Unable to equip ${item.name}.`);
  
  return await item.udpate({ "data.equipped" : !item.data.data.equipped });
}