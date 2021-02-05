/*
  Create A Blank Character for a User (and attach it to their account)
*/
function createCharacter({ user })
{
  let data = {
    name : `${user.name} - Character`,
    type : `character`,
    permission : { }
  };

  data.permission[user.id] = 3;

  let actor = await Actor.create(data);
  await user.update({ character : actor.id });
}

/*
  Create Linked Actor From Token
*/
async function linkToken({ token })
{
  if(!token || token.data.actorLink || token.data.actorData === {}) return;

  let {actorData} = duplicate(token.data);
  let baseActor = game.actors.get(token.data.actorId), newActor = await Actor.create(baseActor.data);

  await newActor.update({
    "name" : newActor.data.name + "--NEW",
    "token.actorLink" : true,
    ...actorData
  });
}

/*
  Apply Damage (w/ resistances, immunities, & vulnerabilities)
*/
async function applyDamage({ actor , type, value } = {})
{
  if(!actor || !type || !value) return;
  let {di,dr,dv} = actor.data.data.traits;

  let multiplier = 
    arrInclude(di,type) ? null :
    arrInclude(dr,type) ? 0.5 :
    arrInclude(dv,type) ? 2 : 1;

  return multiplier !== null ? await actor.applyDamage(value, multiplier) : actor;

  function arrInclude(obj, val)
  {
    return [...obj.value, ...obj.custom.split(`;`)].includes(val);
  }
}

/*
  Edit/Consume Resource
*/
async function editResource({ actor, name = ``, value = 1 })
{
  if(!actor) return new Error(`Actor Undefined`);
  let { resources } = actor.data.data;
  
  let [key, object] = Object.entries(resources).find(([key, object])=> key === name || object.label === name);
  if(!key || !object) return new Error(`Resource Undefined`);
  if(!object.value || !object.max)
  {
    object.value = object.max = value;
  }else{
    object.value = Math.clamped(object.value + value, 0, object.max);
  }

  resources[key] = object;
  return await actor.update({ "data.resources" : resources });
}

/*
  Actor - 5e - editHitDie
  accepts an actor instance, value to change the actors hitDie, and event to control value, and a name of a class
  value => negative numbers results in a creation of hit die, where as possitive numbers cause a use of Hit die via "rollHitDice"
  event => shift depressed will create 1 hit die, not depressed will use 1 hit die.

  should return the editted actor
*/
async function editHitDie({actor, value, event, name} = {})
{
  if(!!event) 
    value = event.shiftKey ? -1 : 1;
  if(!value || !actor) return error(`No Value or Actor`);

  let class_items = actor.items
    .filter(item=> item.type === `class`&& item.data.data.hitDiceUsed !== item.data.data.levels);

  if(!class_items) return error(`No Class Items Available`);

  let item = !name ? class_items[0] : class_items.find(i=> i.name === name);

  if(!item) return error(`No Class Item ${!name ? `` : name}`);
  let {hitDice, hitDiceUsed, levels} = item.data.data;

  if(value > 0 && hitDiceUsed !== levels)
    for(let i = 0; i < value; i++)
      await actor.rollHitDie(hitDice, {dialog : false});
  else if(hitDiceUsed < 0)
    await actor.updateOwnedItem({_id : item.id, "data.hitDiceUsed" : Math.clamped(hitDiceUsed - value, 0, levels)});
}

/*
  Toggle Item Equipped Status
*/
async function toggleEquip({ actor, item })
{
  if(!actor || !item) return;

  item = actor.items.getName(item) || actor.items.get(item);

  if(!item) return;

  return await item.update({"data.equipped" : !item.data.data.equipped});
}
