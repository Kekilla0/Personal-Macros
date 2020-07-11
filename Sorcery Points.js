/*sorcerer point macro
 *Module Requirements : Furnace
 *Character Requirements : 	Must be a user with levels in "Sorcerer".
 *				Must have a feature with uses equal to sorcerer level named "Sorcery Points"
 *				Metamagic Feats must be named as they are in the Macro.
 */
let outlog =(...args) => console.log("Sorcerer | ", ...args);
let debug = false;
//error checking
if(game.user.character === null) return ui.notifications.warn(`Go away GM you are drunk.`);
if(game.user.character.data.items.find(i=>i.name==="Sorcerer")===undefined) return ui.notifications.warn(`Your character does not have a Sorcerer Class.`);
//variable creation
let s_actor = game.user.character;
let s_class = s_actor.data.items.find(i=>i.name==="Sorcerer");
let s_points = s_actor.data.items.find(i=>i.name==="Sorcery Points");
let s_slots = s_actor.data.data.spells;
let confirmed = false;

//dialog
Sorcerer_Dialog();

//functions
function Sorcerer_Dialog()
{
	if(s_class.data.levels > 1 && s_class.data.levels !== s_points.data.uses.max) return ui.notifications.warn(`Sorcery Points value is incorrect.`);
	let content = `
		<div class = "form-group">
			<br>
			<label>Select Action  : </label>
			<select id="use" name="use">`;
	if(checkSlots("available") && s_points.data.uses.value !== s_points.data.uses.max) {content += `<option value = "sorcPoint">Spell Slot => Sorcery Point</option>`;}
	if(checkSlots("missing") && s_points.data.uses.value >= 2){content += `<option value = "spellSlot">Sorcery Point => Spell Slot</option>`;}
	if(checkPoints() > 0 && checkSlots("available"))
	{

		if(game.user.character.data.items.find(i=>i.name==="Metamagic: Careful Spell")!==undefined)
                      {content += `<option value = "careful">Careful Spell Spell</option>`;}
                if(game.user.character.data.items.find(i=>i.name==="Metamagic: Distant Spell")!==undefined)
                      {content += `<option value = "distant">Distant Spell</option>`;}
                if(game.user.character.data.items.find(i=>i.name==="Metamagic: Empowered Spell")!==undefined)
                      {content += `<option value = "empower">Empowered Spell</option>`;}
                if(game.user.character.data.items.find(i=>i.name==="Metamagic: Extended Spell")!==undefined)
                      {content += `<option value = "extend">Extended Spell</option>`;}
                if(game.user.character.data.items.find(i=>i.name==="Metamagic: Heightened Spell")!==undefined)
                      {content += `<option value = "heighten">Heightened Spell</option>`;}
                if(game.user.character.data.items.find(i=>i.name==="Metamagic: Quickened Spell")!==undefined)
                      {content += `<option value = "quicken">Quickened Spell</option>`;}
                if(game.user.character.data.items.find(i=>i.name==="Metamagic: Subtle Spell")!==undefined)
                      {content += `<option value = "subtle">Subtle Spell</option>`;}
		if(game.user.character.data.items.find(i=>i.name==="Metamagic: Twinned Spell")!==undefined)
                      {content += `<option value = "twin">Twinned Spell</option>`;}
	}
	content += `</select><br><br></div>`;

	new Dialog({
		title : "Sorcery Points Spender",
		content : content,
		buttons : {
			one : {
				icon :`<i class="fas fa-check"></i>`,
				lable : "Continue",
				callback : () => confirmed = true
			},
			two : {
				icon : `<i class="fas fa-times"></i>`,
				lable : "Cancel",
				callback : () => confirmed = false
			}
		},
		default : "Cancel",
		close : html => {
			if(confirmed){
				switch(html.find('[name=use]')[0].value){
					case "sorcPoint" :
						spell_SorceryPoints();
						break;
					case "spellSlot" :
						sorceryPoints_spell();
						break;
					case "careful" :
						metaMagic_Careful();
						break;
					case "distant" :
						metaMagic_Distant();
						break;
					case "empower" :
						metaMagic_Empowered();
						break;
					case "extend" :
						metaMagic_Extended();
						break;
					case "heighten" :
						metaMagic_Heightened();
						break;
					case "quicken" :
						metaMagic_Quickened();
						break;
					case "subtle" :
						metaMagic_Subtle();
						break;
					case "twin" :
						metaMagic_Twinned();
						break;
				}
			}
		}
	}).render(true);
}
function spell_SorceryPoints()
{
	//variable creation
	confirmed = false;
	let newContent = `<div class = "form-group">
						<br>
						<label>Select Level  : </label>
						<select id="lvl" name="lvl">`;
	for(let slot in s_slots)
	{
		if(s_slots[slot].value !== 0 && s_slots[slot].value !== undefined)
		{
			newContent += `<option value = "${slot}">Spell Slot Level ${slot.charAt(5)} (${s_slots[slot].value} currently)</option>`;
		}
	}
	newContent += `</select></div>`;
	//Dialog and Logic
	new Dialog({
		title : "Creating Sorcery Points",
		content : newContent,
		buttons : {
			one : {
				icon :`<i class="fas fa-check"></i>`,
				lable : "Continue",
				callback : () => confirmed = true
			},
			two : {
				icon : `<i class="fas fa-times"></i>`,
				lable : "Cancel",
				callback : () => confirmed = false
			}
		},
		default : "Cancel",
		close : html => {
			if(confirmed)
			{
				//variable creation
				let lvlchosen = html.find('[name=lvl]')[0].value;
				let actorUpdateData = duplicate(s_actor);
				let itemUpdateData = duplicate(s_points);
				//This is where you would want to check for validity of use, maybe even a dialog to stop if unnecessary.
				actorUpdateData.data.spells[lvlchosen].value -= 1;
				itemUpdateData.data.uses.value += Math.clamped(parseInt(lvlchosen.charAt(5)),0,itemUpdateData.data.uses.max);
				//character and item update
				s_actor.update(actorUpdateData);
				s_actor.updateEmbeddedEntity("OwnedItem", itemUpdateData);
				//Display Information
				display(`Succesfully Used a : Level ${lvlchosen.charAt(5)} Spell Slot <br> Creating : ${lvlchosen.charAt(5)} sorcery points.`);
			}
		}
	}).render(true);
}
function sorceryPoints_spell()
{
	//variable creation
	confirmed = false;
	let s_cost = [2,3,5,6,7];
	let newContent = `<div class = "form-group">
						<br>
						<label>Select Level  : </label>
						<select id="lvl" name="lvl">`;
	for(let slot in s_slots)
	{
		if(parseInt(slot.charAt(5)) <= Math.ceil(s_class.data.levels/2) && parseInt(slot.charAt(5)) < 6)
		{
			if(s_points.data.uses.value >= s_cost[parseInt(slot.charAt(5)-1)] && s_slots[slot].value !== s_slots[slot].max)
			{
				newContent += `<option value="${slot}">Spell Slot Level ${slot.charAt(5)} (${s_slots[slot].value} currently)</option>`;
			}
		}
	}
	newContent += `</select></div>`;
	new Dialog({
		title : "Creating Spell Slots",
		content : newContent,
		buttons : {
			one : {
				icon :`<i class="fas fa-check"></i>`,
				lable : "Continue",
				callback : () => confirmed = true
			},
			two : {
				icon : `<i class="fas fa-times"></i>`,
				lable : "Cancel",
				callback : () => confirmed = false
			}
		},
		default : "Cancel",
		close : html => {
			if (confirmed){
				let lvlchosen = html.find('[name=lvl]')[0].value;
				let actorUpdateData = duplicate(s_actor);
				let itemUpdateData = duplicate(s_points);
				actorUpdateData.data.spells[lvlchosen].value += 1;
				itemUpdateData.data.uses.value -= Math.clamped((s_cost[parseInt(lvlchosen.charAt(5)-1)]),0,itemUpdateData.data.uses.max);
				s_actor.update(actorUpdateData);
				s_actor.updateEmbeddedEntity("OwnedItem", itemUpdateData);
				display(`Succesfully Used : ${s_cost[parseInt(lvlchosen.charAt(5)-1)]} sorcery points. <br> Creating : Spell Slot Level ${lvlchosen.charAt(5)}`);
			}
		}
	}).render(true);
}
function metaMagic_Careful()
{
	if(game.user.character.data.items.find(i=>i.name==="Metamagic: Careful Spell")===undefined) return ui.notifications.warn(`Your character does not have a Metamagic: Careful Spell.`);
	game.dnd5e.rollItemMacro("Metamagic: Careful Spell").then(()=> {
		let itemUpdateData = duplicate(s_points);
		itemUpdateData.data.uses.value -= 1;
		s_actor.updateEmbeddedEntity("OwnedItem", itemUpdateData);
	});

}
function metaMagic_Distant()
{
	if(game.user.character.data.items.find(i=>i.name==="Metamagic: Distant Spell")===undefined) return ui.notifications.warn(`Your character does not have a Metamagic: Distant Spell.`);
	game.dnd5e.rollItemMacro("Metamagic: Distant Spell").then(()=> {
		let itemUpdateData = duplicate(s_points);
		itemUpdateData.data.uses.value -= 1;
		s_actor.updateEmbeddedEntity("OwnedItem", itemUpdateData);
	});

}
function metaMagic_Empowered()
{
	if(game.user.character.data.items.find(i=>i.name==="Metamagic: Empowered Spell")===undefined) return ui.notifications.warn(`Your character does not have a Metamagic: Empowered Spell.`);
	game.dnd5e.rollItemMacro("Metamagic: Empowered Spell").then(()=> {
		let itemUpdateData = duplicate(s_points);
		itemUpdateData.data.uses.value -= 1;
		s_actor.updateEmbeddedEntity("OwnedItem", itemUpdateData);
	});

}
function metaMagic_Extended()
{
	if(game.user.character.data.items.find(i=>i.name==="Metamagic: Extended Spell")===undefined) return ui.notifications.warn(`Your character does not have a Metamagic: Extended Spell.`);
	game.dnd5e.rollItemMacro("Metamagic: Extended Spell").then(()=> {
		let itemUpdateData = duplicate(s_points);
		itemUpdateData.data.uses.value -= 1;
		s_actor.updateEmbeddedEntity("OwnedItem", itemUpdateData);
	});

}
function metaMagic_Heightened()
{
	if(game.user.character.data.items.find(i=>i.name==="Metamagic: Heightened Spell")===undefined) return ui.notifications.warn(`Your character does not have a Metamagic: Heightened Spell.`);
	game.dnd5e.rollItemMacro("Metamagic: Heightened Spell").then(()=> {
		let itemUpdateData = duplicate(s_points);
		itemUpdateData.data.uses.value -= 3;
		s_actor.updateEmbeddedEntity("OwnedItem", itemUpdateData);
	});

}
function metaMagic_Quickened()
{
	if(game.user.character.data.items.find(i=>i.name==="Metamagic: Quickened Spell")===undefined) return ui.notifications.warn(`Your character does not have a Metamagic: Quickened Spell.`);
	game.dnd5e.rollItemMacro("Metamagic: Quickened Spell").then(()=> {
		let itemUpdateData = duplicate(s_points);
		itemUpdateData.data.uses.value -= 2;
		s_actor.updateEmbeddedEntity("OwnedItem", itemUpdateData);
	});

}
function metaMagic_Subtle()
{
	if(game.user.character.data.items.find(i=>i.name==="Metamagic: Subtle Spell")===undefined) return ui.notifications.warn(`Your character does not have a Metamagic: Subtle Spell.`);
	game.dnd5e.rollItemMacro("Metamagic: Subtle Spell").then(()=> {
		let itemUpdateData = duplicate(s_points);
		itemUpdateData.data.uses.value -= 1;
		s_actor.updateEmbeddedEntity("OwnedItem", itemUpdateData);
	});

}
function metaMagic_Twinned()
{
	if(game.user.character.data.items.find(i=>i.name==="Metamagic: Twinned Spell")===undefined) return ui.notifications.warn(`Your character does not have a Metamagic: Twinned Spell.`);
	confirmed = false;
	let newContent = `<div class = "form-group">
	<br>
	<label>Select Level  : </label>
	<select id="lvl" name="lvl">`;
	for(let slot in s_slots)
	{
		if(parseInt(slot.charAt(5)) <= s_points.data.uses.value)
		{
			newContent += `<option value="${slot}">Spell Slot Level ${slot.charAt(5)} - ${s_slots[slot].value}</option>`;
		}
	}
	newContent += `</select></div>`;
	new Dialog({
		title : "Twinned Spell",
		content : content,
		buttons : {
			one : {
				icon :`<i class="fas fa-check"></i>`,
				lable : "Continue",
				callback : () => confirmed = true
			},
			two : {
				icon : `<i class="fas fa-times"></i>`,
				lable : "Cancel",
				callback : () => confirmed = false
			}
		},
		default : "Cancel",
		close : html => {
			if(confirmed)
			{
				game.dnd5e.rollItemMacro("Metamagic: Twinned Spell").then(()=>{
					let lvlchosen = html.find('[name=lvl]')[0].value;
					let itemUpdateData = duplicate(s_points);
					itemUpdateData.data.uses.value -= parseInt(lvlchosen.charAt(5));
					s_actor.updateEmbeddedEntity("OwnedItem", itemUpdateData);
				});
			}
		}
	}).render(true);
}
function display(data =""){
	if(data!=="")
	{
		ChatMessage.create({
			user : game.user._id,
			content : data,
			speaker : speaker//, //GM whisper (to not make the chat window huge)
			//whisper : game.users.entities.filter(u=>u.isGM).map(u=>u._id)
		});
	}
}
function checkSlots(data = "")
{
	if(data === "available")
	{
		for(let slot in s_slots)
		{
			if(s_slots[slot].value > 0)
			{
				return true;
			}
		}
	}else if (data === "missing")
	{
		for(let slot in s_slots)
		{
			if(s_slots[slot].value !== s_slots[slot].max)
			{
				return true;
			}
		}
	}
	return false;
}
function checkPoints(){
	return s_points.data.uses.value;
}
