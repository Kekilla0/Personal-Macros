(()=>{
  let macroA = game.macros.getName("Toggle_Token_Icon");
  item.actor.useSpell(item).then(async (result) => {
    if(!result) return;
    let content = result.data.content;
    let level = parseInt(content.charAt(content.indexOf("data-spell-level")+18));

    if(game.user.targets.size < 1) return ui.notifications.error(`Please target tokens.`);
    if(game.user.targets.size > (level-1)) return ui.notifications.error(`Please does not exceed ${level - 1} targetted tokens.`);

    for(let target of game.user.targets)
    {
      let save_roll = new Roll(`1d20 + ${target.actor.data.data.abilities.wis.save}`).roll();

      save_roll.toMessage({
        speaker : ChatMessage.getSpeaker({token : target}),
        rollMode : "blindroll"
      });

      if(save_roll.total < item.data.data.save.dc)
      {
        if(!target.data.effects.includes(item.data.img))
        {
          await macroA.execute(target.id,item.data.img);
        }

        game.Gametime.doIn({minutes : 1}, ()=> {
          if(target.data.effects.includes(item.data.img))
          {
            await macroA.execute(target.id,item.data.img);
          }
        });
      }
    }
  });
})();