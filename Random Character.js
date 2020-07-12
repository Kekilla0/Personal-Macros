/*
returns string
*/
function pick_gender()
{
	let gender = [
		"Male",
		"Female"
	];
	
	let gender_roll = new Roll(`1d${gender.length}`).roll().total;
	
	return gender[gender_roll-1];	
}

/*
returns class object
{
	mainClass : "",
	subClass : ""
}
*/
function pick_class()
{
	let data = {
		mainClass : "",
		subClass : ""
	};
	
	let cla = [
	"Artificer",
	"Barbarian",
	"Bard",
	"Cleric",
	"Druid",
	"Fighter",
	"Monk",
	"Paladin",
	"Ranger",
	"Rogue",
	"Sorcerer",
	"Warlock",
	"Wizard"
	];
	
	let cla_roll = new Roll(`1d${cla.length}`).roll().total;
	let cla_select = cla[cla_roll-1];
	
	let sub = [];
	
	switch(cla_select)
	{
		case "Artificer" :
			sub = [
				"Alchemist",
				"Armorer",
				"Artillerist",
				"BattleSmith"
			];
			break;
		case "Barbarian" :
			sub = [
				"Ancestral Guardian",
				"Battlerager",
				"Beast",
				"Berserker",
				"Storm Herald",
				"Totem Warrior",
				"Wild Soul", 
				"Zealot"
			];
			break;
		case "Bard" :
			sub = [
				"Creation",
				"Eloquence",
				"Glamour",
				"Lore",
				"Satire",
				"Swords",
				"Valor", 
				"Whispers"
			];
			break;
		case "Cleric" :
			sub = [
				"Arcana",
				"City",
				"Death",
				"Forge",
				"Grave",
				"Knowledge",
				"Life", 
				"Light",
				"Nature",
				"Order",
				"Protection",
				"Tempest",
				"Trickery",
				"Twilight",
				"Unity",
				"War"
			];
			break;
		case "Druid" :
			sub = [
				"Dreams",
				"Land",
				"Moon",
				"Shepard",
				"Spores",
				"Stars",
				"Twilight", 
				"Wildfire"
			];
			break;
		case "Fighter" :
			sub = [
				"Arcane Archer",
				"Battle Master",
				"Brute",
				"Cavalier",
				"Champion",
				"Echo Knight",
				"Eldritch Knight", 
				"Knight",
				"Monster Hunter",
				"Psi Knight",
				"Rune Knight",
				"Samurai",
				"Scout",
				"Sharpshooter",
			];
			break;
		case "Monk" :
			sub = [
				"Astral Self",
				"Drunken Master",
				"Four Elements",
				"Kensei",
				"Long Death",
				"Mercy",
				"Open Hand", 
				"Shadow",
				"Sun Soul",
				"Tranquility"
			];
			break;
		case "Paladin" :
			sub = [
				"Ancients",
				"Conquest",
				"Crown",
				"Devotion",
				"Glory",
				"Heroism",
				"Oathbreaker", 
				"Redemption",
				"Treachery",
				"Vengeance",
				"Watchers"
			];
			break;
		case "Ranger" :
			sub = [
				"Beast Master",
				"Deep Stalker",
				"Fey Wanderer",
				"Gloom Stalker",
				"Horizon Walker",
				"Hunter",
				"Monster Slayer", 
				"Primeval Guardian",
				"Swarmkeeper"
			];
			break;
		case "Rogue" :
			sub = [
				"Arcane Trickster",
				"Assassin",
				"Inquisitive",
				"Mastermind",
				"Phantom",
				"Scout",
				"Soulknife", 
				"Swashbuckler",
				"Thief"
			];
			break;
		case "Sorcerer" :
			sub = [
				"Clockwork Soul",
				"Divine Soul",
				"Draconic",
				"Giant Soul",
				"Phoenix",
				"Psionic Soul",
				"Sea", 
				"Shadow",
				"Stone",
				"Storm",
				"Wild"
			];
			break;
		case "Warlock" :
			sub = [
				"Archfey",
				"Celestial",
				"Fiend",
				"Genie",
				"Great Old One",
				"Hexblade",
				"Lurker in the Deep", 
				"Raven Queen",
				"Seeker",
				"Undying"
			];
			break;
		case "Wizard" :
			sub = [
				"Abjuration",
				"Bladesinging",
				"Chronurgy",
				"Conjuration",
				"Divination",
				"Enchantment",
				"Evocation", 
				"Graviturgy",
				"Illusion",
				"Invention",
				"Lore Master",
				"Necromancy",
				"Onomancy",
				"Psionics",
				"Scribes",
				"Theurgy",
				"Transmutation",
				"War"
			];
			break;
	}
	
	let sub_roll = new Roll(`1d${sub.length}`).roll().total;
	let sub_select = sub[sub_roll-1];
	
	data.mainClass = cla_select;
	data.subClass = sub_select;
	
	return data;
	
	//add a "reason why i am this" or personality trait specific to class
}

