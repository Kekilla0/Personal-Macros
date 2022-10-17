/* 
  Mass Rolls 

  Used during combat to produce mass rolls for selected combatants.
*/

//on combat creation, open dialog
Hooks.call(`combatStart`, (combat, options) => {
  combat.dialog = createDialog(combat);
  combat.dialog.data = updateDialog(combat);

  combat.dialog.render(true);
});

//on combat update, update dialog data
Hooks.call(`updateCombat`, (combat, options, state, id)=> {
  combat.dialog.data = updateDialog(combat);

  combat.dialog.render(true);
});

//on combat deletion, close dialog

function createDialog(combat){
  if(combat == null || combat == undefined) return;

  return new Dialog({
    title : combat.id,
    content : updateDialog(combat),
    buttons : {
      roll :{
        label : "Roll", callback : (html) => execute_roll_from_form(html, combat),
      }
    }
  });
}

function updateDialog(combat){
  return ``;
}

function execute_roll_from_form(html, combat){

}