/*
  To be used in a journal to roll a singular table.
*/
const macro_args = Array.from($(event.target).parent()).reduce((a,v)=>{
    return a.concat(v.outerText);
}, []);

let tables = macro_args.map(str => game.tables.find(t => str.includes(t.name)));

for(let table of tables)
    await table.draw({ rollMode : CONST.DICE_ROLL_MODES.PRIVATE });