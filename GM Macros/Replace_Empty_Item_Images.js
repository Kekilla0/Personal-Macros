(async ()=> {
  const actors = (canvas.tokens.controlled.length !== 0) ? canvas.tokens.controlled.map(token=> token.actor) 
  : (game.user.targets.size !== 0) ? Array.from(game.user.targets).map(target=> target.actor) 
  : null;

  if(actors.length === 0) return;

  for(let actor of actors)
  {
    let img = actor.token.data.img, updates = [];
    
    actor.items.forEach(item => {
      if(item.data.img === "icons/svg/mystery-man.svg")
      {
        updates.push({ _id : item.id , img });
      }
    });

    await actor.updateEmbeddedEntity("OwnedItem", updates);
  }
})();