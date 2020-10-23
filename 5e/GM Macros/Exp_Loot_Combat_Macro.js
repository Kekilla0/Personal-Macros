const default_actor_ids = game.users
  .filter(user => user.character)
  .map(user => user.character.id);

const actors = (canvas.tokens.controlled.length !== 0) ? canvas.tokens.controlled.map(token=> token.actor) 
  : (game.user.targets.size !== 0) ? Array.from(game.user.targets).map(target=> target.actor) 
  : game.actors.filter(actor => default_actor_ids.includes(actor.id));

const defeated = canvas.tokens.placeables.filter(token=> 
  token.data.disposition === -1 && 
  token.data.overlayEffect === `icons/svg/skull.svg`
);

(async ()=>{
  //check for # of defeated => if 0 && args[0] === `??` => dialog
  if(!defeated || !actors ) return;

  let experience_gain = defeated.reduce((acc, value) =>{ return (acc + value.actor.data.data.details.xp.value) } , 0);

  let difference_experience = divideValue(experience_gain, actors.length);

  for(let actor of actors)
  {
    await actor.update({
      "data.details.xp.value" : actor.data.data.details.xp.value + difference_experience
    });
  }

  ChatMessage.create({
    content : `${actors.map(actor=> actor.name).join(`/`)} has gained ${difference_experience} experience.`
  });

  for(let defeat of defeated)
  { await create_loot_actor(defeat); }
})();

function divideValue(Obj, Value)
{
  if(Value === 1) return Obj;

  let Remainder = 0;
  let Update = Obj;

  Remainder = Update%Value;
  Update = Math.floor(Update/Value);

  console.log(`EXP_LOOT | There was ${Remainder} left over.`);

  return Update;
}

async function create_loot_actor(token)
{
  //delete items that have value of 0 or null
  await token.actor.deleteOwnedItem(
    token.actor.items
      .filter(item=> !item.data.data?.price  || item.data.data.price === 0)
      .map(item => item.id)
  );
  //change loot sheet
  await token.actor.update({
    "flags.core.sheetClass" : "dnd5e.LootSheet5eNPC",
    /*[`permission.default`] : ENTITY_PERMISSIONS.OBSERVER*/
  });
  //change overlay, change permissions, change loot sheet
  await token.update({
    /*"actorData.permission.default" : 2,*/
    overlayEffect : `icons/svg/chest.svg`
  });
  await token.toggleCombat();
}