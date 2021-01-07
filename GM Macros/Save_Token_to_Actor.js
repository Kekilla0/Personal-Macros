(async ()=>{
  if(!token || token.data.actorLink || token.data.actorData === {}) return;

  let {actorData} = duplicate(token.data);

  let baseActor = game.actors.get(token.data.actorId);
  let newActor = await Actor.create(baseActor.data);

  await newActor.update({
    "name" : newActor.data.name + "--NEW",
    "token.actorLink" : true,
    ...actorData
  });
})();