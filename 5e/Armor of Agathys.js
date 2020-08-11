const macro = game.macros.entities.find(m => m.name === "Call");
game.dnd5e.rollItemMacro("Armor of Agathys").then (result => {
	if(result !== undefined)
	{
		let temp = game.user.character.data.data.spells.pact.level*5;
		game.user.character.update({"data.attributes.hp.temp" : temp});
		macro.execute(game.user.character.data.name,"Armor of Agathys",60,"");
	}
});