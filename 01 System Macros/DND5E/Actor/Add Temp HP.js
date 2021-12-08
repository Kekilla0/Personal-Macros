async function addTempHP({ actor, value = 1, override = false} = {}){
  if(!actor) return console.error(`Actor Error`);
  
  const hp = actor.toObject().data.attributes.hp;
  
  if(override)
    return await actor.update({ "data.attributes.hp.temp" : Number(hp.temp) + value });
  if(Number(hp.temp) < value)
    return await actor.update({ "data.attributes.hp.temp" : value });
  
  return actor;
}