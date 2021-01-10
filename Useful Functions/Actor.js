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