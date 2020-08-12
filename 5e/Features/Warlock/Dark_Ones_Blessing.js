const macro = game.macros.entities.find(m => m.name === "Call");
game.dnd5e.rollItemMacro("Dark One's Blessing").then (result => {
	if(result !== undefined)
	{
		let temp = game.user.character.data.data.abilities.cha.mod + game.user.character.data.items.find(it=> it.name === "Warlock").data.levels;
		game.user.character.update({"data.attributes.hp.temp" : temp});
		macro.execute(game.user.character.data.name,"Dark Ones Blessing","","");
	}
});