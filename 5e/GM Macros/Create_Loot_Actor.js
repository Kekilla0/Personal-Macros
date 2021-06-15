/*
  Flow :
    assume selection first
    change token picture?
    change default permission
    remove useless items
    change sheet    
*/
if(canvas.tokens.controlled === 0) return;

const icon = "icons/svg/chest.svg";

for(let token of canvas.tokens.controlled){
  await token._toggleOverlayEffect(icon, { active : true });
  await sheetChange({ actor : token.actor });
  await permissionChange({ document : token.actor, users : `default`, value : CONST.ENTITY_PERMISSIONS.OWNER });
  await removeInvaluables({ actor : token.actor });
}

/*
  dnd5e Loot Sheet
*/
async function sheetChange({ actor }={}){
  let {currency} = actor.data.data;
  for(let [key, value] of Object.entries(currency)){
    currency[key] = { value };
  }
  await actor.update({
    "data.currency" : currency,
    "flags.core.sheetClass" : `dnd5e.LootSheet5eNPC`,
    "flags.lootsheetnpc5e.lootsheettype" : "Loot",
  });
}

/*
  entity permission changer
*/
async function permissionChange({ document, value , users }={}){
  users = users instanceof Array ? users : [users];
  let permission = document.data.permission instanceof Object ? duplicate(document.data.permission) : {};

  users.forEach(id=> {
    if(game.users.get(id) !== null || id === `default`){
      permission[id] = value;
    }
  });

  return await document.update({ permission });
}

/*
  Remove Invaluables
*/
async function removeInvaluables({ actor } = {}){
  const remove = ["spell", "feat"];
  let items = actor.items.filter(item => remove.includes(item.data.type) || !item.data.data?.price || item.data.data?.price === 0);
  return actor.deleteEmbeddedDocuments("Item", items.map(item => item.id));
}