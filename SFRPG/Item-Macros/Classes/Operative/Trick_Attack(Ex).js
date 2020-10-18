const check_types = [["blu","Bluff"], ["int","Intimidate"], ["ste","Stealth"]];
const specialization = item.actor.items.filter(item => ["Daredevil","Detective","Explorer","Ghost","Hacker","Spy","Theif"].includes(item.name)).map(item=> 
  {
    switch(item.name)
    {
      case "Daredevil" : check_types.push(["acr","Acrobatics"]); break;
      case "Detective" : check_types.push(["sen","Sense Motive"]); break;
      case "Explorer" : check_types.push(["sur","Survival"]); break;
      case "Ghost" : break;
      case "Hacker" : check_types.push(["com","Computers"]); break;
      case "Spy" : break;
      case "Thief" : check_types.push(["sle","Sleight of Hand"]); break;
    }
    return item.name;
  })[0];
let DC = 20, addDamage = false;


(async ()=>{
  let target = Array.from(game.user.targets)[0];
  if(!target) return ui.notifications.error(`Target at least 1 creature`);

  //choose weapon, choose check type, roll check, add damage dice if pass to attack

  let skill = await choose(check_types, `What skill would you like to (or are able to) use : `);

  //add check for ammunition && equipped status
  let weapon = item.actor.items.get(
    await choose(
      item.actor.items
        .filter(item=> (item.data.data?.properties?.operative && item.data.data?.weaponType === `basicM`) || item.data.data?.weaponType === `smallA`)
        .map(item => [item.id, item.name])
    ,`What weapon would you like to use : `)
  );

  let check = await item.actor.rollSkill(skill, {event});
  DC += target.actor.data.data.details?.cr ? target.actor.data.data.details.cr : target.actor.data.data.details.level.value;

  //check for specialization choice --- if so add +4 to "check"

  Hooks.once(`preCreateChatMessage`, (data) => {
    let rollData = JSON.parse(data.roll);
    if(rollData.total >= DC)
    {
      addDamage = true;
    }

    const kac_damage_types = [`bludgeoning`, `piercing`, `slashing`];
    const cover_types = [[0, `No Cover`],[2, `Partial Cover`], [4, `Normal Cover`], [4, `Soft Cover`], [8, `Improved Cover`], [200, `Total Cover`]];
    const conceal_types = [[0, `No Concealment`], [20, `Normal Concealment`], [50, `Total Concealment`]];
    
    
    let { eac, kac, fort, reflex, will } = target.actor.data.data.attributes;
    let { damage, save, equipped, capacity} = weapon.data.data;
    let original_damage = duplicate(damage);

    if(addDamage) 
    {
      damage.parts.push(["1d4",damage.parts[0][1]]);
    }
  
    if(!equipped) return ui.notifications.error(`Cannot attack with an unequipped weapon.`);
    if(capacity.max > 0 && capacity.value === 0) return ui.notifications.error(`Weapon has no ammunition, reload!`);
  
    weapon.rollAttack({event});
    Hooks.once(`preCreateChatMessage`, async (data, options, userID) => {
      if(userID !== game.userID && !data.flavor.includes(weapon.name)) return;
  
      let rollData = JSON.parse(data.roll);
      if(rollData.total < kac.value && rollData.total < eac.value) return; 
      let cover = await choose(cover_types, `Does the enemy have cover?`);
      let concealment = await choose (conceal_types, `Is the enemy under any concealment?`);
      let concealment_roll = new Roll(`1d100`).roll().total;
  
      let kac_type = false;  
      damage.parts.forEach(part => { if(kac_damage_types.includes(part[1])) kac_type= true; });
  
      if(weapon.actor.items.find(i=>i.name.includes(`Sniper's Aim`)) && weapon.data.data.range.value > 5)
      {
        cover = Math.clamped((parseInt(cover)-2), 0, 200);
      }
  
      ChatMessage.create({
        content : `To Hit : ${rollData.total} <br> Damage Type : ${damage.parts.map(i=> i[1]).join()} <br> KAC : ${kac.value} <br> EAC : ${eac.value} <br> Cover : ${cover} <br> Concealment : ${concealment} <br> Concealment Roll : ${concealment_roll}`,
        speaker : ChatMessage.getSpeaker(),
        whisper : ChatMessage.getWhisperRecipients("GM"),
        blind : true
      });
      
      if(kac_type)
      {
        if(rollData.total >= (kac.value + parseInt(cover)) && ( concealment_roll >= parseInt(concealment)))
        {
          weapon.rollDamage({event});
        }
      }else{
        if(rollData.total >= (eac.value + parseInt(cover)) && ( concealment_roll >= parseInt(concealment)))
        {
          weapon.rollDamage({event});
        }
      }
      damage.parts = original_damage.parts;
    });

  })
})();

async function choose(options = [], prompt = ``)
{
  let value = await new Promise((resolve) => {

    let dialog_options = (options[0] instanceof Array)
      ? options.map(o => `<option value="${o[0]}">${o[1]}</option>`).join(``)
      : options.map(o => `<option value="${o}">${o}</option>`).join(``);
  
    let content = `
    <table style="width=100%">
      <tr><th>${prompt}</th></tr>
      <tr><td><select id="choice">${dialog_options}</select></td></tr>
    </table>`;
  
    new Dialog({
      content, 
      buttons : { OK : {label : `OK`, callback : async (html) => { resolve(html.find('#choice').val()); } } }
    }).render(true);
  });
  return value;
}