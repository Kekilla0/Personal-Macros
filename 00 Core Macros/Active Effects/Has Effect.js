function hasEffect({ actor, effect = ``} = {}){
  if(!actor) return console.error(`Actor Error`);
  return Boolean(actor.effects.find(effect => effect.data.label.toLowerCase() === effect.toLowerCase()));
}