/**
 * Roll Table from Journal
 * 
 * Allows for a embedded macro to have arguments passed via the text added in the {}
 */

if(!event) return;
const args = Array.from($(event.target).parent())[0].outerText.substring(1).split(".");
const rollMode = CONST.DICE_ROLL_MODES.PRIVATE;

for(let t of args){
  let table = game.tables.get(t) ?? game.tables.getName(t);

  if(table) await table.draw({ rollMode });
}