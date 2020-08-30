(async () => {
  let target_actor = Array.from(game.user.targets)[0].actor;

  if(!target_actor) return ui.notificiations.error(`Target 1 Token`);

  let attack_roll = await item.rollAttack();
  if(attack_roll.total >= target_actor.data.data.attributes.ac.value)
  {
    let damage_roll = item.rollDamage();
  }
})();