(async () => {	
	let Weapon_Name = "Spiritual Weapon " + game.user.charname;
	let macroA = game.macros.getName("Create_Token_Macro");
	let macroB = game.macros.getName("Delete_Token_Macro");

	if(canvas.tokens.placeables.find(t=>t.name===Weapon_Name) !== undefined)
	{
		item.rollAttack().then((result)=>{
			if(!result) return;

			let roll_level = canvas.tokens.placeables.find(t=>t.name===Weapon_Name).data.flags.world.lvl;

			item.rollDamage({spellLevel : roll_level});
		});
	} else {
		if(game.user.targets.size !== 1) return ui.notifications.error(`Please target 1 token.`);

		let target = game.user.targets.values().next().value;
		let New_x = target.x - canvas.dimensions.size;
		let New_y = target.y - canvas.dimensions.size;

		item.actor.useSpell(item).then(async (result)=> {
			if(!result) return;
			let content = result.data.content;
			let level = parseInt(content.charAt(content.indexOf("data-spell-level")+18));

			await macroA.execute("Spiritual Weapon", 
			{
				x : New_x,
				y : New_y,
				name : Weapon_Name,
				"flags.world.lvl" : level
			},
			game.user.id);

			game.Gametime.doIn({minutes:1}, async () => {
				await macroB.execute(Weapon_Name);
			});
		});
	}
})();