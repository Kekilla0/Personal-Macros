(()=>{
  if(game.user.targets.size !== 1) return ui.notifications.error(`Please target exactly 1 token.`);
  let macro = game.macros.getName("Toggle_Token_Icon");
  let target = game.user.targets.values().next().value;

  item.actor.useSpell(item).then(async (result)=>{
    if(!result) return;
    
    await macro.execute(target.id, item.data.img, 1);
  });
})();