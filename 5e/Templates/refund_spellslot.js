function refund_spellSlot(actor, level)
{
  let actor_data = duplicate(actor.data);
  let spells = actor_data.data.spells[`spell${level}`];
  let value = spells.value < spells.max ? (spells.value + 1) : spells.max;

  actor_data.data.spells[`spell${level}`].value = value;

  actor.update(actor_data);

  //could return actor data;
}