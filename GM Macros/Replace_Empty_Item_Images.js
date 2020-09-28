(async ()=> {
  if(!token) return;

  let img = token.data.img;
  let updates = [];

  token.actor.items.forEach(item => {
    if(item.data.img === "icons/svg/mystery-man.svg")
    {
      updates.push({ _id : item.id , img });
    }
  });

  await token.actor.updateEmbeddedEntity("OwnedItem", updates);
})();