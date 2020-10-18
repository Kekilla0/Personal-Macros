(()=>{
  let target = Array.from(game.user.targets)[0];
  if(!target) return ui.notificiations.error(`Please target 1 enemy.`);

  Hooks.once(`preCreateChatMessage`, (data)=> {
    //CR Check
    let { cr, level } = target.actor.data.data.details;
    let value = (!cr) ? level.value : parseInt(cr);

    if(value >= 4) {
      data.content += `<div class = "sfrpg chat-card item-card"><h2>Daze Fails!</h2></div>`
    }else{
      //Will Save
      let { will } = target.actor.data.data.attributes;
      let roll = new Roll(`1d20 + ${will.bonus}`).roll().toMessage({flavor : `${target.name}'s daze will save!`, whisper : ChatMessage.getWhisperRecipients("GM"), blind : true}).total;
      if(roll >= item.data.data.save.dc)
      {
        data.content += `<div class = "sfrpg chat-card item-card"><h2>Daze Fails!</h2></div>`
      }else{
        data.content += `<div class = "sfrpg chat-card item-card"><h2>Daze Succeeds!</h2></div>`
        //set token icon
        //use about time to remove it after 6 seconds
      }
    }
  });

  item.roll({event});
})();