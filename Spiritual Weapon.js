(async () => {
	//Variable Calls
	let Weapon_Name = "Spiritual Weapon " + game.user.charname;
	//Check if Token is on the canvas
	if(canvas.tokens.placeables.find(t=>t.name===Weapon_Name) !== undefined)
	{
		//Logic (if target is on canvas - do attack only)
	} else {
		//Error Catching
		if(game.user.targets.size === 0 || game.user.targets.size > 1) return ui.notifications.error(`Please Target one token.`);
		if(game.modules.get("about-time").active !== true) return ui.notifications.error(`About Time isn't Loaded`);
		//Clear Templates PRIOR to roll Item Macro
		//canvas.templates.deleteMany(canvas.templates.placeables.map(o =>o.id),{});
		//Variable Calls
		let target = game.user.targets.values().next().value;
		let New_x = target.data.x - game.scenes.viewed.data.grid;
		let New_y = target.data.y - game.scenes.viewed.data.grid;
		let macro = game.macros.entities.find(i=>i.name==="Token_Control");
		//Execute Spell Call
		game.dnd5e.rollItemMacro("Spiritual Weapon").then(()=> {
			/*
				target.data.x/y
				game.scenes.viewed.value.data.grid
				canvas.templates.placeables[0].data.X/Y
			*/
			/*canvas.tokens.createMany(game.actors.find(i =>i.name === "Spiritual Weapon").data.token,{}).then (() => {
				canvas.tokens.placeables.find(i=>i.name==="Spiritual Weapon").update({
					x : New_x,
					y : New_y,
					name : "Spiritual Weapon Matias" //Weapon_Name
				},"");
			});*/
			macro.execute("Spiritual Weapon",{x : New_x, y : New_y, name : Weapon_Name},"create");
			//In Game Time 1 Minute : remove target from canvas
			game.Gametime.doIn({minutes : 1}, () => {
				//canvas.tokens.deleteMany(canvas.tokens.placeables.find(i=>i.name===Weapon_Name).data._id,{});
				macro.execute(Weapon_Name,"","delete");
			});
		});
	}

})();