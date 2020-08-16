(async ()=>{
  let item_actor = item.actor;
  let item_token = canvas.tokens.placeables.find(i=>i.name ===item_actor.data.token.name);

  if(!item_token.data.effects.includes(item.data.img))
  {
    item.roll().then(async (result) => {
      if(!result) return;

      item_token.toggleEffect(item.data.img);

      await item.update({
        "data.activation.type" : "reaction",
        "data.uses.max" : 0
      });
  
      game.Gametime.doIn({minutes:1}, async () => {
        if(item_token.data.effects.includes(item.data.img))
        {
          item_token.toggleEffect(item.data.img);
  
          await item.update({
            "data.activation.type" : "bonus",
            "data.uses.max" : 1
          });
        }
      });      
    });
  }else{
    item.roll();
  }
})();