/*
  World Scripter : Proficiency Dice
*/
const error = (...args) => {ui.notifications.error(`Proficiency Die Macro | `, ...args); return new Error(`Proficiency Die ${args.join(` `)}`); }
const bonus_die = {
  2 : `1d4`,
  3 : `1d6`,
  4 : `1d8`,
  5 : `1d10`,
  6 : `1d12`
};

Hooks.on(`preCreateChatMessage`, (message)=>{
  if(message.user === game.user.id)
  {    
    //determine if proficient
    let profObj = proficient(message);
    if(profObj.prof === null || profObj.prof === 0) return;
    let newProf = bonus_die[profObj.prof] || null;
    if(newProf === null) return;

    //remake roll without proficiency & with new bonus_die
    let roll = new Roll(JSON.parse(message.roll).formula.replace(`+ ${profObj.search}`, `${profObj.keep ? `+ ${profObj.keep}` : ``} + ${newProf}`)).roll();

    //change content & roll
    setProperty(message,"content", `${roll.total}`);
    setProperty(message,"roll", JSON.stringify(roll));
  }
});

function proficient(message)
{
  let info = message.flags.dnd5e.roll;
  let actor = canvas.tokens.get(message.speaker.token).actor || game.actors.get(message.speaker.actor);

  if(!actor) return 0;

  switch(info.type)
  {
    case `ability` :
      return {
        search : null, 
        prof : null, 
        keep : null,
      };
    case `save` : 
      let saveData = actor.data.data.abilities[info.abilityId];
      return {
        search : saveData.prof, 
        prof : (saveData.save - saveData.mod), 
        keep : null,
      }
    case `skill` :
      let skillData = actor.data.data.skills[info.skillId];
      return {
        search : skillData.total, 
        prof : skillData.prof, 
        keep : skillData.mod,
      };
    case `attack` :
      let {proficient} = actor.items.get(info.itemId).data.data;
      return  {
        search : actor.data.data.attributes.prof, 
        prof : proficient ? actor.data.data.attributes.prof : 0, 
        keep : null
      }
    default :
      error(`Type not accounted for ${info.type}`);
      return 0;
  }
}