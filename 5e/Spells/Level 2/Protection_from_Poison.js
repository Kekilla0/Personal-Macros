(()=>{
  let macroA = game.macros.getName("Toggle_Token_Icon");
  item.actor.useSpell(item).then(async (result) => {
    if(!result) return;

    if(game.user.targets.size !== 1) return ui.notifications.error(`Please target 1 token.`);

    for(let target of game.user.targets)
    {
      if(!target.data.effects.includes(item.data.img))
      {
        await macroA.execute(target.id,item.data.img);
      }

      ChatMessage.create({
        content : `${target.name} has been protected from poison.`,
        speaker : ChatMessage.getSpeaker(),
        blind : true,
        whisper : ChatMessage.getWhisperRecipients("GM")
      });

      game.Gametime.doIn({minutes : 60}, ()=> {
        if(target.data.effects.includes(item.data.img))
        {
          await macroA.execute(target.id,item.data.img);
        }
        ChatMessage.create({
          content : `${target.name}'s poison protection has been removed.`,
          speaker : ChatMessage.getSpeaker(),
          blind : true,
          whisper : ChatMessage.getWhisperRecipients("GM")
        });
      });
    }
  });
})();