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
{mainClass : "",subClass : "",reason : ""};
*/
function pick_class()
{
	let data = {
		mainClass : "",
		subClass : "",
		reason : ""
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
	let rea = [];
	
	switch(cla_select)
	{
		case "Artificer" :
			sub = [
				"Alchemist",
				"Armorer",
				"Artillerist",
				"BattleSmith"
			];
			rea = [
				"I always wanted friends when I was a child, so I started to make them.",
				"Swinging weapons is boring and magic is a bit too confusing, So I decided to make my own weapons.",
				"Everything around me just wasn't at its best and I knew I could make it that.",
				"Mechanical things speak to me and I just wanted them to be nicer to me. So I started with remaking them.",
				"Thinks kept dying around me, never again.",
				"They said it couldn't be done. Well... I have done it."
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
			rea = [
				"My devotion to my people lifted me in battle, making me powerful and dangerous.",
				"The spirits of my ancestors called on me to carry out a great task.",
				"I lost control in battle one day, and it was as if something else was manipulating my body, forcing it to kill every foe I could reach.",
				"I went on a spiritual journey to find myself and instead found a spirit animal to guide, protect, and inspire me.",
				"I was struck by lightning and lived. Afterward, I found a new strength within me that let me push beyond my limitations.",
				"My anger needed to be channeled into battle, or I risked becoming an indiscriminate killer."
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
			rea = [
				"I awakened my latent bardic abilities through trial and error.",
				"I was a gifted performer and attracted the attention of a master bard who schooled me in the old techniques.",
				"I joined a loose society of scholars and orators to learn new techniques of performance and magic.",
				"I felt a calling to recount the deeds of champions and heroes, to bring them alive in song and story.",
				"I joined one of the great colleges to learn old lore, the secrets of magic, and the art of performance.",
				"I picked up a musical instrument one day and instantly discovered that I could play it."
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
			rea = [
				"A supernatural being in service to the gods called me to become a divine agent in the world.",
				"I saw the injustice and horror in the world and felt moved to take a stand against them.",
				"My god gave me an unmistakable sign. I dropped everything to serve the divine.",
				"Although I was always devout, it wasn't until I completed a pilgrimage that I knew my true calling.",
				"I used to serve in my religion's bureaucracy but found I needed to work in the world, to bring the message of my faith to the darkest corners of the land.",
				"I realize that my god works through me, and I do as commanded, even though I don't know why I was chosen to serve."
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
			rea = [
				"I saw too much devastation in the wild places, too much of nature's splendor ruined by the despoilers. I joined a circle of druids to fight back against the enemies of nature.",
				"I found a place among a group of druids after I fled a catastrophe.",
				"I have always had an affinity for animals, so I explored my talent to see how I could best use it.",
				"I befriended a druid and was moved by druidic teachings. I decided to follow my friend's guidance and give something back to the world.",
				"While I was growing up, I saw spirits all around me-entities no one else could perceive. I sought out the druids to help me understand the visions and communicate with these beings.",
				"I have always felt disgust for creatures of unnatural origin. For this reason, I immersed myself in the study of the druidic mysteries and became a champion of the natural order."
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
			rea = [
				"I wanted to hone my combat skills, and so I joined a war college.",
				"I squired for a knight who taught me how to fight, care for a steed, and conduct myself with honor. I decided to take up that path for myself.",
				"Horrible monsters descended on my community, killing someone I loved. I took up arms to destroy those creatures and others of a similar nature.",
				"I joined the army and learned how to fight as part of a group.",
				"I grew up fighting, and I refined my talents by defending myself against people who crossed me.",
				"I could always pick up just about any weapon and know how to use it effectively."
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
			rea = [
				"I was chosen to study at a secluded monastery. There, I was taught the fundamental techniques required to eventually master a tradition.",
				"I sought instruction to gain a deeper understanding of existence and my place in the world.",
				"I stumbled into a portal to the Shadowfell and took refuge in a strange monastery, where I learned how to defend myself against the forces of darkness.",
				"I was overwhelmed with grief after losing someone close to me, and I sought the advice of philosophers to help me cope with my loss.",
				"I could feel that a special sort of power lay within me, so I sought out those who could help me call it forth and master it.",
				"I was wild and undisciplined as a youngster, but then I realized the error of my ways. I applied to a monastery and became a monk as a way to live a life of discipline."
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
			rea = [
				"A fantastical being appeared before me and called on me to undertake a holy quest.",
				"One of my ancestors left a holy quest unfulfilled, so I intend to finish that work.",
				"The world is a dark and terrible place. I decided to serve as a beacon of light shining out against the gathering shadows.",
				"I served as a paladin's squire, learning all I needed to swear my own sacred oath.",
				"Evil must be opposed on all fronts. I feel compelled to seek out wickedness and purge it from the world.",
				"Becoming a paladin was a natural consequence of my unwavering faith. In taking my vows, I became the holy sword of my religion."
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
			rea = [
				"I found purpose while I honed my hunting skills by bringing down dangerous animals at the edge of civilization.",
				"I always had a way with animals, able to calm them with a soothing word and a touch.",
				"I suffer from terrible wanderlust, so being a ranger gave me a reason not to remain in one place for too long.",
				"I have seen what happens when the monsters come out from the dark. I took it upon myself to become the first line of defense against the evils that lie beyond civilization's borders",
				"I met a grizzled ranger who taught me woodcraft and the secrets of the wild lands.",
				"I served in an army, learning the precepts of my profession while blazing trails and scouting enemy encampments."
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
			rea = [
				"I've always been nimble and quick of wit, so I decided to use those talents to help me make my way in the world.",
				"An assassin or a thief wronged me, so I focused my training on mastering the skills of my enemy to better combat foes of that sort.",
				"An experienced rogue saw something in me and taught me several useful tricks.",
				"I decided to turn my natural lucky streak into the basis of a career, though I still realize that improving my skills is essential.",
				"I took up with a group of ruffians who showed me how to get what I want through sneakiness rather than direct confrontation.",
				"I'm a sucker for a shiny bauble or a sack of coins, as long as I can get my hands on it without risking life and limb."
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
			rea = [
				"When I was born, all the water in the house froze solid, the milk spoiled, or all the iron turned to copper. My family is convinced that this event was a harbinger of stranger things to come for me.",
				"I suffered a terrible emotional or physical strain, which brought forth my latent magical power. I have fought to control it ever since.",
				"My immediate family never spoke of my ancestors, and when I asked, they would change the subject. It wasn't until I started displaying strange talents that the full truth of my heritage came out.",
				"When a monster threatened one of my friends, I became filled with anxiety. I lashed out instinctively and blasted the wretched thing with a force that came from within me.",
				"Sensing something special in me, a stranger taught me how to control my gift.",
				"After I escaped from a magical conflagration, I realized that though I was unharmed, I was not unchanged. I began to exhibit unusual abilities that I am just beginning to understand."
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
			rea = [
				"While wandering around in a forbidden place, I encountered an otherworldly being that offered to enter into a pact with me.",
				"I was examining a strange tome I found in an abandoned library when the entity that would become my patron suddenly appeared before me.",
				"I stumbled into the clutches of my patron after I accidentally stepped through a magical doorway.",
				"When I was faced with a terrible crisis, I prayed to any being who would listen, and the creature that answered became my patron.",
				"My future patron visited me in my dreams and offered great power in exchange for my service.",
				"One of my ancestors had a pact with my patron, so that entity was determined to bind me to the same agreement."
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
			rea = [
				"An old wizard chose me from among several candidates to serve an apprenticeship.",
				"When I became lost in a forest, a hedge wizard found me, took me in, and taught me the rudiments of magic.",
				"I grew up listening to tales of great wizards and knew I wanted to follow their path. I strove to be accepted at an academy of magic and succeeded.",
				"One of my relatives was an accomplished wizard who decided I was smart enough to learn the craft.",
				"While exploring an old tomb, library, or temple, I found a spellbook. I was immediately driven to learn all I could about becoming a wizard.",
				"I was a prodigy who demonstrated mastery of the arcane arts at an early age. When I became old enough to set out on my own, I did so to learn more magic and expand my power."
			];
			break;
		default :
			console.log("DEFAULT CASE PROVOKED - ERROR ERROR ERROR");
			sub = [""];
			rea = [""];
			break;
	}
	
	let sub_roll = new Roll(`1d${sub.length}`).roll().total;
	let sub_select = sub[sub_roll-1];
	
	let rea_roll = new Roll(`1d${rea.length}`).roll().total;
	let rea_select = rea[rea_roll-1];
	
	data.mainClass = cla_select;
	data.subClass = sub_select;
	data.reason = rea_select;
	
	return data;
}

/*
return race object
{mainRace = "",subRace = "",weight:"",height:"",stats : {str :0,dex:0,con:0,ine:0,wis:0,cha:0}};
*/
function pick_race(input)
{
	let data = {
		mainRace : "",
		subRace : "",
		weight : "",
		height : "",
		stats : input
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
		"Kobold"
	];
	
	let race_roll = new Roll(`1d${race.length}`).roll().total;
	
	let race_select = race[race_roll-1];
	
	let sub = [];
	let weight = 0;
	let height = 0;
	
	switch(race_select)
	{
		case "Aarakocra" :
			height = new Roll(`2d6`).roll().total + 52;
			weight = (new Roll(`1d4`).roll().total * (height - 52)) + 80;
			sub = [
				{name : "", dex : 2, wis : 1}
			];
			break;
		case "Aasimar" :
			height = new Roll(`2d10`).roll().total + 56;
			weight = (new Roll(`2d4`).roll().total * (height - 56)) + 110;
			sub = [
				{name : "Fallen", str : 1, cha : 2},
				{name : "Protector", wis : 1, cha : 2},
				{name : "Scourge", con : 1, cha :2}
			];
			break;
		case "Bugbear" :
			height = new Roll(`2d12`).roll().total + 72;
			weight = (new Roll(`2d6`).roll().total * (height - 72)) + 200;
			sub = [
				{name : "", str : 2, dex : 1}
			];
			break;
		case "Centaur" :
			height = new Roll(`1d10`).roll().total + 72;
			weight = (new Roll(`2d12`).roll().total * (height - 72)) + 600;
			sub = [
				{name : "", str : 2, wis : 1}
			];
			break;
		case "Changling" :
			height = new Roll(`2d4`).roll().total + 61;
			weight = (new Roll(`2d4`).roll().total * (height - 61)) + 115;
			sub = [
				{name : "", cha : 2, con : 1}
			];
			break;
		case "Dragonborn" :
			height = new Roll(`2d8`).roll().total + 66;
			weight = (new Roll(`2d6`).roll().total * (height - 66)) + 175;
			sub = [
				{name : "Draconblood - Black", ine : 2, cha : 1},
				{name : "Draconblood - Blue", ine : 2, cha : 1},
				{name : "Draconblood - Brass", ine : 2, cha : 1},
				{name : "Draconblood - Bronze", ine : 2, cha : 1},
				{name : "Draconblood - Copper", ine : 2, cha : 1},
				{name : "Draconblood - Gold", ine : 2, cha : 1},
				{name : "Draconblood - Green", ine : 2, cha : 1},
				{name : "Draconblood - Red", ine : 2, cha : 1},
				{name : "Draconblood - Silver", ine : 2, cha : 1},
				{name : "Draconblood - White", ine : 2, cha : 1},
				{name : "Ravenite - Black", str : 2, con : 1},
				{name : "Ravenite - Blue", str : 2, con : 1},
				{name : "Ravenite - Brass", str : 2, con : 1},
				{name : "Ravenite - Bronze", str : 2, con : 1},
				{name : "Ravenite - Copper", str : 2, con : 1},
				{name : "Ravenite - Gold", str : 2, con : 1},
				{name : "Ravenite - Green", str : 2, con : 1},
				{name : "Ravenite - Red", str : 2, con : 1},
				{name : "Ravenite - Silver", str : 2, con : 1},
				{name : "Ravenite - White", str : 2, con : 1}
			];
			break;
		case "Dwarf" :
			height = new Roll(`2d4`).roll().total + 44;
			weight = (new Roll(`2d6`).roll().total * (height - 44)) + 115;
			sub = [
				{ name : "Duergar", con : 2, str : 1},
				{ name : "Hill", con : 2, wis : 1},
				{ name : "Mark of Warding", con : 2, ine : 1},
				{ name : "Mountain", con : 2, str : 2}
			];
			break;
		case "Elf" :
			height = new Roll(`2d10`).roll().total + 42;
			weight = (new Roll(`1d4`).roll().total * (height - 42)) + 100;
			sub = [
				{ name : "Drow", dex : 2, cha : 1},
				{ name : "Eladrin", dex : 2, cha : 1},
				{ name : "High", dex : 2, ine : 1},
				{ name : "Mark of Shadow", dex : 2, cha : 1},
				{ name : "Pallid", dex : 2, wis : 1},
				{ name : "Sea", dex : 2, con : 1}, 
				{ name : "Shadar-kai", dex : 2, con : 1}, 
				{ name : "Wood", dex : 2, wis : 1}
			];
			break;
		case "Firbolg":
			height = new Roll(`2d12`).roll().total + 74;
			weight = (new Roll(`2d6`).roll().total * (height - 74)) + 175;
			sub = [
				{name : "", wis : 2, str : 1}
			];
			break;
		case "Genasi" :
			height = new Roll(`2d10`).roll().total + 56;
			weight = (new Roll(`2d4`).roll().total * (height - 56)) + 110;
			sub = [
				{ name : "Air", con : 2, dex : 1},
				{ name : "Earth", con : 2, str : 1},
				{ name : "Fire", con : 2, ine : 1},
				{ name : "Water", con : 2, wis : 1}
			];
			break;
		case "Gith" :
			height = new Roll(`2d12`).roll().total + 60;
			weight = (new Roll(`2d4`).roll().total * (height - 60)) + 100;
			sub = [
				{ name : "Githyanki", str : 2, ine : 1},
				{ name : "Githzerai", wis : 2, ine : 1}
			];
			break;
		case "Goliath" :
			height = new Roll(`2d10`).roll().total + 74;
			weight = (new Roll(`2d6`).roll().total * (height - 74)) + 200;
			sub = [
				{name : "", str : 2, con : 1}
			];
			break;
		case "Half-elf" :
			height = new Roll(`2d8`).roll().total + 49;
			weight = (new Roll(`2d4`).roll().total * (height - 49)) + 110;
			sub = [
				{name : "", cha : 2, con : 1, dex : 1},
				{name : "Aquatic Elf Descent", cha : 2, con : 1, dex : 1},
				{name : "Drow Descent", cha : 2, con : 1, dex : 1},
				{name : "Mark of Detection", wis : 2, con : 1, dex : 1},
				{name : "Mark of Storm", cha : 2, dex : 1},
				{name : "Moon Elf Descent", cha : 2, con : 1, dex : 1},
				{name : "Sun Elf Descent", cha : 2, con : 1, dex : 1},
				{name : "Wood Elf Descent", cha : 2, con : 1, dex : 1}
			];
			break;
		case "Half-orc":
			height = new Roll(`2d10`).roll().total + 46;
			weight = (new Roll(`2d6`).roll().total * (height - 46)) + 140;
			sub = [
				{name : "", str : 2, con : 1},
				{name : "Mark of Finding", wis : 2, con : 1}
			];
			break;
		case "Hobgoblin" :
			height = new Roll(`2d10`).roll().total + 58;
			weight = (new Roll(`2d6`).roll().total * (height - 58)) + 140;
			sub = [
				{name : "", con : 2, ine : 1}
			];
			break;
		case "Human":
			height = new Roll(`2d10`).roll().total + 56;
			weight = (new Roll(`2d4`).roll().total * (height - 56)) + 110;
			sub = [
				{name : "", str : 1, dex : 1, con : 1, ine : 1, wis : 1, cha : 1},
				{name : "Mark of Finding", wis : 2, con : 1},
				{name : "Mark of Handling", wis : 2, con : 1},
				{name : "Mark of Making", ine : 2, con : 1},
				{name : "Mark of Passage", dex : 2, con : 1},
				{name : "Mark of Sentinel", con : 2, wis : 1},
				{name : "Variant", dex : 1, con : 1}
			];
			break;
		case "Kalashtar" :
			height = new Roll(`2d6`).roll().total + 64;
			weight = (new Roll(`1d6`).roll().total * (height - 64)) + 110;
			sub = [
				{name : "", wis : 2, cha : 1}
			];
			break;
		case "Kenku" :
			height = new Roll(`2d8`).roll().total + 52;
			weight = (new Roll(`1d6`).roll().total * (height - 52)) + 50;
			sub = [
				{name : "", dex : 2, wis : 1}
			];
			break;
		case "Leonin" :
			height = new Roll(`2d10`).roll().total + 66;
			weight = (new Roll(`2d6`).roll().total * (height - 66)) + 180;
			sub = [
				{name : "", con : 2, str : 1}
			];
			break;
		case "Lizardfolk" :
			height = new Roll(`2d10`).roll().total + 57;
			weight = (new Roll(`2d6`).roll().total * (height - 57)) + 120;
			sub = [
				{name : "", con : 2, wis : 1}
			]; 
			break;
		case "Loxodon" :
			height = new Roll(`2d10`).roll().total + 79;
			weight = (new Roll(`2d4`).roll().total * (height - 79)) + 295;
			sub = [
				{name : "", con : 2, wis : 1}
			];
			break;
		case "Minotaur" :
			height = new Roll(`2d8`).roll().total + 64;
			weight = (new Roll(`2d6`).roll().total * (height - 64)) + 175;
			sub = [
				{name : "", str : 2, con : 1}
			];
			break;
		case "Orc" :
			height = new Roll(`2d8`).roll().total + 64;
			weight = (new Roll(`2d6`).roll().total * (height - 64)) + 175;
			sub = [
				{name : "", str : 2, con : 1}
			];
			break;
		case "Satyr" :
			height = new Roll(`2d8`).roll().total + 56;
			weight = (new Roll(`2d4`).roll().total * (height - 56)) + 100;
			sub = [
				{name : "", cha : 2, dex : 1}
			];
			break;
		case "Shifter":
			height = new Roll(`2d8`).roll().total + 54;
			weight = (new Roll(`2d4`).roll().total * (height - 54)) + 90;
			sub = [
				{name : "Beasthide", con : 2, str : 1},
				{name : "Longtooth", str : 2, dex : 1},
				{name : "Swiftstride", dex : 2, cha : 1},
				{name : "Wildhunt", wis : 2, dex : 1}
			];
			break;
		case "Simic Hybrid" :
			height = new Roll(`2d10`).roll().total + 56;
			weight = (new Roll(`2d4`).roll().total * (height - 56)) + 110;
			sub = [
				{name : "", con : 2, dex : 1}
			];
			break;
		case "Tabaxi" :
			height = new Roll(`2d10`).roll().total + 58;
			weight = (new Roll(`2d4`).roll().total * (height - 58)) + 90;
			sub = [
				{name : "", dex : 2, cha : 1}
			];
			break;
		case "Tiefling":
			height = new Roll(`2d8`).roll().total + 57;
			weight = (new Roll(`2d4`).roll().total * (height - 57)) + 110;	
			sub = [
				{name : "", cha : 2, ine : 1},
				{name : "Asmodeus", cha : 2, ine : 1},
				{name : "Baalzebul", cha : 2, ine : 1},
				{name : "Dispater", cha : 2, dex : 1},
				{name : "Fierna", cha : 2, wis : 1},
				{name : "Glasya", cha : 2, dex : 1},
				{name : "Levistus", cha : 2, con : 1},
				{name : "Mammon", cha : 2, ine : 1},
				{name : "Mephistopheles", cha : 2, ine : 1},
				{name : "Variant", dex : 2, ine : 1},
				{name : "Zariel", cha : 2, str : 1}
			];
			break;
		case "Triton" :
			height = new Roll(`2d10`).roll().total + 54;
			weight = (new Roll(`2d4`).roll().total * (height - 54)) + 90;
			sub = [
				{name : "", str : 1, con : 1, cha : 1}
			];
			break;
		case "Vedalken" :
			height = new Roll(`2d10`).roll().total + 64;
			weight = (new Roll(`2d4`).roll().total * (height - 64)) + 110;
			sub = [
				{name : "", ine : 2, wis : 1}
			];
			break;
		case "Warforged" :
			height = new Roll(`2d6`).roll().total + 70;
			weight = (4 * (height - 70)) + 270;
			sub = [
				{name : "", con : 2, dex : 1}
			];
			break;
		case "Yuan-ti Pureblood" :
			height = new Roll(`2d10`).roll().total + 56;
			weight = (new Roll(`2d4`).roll().total * (height - 56)) + 110;
			sub = [
				{name : "", cha : 2, ine : 1}
			];
			break;
		case "Gnome":
			height = new Roll(`2d4`).roll().total + 35;
			weight = ((height - 35)) + 35;
			sub = [
				{name : "Deep", ine : 2, dex : 1},
				{name : "Forest", ine : 2, dex : 1},
				{name : "Mark of Scribing", ine : 2, cha : 1},
				{name : "Rock", ine : 2, con : 1}
			];
			break;
		case "Goblin" :
			height = new Roll(`2d4`).roll().total + 41;
			weight = ((height - 41)) + 35;
			sub = [
				{name : "", dex : 2, con : 1}
			];
			break;
		case "Halfling":
			height = new Roll(`2d4`).roll().total + 31;
			weight = ((height - 31)) + 35;
			sub = [
				{name : "Ghostwise", dex : 2, wis : 1},
				{name : "Lightfoot", dex : 2, cha : 1},
				{name : "Lotusden", dex : 2, wis : 1},
				{name : "Mark of Healing", dex : 2, wis : 1},
				{name : "Mark of Hospitality", dex : 2, cha : 1},
				{name : "Stout", dex : 2, con : 1}
			];
			break;
		case "Kobold" :
			height = new Roll(`2d4`).roll().total + 25;
			weight = ((height - 25)) + 25;
			sub = [
				{name : "", dex : 2, str : -2}
			];
			break;
		default :
			height = 0;
			weight = 0;
			sub = [""];
			break;
	}
	
	let sub_roll = new Roll(`1d${sub.length}`).roll().total;
	let sub_select = sub[sub_roll-1];
	
	data.mainRace = race_select;
	data.subRace = sub_select.name;
	if(sub_select.str !== undefined) data.stats.str += sub_select.str;
	if(sub_select.dex !== undefined) data.stats.dex += sub_select.dex;
	if(sub_select.con !== undefined) data.stats.con += sub_select.con;
	if(sub_select.ine !== undefined) data.stats.ine += sub_select.ine;
	if(sub_select.wis !== undefined) data.stats.wis += sub_select.wis;
	if(sub_select.cha !== undefined) data.stats.cha += sub_select.cha;
	data.weight = weight + " lbs";
	data.height = Math.floor(height/12)+`' ` + height%12 + `"`;
	
	return data;

	//add height and weight and stat increases
}

/*
return background object
{Background = "", SubBackground="",Reason="",Personality="",Ideal="",Bond="",Flaw=""};
*/
function pick_back()
{
	let data = {
		Background : "",
		SubBackground : "",
		Reason : "",
		Personality : "",
		Ideal : "",
		Bond : "",
		Flaw : ""
	}
	let back = [
		"Acolyte",
		"Anthropologist",
		"Archaeologist",
		"Athlete",
		"Charlatan",
		"Criminal",
		"Entertainer",
		"Faceless",
		"Far Traveler",
		"Fisher",
		"Folk Hero",
		"Guild Artistan",
		"Haunted One",
		"Hermit",
		"House Agent",
		"Marine",
		"Noble",
		"Outlander",
		"Sage",
		"Sailor",
		"Shipwright",
		"Smuggler",
		"Soldier",
		"Urchin"
	];
	
	let back_roll = new Roll(`1d${back.length}`).roll().total;
	let back_select = back[back_roll-1];
	
	let sub = [];
	let rea = [];
	let per = [];
	let ide = [];
	let bon = [];
	let fla = [];
	
	switch(back_select)
	{
		case "Acolyte" :
			sub = [
				""
			];
			rea = [
				"I ran away from home at an early age and found refuge in a temple.",
				"My family gave me to a temple, since they were unable or unwilling to care for me.",
				"I grew up in a household with strong religious convictions. Entering the service of one or more gods seemed natural.",
				"An impassioned sermon struck a chord deep in my soul and moved me to serve the faith.",
				"I followed a childhood friend, a respected acquaintance, or someone I loved into religious service.",
				"After encountering a true servant of the gods, I was so inspired that I immediately entered the service of a religious group."
			];
			per = [
				"I idolize a particular hero of my faith, and constantly refer to that person's deeds and example.",
				"I can find common ground between the fiercest enemies, empathizing with them and always working toward peace.",
				"I see omens in every event and action. The gods try to speak to us, we just need to listen.",
				"Nothing can shake my optimistic attitude.",
				"I quote (or misquote) sacred texts and proverbs in almost every situation",
				"I am tolerant (or intolerant) of other faiths and respect (or condemn) the worship of other gods.",
				"I've enjoyed fine food, drink, and high society among my temple's elite. Rough living grates on me.",
				"I've spent so long in the temple that I have little practical experience dealing with people in the outside world."
			];
			ide = [
				"Tradition. The ancient traditions of worship and sacrifice must be preserved and upheld. (Lawful)",
				"Charity. I always try to help those in need, no matter what the personal cost. (Good)",
				"Change. We must help bring about the changes the gods are constantly working in the world. (Chaotic)",
				"Power. I hope to one day rise to the top of my faith's religious hierarchy. (Lawful)",
				"Faith. I trust that my deity will guide my actions. I have faith that if I work hard, things will go well. (Lawful)",
				"Aspiration. I seek to prove myself worthy of my god's favor by matching my actions against his or her teachings. (Any)"
			];
			bon = [
				"I would die to recover an ancient relic of my faith that was lost long ago",
				"I will someday get revenge on the corrupt temple hierarchy who branded me a heretic.",
				"I owe my life to the priest who took me in when my parents died.",
				"Everything I do is for the common people.",
				"I will do anything to protect the temple where I served.",
				"I seek to preserve a sacred text that my enemies consider heretical and seek to destroy."
			];
			fla = [
				"I judge others harshly, and myself even more severely.",
				"I put too much trust in those who wield power within my temple's hierarchy.",
				"My piety sometimes leads me to blindly trust those that profess faith in my god.",
				"I am inflexible in my thinking.",
				"I am suspicious of strangers and expect the worst of them.",
				"Once I pick a goal, I become obsessed with it to the detriment of everything else in my life."
			];
			break;
		case "Anthropologist" :
			sub = [
				"Culture : Aarakocra",
				"Culture : Dwarf",
				"Culture : Elf",
				"Culture : Goblin",
				"Culture : Halfling",
				"Culture : Human",
				"Culture : Lizardfolk",
				"Culture : Orc"
			];
			rea = [
				"I found their society to be so intoxicating.",
				"All I have ever known is ruins and cultures other than my own.",
				"Libraries and ruins excite me much more than a night out at the bar.",
				"After encountering one of them, I just couldn't help but want to know more.",
				"It is all I have known, my parents have known, and even my grandparents. This is who we are.",
				"I am comfortable with other societies and cultures, fascinated with them."
			];
			per = [
				"I prefer the company of those who aren't like me, including people of other races",
				"I'm a stickler when it comes to observing proper etiquette and local customs",
				"I would rather observe than meddle.",
				"By living among violent people, I have become desensitized to violence.",
				"I would risk life and limb to discover a new culture or unravel the secrets of a dead one.",
				"When I arrive at a new settlement for the first time, I must learn all its customs."
			];
			ide = [
				"Discovery. I want to be the first person to discover a lost culture. (Any)",
				"Distance. One must not interfere with the affairs of another culture - even one in need of aid. (Lawful)",
				"Knowledge. By understanding other races and cultures, we learn to understand ourselves. (Any)",
				"Power. Common people crave strong leadership, and I do my utmost to provide it. (Lawful)",
				"Protection. I must do everything possible to save a society facing extinction. (Good)",
				"Indifferent. Life is cruel. What's the point in saving people if they're going to die anyway? (Chaotic)"
			];
			bon = [
				"My mentor gave me a journal filled with lore and wisdom. Losing it would devastate me.",
				"Having lived among the people of a primeval tribe or clan, I long to return and see how they are faring.",
				"Years ago, tragedy struck the members of an isolated society I befriended, and I will honor them.",
				"I want to learn more about a particular humanoid culture that fascinates me.",
				"I seek to avenge a clan, tribe, kingdom, or empire that was wiped out.",
				"I have a trinket that I believe is the key to finding a long-lost society."
			];
			fla = [
				"Boats make me seasick.",
				"I talk to myself, and I don't make friends easily.",
				"I believe that I'm intellectually superior to people from other cultures and have much to teach them",
				"I've picked up some unpleasant habits living among goblins, lizardfolk, or orcs",
				"I complain about everything.",
				"I wear a tribal mask and never take it off."
			];
			break;
		case "Archaeologist" :
			sub = [
				"Item : 10-foot pole",
				"Item : Crowbar",
				"Item : Hat",
				"Item : Hooded Lantern",
				"Item : Medallion",
				"Item : Shovel",
				"Item : Sledgehammer",
				"Item : Whip"
			];
			rea = [
				"Ancient history intrigues me, I long to see how these savage and uncivilized folk lived in the past.",
				"History is the path to the present and even the future.",
				"The wisest men know they know nothing, but are willing to learn everything.",
				"The dead and buried cannot tell lies.",
				"",
				""
				];
			per = [
				"I love a good puzzle or mystery",
				"I'm a pack rat who never throws anything away.",
				"Fame is more important to me than money.",
				"I have no qualms about stealing from the dead.",
				"I'm happier in a dusty old tomb than I am in the centers of civilization.",
				"Traps don't make me nervous. Idiots who trigger traps make me nervous.",
				"I might fail, but I will never give up.",
				"You might think I'm a scholar, but I love a good brawl. These fists were made for punching."
			];
			ide = [
				"Preservation. That artifact belongs in a museum. (Good)",
				"Greed. I won't risk my life for nothing. I expect some kind of payment. (Any)",
				"Death Wish. Nothing is more exhilarating than a narrow escape from the jaws of death. (Chaotic)",
				"Dignity. The dead and their belongings deserve to be treated with respect. (Lawful)",
				"Immortality. All of my exploring is part of a plan to find the secret of everlasting life. (Any)",
				"Danger. With every great discovery comes grave danger. The two walk hand in hand. (Any)"
			];
			bon = [
				"Ever since I was a child, I've heard stories about a lost city. I aim to find it, learn its secrets, and earn my place in the history books.",
				"I want to find my mentor, who disappeared on an expedition some time ago.",
				"I have a friendly rival. Only one of us can be the best, and I aim to prove it's me",
				"I won't sell an art object or other treasure that has historical significance or is one of a kind.",
				"I'm secretly in love with the wealthy patron who sponsors my archaeological exploits.",
				"I hope to bring prestige to a library, a museum, or a university."
			];
			fla = [
				"I have a secret fear of some common wild animal - and in my work, I see them everywhere.",
				"I can't leave a room without searching it for secret doors.",
				"When I'm not exploring dungeons or ruins. I get jittery and impatient.",
				"I have no time for friends or family. I spend every waking moment thinking about and preparing for my next expedition.",
				"When given the choice of going left or right, I always go left.",
				"I can't sleep except in total darkness."
			];
			break;
		case "Athlete" :
			sub = [
				"Event : Marathon",
				"Event : Long-distance running",
				"Event : Wrestling",
				"Event : Boxing",
				"Event : Chariot or horse race",
				"Event : Mixed Unarmed Combat",
				"Event : Hoplite Race",
				"Event : Pentathlon"
			];
			rea = [
				"",
				"",
				"",
				"",
				"",
				""
				];
			per = [
				"I feel most at peace during physical exertion, be it exercise or battle.",
				"I don't like to sit idle.",
				"I have a daily exercise routine that I refuse to break.",
				"Obstacles exist to be overcome.",
				"When I see others struggling, I offer to help.",
				"I love to trade banter and gibes.",
				"Anything worth doing is worth doing best.",
				"I get irritated if people praise someone else and not me."
			];
			ide = [
				"Competition. I strive to test myself in all things. (Chaotic)",
				"Triumph. The best part of winning is seeing my rivals brought low. (Evil)",
				"Camaraderie. The strongest bonds are forged through struggle. (Good)",
				"People. I strive to inspire my spectators. (Neutral)",
				"Tradition. Every game has rules, and the playing field must be level. (Lawful)",
				"Growth. Lessons hide in victory and defeat. (Any)"
			];
			bon = [
				"My teammates are my family.",
				"I will overcome a rival and prove myself their better.",
				"My mistake got someone hurt. I'll never make that mistake again.",
				"I will be the best for the honor and glory of my home.",
				"The person who trained me is the most important person in my world.",
				"I strive to live up to a specific hero's example."
			];
			fla = [
				"I indulge in a habit that threatens my reputation or my health.",
				"I'll do absolutely anything to win.",
				"I ignore anyone who doesn't compete and anyone who loses to me.",
				"I have lingering pain from old injuries.",
				"Any defeat or failure on my part is because my opponent cheated.",
				"I must be the captain of any group I join."
			];
			break;
		case "Charlatan" :
			sub = [
				"Scam : I cheat at games of chance.",
				"Scam : I shave coins or forge documents.",
				"Scam : I insinuate myself into people's lives to prey on their weakness and secure their fortunes.",
				"Scam : I put on new identities like clothes.",
				"Scam : I run sleight-of-hand cons on street corners.",
				"Scam : I convince people that worthless junk is worth their hard-earned money."
			];
			rea = [
				"I was left to my own devices, and my knack for manipulating others helped me survive.",
				"I learned early on that people are gullible and easy to exploit.",
				"I often got in trouble, but I managed to talk my way out of it every time.",
				"I took up with a confidence artist, from whom I learned my craft.",
				"After a charlatan fleeced my family, I decided to learn the trade so I would never be fooled by such deception again.",
				"I was poor or I feared becoming poor, so I learned the tricks I needed to keep myself out of poverty."
			];
			per = [
				"I fall in and out of love easily, and am always pursuing someone.",
				"I have a joke for every occasion, especially occasions where humor is inappropriate.",
				"Flattery is my preferred trick for getting what I want.",
				"I'm a born gambler who can't resist taking a risk for a potential payoff.",
				"I lie about almost everything, even when there's no reason to.",
				"Sarcasm and insults are my weapons of choice.",
				"I keep multiple holy symbols on me and invoke whatever deity might come in useful at any given moment.",
				"I pocket anything I see that might have some value."
			];
			ide = [
				"Independence. I am a free spirit—no one tells me what to do. (Chaotic)",
				"Fairness. I never target people who can't afford to lose a few coins. (Lawful)",
				"Charity. I distribute the money I acquire to the people who really need it. (Good)",
				"Creativity. I never run the same con twice. (Chaotic)",
				"Friendship. Material goods come and go. Bonds of friendship last forever. (Good)",
				"Aspiration. I'm determined to make something of myself. (Any)"
			];
			bon = [
				"I fleeced the wrong person and must work to ensure that this individual never crosses paths with me or those I care about.",
				"I owe everything to my mentor—a horrible person who's probably rotting in jail somewhere.",
				"Somewhere out there, I have a child who doesn't know me. I'm making the world better for him or her.",
				"I come from a noble family, and one day I'll reclaim my lands and title from those who stole them from me.",
				"A powerful person killed someone I love. Some day soon, I'll have my revenge.",
				"I swindled and ruined a person who didn't deserve it. I seek to atone for my misdeeds but might never be able to forgive myself."
			];
			fla = [
				"I can't resist a pretty face.",
				"I'm always in debt. I spend my ill-gotten gains on decadent luxuries faster than I bring them in.",
				"I'm convinced that no one could ever fool me the way I fool others.",
				"I'm too greedy for my own good. I can't resist taking a risk if there's money involved.",
				"I can't resist swindling people who are more powerful than me.",
				"I hate to admit it and will hate myself for it, but I'll run and preserve my own hide if the going gets tough."
			];
			break;
		case "Criminal" :
			sub = [
				"Specialty : Blackmailer",
				"Specialty : Burglar",
				"Specialty : Enforcer",
				"Specialty : Fence",
				"Specialty : Highway Robber",
				"Specialty : Hired Killer",
				"Specialty : Pickpocket",
				"SPecialty : Smuggler"
			];
			rea = [
				"I resented authority in my younger days and saw a life of crime as the best way to fight against tyranny and oppression.",
				"Necessity forced me to take up the life, since it was the only way I could survive.",
				"I fell in with a gang of reprobates and ne'er-do-wells, and I learned my specialty from them.",
				"A parent or relative taught me my criminal specialty to prepare me for the family business.",
				"I left home and found a place in a thieves' guild or some other criminal organization.",
				"I was always bored, so I turned to crime to pass the time and discovered I was quite good at it."
			];
			per = [
				"I always have a plan for when things go wrong.",
				"I am always calm, no matter what the situation. I never raise my voice or let my emotions control me.",
				"The first thing I do in a new place is note the locations of everything valuable—or where such things could be hidden.",
				"I would rather make a new friend than a new enemy.",
				"I am incredibly slow to trust. Those who seem the fairest often have the most to hide.",
				"I don't pay attention to the risks in a situation. Never tell me the odds.",
				"The best way to get me to do something is to tell me I can't do it.",
				"I blow up at the slightest insult."
			];
			ide = [
				"Honor. I don't steal from others in the trade. (Lawful)",
				"Freedom. Chains are meant to be broken, as are those who would forge them. (Chaotic)",
				"Charity. I steal from the wealthy so that I can help people in need. (Good)",
				"Greed. I will do whatever it takes to become wealthy. (Evil)",
				"People. I'm loyal to my friends, not to any ideals, and everyone else can take a trip down the Styx for all I care. (Neutral)",
				"Redemption. There's a spark of good in everyone. (Good)"
			];
			bon = [
				"I'm trying to pay off an old debt I owe to a generous benefactor.",
				"My ill-gotten gains go to support my family.",
				"Something important was taken from me, and I aim to steal it back.",
				"I will become the greatest thief that ever lived.",
				"I'm guilty of a terrible crime. I hope I can redeem myself for it.",
				"Someone I loved died because of a mistake I made. That will never happen again."
			];
			fla = [
				"When I see something valuable, I can't think about anything but how to steal it.",
				"When faced with a choice between money and my friends, I usually choose the money.",
				"If there's a plan, I'll forget it. If I don't forget it, I'll ignore it.",
				"I have a 'tell' that reveals when I'm lying",
				"I turn tail and run when things look bad.",
				"An innocent person is in prison for a crime that I committed. I'm okay with that."
			];
			break;
		case "Entertainer" :
			sub = [
				"Routines : Actor",
				"Routines : Dancer",
				"Routines : Fire-eater",
				"Routines : Jester",
				"Routines : Juggler",
				"Routines : Instrumentalist",
				"Routines : Poet",
				"Routines : Singer",
				"Routines : Storyteller",
				"Routines : Tumbler"
			];
			rea = [
				"Members of my family made ends meet by performing, so it was fitting for me to follow their example.",
				"I always had a keen insight into other people, enough so that I could make them laugh or cry with my stories or songs.",
				"I ran away from home to follow a minstrel troupe.",
				"I saw a bard perform once, and I knew from that moment on what I was born to do.",
				"I earned coin by performing on street corners and eventually made a name for myself.",
				"A traveling entertainer took me in and taught me the trade."
			];
			per = [
				"I know a story relevant to almost every situation.",
				"Whenever I come to a new place, I collect local rumors and spread gossip.",
				"I'm a hopeless romantic, always searching for that `special someone`.",
				"Nobody stays angry at me or around me for long, since I can defuse any amount of tension.",
				"I love a good insult, even one directed at me.",
				"I get bitter if I'm not the center of attention.",
				"I'll settle for nothing less than perfection.",
				"I change my mood or my mind as quickly as I change key in a song."
			];
			ide = [
				"Beauty. When I perform, I make the world better than it was. (Good)",
				"Tradition. The stories, legends, and songs of the past must never be forgotten, for they teach us who we are. (Lawful)",
				"Creativity. The world is in need of new ideas and bold action. (Chaotic)",
				"Greed. I'm only in it for the money and fame. (Evil)",
				"People. I like seeing the smiles on people's faces when I perform. That's all that matters. (Neutral)",
				"Honesty. Art should reflect the soul; it should come from within and reveal who we really are. (Any)"
			];
			bon = [
				"My instrument is my most treasured possession, and it reminds me of someone I love.",
				"Someone stole my precious instrument, and someday I'll get it back.",
				"I want to be famous, whatever it takes.",
				"I idolize a hero of the old tales and measure my deeds against that person's.",
				"I will do anything to prove myself superior to my hated rival.",
				"I would do anything for the other members of my old troupe."
			];
			fla = [
				"I'll do anything to win fame and renown.",
				"I'm a sucker for a pretty face.",
				"A scandal prevents me from ever going home again. That kind of trouble seems to follow me around.",
				"I once satirized a noble who still wants my head. It was a mistake that I will likely repeat.",
				"I have trouble keeping my true feelings hidden. My sharp tongue lands me in trouble.",
				"Despite my best efforts, I am unreliable to my friends."
			];
			break;
		case "Faceless" :
			sub = [
				"Persona : A flamboyant spy or brigand",
				"Persona : The incarnation of a nation or people",
				"Persona : A scoundrel with a masked guise",
				"Persona : A vengeful spirit",
				"Persona : The manifestation of a deity or your faith",
				"Persona : One whose beauty is greatly accented using makeup",
				"Persona : An impersonation of another hero",
				"Persona : The embodiment of a school of magic",
				"Persona : A warrior with distinctive armor",
				"Persona : A disguise with animalistic or monstrous characteristics, meant to inspire fear"
			];
			rea = [
				"",
				"",
				"",
				"",
				"",
				""
				];
			per = [
				"I'm earnest and uncommonly direct.",
				"I strive to have no personality—it's easier to forget what's hardly there.",
				"I treasure a memento of the person or instance that set me upon my path.",
				"I sleep just as much as I need to and on an unusual schedule.",
				"I think far ahead, a detachedness often mistaken for daydreaming.",
				"I cultivate a single obscure hobby or study and eagerly discuss it at length.",
				"I am ever learning how to be among others—when to stay quiet, when to laugh.",
				"I behave like an extreme opposite of my persona."
			];
			ide = [
				"Justice. Place in society shouldn't determine one's access to what is right. (Good)",
				"Security. Doing what must be done can't bring the innocent to harm. (Lawful)",
				"Confusion. Deception is a weapon. Strike from where your foes won't expect. (Chaotic)",
				"Infamy. My name will be a malediction, a curse that fulfills my will. (Evil)",
				"Incorruptibility. Be a symbol, and leave your flawed being behind. (Any)",
				"Anonymity. It's my deeds that should be remembered, not their instrument. (Any)"
			];
			bon = [
				"I do everything for my family. My first thought is keeping them safe.",
				"What I do, I do for the world. The people don't realize how much they need me.",
				"I've seen too many in need. I must not fail them as everyone else has.",
				"I stand in opposition, lest the wicked go unopposed.",
				"I am exceptional. I do this because no one else can, and no one can stop me.",
				"I do everything for those who were taken from me."
			];
			fla = [
				"I am callous about death. It comes to us all eventually.",
				"I never make eye contact or hold it unflinchingly.",
				"I have no sense of humor. Laughing is uncomfortable and embarrassing.",
				"I overexert myself, sometimes needing to recuperate for a day or more.",
				"I think far ahead, a detachedness often mistaken for daydreaming.",
				"I see morality entirely in black and white."
			];
			break;
		case "Far Traveler" :
			sub = [
				"Emissary",
				"Exile",
				"Fugitive",
				"Pilgrim",
				"Sightseer",
				"Wanderer"
			];
			rea = [
				"",
				"",
				"",
				"",
				"",
				""
				];
			per = [
				"I have different assumptions from those around me concerning personal space, blithely invading others' space in innocence, or reacting to ignorant invasion of my own.",
				"I have my own ideas about what is and is not food, and I find the eating habits of those around me fascinating, confusing, or revolting.",
				"I have a strong code of honor or sense of propriety that others don't comprehend.",
				"I express affection or contempt in ways that are unfamiliar to others.",
				"I honor my deities through practices that are foreign to this land.",
				"I honor my deities through practices that are foreign to this land."
			];
			ide = [
				"Open. I have much to learn from the kindly folk I meet along my way. (Good)",
				"Reserved. As someone new to these strange lands, I am cautious and respectful in my dealings. (Lawful)",
				"Adventure. I'm far from home, and everything is strange and wonderful! (Chaotic)",
				"Cunning. Though I may not know their ways, neither do they know mine, which can be to my advantage. (Evil)",
				"Inquisitive. Everything is new, but I have a thirst to learn. (Neutral)",
				"Suspicious. I must be careful, for I have no way of telling friend from foe here. (Any)"
			];
			bon = [
				"So long as I have this token from my homeland, I can face any adversity in this strange land.",
				"The gods of my people are a comfort to me so far away from home.",
				"I hold no greater cause than my service to my people.",
				"My freedom is my most precious possession. I'll never let anyone take it from me again.",
				"I'm fascinated by the beauty and wonder of this new land.",
				"Though I had no choice, I lament having to leave my loved one(s) behind. I hope to see them again one day."
			];
			fla = [
				"I am secretly (or not so secretly) convinced of the superiority of my own culture over that of this foreign land.",
				"I pretend not to understand the local language in order to avoid interactions I would rather not have.",
				"I have a weakness for the new intoxicants and other pleasures of this land.",
				"I don't take kindly to some of the actions and motivations of the people of this land, because these folks are different from me.",
				"I consider the adherents of other gods to be deluded innocents at best, or ignorant fools at worst.",
				"I have a weakness for the exotic beauty of the people of these lands."
			];
			break;
		case "Fisher" :
			sub = [
				"Tale : Lobster Wrestling. You fought in hand-to-hand combat with an immense lobster.",
				"Tale : It Dragged the Boat. You nearly caught a fish of monstrous size that pulled your boat for miles.",
				"Tale : Fins of Pure Gold. You caught a sea animal whose fins were made of pure gold, but another fisher stole it.",
				"Tale : Ghost Fish. You are haunted by a ghostly fish that only you can see.",
				"Tale : Nemesis Clam. A large clam containing a pearl the size of your head claimed one of your fingers before jetting away; one day, you'll find that clam.",
				"Tale : It Swallowed the Sun. You once saw a fish leap from the water and turn day into night.",
				"Tale : Dive into the Abyss. You found yourself in an underwater cave leading to the Abyss, and your luck has been sour ever since.",
				"Tale : Love Story. You fell in love with a creature of pure water, but your brief romance ended tragically."
			];
			rea = [
				"",
				"",
				"",
				"",
				"",
				""
				];
			per = [
				"I am unmoved by the wrath of nature.",
				"My friends are my crew; we sink or float together.",
				"I need long stretches of quiet to clear my head.",
				"Rich folk don't know the satisfaction of hard work.",
				"I laugh heartily, feel deeply, and fear nothing.",
				"I work hard; nature offers no handouts.",
				"I dislike bargaining; state your price and mean it.",
				"Luck favors me, and I take risks others might not."
			];
			ide = [
				"Camaraderie. Good people make even the longest voyage bearable. (Good)",
				"Luck. Our luck depends on respecting its rules—now throw this salt over your shoulder. (Lawful)",
				"Daring. The richest bounty goes to those who risk everything. (Chaotic)",
				"Plunder. Take all that you can and leave nothing for the scavengers. (Evil)",
				"Balance. Do not fish the same spot twice in a row; suppress your greed, and nature will reward you. (Neutral)",
				"Hard Work. No wave can move a soul hard at work. (Any)"
			];
			bon = [
				"I lost something important in the deep sea, and I intend to find it.",
				"Someone else's greed destroyed my livelihood, and I will be compensated.",
				"I will fish the many famous waters of this land.",
				"The gods saved me during a terrible storm, and I will honor their gift.",
				"My destiny awaits me at the bottom of a particular pond in the Feywild.",
				"I must repay my village's debt."
			];
			fla = [
				"I am judgmental, especially of those I deem homebodies or otherwise lazy.",
				"I become depressed and anxious if I'm away from the sea too long.",
				"I have lived a hard life and find it difficult to empathize with others.",
				"I am inclined to tell long-winded stories at inopportune times.",
				"I work hard, but I play harder.",
				"I am obsessed with catching an elusive aquatic beast, often to the detriment of other pursuits."
			];
			break;
		case "Folk Hero" :
			sub = [
				"Defining Event : I stood up to a tyrant's agents.",
				"Defining Event : I saved people during a natural disaster.",
				"Defining Event : I stood alone against a terrible monster.",
				"Defining Event : I stole from a corrupt merchant to help the poor.",
				"Defining Event : I led a militia to fight of an invading army.",
				"Defining Event : I broke into a tyrant's castle and stole weapons to arm the people.",
				"Defining Event : I trained the peasantry to use farming implements as weapons against a tyrant's soldiers.",
				"Defining Event : A lord rescinded an unpopular decree after I led a symbolic act of protest against it.",
				"Defining Event : A celestial, fey, or similar creature gave me a blessing or revealed my secret origin",
				"Defining Event : Recruited into a lord's army, I rose to leadership and was commended for my heroism."
			];
			rea = [
				"I learned what was right and wrong from my family.",
				"I was always enamored by tales of heroes and wished I could be something more than ordinary.",
				"I hated my mundane life, so when it was time for someone to step up and do the right thing, I took my chance.",
				"A parent or one of my relatives was an adventurer, and I was inspired by that person's courage.",
				"A mad old hermit spoke a prophecy when I was born, saying that I would accomplish great things.",
				"I have always stood up for those who are weaker than I am."
				];
			per = [
				"I judge people by their actions, not their words.",
				"If someone is in trouble, I'm always ready to lend help.",
				"When I set my mind to something, I follow through no matter what gets in my way",
				"I have a strong sense of fair play and always try to find the most equitable solution to arguments",
				"I'm confident in my own abilities and do what I can to instill confidence in others.",
				"Thinking is for other people. I prefer action.",
				"I misuse long words in an attempt to sound smarter.",
				"I get bored easily. When am I going to get on with my destiny?"
			];
			ide = [
				"Respect. People deserve to be treated with dignity and respect. (Good)",
				"Fairness. No one should get preferential treatment before the law, and no one is above the law. (Lawful)",
				"Freedom. Tyrants must not be allowed to oppress the people. (Chaotic)",
				"Might. If I become strong, I can take what I want—what I deserve. (Evil)",
				"Sincerity. There's no good in pretending to be something I'm not. (Neutral)",
				"Destiny. Nothing and no one can steer me away from my higher calling. (Any)"
			];
			bon = [
				"I have a family, but I have no idea where they are. One day, I hope to see them again.",
				"I worked the land, I love the land, and I will protect the land.",
				"A proud noble once gave me a horrible beating, and I will take my revenge on any bully I encounter.",
				"My tools are symbols of my past life, and I carry them so that I will never forget my roots.",
				"I protect those who cannot protect themselves.",
				"I wish my childhood sweetheart had come with me to pursue my destiny."
			];
			fla = [
				"The tyrant who rules my land will stop at nothing to see me killed.",
				"I'm convinced of the significance of my destiny, and blind to my shortcomings and the risk of failure.",
				"The people who knew me when I was young know my shameful secret, so I can never go home again.",
				"I have a weakness for the vices of the city, especially hard drink.",
				"Secretly, I believe that things would be better if I were a tyrant lording over the land",
				"I have trouble trusting in my allies."
			];
			break;
		case "Guild Artistan" :
			sub = [
				"Guild Business : Alchemists and apothecaries",
				"Guild Business : Armorers, locksmiths, and finesmiths",
				"Guild Business : Brewers, distillers, and vintners",
				"Guild Business : Calligraphers, scribes, and scriveners",
				"Guild Business : Carpenters, roofers, and plasterers",
				"Guild Business : Cartographers, surveyors, and chart-makers",
				"Guild Business : Cobblers and shoemakers",
				"Guild Business : Cooks and bakers",
				"Guild Business : Glassblowers and glaziers",
				"Guild Business : Jewelers and gemcutters",
				"Guild Business : Leatherworkers, skinners, and tanners",
				"Guild Business : Masons and stonecutters",
				"Guild Business : Painters, limners, and sign-makers",
				"Guild Business : Potters and tile-makers",
				"Guild Business : Shipwrights and sail-makers",
				"Guild Business : Smiths and metal-forgers",
				"Guild Business : Tinkers, pewterers, and casters",
				"Guild Business : Wagon-makers and wheelwrights",
				"Guild Business : Weavers and dyers",
				"Guild Business : Woodcarvers, coopers, and bowyers"
			];
			rea = [
				"I was apprenticed to a master who taught me the guild's business.",
				"I helped a guild artisan keep a secret or complete a task, and in return I was taken on as an apprentice.",
				"One of my family members who belonged to the guild made a place for me.",
				"I was always good with my hands, so I took the opportunity to learn a trade.",
				"I wanted to get away from my home situation and start a new life.",
				"I learned the essentials of my craft from a mentor but had to join the guild to finish my training."
				];
			per = [
				"I believe that anything worth doing is worth doing right. I can't help it—I'm a perfectionist",
				"I'm a snob who looks down on those who can't appreciate fine art.",
				"I always want to know how things work and what makes people tick.",
				"I'm full of witty aphorisms and have a proverb for every occasion.",
				"I'm rude to people who lack my commitment to hard work and fair play.",
				"I like to talk at length about my profession.",
				"I don't part with my money easily and will haggle tirelessly to get the best deal possible.",
				"I'm well known for my work, and I want to make sure everyone appreciates it. I'm always taken aback when people haven't heard of me."
			];
			ide = [
				"Community. It is the duty of all civilized people to strengthen the bonds of community and the security of civilization. (Lawful)",
				"Generosity. My talents were given to me so that I could use them to benefit the world. (Good)",
				"Freedom. Everyone should be free to pursue his or her own livelihood. (Chaotic)",
				"Greed. I'm only in it for the money. (Evil)",
				"People. I'm committed to the people I care about, not to ideals. (Neutral)",
				"Aspiration. I work hard to be the best there is at my craft. (Any)"
			];
			bon = [
				"The workshop where I learned my trade is the most important place in the world to me.",
				"I created a great work for someone, and then found them unworthy to receive it. I'm still looking for someone worthy.",
				"I owe my guild a great debt for forging me into the person I am today.",
				"I pursue wealth to secure someone's love.",
				"One day I will return to my guild and prove that I am the greatest artisan of them all.",
				"I will get revenge on the evil forces that destroyed my place of business and ruined my livelihood."
			];
			fla = [
				"I'll do anything to get my hands on something rare or priceless.",
				"I'm quick to assume that someone is trying to cheat me.",
				"No one must ever learn that I once stole money from guild coffers.",
				"I'm never satisfied with what I have—I always want more.",
				"I would kill to acquire a noble title.",
				"I'm horribly jealous of anyone who can outshine my handiwork. Everywhere I go, I'm surrounded by rivals."
			];
			break;
		case "Haunted One" :
			sub = [
				"Harrowing Event : A monster that slaughtered dozens of innocent people spared your life, and you don't know why.",
				"Harrowing Event : You were born under a dark star. You can feel it watching you, coldly and distantly. Sometimes it beckons you in the dead of night.",
				"Harrowing Event : An apparition that has haunted your family for generations now haunts you. You don't know what it wants, and it won't leave you alone.",
				"Harrowing Event : Your family has a history of practicing the dark arts. You dabbled once and felt something horrible clutch at your soul, whereupon you fled in terror.",
				"Harrowing Event : An oni took your sibling one cold, dark night, and you were unable to stop it.",
				"Harrowing Event : You were cursed with lycanthropy and later cured. You are now haunted by the innocents you slaughtered.",
				"Harrowing Event : A hag kidnapped and raised you. You escaped, but the hag still has a magical hold over you and fills your mind with evil thoughts.",
				"Harrowing Event : You opened an eldritch tome and saw things unfit for a sane mind. You burned the book, but its words and images are burned into your psyche.",
				"Harrowing Event : A fiend possessed you as a child. You were locked away but escaped. The fiend is still inside you, but now you try to keep it locked away.",
				"Harrowing Event : You did terrible things to avenge the murder of someone you loved. You became a monster, and it haunts your waking dreams."
			];
			rea = [
				"",
				"",
				"",
				"",
				"",
				""
				];
			per = [
				"I don't run from evil. Evil runs from me.",
				"I like to read and memorize poetry. It keeps me calm and brings me fleeting moments of happiness.",
				"I spend money freely and live life to the fullest, knowing that tomorrow I might die.",
				"I live for the thrill of the hunt.",
				"I don't talk about the thing that torments me. I'd rather not burden others with my curse.",
				"I expect danger around every corner.",
				"I refuse to become a victim, and I will not allow others to be victimized.",
				"I put no trust in divine beings."
			];
			ide = [
				"I try to help those in need, no matter what the personal cost. (Good)",
				"I'll stop the spirits that haunt me or die trying. (Any)",
				"I kill monsters to make the world a safer place, and to exorcise my own demons. (Good)",
				"I have a dark calling that puts me above the law. (Chaotic)",
				"I like to know my enemy's capabilities and weaknesses before rushing into battle. (Lawful)",
				"I'm a monster that destroys other monsters, and anything else that gets in my way. (Evil)"
			];
			bon = [
				"I keep my thoughts and discoveries in a journal. My journal is my legacy.",
				"I would sacrifice my life and my soul to protect the innocent.",
				"My torment drove away the person I love. I strive to win back the love I've lost.",
				"A terrible guilt consumes me. I hope that I can find redemption through my actions.",
				"There's evil in me, I can feel it. It must never be set free.",
				"I have a child to protect. I must make the world a safer place for him (or her)."
			];
			fla = [
				"I have certain rituals that I must follow every day. I can never break them.",
				"I assume the worst in people.",
				"I feel no compassion for the dead. They're the lucky ones.",
				"I have an addiction.",
				"I am a purveyor of doom and gloom who lives in a world without hope.",
				"I talk to spirits that no one else can see."
			];
			break;
		case "Hermit" :
			sub = [
				"I was searching for spiritual enlightenment.",
				"I was partaking of communal living in accordance with the dictates of a religious order.",
				"I was exiled for a crime I didn't commit.",
				"I retreated from society after a life-altering event.",
				"I needed a quiet place to work on my art, literature, music, or manifesto.",
				"I needed to commune with nature, far from civilization.",
				"I was the caretaker of an ancient ruin or relic.",
				"I was a pilgrim in search of a person, place, or relic of spiritual significance."
			];
			rea = [
				"My enemies ruined my reputation, and I fled to the wilds to avoid further disparagement.",
				"I am comfortable with being isolated, as I seek inner peace.",
				"I never liked the people I called my friends, so it was easy for me to strike out on my own.",
				"I felt compelled to forsake my past, but did so with great reluctance, and sometimes I regret making that decision.",
				"I lost everything-my home, my family, my friends. Going it alone was all I could do.",
				"Society's decadence disgusted me, so I decided to leave it behind."
				];
			per = [
				"I've been isolated for so long that I rarely speak, preferring gestures and the occasional grunt.",
				"I am utterly serene, even in the face of disaster.",
				"The leader of my community had something wise to say on every topic, and I am eager to share that wisdom.",
				"I feel tremendous empathy for all who suffer.",
				"I'm oblivious to etiquette and social expectations.",
				"I connect everything that happens to me to a grand, cosmic plan.",
				"I often get lost in my own thoughts and contemplation, becoming oblivious to my surroundings.",
				"I am working on a grand philosophical theory and love sharing my ideas."
			];
			ide = [
				"Greater Good. My gifts are meant to be shared with all, not used for my own benefit. (Good)",
				"Logic. Emotions must not cloud our sense of what is right and true, or our logical thinking. (Lawful)",
				"Free Thinking. Inquiry and curiosity are the pillars of progress. (Chaotic)",
				"Power. Solitude and contemplation are paths toward mystical or magical power. (Evil)",
				"Live and Let Live. Meddling in the affairs of others only causes trouble. (Neutral)",
				"Self-Knowledge. If you know yourself, there's nothing left to know. (Any)"
			];
			bon = [
				"Nothing is more important than the other members of my hermitage, order, or association.",
				"I entered seclusion to hide from the ones who might still be hunting me. I must someday confront them.",
				"I'm still seeking the enlightenment I pursued in my seclusion, and it still eludes me.",
				"I entered seclusion because I loved someone I could not have.",
				"Should my discovery come to light, it could bring ruin to the world.",
				"My isolation gave me great insight into a great evil that only I can destroy."
			];
			fla = [
				"Now that I've returned to the world, I enjoy its delights a little too much.",
				"I harbor dark, bloodthirsty thoughts that my isolation and meditation failed to quell.",
				"I am dogmatic in my thoughts and philosophy.",
				"I let my need to win arguments overshadow friendships and harmony.",
				"I'd risk too much to uncover a lost bit of knowledge.",
				"I like keeping secrets and won't share them with anyone."
			];
			break;
		case "House Agent" :
			sub = [
				"Role : Acquisition",
				"Role : Investigation",
				"Role : Research & Development",
				"Role : Security",
				"Role : Intimidation",
				"Role : Exploration",
				"Role : Negotiation",
				"Role : Covert Operations"
			];
			rea = [
				"",
				"",
				"",
				"",
				"",
				""
				];
			per = [
				"I'm always looking to improve efficiency.",
				"I love to share trivia about my house's business.",
				"I never forget an insult against me or my house.",
				"I'm enthusiastic about everything my house does.",
				"I represent my house and take pride in my looks.",
				"I'm critical of monarchies and limits on the houses."
			];
			ide = [
				"Common Good. My house serves a vital function, and its prosperity will help everyone. (Good)",
				"Tradition. I uphold traditions of my house and bring honor to my family. (Lawful)",
				"Innovation. Abandon old traditions and find better ways to do things. (Chaotic)",
				"Power. I want to ensure the prosperity of my house and wield its power myself. (Evil)",
				"Discovery. I want to learn all I can, both for my house and for my own curiosity. (Any)",
				"Comfort. I want to ensure that me and mine enjoy the best things in life. (Any)"
			];
			bon = [
				"My house is my family. I would do anything for it.",
				"I love someone from another house, but the relationship is forbidden.",
				"Someone I love was killed by a rival faction within my house, and I will have revenge.",
				"I don't care about the house as a whole, but I would do anything for my old mentor.",
				"My house must evolve, and I'll lead the evolution.",
				"I'm determined to impress the leaders of my house, and to become a leader myself."
			];
			fla = [
				"I'm fixated on following official protocols.",
				"I'm obsessed with conspiracy theories and worried about secret societies and hidden demons.",
				"My house and bloodline make me the best!",
				"My secret could get me expelled from my house.",
				"My religious beliefs aren't widespread in my house.",
				"I'm working for a hidden faction in my house that gives me secret assignments."
			];
			break;
		case "Marine" :
			sub = [
				"Hardship : Nearly Drowned. You hid underwater to avoid detection by enemies and held your breath for an extremely long time. Just before you would have died, you had a revelation about your existence.",
				"Hardship : Captured. You spent months enduring thirst, starvation, and torture at the hands of your enemy, but you never broke.",
				"Hardship : Sacrifice. You enabled the escape of your fellow soldiers, but at great cost to yourself. Some of your past comrades may think you're dead.",
				"Hardship : Juggernaut. No reasonable explanation can explain how you survived a particular battle. Every arrow and bolt missed you. You slew scores of enemies single-handedly and led your comrades to victory.",
				"Hardship : Stowaway. For days, you hid in the bilge of an enemy ship, surviving on brackish water and foolhardy rats. At the right moment, you crept up to the deck and took over the ship on your own.",
				"Hardship : Leave None Behind. You carried an injured marine for miles to avoid capture and death."
			];
			rea = [
				"",
				"",
				"",
				"",
				"",
				""
				];
			per = [
				"I speak rarely but mean every word I say.",
				"I laugh loudly and see the humor in stressful situations.",
				"I prefer to solve problems without violence, but I finish fights decisively.",
				"I enjoy being out in nature; poor weather never sours my mood.",
				"I am dependable.",
				"I am always working on some project or other.",
				"I become cantankerous and quiet in the rain.",
				"When the sea is within my sight, my mood is jovial and optimistic."
			];
			ide = [
				"Teamwork. Success depends on cooperation and communication. (Good)",
				"Code. The marines' code provides a solution for every problem, and following it is imperative. (Lawful)",
				"Embracing. Life is messy. Throwing yourself into the worst of it is necessary to get the job done. (Chaotic)",
				"Might. The strong train so that they might rule those who are weak. (Evil)",
				"Bravery. To act when others quake in fear—this is the essence of the warrior. (Any)",
				"Perseverance. No injury or obstacle can turn me from my goal. (Any)"
			];
			bon = [
				"I face danger and evil to offset an unredeemable act in my past.",
				"I. Will. Finish. The. Job.",
				"I must set an example of hope for those who have given up.",
				"I'm searching for a fellow marine captured by an elusive enemy.",
				"Fear leads to tyranny, and both must be eradicated.",
				"My commander betrayed my unit, and I will have revenge."
			];
			fla = [
				"I grow combative and unpredictable when I drink.",
				"I find civilian life difficult and struggle to say the right thing in social situations.",
				"My intensity can drive others away.",
				"I hold grudges and have difficulty forgiving others.",
				"I become irrational when innocent people are hurt.",
				"I sometimes stay up all night listening to the ghosts of my fallen enemies."
			];
			break;
		case "Noble" :
			sub = [
				"",
				"",
				"",
				"",
				"",
				""
			];
			rea = [
				"I come from an old and storied family, and it fell to me to preserve the family name.",
				"My family has been disgraced, and I intend to clear our name.",
				"My family recently came by its title, and that elevation thrust us into a new and strange world.",
				"My family has a title, but none of my ancestors have distinguished themselves since we gained it.",
				"My family is filled with remarkable people. I hope to live up to their example.",
				"I hope to increase my family's power and influence."
				];
			per = [
				"My eloquent flattery makes everyone I talk to feel like the most wonderful and important person in the world.",
				"The common folk love me for my kindness and generosity.",
				"No one could doubt by looking at my regal bearing that I am a cut above the unwashed masses.",
				"I take great pains to always look my best and follow the latest fashions.",
				"I don't like to get my hands dirty, and I won't be caught dead in unsuitable accommodations.",
				"Despite my noble birth, I do not place myself above other folk. We all have the same blood.",
				"My favor, once lost, is lost forever.",
				"If you do me an injury, I will crush you, ruin your name, and salt your fields."
			];
			ide = [
				"Respect. Respect is due to me because of my position, but all people regardless of station deserve to be treated with dignity. (Good)",
				"Responsibility. It is my duty to respect the authority of those above me, just as those below me must respect mine. (Lawful)",
				"Independence. I must prove that I can handle myself without coddling from my family. (Chaotic)",
				"Power. If I can attain more power, no one will tell me what to do. (Evil)",
				"Family. Blood runs thicker than water. (Any)",
				"Noble Obligation. It is my duty to protect and care for the people beneath me. (Good)"
			];
			bon = [
				"I will face any challenge to win the approval of my family.",
				"My house's alliance with another noble family must be sustained at all costs.",
				"Nothing is more important than the other members of my family.",
				"I am in love with the heir of a family that my family despises.",
				"My loyalty to my sovereign is unwavering.",
				"The common folk must see me as a hero of the people."
			];
			fla = [
				"I secretly believe that everyone is beneath me.",
				"I hide a truly scandalous secret that could ruin my family forever.",
				"I too often hear veiled insults and threats in every word addressed to me, and I'm quick to anger.",
				"I have an insatiable desire for carnal pleasures.",
				"In fact, the world does revolve around me.",
				"By my words and actions, I often bring shame to my family."
			];
			break;
		case "Outlander" :
			sub = [
				"Forester",
				"Trapper",
				"Homesteader",
				"Guide",
				"Exile or Outcast",
				"Bounty Hunter",
				"Pilgrim",
				"Tribal Nomad",
				"Hunter-gatherer",
				"Tribal marauder"
			];
			rea = [
				"I spent a lot of time in the wilderness as a youngster, and I came to love that way of life.",
				"From a young age, I couldn't abide the stink of the cities and preferred to spend my time in nature.",
				"I came to understand the darkness that lurks in the wilds, and I vowed to combat it.",
				"My people lived on the edges of civilization, and I learned the methods of survival from my family.",
				"After a tragedy I retreated to the wilderness, leaving my old life behind.",
				"My family moved away from civilization, and I learned to adapt to my new environment."
				];
			per = [
				"I'm driven by a wanderlust that led me away from home",
				"I watch over my friends as if they were a litter of newborn pups.",
				"I once ran twenty-five miles without stopping to warn to my clan of an approaching orc horde. I'd do it again if I had to.",
				"I have a lesson for every situation, drawn from observing nature.",
				"I place no stock in wealthy or well-mannered folk. Money and manners won't save you from a hungry owlbear.",
				"I'm always picking things up, absently fiddling with them, and sometimes accidentally breaking them.",
				"I feel far more comfortable around animals than people",
				"I was, in fact, raised by wolves."
			];
			ide = [
				"Change. Life is like the seasons, in constant change, and we must change with it. (Chaotic)",
				"Greater Good. It is each person's responsibility to make the most happiness for the whole tribe. (Good)",
				"Honor. If I dishonor myself, I dishonor my whole clan. (Lawful)",
				"Might. The strongest are meant to rule. (Evil)",
				"Nature. The natural world is more important than all the constructs of civilization. (Neutral)",
				"Glory. I must earn glory in battle, for myself and my clan. (Any)"
			];
			bon = [
				"My family, clan, or tribe is the most important thing in my life, even when they are far from me.",
				"An injury to the unspoiled wilderness of my home is an injury to me.",
				"I will bring terrible wrath down on the evildoers who destroyed my homeland.",
				"I am the last of my tribe, and it is up to me to ensure their names enter legend.",
				"I suffer awful visions of a coming disaster and will do anything to prevent it.",
				"It is my duty to provide children to sustain my tribe."
			];
			fla = [
				"I am too enamored of ale, wine, and other intoxicants.",
				"There's no room for caution in a life lived to the fullest.",
				"I remember every insult I've received and nurse a silent resentment toward anyone who's ever wronged me.",
				"I am slow to trust members of other races, tribes, and societies.",
				"Violence is my answer to almost any challenge.",
				"Don't expect me to save those who can't save themselves. It is nature's way that the strong thrive and the weak perish."
			];
			break;
		case "Sage" :
			sub = [
				"Field of Study : Alchemist",
				"Field of Study : Astronomer",
				"Field of Study : Discredited academic",
				"Field of Study : Librarian",
				"Field of Study : Professor",
				"Field of Study : Researcher",
				"Field of Study : Wizard's apprentice",
				"Field of Study : Scribe"
			];
			rea = [
				"I was naturally curious, so I packed up and went to a university to learn more about the world.",
				"My mentor's teachings opened my mind to new possibilities in that field of study.",
				"I was always an avid reader, and I learned much about my favorite topic on my own.",
				"I discovered an old library and pored over the texts I found there. That experience awakened a hunger for more knowledge.",
				"I impressed a wizard who told me I was squandering my talents and should seek out an education to take advantage of my gifts.",
				"One of my parents or a relative gave me a basic education that whetted my appetite, and I left home to build on what I had learned."
				];
			per = [
				"I use polysyllabic words that convey the impression of great erudition.",
				"I've read every book in the world's greatest libraries—or I like to boast that I have.",
				"I'm used to helping out those who aren't as smart as I am, and I patiently explain anything and everything to others.",
				"There's nothing I like more than a good mystery.",
				"I'm willing to listen to every side of an argument before I make my own judgment.",
				"I... speak... slowly... when talking... to idiots,... which... almost... everyone... is... compared... to me.",
				"I am horribly, horribly awkward in social situations.",
				"I'm convinced that people are always trying to steal my secrets."
			];
			ide = [
				"Knowledge. The path to power and self-improvement is through knowledge. (Neutral)",
				"Beauty. What is beautiful points us beyond itself toward what is true. (Good)",
				"Logic. Emotions must not cloud our logical thinking. (Lawful)",
				"No Limits. Nothing should fetter the infinite possibility inherent in all existence. (Chaotic)",
				"Power. Knowledge is the path to power and domination. (Evil)",
				"Self-Improvement. The goal of a life of study is the betterment of oneself. (Any)"
			];
			bon = [
				"It is my duty to protect my students.",
				"I have an ancient text that holds terrible secrets that must not fall into the wrong hands.",
				"I work to preserve a library, university, scriptorium, or monastery.",
				"My life's work is a series of tomes related to a specific field of lore.",
				"I've been searching my whole life for the answer to a certain question.",
				"I sold my soul for knowledge. I hope to do great deeds and win it back."
			];
			fla = [
				"I am easily distracted by the promise of information.",
				"Most people scream and run when they see a demon. I stop and take notes on its anatomy.",
				"Unlocking an ancient mystery is worth the price of a civilization.",
				"I overlook obvious solutions in favor of complicated ones.",
				"I speak without really thinking through my words, invariably insulting others.",
				"I can't keep a secret to save my life, or anyone else's."
			];
			break;
		case "Sailor" :
			sub = [
				"Merchant Ship - Second Mate",
				"Merchant Ship - Boatswain",
				"Military Ship - Second Mate",
				"Military Ship - Boatswain",
				"Pirate Ship - Second Mate",
				"Pirate Ship - Boatswain"
			];
			rea = [
				"I was press-ganged by pirates and forced to serve on their ship until I finally escaped.",
				"I wanted to see the world, so I signed on as a deck-hand for a merchant ship.",
				"One of my relatives was a sailor who took me to sea.",
				"I needed to escape my community quickly, so I stowed away on a ship. When the crew found me, I was forced to work for my passage.",
				"Reavers attacked my community, so I found refuge on a ship until I could seek vengeance.",
				"I had few prospects where I was living, so I left to find my fortune elsewhere."
				];
			per = [
				"My friends know they can rely on me, no matter what.",
				"I work hard so that I can play hard when the work is done.",
				"I enjoy sailing into new ports and making new friends over a flagon of ale.",
				"I stretch the truth for the sake of a good story.",
				"To me, a tavern brawl is a nice way to get to know a new city.",
				"I never pass up a friendly wager.",
				"My language is as foul as an otyugh nest.",
				"I like a job well done, especially if I can convince someone else to do it."
			];
			ide = [
				"Respect. The thing that keeps a ship together is mutual respect between captain and crew. (Good)",
				"Fairness. We all do the work, so we all share in the rewards. (Lawful)",
				"Freedom. The sea is freedom—the freedom to go anywhere and do anything. (Chaotic)",
				"Mastery. I'm a predator, and the other ships on the sea are my prey. (Evil)",
				"People. I'm committed to my crewmates, not to ideals. (Neutral)",
				"Aspiration. Someday, I'll own my own ship and chart my own destiny. (Any)"
			];
			bon = [
				"I'm loyal to my captain first, everything else second.",
				"The ship is most important—crewmates and captains come and go.",
				"I'll always remember my first ship.",
				"In a harbor town, I have a paramour whose eyes nearly stole me from the sea.",
				"I was cheated out of my fair share of the profits, and I want to get my due.",
				"Ruthless pirates murdered my captain and crewmates, plundered our ship, and left me to die. Vengeance will be mine."
			];
			fla = [
				"I follow orders, even if I think they're wrong.",
				"I'll say anything to avoid having to do extra work.",
				"Once someone questions my courage, I never back down no matter how dangerous the situation.",
				"Once I start drinking, it's hard for me to stop.",
				"I can't help but pocket loose coins and other trinkets I come across.",
				"My pride will probably lead to my destruction."
			];
			break;
		case "Shipwright" :
			sub = [
				"Grand Designs. You are working on plans and schematics for a new, very fast ship. You must examine as many different kinds of vessels as possible to help ensure the success of your design.",
				"Solid and Sound. You patched up a war galley and prevented it from sinking. The local navy regards you as a friend.",
				"Favored. You insisted on thicker planking for a merchant vessel's hull, which saved it from sinking when it smashed against a reef. You have a standing invitation to visit the merchant's distant mansion.",
				"Master of Armaments. You specialized in designing and mounting defenses for the navy. You easily recognize and determine the quality of such items.",
				"Low Places. You have contacts in the smuggling outfits along the coast; you occasionally repair the criminals' ships in exchange for coin and favors.",
				"Mysteries of the Deep. You experienced an encounter with a possibly divine being while sailing alone. Work with your DM to determine the secret about the deep waters of the sea that this entity revealed to you."
			];
			rea = [
				"",
				"",
				"",
				"",
				"",
				""
				];
			per = [
				"I love talking and being heard more than I like to listen.",
				"I'm extremely fond of puzzles.",
				"I thrive under pressure.",
				"I love sketching and designing objects, especially boats.",
				"I'm not afraid of hard work—in fact, I prefer it.",
				"A pipe, an ale, and the smell of the sea: paradise.",
				"I have an endless supply of cautionary tales related to the sea.",
				"I don't mind getting my hands dirty."
			];
			ide = [
				"Crew. If everyone on deck pitches in, we'll never sink. (Good)",
				"Careful Lines. A ship must be balanced according to the laws of the universe. (Lawful)",
				"Invention. Make what you need out of whatever is at hand. (Chaotic)",
				"Perfection. To measure a being and find it lacking is the greatest disappointment. (Evil)",
				"Reflection. Muddied water always clears in time. (Any)",
				"Hope. The horizon at sea holds the greatest promise. (Any)"
			];
			bon = [
				"I must visit all the oceans of the world and behold the ships that sail there.",
				"Much of the treasure I claim will be used to enrich my community.",
				"I must find a kind of wood rumored to possess magical qualities.",
				"I repair broken things to redeem what's broken in myself.",
				"I will craft a boat capable of sailing through the most dangerous of storms.",
				"A kraken destroyed my masterpiece; its teeth shall adorn my hearth."
			];
			fla = [
				"I don't know when to throw something away. You never know when it might be useful again.",
				"I get frustrated to the point of distraction by shoddy craftsmanship.",
				"Though I am an excellent crafter, my work tends to look as though it belongs on a ship.",
				"I am so obsessed with sketching my ideas for elaborate inventions that I sometimes forget little thing like eating and sleeping.",
				"I'm judgmental of those who are not skilled with tools of some kind.",
				"I sometimes take things that don't belong to me, especially if they are very well made."
			];
			break;
		case "Smuggler" :
			sub = [
				"Accomplishment : Spirit of the Whale. You smuggled stolen dwarven spirits in the body of a dead whale being pulled behind a fishing boat. When you delivered the goods, the corpse suddenly exploded, sending whale meat and whiskey bottles for half a mile.",
				"Accomplishment : Cart and Sword. You drove a cart filled with stolen art through the middle of a battlefield while singing sea shanties to confuse the combatants.",
				"Accomplishment : The Recruit. You enlisted in another nation's navy for the purpose of smuggling stolen jewels to a distant port. You attained a minor rank before disappearing from the navy and making your way here.",
				"Accomplishment : River of Shadows. Your riverboat accidentally slipped through the veil into the Shadowfell for several hours. While you were there, you sold some stolen dragonborn artifacts before returning to this plane and paddling home.",
				"Accomplishment : Gold-Hearted. You agreed to transport a family escaping a war. The baby began to cry at a checkpoint, and you gave the guards all your gold to let you pass. The family never found out about this gesture.",
				"Accomplishment : Playing Both Sides. You once smuggled crates of crossbow bolts and bundles of arrows, each destined for an opposing side in a regional war, at the same time. The buyers arrived within moments of each other but did not discover your trickery."
			];
			rea = [
				"",
				"",
				"",
				"",
				"",
				""
				];
			per = [
				"I love being on the water but hate fishing.",
				"I think of everything in terms of monetary value.",
				"I never stop smiling.",
				"Nothing rattles me; I have a lie for every occasion.",
				"I love gold but won't cheat a friend.",
				"I enjoy doing things others believe to be impossible.",
				"I become wistful when I see the sun rise over the ocean.",
				"I am no common criminal; I am a mastermind."
			];
			ide = [
				"Wealth Heaps of coins in a secure vault is all I dream of. (Any)",
				"Smuggler's Code I uphold the unwritten rules of the smugglers, who do not cheat one another or directly harm innocents. (Lawful)",
				"All for a Coin I'll do nearly anything if it means I turn a profit. (Evil)",
				"Peace and Prosperity I smuggle only to achieve a greater goal that benefits my community. (Good)",
				"People For all my many lies, I place a high value on friendship. (Any)",
				"Daring I am most happy when risking everything. (Any)"
			];
			bon = [
				"My vessel was stolen from me, and I burn with the desire to recover it.",
				"I intend to become the leader of the network of smugglers that I belong to.",
				"I owe a debt that cannot be repaid in gold.",
				"After one last job, I will retire from the business.",
				"I was tricked by a fellow smuggler who stole something precious from me. I will find that thief.",
				"I give most of my profits to a charitable cause, and I don't like to brag about it."
			];
			fla = [
				"Lying is reflexive, and I sometimes engage in it without realizing.",
				"I tend to assess my relationships in terms of profit and loss.",
				"I believe everyone has a price and am cynical toward those who present themselves as virtuous.",
				"I struggle to trust the words of others.",
				"Few people know the real me.",
				"Though I act charming, I feel nothing for others and don't know what friendship is."
			];
			break;
		case "Soldier" :
			sub = [
				"Role : Officer",
				"Role : Scout",
				"Role : Infantry",
				"Role : Cavalry",
				"Role : Healer",
				"Role : Quartermaster",
				"Role : Standard-Bearer",
				"Role : Support staff (cook,blacksmith, or the like)"
			];
			rea = [
				"I joined the militia to help protect my community from monsters.",
				"A relative of mine was a soldier, and I wanted to carry on the family tradition.",
				"The local lord forced me to enlist in the army.",
				"War ravaged my homeland while I was growing up. Fighting was the only life I ever knew.",
				"I wanted fame and fortune, so I joined a mercenary company, selling my sword to the highest bidder.",
				"Invaders attacked my homeland. It was my duty to take up arms in defense of my people."
				];
			per = [
				"I'm always polite and respectful.",
				"I'm haunted by memories of war. I can't get the images of violence out of my mind.",
				"I've lost too many friends, and I'm slow to make new ones.",
				"I'm full of inspiring and cautionary tales from my military experience relevant to almost every combat situation.",
				"I can stare down a hell hound without flinching.",
				"I enjoy being strong and like breaking things.",
				"I have a crude sense of humor.",
				"I face problems head-on. A simple, direct solution is the best path to success."
			];
			ide = [
				"Greater Good. Our lot is to lay down our lives in defense of others. (Good)",
				"Responsibility. I do what I must and obey just authority. (Lawful)",
				"Independence. When people follow orders blindly, they embrace a kind of tyranny. (Chaotic)",
				"Might. In life as in war, the stronger force wins. (Evil)",
				"Live and Let Live. Ideals aren't worth killing over or going to war for. (Neutral)",
				"Nation. My city, nation, or people are all that matter. (Any)"
			];
			bon = [
				"I would still lay down my life for the people I served with.",
				"Someone saved my life on the battlefield. To this day, I will never leave a friend behind.",
				"My honor is my life.",
				"I'll never forget the crushing defeat my company suffered or the enemies who dealt it.",
				"Those who fight beside me are those worth dying for.",
				"I fight for those who cannot fight for themselves."
			];
			fla = [
				"The monstrous enemy we faced in battle still leaves me quivering with fear.",
				"I have little respect for anyone who is not a proven warrior.",
				"I made a terrible mistake in battle that cost many lives—and I would do anything to keep that mistake secret.",
				"My hatred of my enemies is blinding and unreasoning.",
				"I obey the law, even if the law causes misery.",
				"I'd rather eat my armor than admit when I'm wrong."
			];
			break;
		case "Urchin" :
			sub = [
				"",
				"",
				"",
				"",
				"",
				""
			];
			rea = [
				"Wanderlust caused me to leave my family to see the world. I look after myself.",
				"I ran away from a bad situation at home and made my own way in the world.",
				"Monsters wiped out my village, and I was the sole survivor. I had to find a way to survive.",
				"A notorious thief looked after me and other orphans, and we spied and stole to earn our keep.",
				"One day I woke up on the streets, alone and hungry, with no memory of my early childhood.",
				"My parents died, leaving no one to look after me. I raised myself."
				];
			per = [
				"I hide scraps of food and trinkets away in my pockets.",
				"I ask a lot of questions.",
				"I like to squeeze into small places where no one else can get to me.",
				"I sleep with my back to a wall or tree, with everything I own wrapped in a bundle in my arms.",
				"I eat like a pig and have bad manners.",
				"I think anyone who's nice to me is hiding evil intent.",
				"I don't like to bathe.",
				"I bluntly say what others are hinting at or hiding."
			];
			ide = [
				"Respect. All people, rich or poor, deserve respect. (Good)",
				"Community. We have to take care of each other, because no one else is going to do it. (Lawful)",
				"Change. The low are lifted up, and the high and mighty are brought down. Change is the nature of things. (Chaotic)",
				"Retribution. The rich need to be shown what life and death are like in the gutters. (Evil)",
				"People. I help the people who help me—that's what keeps us alive. (Neutral)",
				"Aspiration. I'm going to prove that I'm worthy of a better life. (Any)"
			];
			bon = [
				"My town or city is my home, and I'll fight to defend it.",
				"I sponsor an orphanage to keep others from enduring what I was forced to endure.",
				"I owe my survival to another urchin who taught me to live on the streets.",
				"I owe a debt I can never repay to the person who took pity on me.",
				"I escaped my life of poverty by robbing an important person, and I'm wanted for it.",
				"No one else should have to endure the hardships I've been through."
			];
			fla = [
				"If I'm outnumbered, I will run away from a fight.",
				"Gold seems like a lot of money to me, and I'll do just about anything for more of it.",
				"I will never fully trust anyone other than myself.",
				"I'd rather kill someone in their sleep than fight fair.",
				"It's not stealing if I need it more than someone else.",
				"People who can't take care of themselves get what they deserve."
			];
			break;
		default :
			console.log("DEFAULT CASE PROVOKED IN BACKGROUND : ERROR ERROR ERROR");
			sub = [""];
			rea = [""];
			per = [""];
			ide = [""];
			bon = [""];
			fla = [""];
			break;
	}
	
	let sub_roll = new Roll(`1d${sub.length}`).roll().total;
	let rea_roll = new Roll(`1d${rea.length}`).roll().total;
	let per_roll = new Roll(`1d${per.length}`).roll().total;
	let ide_roll = new Roll(`1d${ide.length}`).roll().total;
	let bon_roll = new Roll(`1d${bon.length}`).roll().total;
	let fla_roll = new Roll(`1d${fla.length}`).roll().total;
	
	let sub_select = sub[sub_roll-1];
	let rea_select = rea[rea_roll-1];
	let per_select = per[per_roll-1];
	let ide_select = ide[ide_roll-1];
	let bon_select = bon[bon_roll-1];
	let fla_select = fla[fla_roll-1];
	
	data.Background = back_select;
	data.SubBackground = sub_select;
	data.Reason = rea_select;
	data.Personality = per_select;
	data.Ideal = ide_select;
	data.Bond = bon_select;
	data.Flaw = fla_select;
	
	return data;
}


/*
Returns Stat Line Object
{str : 0,dex : 0,con : 0,ine : 0,wis : 0,cha : 0};
*/
function organizeStats(cla = "")
{
	let statString = `4d6kh3`;
	let stats = Array(6).fill(0).map(e=>new Roll(statString).roll().total);
	
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

	stats.sort((a,b)=>b-a);
	
	switch(high)
	{
		case "str" :
			output.str = stats[0];
			break;
		case "dex" :
			output.dex = stats[0];
			break;
		case "con" :
			output.con = stats[0];
			break;
		case "int" :
			output.ine = stats[0];
			break;
		case "wis" :
			output.wis = stats[0];
			break;
		case "cha" :
			output.cha = stats[0];
			break;
	}
	
	stats = stats.splice(1);
	
	switch(mid)
	{
		case "str" :
			output.str = stats[0];
			break;
		case "dex" :
			output.dex = stats[0];
			break;
		case "con" :
			output.con = stats[0];
			break;
		case "int" :
			output.ine = stats[0];
			break;
		case "wis" :
			output.wis = stats[0];
			break;
		case "cha" :
			output.cha = stats[0];
			break;
	}
	
	stats = stats.splice(1);
	stats.sort((a,b)=>a-b);

	switch(low)
	{
		case "str" :
			output.str = stats[0];
			break;
		case "dex" :
			output.dex = stats[0];
			break;
		case "con" :
			output.con = stats[0];
			break;
		case "int" :
			output.ine = stats[0];
			break;
		case "wis" :
			output.wis = stats[0];
			break;
		case "cha" :
			output.cha = stats[0];
			break;
	}
	
	stats = stats.splice(1);

	for(let obj in output)
	{
		if(output[obj] === 0)
		{
			output[obj] = stats[new Roll(`1d${stats.length}-1`).roll().total];
			stats = remove_variable(stats,output[obj]);
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
let cla_select = pick_class();
//console.log("Works | ",cla_select);
let back_select = pick_back();
//console.log("Works | ", back_select);
let race_select = pick_race(organizeStats(cla_select.mainClass));
//console.log("Works | ",race_select);



let output = `
	<table>
		<tr>
			<td>Gender</td>
			<td>${gender_select}</td>
		</tr>
		<tr>
			<td>Race</td>
			<td>${race_select.mainRace}</td>
		</tr>
		<tr>
			<td>Subrace</td>
			<td>${race_select.subRace}</td>
		</tr>
		<tr>
			<td>Background</td>
			<td>${back_select.Background}</td>
		</tr>
		<tr>
			<td>Class</td>
			<td>${cla_select.mainClass}</td>
		</tr>
		<tr>
			<td>Sub Class</td>
			<td>${cla_select.subClass}</td>
		</tr>
			<td>Height</td>
			<td>${race_select.height}</td>
		<tr>
		</tr>
			<td>Weight</td>
			<td>${race_select.weight}</td>
		<tr>
		<tr>
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
			<td>${race_select.stats.str}</td>
			<td>${race_select.stats.dex}</td>
			<td>${race_select.stats.con}</td>
			<td>${race_select.stats.ine}</td>
			<td>${race_select.stats.wis}</td>
			<td>${race_select.stats.cha}</td>
		</tr>
	</table>
	<table>${back_select.SubBackground}</table>
	<table>${cla_select.reason}</table>
	<table>${back_select.Reason}</table>
	<table>${back_select.Personality}</table>
	<table>${back_select.Ideal}</table>
	<table>${back_select.Bond}</table>
	<table>${back_select.Flaw}</table>
	`;

ChatMessage.create({
	user : game.user._id,
	content : output,
	speaker : speaker,
	whisper : game.users.entities.filter(u=>u.isGM).map(u=>u._id)
});