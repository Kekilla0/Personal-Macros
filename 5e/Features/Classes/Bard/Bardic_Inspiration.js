let icon_macro = game.macros.getName("Toggle_Token_Icon");
let update_actor_macro = game.macros.getName("Update_Actor_Macro");

if(game.user.targets.size !== 1) return ui.notificiations.error(`Please select 1 target.`);
let target = game.user.targets.values().next().value;

item.roll()
  .then(result => {
    icon_macro.execute(target.id,item.data.img, 10);
  })
  .then(result => {
    update_actor_macro.execute(target.id, {"data.attributes.inspiration" : true});
  });