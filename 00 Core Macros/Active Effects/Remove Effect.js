async function removeEffect({ actor, effectLabel }){
  if(!actor || !effectLabel) return;
  let effect = actor.effects.find(e => e.data.label === effectLabel);
  if(!effect) return;

  return await effect.delete();
}