/*
return race object
{
	mainRace = "",
	subRace = ""
}
*/
function pick_race()
{
	let data = {
		mainRace : "",
		subRace : ""
	};
	
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
	
	let race_roll = new Roll(`1d${race.length}`).roll().total;
	
	let race_select = race[race_roll-1];
	
	let sub = [];
	
	switch(race_select)
	{
		case "Aasimar" :
			sub = [
				"Fallen",
				"Protector",
				"Scourge"
			];
			break;
		case "Dragonborn" :
			sub = [
				"Draconblood - Black",
				"Draconblood - Blue",
				"Draconblood - Brass",
				"Draconblood - Bronze",
				"Draconblood - Copper",
				"Draconblood - Gold",
				"Draconblood - Green",
				"Draconblood - Red",
				"Draconblood - Silver",
				"Draconblood - White",
				"Ravenite - Black",
				"Ravenite - Blue",
				"Ravenite - Brass",
				"Ravenite - Bronze",
				"Ravenite - Copper",
				"Ravenite - Gold",
				"Ravenite - Green",
				"Ravenite - Red",
				"Ravenite - Silver",
				"Ravenite - White"
			];
			break;
		case "Dwarf" :
			sub = [
				"Duergar",
				"Hill",
				"Mark of Warding",
				"Mountain"
			];
			break;
		case "Elf" :
			sub = [
				"Drow",
				"Eladrin",
				"High",
				"Mark of Shadow",
				"Pallid",
				"Sea",
				"Shadar-kai",
				"Wood"
			];
			break;
		case "Genasi" :
			sub = [
				"Air",
				"Earth",
				"Fire",
				"Water"
			];
			break;
		case "Gith" :
			sub = [
				"Githyanki",
				"Githzerai"
			];
			break;
		case "Half-elf" :
			sub = [
				"",
				"Aquatic Elf Descent",
				"Drow Descent",
				"Mark of Detection",
				"Mark of Storm",
				"Moon Elf Descent",
				"Sun Elf Descent",
				"Wood Elf Descent"
			];
			break;
		case "Half-orc":
			sub = [
				"",
				"Mark of Finding"
			];
			break;
		case "Human":
			sub = [
				"",
				"Keldon",
				"Mark of Finding",
				"Mark of Handling",
				"Mark of Making",
				"Mark of Passage",
				"Mark of Sentinel",
				"Variant"
			];
			break;
		case "Shifter":
			sub = [
				"Beasthide",
				"Longtooth",
				"Swiftstride",
				"Wildhunt"
			];
			break;
		case "Tiefling":	
			sub = [
				"",
				"Asmodeus",
				"Baalzebul",
				"Dispater",
				"Fierna",
				"Glasya",
				"Levistus",
				"Mammon",
				"Mephistopheles",
				"Variant",
				"Zariel"
			];
			break;
		case "Gnome":
			sub = [
				"Deep",
				"Forest",
				"Mark of Scribing",
				"Rock"
			];
			break;
		case "Halfling":
			sub = [
				"Ghostwise",
				"Lightfoot",
				"Lotusden",
				"Mark of Healing",
				"Mark of Hospitality",
				"Stout"
			];
			break;
		default :
			sub = [""];
			break;
	}
	
	let sub_roll = new Roll(`1d${sub.length}`).roll().total;
	let sub_select = sub[sub_roll-1];
	
	data.mainRace = race_select;
	data.subRace = sub_select;
	
	return data;	
}

/*
return background string
*/
function pick_back()
{
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
	
	let back_roll = new Roll(`1d${back.length}`).roll().total;
	return back[back_roll-1];
	
	//add sub background
	//add characteristics : personality trait, ideal, bond, flaw
}


