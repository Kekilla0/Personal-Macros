async function createCharacter({ user }){
  if(!user) return;

  if(user.constructor.name !== "User")
    user = game.users.get(user) ?? game.users.getName(user);

  const data = {
    name : `${user.name} - Character`,
    type : `character`,
    permission : { [user.id] : 3 },
  };

  return await user.update({ character : (await Actor.create(data))?.id });
}