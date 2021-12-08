/* Does not work ATM */
async function createToken({ actor, user, location }){
  actor = actor instanceof Actor ? actor : (game.actors.get(actor) ?? game.actors.getName(actor));
  if(!(actor instanceof Actor)) return console.error(`Actor Error`, {actor});

  user = user instanceof User ? user : (game.users.get(user) ?? game.users.getName(user));
  if(!(user instanceof User)) return console.error(`User Error`, {user});

  let tokenData = {
    ...actor.toObject().token,
    actorData : {
      permission : { [user.id] : CONST.ENTITY_PERMISSIONS.OWNER, }
    },
    x : location?.x ?? 0,
    y : location?.y ?? 0,
  };
  return await canvas.scene.createEmbeddedDocuments("Token", [tokenData]);
}