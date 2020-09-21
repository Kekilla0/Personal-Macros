(async ()=>{
  if(character !== null)
  {
    let bab = character.data.data.attributes.bab > character.data.data.skills.pil.ranks ? character.data.data.attributes.bab : character.data.data.skills.pil.ranks;
    let stat = character.data.data.abilities.dex.mod;
    item.data.data.data = { attackBonus : (bab + stat) };
  } else {
    if(item.data.data.attackBonus && !item.actor.isPC)
    {
      item.data.data.data = { attackBonus :  item.data.data.attackBonus };
    }else{
      item.data.data.data = { attackBonus : (0) };
    }    
  }
  await item.roll();

  let attack_result = await item.rollAttack({event});
  
  //let damage_result = await item.rollDamage({event});
})();