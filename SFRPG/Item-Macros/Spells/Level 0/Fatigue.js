(()=>{
  let target = Array.from(game.user.targets)[0];
  if(!target) return ui.notifications.error(`Target 1 enemy.`);

  Hooks.once(`createChatMessage`, (data)=> {
    let roll_data = data._roll;

    if(roll_data.total >= target.actor.data.data.attributes.eac.value)
    {
      //Fort Save
      let { fort } = target.actor.data.data.attributes;

      let roll = new Roll(`1d20 + ${fort.bonus}`).roll().toMessage({
        flavor : `${target.name}'s fatigue fort save! DC : ${item.data.data.save.dc}`, whisper : ChatMessage.getWhisperRecipients("GM"), blind : true
      }).total;

      if(roll < item.data.data.save.dc)
      {
        //set token icon
        //use about time to remove it after 6 seconds * item.actor.data.data.details.level.value
      }
    }
  });

  item.rollAttack({event});
})();