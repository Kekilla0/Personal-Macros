/*
  World Scripter : Proficiency Dice
*/
const config = {
  active : true,
  bonusDie : {
    1 : `1d2`,
    2 : `1d4`,
    3 : `1d6`,
    4 : `1d8`,
    5 : `1d10`,
    6 : `1d12`
  },
  fn : {
    error : (...args) => {ui.notifications.error(`Proficiency Die Macro | `, ...args);}
  }
}
if(config.active)
  Hooks.on(`preCreateChatMessage`, proficientMessage)

function proficientMessage(message)
{
  console.log(message);
  let updateObj = message.data;
  if(message.isAuthor){    
    //determine if proficient
    let [ profObj, actor ] = proficient(updateObj);
    if(profObj.prof === null || profObj.prof === 0) return;
    let newProf = (profObj.prof/actor.data.data.attributes.prof === 2)
        ? `${config.bonusDie[actor.data.data.attributes.prof]} + ${config.bonusDie[actor.data.data.attributes.prof]}`
        : (config.bonusDie[profObj.prof] || null);
    if(newProf === null) return;

    //remake roll without proficiency & with new bonus_die
    let roll = new Roll(
        JSON.parse(updateObj.roll).formula
            .replace(`+ ${profObj.search}`, `${profObj.keep ? `+ ${profObj.keep}` : ``} + ${newProf}`))
            .evaluate({ async : false });
    

    //change content & roll
    if(game.data.version.split('.')[1] <= 7){
        setProperty(updateObj,"content", `${roll.total}`);
        setProperty(updateObj,"roll", JSON.stringify(roll));        
    }else{
        updateObj.update({
            "content" : roll.total,
            "roll" : JSON.stringify(roll)
        });     
    }
  }
}

function proficient(updateObj){
  let info = updateObj.flags.dnd5e.roll;
  let actor = canvas.tokens.get(updateObj.speaker.token).actor || game.actors.get(updateObj.speaker.actor);
  let prof = actor.data.data.attributes.prof;
  let data = [];

  if(!actor) return 0;

  switch(info.type)
  {
    case `ability` :
      data.push({
        search : null, 
        prof : null, 
        keep : null,
      });
      break;
    case `save` : 
      let saveData = actor.data.data.abilities[info.abilityId];
      data.push({
        search : saveData.prof, 
        prof : (saveData.save - saveData.mod), 
        keep : null,
      });
      break;
    case `skill` :
      let skillData = actor.data.data.skills[info.skillId];
      data.push({
        search : skillData.total, 
        prof : skillData.prof, 
        keep : skillData.mod,
      });
      break;
    case `attack` :
      let {proficient} = actor.items.get(info.itemId).data.data;
      data.push({
        search : actor.data.data.attributes.prof, 
        prof : proficient ? prof : 0, 
        keep : null
      });
      break;
    default :
      config.fn.error(`Type not accounted for ${info.type}`);
      data.push({ prof : 0 });
      break;
  }
  
  data.push(actor);
  return data;
}