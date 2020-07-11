let gender = [
	"Male",
	"Female"
];

let race = [
	"Aarakocra",
	"Aasimar",
	"Bugbear",
	"Centaur",
	"Changling",
	"Dragonborn",
	"Dwarf",
	"Elf",
	"Firbolg",
	"Genasi", 
	"Gith",
	"Goliath",
	"Half-elf",
	"Half-orc",
	"Hobgoblin",
	"Human",
	"Kalashtar",
	"Kenku",
	"Leonin",
	"Lizardfolk",
	"Loxodon",
	"Minotaur",
	"Orc",
	"Satyr",
	"Shifter",
	"Simic Hybrid",
	"Tabaxi",
	"Tiefling",
	"Triton",
	"Vedalken",
	"Warforged",
	"Yuan-ti Pureblood",
	"Gnome",
	"Goblin", 
	"Halfling",
	"Kobold",
	"Verdan"
];

let back = [
	"Acolyte",
	"Anthropologist",
	"Archaeologist",
	"Athlete",
	"Charlatan",
	"City Watch",
	"Clan Crafter",
	"Cloistered Scholar",
	"Courtier",
	"Criminal",
	"Entertainer",
	"Faceless",
	"Faction Agent",
	"Failed Merchant",
	"Far Traveler",
	"Fisher",
	"Folk Hero",
	"Gambler",
	"Grinner",
	"Haunted One",
	"Hermit",
	"House Agent",
	"Inheritor",
	"Knight of the Order",
	"Marine",
	"Mercenary Veteran",
	"Noble",
	"Outlander",
	"Plaintiff",
	"Sage",
	"Sailor",
	"Shipwright",
	"Smuggler",
	"Solider",
	"Urban Bounty Hunter",
	"Urchin"
];

let cla = [
	"Artificer",
	"Barbarian",
	"Bard",
	"Cleric",
	"Druid",
	"Fighter",
	"Monk",
	"Mystic",
	"Paladin",
	"Ranger",
	"Rogue",
	"Sorcerer",
	"Warlock",
	"Wizard"
];



let output = ``;

let gender_roll = new Roll(`1d${gender.length}`).roll().total;
let race_roll = new Roll(`1d${race.length}`).roll().total;
let back_roll = new Roll(`1d${back.length}`).roll().total;
let cla_roll = new Roll(`1d${cla.length}`).roll().total;

output = gender[gender_roll-1] + ` ` + race[race_roll-1] + ` ` + back[back_roll-1] + ` ` + cla[cla_roll-1];
console.log(output);

ChatMessage.create({
	user : game.user._id,
	content : output,
	speaker : speaker,
	whisper : game.users.entities.filter(u=>u.isGM).map(u=>u._id)
});
