(()=>{
  let macro = game.macros.getName("Toggle_Token_Icon");
  item.actor.useSpell(item).then(async (result) => {
    if(!result) return;
    let level = result.data.content.charAt(result.data.content.indexOf("data-spell-level")+18);

    await macro.execute(
      canvas.tokens.placeables.find(i=>i.name===item.actor.name),
      `modules/combat-utility-belt/icons/concentrating.svg`,
      1);
    
    let number_of_targets = parseInt(level) + 2;
    let iteration = 1;
  
    for(let target of game.user.targets)
    {
      if(iteration > number_of_targets) return ui.notifications.warn(`Too many targets.`);

      let save_roll = new Roll(`1d20 + ${target.actor.data.data.abilities.cha.save}`).roll();

      save_roll.toMessage({
        speaker : ChatMessage.getSpeaker({token : target}),
        rollMode : "blindroll"
      });

      if(save_roll.total < item.data.data.save.dc)
      {
        if(target.data.effects.includes(item.data.img))
        {
          await macro.execute(target.id,item.data.img);
        }
        await macro.execute(target.id,item.data.img,1);
      }
    }
  });
})();