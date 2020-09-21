(()=>{
  if(game.user.targets.size !== 1) return ui.notifications.error(`Please target exactly 1 token.`);
  let macroA = game.macros.getName(`Toggle_Token_Icon`);
  let macroB = game.macros.getName(`Create_Actor_Items_Macro`)
  let macroC = game.macros.getName(`Delete_Actor_Items_Macro`);
  let target = game.user.targets.values().next().value;

  item.actor.useSpell(item).then(async (result) => {
    if(!result) return;
    
    await macroA.execute(target.id, item.data.img, 10);
    await macroB.execute(target.id, "Shield of Faith Buff");

    game.Gametime.doIn({minutes:10}, async () => {
      await macroC.execute(target.id, "Shield of Faith Buff");
    })
  })
})();