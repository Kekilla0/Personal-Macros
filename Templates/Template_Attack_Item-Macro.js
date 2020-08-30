(async () => {
  if(game.user.target.size !== 1) return ui.notificiations.error(`Target 1 Token`);
  let target_actor = Array.from(game.user.targets)[0].actor;

  let attack_roll = await item.rollAttack();
  if(attack_roll.total >= target_actor.data.data.attributes.ac.value)
  {
    let damage_roll = item.rollDamage();
  }
})();
