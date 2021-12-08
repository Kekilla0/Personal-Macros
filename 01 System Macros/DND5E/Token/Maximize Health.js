async function maximizeHealth(token){
  if(!(token instanceof Token) || !token.actor.data.data.attributes.hp?.formula) return console.error(`Token Data Error`);

  let hp = token.actor.toObject().data.attributes.hp;
  hp.value = hp.max = new Roll(hp.formula).evaluate({ async : false, maximize : true }).total;

  return (token.actor.data.data.attributes.hp.value === hp.max) ? token : await token.actor.update({ "data.attribute.hp" : hp });
}