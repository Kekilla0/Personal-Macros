async function removeEffect({ actor, effectLabel }){
  if(!actor || !effectLabel) return;
  let effect = actor.effects.find(e => e.data.label === effectLabel);
  if(!effect) return;

  await actor.deleteEmbeddedEntity("ActiveEffect", [effect.id]);
}

async function addEffect({ actor, effectData }){
  if(!actor || !effectData) return;
  await actor.createEmbeddedEntity("ActiveEffect", effectData );
}