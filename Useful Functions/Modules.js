/*
  Any Module
*/
function moduleStatus(name)
{
  return !!game.modules.get(name)?.active;
}

/*
  Combat Utility Belt
*/
async function toggleCondition(condition, entity, {warn = true} = {})
{
  if(!condition || !entity || !moduleStatus("combat-utility-belt")) return;

  game.cub.hasCondition(condition, entity, {warn})
    ? await game.cub.removeCondition(condition, entity, {warn})
    : await game.cub.addCondition(condition, entity, {warn});

  return game.cub.hasCondition(condition, entity, {warn});
}

function getConditions(entity)
{
  let { conditions } = game.cub.getConditions(entity);
  conditions = conditions instanceof Array ? conditions : [conditions];

  return conditions.map(({name})=> name);
}

/*
  dnd5e Loot Sheet
*/
async function sheetChange({ actor }={})
{
  let {currency} = actor.data.data;
  for(let [key, value] of Object.entries(currency))
  {
    currency[key] = { value };
  }
  await actor.update({
    "data.currency" : currency,
    "flags.core.sheetClass" : `dnd5e.LootSheet5eNPC`,
    "flags.lootsheetnpc5e.lootsheettype" : "Loot",
  });
}