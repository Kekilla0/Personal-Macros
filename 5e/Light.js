if(game.user.targets.size !== 1) return ui.notifications.error(`Please Target a Token.`);

let target = game.user.targets.values().next().value;
let macro = game.macros.getName("Update_Token_Macro");

item.roll().then(result => {
	macro.execute(target.id,{dimLight : 40, brightLight : 20});

	game.Gametime.doIn({minutes:60}, () => {
		macro.execute(target.id,{dimLight : 0, brightLight : 0});
	});
});