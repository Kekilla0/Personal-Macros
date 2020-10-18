(async ()=>{
  let targets = Array.from(game.user.targets);
  if(!targets) return ui.notificiations.error(`Target creatures.`);
  
  let {rp} = item.actor.data.data.attributes;
  if(rp.value === 0) return ui.notificiations.error(`Insufficent Resolve Points.`);
  rp.value -= 1;
  await item.actor.update({"data.data.attributes.rp" : rp});

  item.rollDamage({event});
  Hooks.once(`preCreateChatMessage`, (data)=> {
    let { total } = JSON.parse(data.roll);

    let updates = targets.map(token=> {
      let { hp } = token.actor.data.data.attributes;
      return { _id : token.id, data : { data : { attributes : { hp : { value : (Math.clamped(total + hp.value, hp.min, hp.max))}}}}}
    });

    game.macros.getName("Update_Actor_Macro").execute(updates);
  })
})();