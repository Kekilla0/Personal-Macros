/*sorcerer point macro

*/
let outlog =(...args) => console.log("Sorcerer | ", ...args);
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

	new Dialog({
		title : "Sorcery Points Spender",
		content : `
			<div class = "form-group">
				<br>
				<label>Select Action  : </label>
				<select id="use" name="use">
					<option value = "sorcPoint">Spell Slot => Sorcery Point</option>
					<option value = "spellSlot">Sorcery Point => Spell Slot</option>
					<option value = "extend">Extend Spell</option>
					<option value = "twin">Twinned Spell</option>
				</select>
				<br><br>
			</div>`,
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
					case "extend" :
						metaMagic_Extended();
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
			newContent += `<option value = "${slot}">Spell Slot Level ${slot.charAt(5)} - ${s_slots[slot].value} </option>`;
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
				outlog("confirmed.")
				let lvlchosen = html.find('[name=lvl]')[0].value;
				let actorUpdateData = duplicate(s_actor);
				let itemUpdateData = duplicate(s_points);
				outlog(lvlchosen,actorUpdateData,itemUpdateData);
				//This is where you would want to check for validity of use, maybe even a dialot to stop if unnecessary.
				actorUpdateData.data.spells[lvlchosen].value -= 1;
				itemUpdateData.data.uses.value += Math.clamped(parseInt(lvlchosen.charAt(5)),0,itemUpdateDatal.data.uses.max);
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
	let newContent = `<div class = "form-group">
						<br>
						<label>Select Level  : </label>
						<select id="lvl" name="lvl">`;
	for(let slot in s_slots)
	{
		if(parseInt(slot.charAt(5)) <= Math.ceil(s_class.data.levels/2) && parseInt(slot.charAt(5)) < 6)
		{
			//2->1, 3->2, 5->3, 6->4, 7->5
			//s_points.data.uses.value
			let s_cost = [2,3,5,6,7];
			if(s_points.data.uses.value >= s_cost[parseInt(slot.charAt(5)-1)]){
				newContent += `<option value="${slot}">Spell Slot Level ${slot.charAt(5)} - ${s_slots[slot].value}</option>`;
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
			
		}
	}).render(true);
}
function metaMagic_Extended()
{
	{
		new Dialog({
			title : "",
			content : "",
			buttons : {
				one : {

				},
				two : {

				}
			},
			default : "Cancel",
			close : html => {
				
			}
		}).render(true);
	}
}
function metaMagic_Twinned()
{
	{
		new Dialog({
			title : "",
			content : "",
			buttons : {
				one : {

				},
				two : {

				}
			},
			default : "Cancel",
			close : html => {
				
			}
		}).render(true);
	}
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