/*
Returns Stat Line Object
 {
	str : 0,
	dex : 0,
	con : 0,
	ine : 0,
	wis : 0,
	cha : 0
};
*/
function organizeStats(cla = "")
{
	let stats = [
		new Roll(`4d6kh3`).roll().total,
		new Roll(`4d6kh3`).roll().total,
		new Roll(`4d6kh3`).roll().total,
		new Roll(`4d6kh3`).roll().total,
		new Roll(`4d6kh3`).roll().total,
		new Roll(`4d6kh3`).roll().total
	];
	
	console.log("organizeStats | 6 rolls | ",stats);
	
	let output = {
		str : 0,
		dex : 0,
		con : 0,
		ine : 0,
		wis : 0,
		cha : 0
	};
	
	let high = "";
	let mid = "";
	let low = "";
	let temp = 0;
	
	switch(cla)
	{
		case "Artificer" :
			high = "int";
			mid = "con";
			low = "cha";
			break;
		case "Barbarian" :
			high = "str";
			mid = "con";
			low = "int";
			break;
		case "Bard" :
			high = "cha";
			mid = "dex";
			low = "str";
			break;
		case "Cleric" :
			high = "wis";
			mid = "str";
			low = "cha";
			break;
		case "Druid" :
			high = "wis";
			mid = "con";
			low = "str";
			break;
		case "Fighter" :
			high = "str";
			mid = "dex";
			low = "int";
			break;
		case "Monk" :
			high = "dex";
			mid = "wis";
			low = "int";
			break;
		case "Paladin" :
			high = "str";
			mid = "cha";
			low = "dex";
			break;
		case "Ranger" :
			high = "dex";
			mid = "wis";
			low = "str";
			break;
		case "Rogue" :
			high = "dex";
			mid = "wis";
			low = "str";
			break;
		case "Sorcerer" :
			high = "cha";
			mid = "con";
			low = "str";
			break;
		case "Warlock" :
			high = "cha";
			mid = "con";
			low = "str";
			break;
		case "Wizard" :
			high = "int";
			mid = "con";
			low = "str";
			break;
	}
	
	temp = Math.max(...stats);
	remove_variable(stats,temp);
	console.log("organizeStats | 5 rolls | ",stats);
	
	switch(high)
	{
		case "str" :
			output.str = temp;
			break;
		case "dex" :
			output.dex = temp;
			break;
		case "con" :
			output.con = temp;
			break;
		case "int" :
			output.ine = temp;
			break;
		case "wis" :
			output.wis = temp;
			break;
		case "cha" :
			output.cha = temp;
			break;
	}
	
	temp = Math.max(...stats);
	remove_variable(stats,temp);
	console.log("organizeStats | 4 rolls | ",stats);
	
	switch(mid)
	{
		case "str" :
			output.str = temp;
			break;
		case "dex" :
			output.dex = temp;
			break;
		case "con" :
			output.con = temp;
			break;
		case "int" :
			output.ine = temp;
			break;
		case "wis" :
			output.wis = temp;
			break;
		case "cha" :
			output.cha = temp;
			break;
	}
	
	temp = Math.min(...stats);
	remove_variable(stats,temp);
	console.log("organizeStats | 3 rolls | ",stats);
	
	switch(low)
	{
		case "str" :
			output.str = temp;
			break;
		case "dex" :
			output.dex = temp;
			break;
		case "con" :
			output.con = temp;
			break;
		case "int" :
			output.ine = temp;
			break;
		case "wis" :
			output.wis = temp;
			break;
		case "cha" :
			output.cha = temp;
			break;
	}
	
	for(let obj in output)
	{
		console.log("In For Loop OBJ |",output[obj]);
		if(output[obj] == 0)
		{
			let temp_roll = new Roll(`1d${stats.length}`).roll().total;
			output[obj] = stats[temp_roll-1];
			remove_variable(stats,obj);
			console.log("organizeStats | Loop |",stats);
		}
	}

	return output;
}

/*
Returns an array void of the argument value.
*/
function remove_variable(arr = [], value = 0)
{
	for(let i = 0; i < arr.length; i++)
	{
		if(arr[i] === value)
		{
			arr.splice(i,1);
			return arr;
		}
	}
}

let gender_select = pick_gender();
console.log(gender_select);
let race_select = pick_race();
console.log(race_select);
let back_select = pick_back();
console.log(back_select);
let cla_select = pick_class();
console.log(cla_select);
let stats = organizeStats(cla_select.mainClass);
console.log(stats);

let output = `
	<table>
		<tr>
			<td>Gender</td>
			<td>${gender_select}</td>
		</tr>
		<tr>
			<td>Race</td>
			<td>${race_select.mainRace} ${race_select.subRace}</td>
		</tr>
		<tr>
			<td>Background</td>
			<td>${back_select}</td>
		</tr>
		<tr>
			<td>Class</td>
			<td>${cla_select.mainClass}</td>
		</tr>
		<tr>
			<td>Sub Class</td>
			<td>${cla_select.subClass}</td>
		</tr>
	</table>
	<table>
		<tr>
			<th>STR</th>
			<th>DEX</th>
			<th>CON</th>
			<th>INT</th>
			<th>WIS</th>
			<th>CHA</th>
		</tr>
		<tr>
			<td>${stats.str}</td>
			<td>${stats.dex}</td>
			<td>${stats.con}</td>
			<td>${stats.ine}</td>
			<td>${stats.wis}</td>
			<td>${stats.cha}</td>
		</tr>
	</table>`;

ChatMessage.create({
	user : game.user._id,
	content : output,
	speaker : speaker,
	whisper : game.users.entities.filter(u=>u.isGM).map(u=>u._id)
});