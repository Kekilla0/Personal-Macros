async function refundSpellSlot(actor, level){
  const data = actor.toObject();
  const spells = data.data.spells[`spell${level}`];

  console.log({actor, level, data, spells});

  if(spells)
    return await actor.update({
      [`data.spells.spell${level}.value`] : Math.clamped(spells?.value + 1, 0, spells.max),
    });
  return actor;
}