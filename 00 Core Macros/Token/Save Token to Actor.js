if(!token || token.data.actorLink || token.data.actorData == {}) return;

const actorData = token.document.toObject().actorData;

const newActor = await Actor.create({
  ...game.actors.get(token.data.actorId).toObject(),
  ...actorData,
  "name" : `${token.actor.name} - NEW`,
  "token.actorLink" : true,
});

ChatMessage.create({
  content : `Token Convered to Actor <br> ${newActor.link}`
});


