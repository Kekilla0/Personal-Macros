(()=>{
  if(game.user.targets.size !== 1) return ui.notifications.error(`Please target exactly 1 token.`);
  let target = game.user.targets.values().next().value;
  
  item.roll().then(result => {
    if(!result) return;

    //check target DC
    let save_roll = new Roll(`1d20 + ${target.actor.data.data.abilities.dex.save}`).roll();

    save_roll.toMessage({
      speaker : ChatMessage.getSpeaker({token : target}),
      rollMode : "blindroll"
    });

    if(save_roll.total < item.data.data.save.dc)
    {
      item.rollDamage().then(result => {
        //automate damage here
      });
    }
  });
})();