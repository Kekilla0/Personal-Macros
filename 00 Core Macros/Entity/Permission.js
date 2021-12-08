/*
  Permission Changer : will update entity with new permissions for users or default
  entity : entity object w/ permissions data
  value : value of permission wanted
  users : array of users or `default` for all.
  reterns updated Entity
*/
async function permission({ entity, value , users }={}){
  if(!(entity?.update instanceof Function)|| !(entity?.data?.permission instanceof Object)) return console.error("Entity Error");

  users = users instanceof Array ? users : [users];
  let permission = entity.toObject().permission;

  users.forEach(id=> {
    if(game.users.get(id) !== null || id === `default`)
      permission[id] = value;
  });

  return await entity.update({ permission });
}