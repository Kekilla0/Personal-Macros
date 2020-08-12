(()=>{
  if(game.user.targets.size < 1) return ui.notifications.error(`Please select a token.`);
  if(game.user.targets.size > 6) return ui.notificaitons.error(`Do not exceed 6 targets.`);

  let macroA = game.macros.getName("Update_Actor_Macro");

  item.actor.useSpell(item).then((result)=>{
    if(!result) return;
    let content = result.data.content;
    let level = parseInt(content.charAt(content.indexOf("data-spell-level")+18));

    item.rollDamage({spelllevel : level}).then(result =>{
      if(!result) return;

      for(let target of game.user.targets)
      {
        let hp = Math.clamped(
          target.actor.data.data.attributes.hp.value + result.total,
          0,
          target.actor.data.data.attributes.hp.max
        );
        await macroA.execute(target.id, {"data.attributes.hp.value" : hp});
      }
    });
  });
})