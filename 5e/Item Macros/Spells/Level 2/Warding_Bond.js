(()=>{
  if(game.user.targets.size !== 1) return ui.notifications.error(`Please target exactly 1 token.`);
  let macroA = game.macros.getName(`Toggle_Token_Icon`);
  let macroB = game.macros.getName(`Create_Actor_Items_Macro`)
  let macroC = game.macros.getName(`Delete_Actor_Items_Macro`);
  let target = game.user.targets.values().next().value;

  item.actor.useSpell(item).then(async (result) => {
    if(!result) return;
    
    if(!target.data.effects.includes(item.data.img))
    {
      await macroA.execute(target.id, item.data.img);
    }    

    if(!target.actor.items.find(i=>i.name===`${item.name} Buff`))
    {
      await macroB.execute(target.id, `${item.name} Buff`);
    }
    
    let time = 0;
    if(item.data.data.duration.units === "hour")
    {
      time = item.data.data.duration.value*60;
    }else if (item.data.data.duration.units === "minute")
    {
      time = item.data.data.duration.value;
    }

    game.Gametime.doIn({minutes: time}, async () => {
      if(target.data.effects.includes(item.data.img))
      {
        await macroA.execute(target.id, item.data.img);
      }
      if(target.actor.items.find(i=>i.name===`${item.name} Buff`))
      {
        await macroC.execute(target.id, `${item.name} Buff`);
      }
    })
  })
})();