/**
 * Edit Hit Die
 */

async function editHitDie({ actor, event, name, value = 1} = {}){
  if(!actor) return console.error(`No Actor`);
  if(!!event)
    value = event.shiftkey ? -1 : 1;
  if(!value) return console.error(`No Value`);

  let classes = actor.items.filter(item => item.type == `class` && item.data.data.hitDiceUsed !== item.data.data.levels);
  if(!classes) return console.error(`No classes on ${actor.name} with valid hit dice.`);

  let item = !name ? classes[0] : classes.find(item => item.name === name);
  if(!item) return console.error(`No Class by the name of ${name} on ${actor.name}`);

  let {hitDice, hitDiceUsed, levels} = item.toObject().data;
  if(value > 0 && hitDiceUsed !== levels)
    for(let i =0; i < value; i++)
      await actor.rollHitDie(hitDice, {dialog : false});
  else if(hitDiceUsed < 0)
    await item.update({"data.hitDiceUsed" : Math.clamped(hitDiceUsed - value, 0, levels)});

  return true;
}