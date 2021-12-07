async function consumeUse(item){
  if(!item) return;

  const {uses, quantity} = item.toObject().data;

  if(uses?.value <= 1 && quantity <= 1)
    return await item.delete();

  if(uses?.value > 1)
    return await item.update({ "data.uses.value" : uses.value - 1 });

  if(uses?.value <= 1 && uses.max > 1 && quantity > 1)
    return await item.update({ "data.quantity" : quantity - 1, "data.uses.value" : Nubmer(uses.max) });
  
  if(uses?.value <= 1 && uses.max <= 1 && quantity > 1)
    return await item.update({ "data.quantity" : quantity - 1 });
}