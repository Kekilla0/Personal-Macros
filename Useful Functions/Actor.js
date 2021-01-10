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
async function applyDamage({ actor , damage } = {})
{
  if(!actor || !damage) return;
  let {di,dr,dv} = actor.data.data.traits;

  if(arrInclude(di,damage.type))
  {
    return actor;
  }
  if(arrInclude(dr,damage.type))
  {
    return await actor.applyDamage(damage.value, 0.5)
  }
  if(arrInclude(dv, damage.type))
  {
    return await actor.applyDamage(damage.value, 2);
  }
  return await actor.applyDamage(damage.value);

  function arrInclude(obj, val)
  {
    return [...obj.value, ...obj.custom.split(`;`)].includes(val);
  }
}