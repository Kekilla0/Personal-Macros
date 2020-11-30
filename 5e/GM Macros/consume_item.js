async function consume_item(actor, item_name)
{
  let item = actor.items.find(i=>i.name===item_name && i.data.data.uses.value !== 0);
  if(!item) return false;
  if(item.data.data.uses.value === 1 && item.data.data.quantity === 1)
  {
    await actor.deleteOwnedItem(item.id);
    return true;
  }else{
    let data = item.data.data.uses.value === 1 
      ? {...item.data, "data.quantity" : (item.data.data.quantity - 1), "data.uses.value" : item.data.data.uses.max }
      : {...item.data, "data.uses.value" : (item.data.data.uses.value - 1)};
    await actor.updateOwnedItem(data);
    return true;
  }
}