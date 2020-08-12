(()=>{
  let macroA = game.macros.getName("Toggle_Token_Icon");
  let macroB = game.macros.getName("Update_Token_Macro");

  item.actor.useSpell(item).then(async (result) => {
    if(!result) return;
    let content = result.data.content;
    let level = parseInt(content.charAt(content.indexOf("data-spell-level")+18));

    if(game.user.targets.size < 1 || game.user.targets.size > level) return ui.notifications.error(`Please does not exceed ${level} targetted tokens.`);
    
    for(let target of game.user.targets)
    {
      let save_roll = new Roll(`1d20 + ${target.actor.data.data.abilities.con.save}`).roll();

      save_roll.toMessage({
        speaker : ChatMessage.getSpeaker({token : target}),
        rollMode : "blindroll"
      });

      if(save_roll.total < item.data.data.save.dc)
      {
        new Dialog({
          content : ``,
          buttons : 
          {
            Blind : 
            {
              label : `Blind`,
              callback : async (html) => 
              {
                await macroA.execute(target.id,item.data.img);
                await macroB.execute(target.id, {"vision" : false});

                ChatMessage.create({
                  content : `${target.name} has become blinded.`,
                  speaker : ChatMessage.getSpeaker(),
                  blind : true,
                  whisper : ChatMessage.getWhisperRecipients("GM")
                });
              }
            },
            Deaf :
            {
              label : `Deaf`,
              callback : async (html) => 
              {
                //audio removal?? who knows.
                await macroA.execute(target.id,item.data.img);

                game.Gametime.doIn({minutes : 1}, async ()=>{
                  if(!target.data.effects.includes(item.data.img)) return;
                  await macroA.execute(target.id,item.data.img);
                });

                ChatMessage.create({
                  content : `${target.name} has become deafened.`,
                  speaker : ChatMessage.getSpeaker(),
                  blind : true,
                  whisper : ChatMessage.getWhisperRecipients("GM")
                });
              }
            }
          }
        }).render(true);
      }
    }
  });
})();
