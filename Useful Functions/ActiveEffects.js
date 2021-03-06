async function removeEffect({ actor, effectLabel }){
  if(!actor || !effectLabel) return;
  let effect = actor.effects.find(e => e.data.label === effectLabel);
  if(!effect) return;

  await actor.deleteEmbeddedDocuments("ActiveEffect", [effect.id]);
}

async function addEffect({ actor, effectData }){
  if(!actor || !effectData) return;
  await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
} 

async function toggleEffect({ actor, effectLabel }){
  if(!actor || !effectLabel) return;
  let effect = actor.effects.find(e => e.data.label === effectLabel);
  if(!effect) return;
  return await effect.update({ disabled : !effect.data.disabled});
}