/*
  Permission Changer : will update entity with new permissions for users or default

  entity : entity object w/ permissions data
  value : value of permission wanted
  users : array of users or `default` for all.

  reterns updated Entity
*/
async function permission({ entity, value , users }={}){
  users = users instanceof Array ? users : [users];
  let permission = entity.data.permission instanceof Object ? duplicate(entity.data.permission) : {};

  users.forEach(id=> {
    if(game.users.get(id) !== null || id === `default`)
    {
      permission[id] = value;
    }
  });

  return await entity.update({ permission });
}

/*
  Get Flags
    accepts an entity and a scope
    returns all flags in that scope
*/
function getFlags(entity, scope){
  const scopes = SetupConfiguration.getPackageScopes();
  if(!scopes.includes(scope)) throw new Error(`Invalid scope`);
  return getProperty(entity.data.flags, scope);
}

/*
  delete duplicates
*/
async function deleteDuplicates({ entities }){
  let iterated = [];
  for(let entity of entities){
    if(iterated.includes(entity.name))
      await entity.delete();
    else
      iterated.push(entity.name);
  }
}