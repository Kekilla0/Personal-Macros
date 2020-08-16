(async ()=>{
  let item_actor = item.actor;
  let item_token = canvas.tokens.placeables.find(i=>i.name ===item_actor.data.token.name);

  let item_resistances = [
    "slashing", "bludgeoning", "piercing"
  ];

  if(!item_token.data.effects.includes(item.data.img))
  {

    item.roll().then((result)=> {
      if(!result) return;

      item_token.toggleEffect(item.data.img);
    
      let actor_resistances = item_actor.data.data.traits.dr.value;
  
      for(let ir of item_resistances)
      {
        if(!actor_resistances.includes(ir)) actor_resistances.push(ir);
      }
  
      item_actor.update({
        "data.traits.dr.value" : actor_resistances 
      });
  
      game.Gametime.doIn({minutes : 1}, async () => {
        if(item_token.data.effects.includes(item.data.img))
        {
          item_token.toggleEffect(item.data.img);
  
          let not_item_resistances = [];
  
          for(let resist of item_actor.data.data.traits.dr.value)
          {
            if(!item_resistances.includes(resist)) not_item_resistances.push(resist);
          }
  
          item_actor.update({
            "data.traits.dr.value" : not_item_resistances 
          });
        }
      });
    });
  }else{
    if(item_token.data.effects.includes(item.data.img))
    {
      item_token.toggleEffect(item.data.img);

      let not_item_resistances = [];

      for(let resist of item_actor.data.data.traits.dr.value)
      {
        if(!item_resistances.includes(resist)) not_item_resistances.push(resist);
      }

      item_actor.update({
        "data.traits.dr.value" : not_item_resistances 
      });
    }
  }
})();