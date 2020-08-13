item.roll().then(()=>{
  let horn_attack = item.actor.items.find(i=>i.name==="Unarmed Strike");
  horn_attack.rollAttack().then(result => {
    if(!result) return;
    horn_attack.rollDamage();
  });
});