(()=>{
  let macro = game.macros.getName("Toggle_Token_Icon");
  item.actor.useSpell(item).then(async (result) => {
    if(!result) return;
    let level = result.data.content.charAt(result.data.content.indexOf("data-spell-level")+18);
    
    let number_of_targets = parseInt(level) + 2;
    let iteration = 1;
  
    for(let target of game.user.targets)
    {
      if(iteration > number_of_targets) return ui.notifications.warn(`Too many targets.`);

      if(target.data.effects.includes(item.data.img))
      {
        await macro.execute(target.id,item.data.img);
      }
      await macro.execute(target.id,item.data.img,1);
    }
  });
})();
