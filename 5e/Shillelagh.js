//check for all error message needs
if(!game.modules.get("about-time").active) return ui.notifications.error(`About Time isn't Loaded`);
//instantiate variables (macro, quarterstaff)
const macro = game.macros.entities.find(m=>m.name==="Call");
const quarterstaff = game.user.character.data.items.find(i=>i.name==="Quarterstaff");
const copy_quarterstaff = duplicate(quarterstaff);
//cast spell
game.dnd5e.rollItemMacro("Shillelagh").then(()=> {
	//call macro, set condition + time
	macro.execute(game.user.character.name,"Shillelagh",1,"");
	//get old information
	let qOld_ability = quarterstaff.data.ability;
	let qOld_damage = quarterstaff.data.damage.parts[0][0];
	//update weapon
	copy_quarterstaff.data.ability= "wis";
	copy_quarterstaff.data.damage.parts[0][0] = "1d8+@mod";
	game.user.character.updateEmbeddedEntity("OwnedItem",copy_quarterstaff);
	//revert weapon
	game.Gametime.doIn({minutes:1},() => {
		copy_quarterstaff.data.ability = qOld_ability;
		copy_quarterstaff.data.damage.parts[0][0] = qOld_damage;
		game.user.character.updateEmbeddedEntity("OwnedItem",copy_quarterstaff);
	});
});

const longsword = game.user.character.data.items.find(i=>i.name === "Rascal");
const copy_longsword = duplicate(longsword);
copy_longsword.data.data.range = 10;
copy_longsword.data.data.damage[0][1] = "poison";
game.user.character.updateEmbeddedEntity("OwnedItem",copy_longsword);
game.dnd5e.rollItemMacro("Rascal").then(() => {
	copy_longsword.data.data.range =5;
	copy_longsword.data.data.damage[0][1] = "slashing";
	game.user.character.updateEmbeddedEntity("OwnedItem", copy_longsword);
});
