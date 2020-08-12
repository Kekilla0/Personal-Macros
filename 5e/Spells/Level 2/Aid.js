(()=>{
  if(game.user.targets.size > 3 || game.user.targets.size === 0) return ui.notifications.error(`Please select between 1 and 3 targets.`);
  let macroA = game.macros.getName("Toggle_Token_Icon");
  let macroB = game.macros.getName(`Create_Actor_Items_Macro`);
  let macroC = game.macros.getName(`Update_Actor_Items_Macro`);
  let macroD = game.macros.getName(`Update_Actor_Macro`);

  item.actor.useSpell(item).then(async (result)=> {
    if(!result) return;
    let content = result.data.content;
    let level = parseInt(content.charAt(content.indexOf("data-spell-level")+18))-1;

    for(let target of game.user.targets)
    {
      await macroA.execute(target.id, item.data.img);
      await macroB.execute(target.id, "Aid Buff");
      if(level !== 1)
      {
        await macroC.execute(target.id, "Aid Buff", {"flags.dynamiceffects.effects[0].value" : (level*5)});
      }
      await macroD.execute(target.id, {"data.attributes.hp.value" : target.actor.data.data.attributes.hp.value+(5*level)});
    }

    game.Gametime.doIn({hours : 8}, async () => {
      ChatMessage.create({
        content : `Aid Timer Completed.`,
        speaker : ChatMessage.getSpeaker(),
        blind : true,
        whisper : ChatMessage.getWhisperRecipients("GM")
      });
      //couldn't get the removal to work --- to do later.
    });
  });
})();