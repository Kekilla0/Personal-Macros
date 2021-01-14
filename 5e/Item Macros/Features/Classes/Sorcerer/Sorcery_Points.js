/*
  Sorcery Point Macro
  Requirements : 
    1. Character or Token must possess 
      A. A level in "Sorcerer"
      B. Item named "Font of Magic"
      C. Optional : Items appropriately named for Specific Metamagics
*/

let log = (...args) => console.log("Sorcery Point Macro | ", ...args);
let wait = async (ms) => new Promise((resolve)=> setTimeout(resolve, ms));
let macroActor = character !== null ? character : token.actor;
let data = { items : [], spellSlots : [], sorcPoints : {}, cost : [2,3,5,6,7], spellDiff : false, pointDiff : false};
let display_message = true;
let dialog_id = randomID();

(async ()=>{
  await dataCheck();

  log(data);

  updateDialog();
})();

  //execute choice

  //display choice (if the user wants it)


async function dataCheck()
{
  let items = [
    "Sorcerer", 
    "Font of Magic", 
    "Metamagic: Careful Spell", 
    "Metamagic: Distant Spell", 
    "Metamagic: Empowered Spell", 
    "Metamagic: Extended Spell", 
    "Metamagic: Heightened Spell", 
    "Metamagic: Quickened Spell", 
    "Metamagic: Subtle Spell", 
    "Metamagic: Twinned Spell"
  ];

  if(!macroActor) return error(`No Actor Selected (Character or Token)`);

  items.forEach(name =>{
    let item = macroActor.items.getName(name);

    if(!item) data.items.push({_id : null, name });
    else data.items.push({_id : item.id, name});
  });

  Object.entries(macroActor.data.data.spells).filter(([key, value])=> key !== `spell0`).forEach(([key, {value, max}])=>{
		data.spellSlots.push({ slot : key === `pact` ? key : parseInt(key.charAt(5)), value, max });
  });

  if(!checkAction(`Sorcerer`)) return error(`${macroActor.name} does not have a level in Sorcerer`);
  if(!checkAction(`Font of Magic`)) return error(`${macroActor.name} does not have the Font of Magic item/feature.`);

  await fixFont();

  async function fixFont()
  {
    let font = macroActor.items.getName("Font of Magic");
    let { levels } = macroActor.items.getName("Sorcerer").data.data;
    let { uses } = font.data.data;

    if(uses.max !== levels)
    {
      let difference = levels - uses.max;
      uses.max = levels;
      uses.value = levels - difference;
      await font.update({ "data.uses" : uses });
    }
		data.sorcPoints = uses.value !== null ? uses : {...uses, value : 0 };
		
		log(data.sorcPoints);
  }
}
function checkSlotsAvailable()
{
  return data.spellSlots.reduce((acc, val) => val.value > 0 || acc, false);
}
function checkSlotsMissing()
{
  return data.spellSlots.reduce((acc, val) => val.value !== val.max || acc, false);
}
function error(message)
{
  ui.notifications.error(message);
  return new Error(message);
}
async function updateDialog()
{
  let interval, content, buttons, dialog, interval_time, last_action;
  
  interval_time = 0.2;

  content = getContent();
	buttons = { Cancel : { label : `Cancel` }, Ok : { label : `Ok`, callback : (html) => { executeHTML(html); }}};
  dialog = new Dialog({ title : `Sorcerer Point Macro`, content, buttons, close : ()=> { clearInterval(interval); }}).render(true);

  interval = setInterval(()=>{
		let {action} = getHTML();
    if(last_action !== action)
    {
      last_action = action;
      update();
    }
  }, interval_time * 1000);

  function getContent()
  {
    return `
    <div style="display:flex; flex-direction:column;">
      <div style="display:flex; flex-direction:row; justify-content:space-between; align-items:center; flex-grow:2;">
        <img style="flex: 0 0 36px; margin-right : 5px; justify-content:flex-start;" src="${macroActor.data.img}" width="42" height="42"/>
        <h3 style="flex : 1; justify-content:flex-end">${macroActor.data.name} </h3>
      </div>
      <div style="display:flex; flex-direction:row; justify-content:space-between; align-items:center; flex-grow:1;">
        <h3 style="flex : 3; justify-content:flex-start;">Spell Slots : ${data.spellSlots.filter(ss=> ss.value > 0).map(ss=> ss.value).join(`/`)}</h3>
        <h3 style="flex : 2; justify-content:flex-end;">Sorcery Points : ${data.sorcPoints.value}/${data.sorcPoints.max}</h3>
      </div>
      ${getActions()}
      ${getSecondaryActions()}
		</div>`;
		
		function getActions()
		{
			let { action, second } = getHTML();
	
			return `
				<div style="display:flex; flex-direction:row; justify-content:space-between; align-items:center; flex-grow:1;">
					<h3 style="flex : 1; justify-content:flex-start;"><label>Select Action : </label></h3>
					<h3 style="flex : 1; justify-content:flex-end;">
						<select id="${dialog_id}actions">
							${(data.sorcPoints.value !== data.sorcPoints.max && checkSlotsAvailable()) ? `<option ${action === `sp` ? `selected` : ``} value="sp">Convert Spell Slots</option>` : ``}
							${(data.sorcPoints.value > 2 && checkSlotsMissing()) ? `<option ${action === `ss` ? `selected` : ``} value="ss">Create Spell Slots</option>` : ``}
							${(data.sorcPoints.value > 0 && checkAction(`Metamagic: Careful Spell`)) ? `<option ${action === `careful` ? `selected` : ``} value="careful">Careful Spell</option>` : ``}
							${(data.sorcPoints.value > 0 && checkAction(`Metamagic: Distant Spell`)) ? `<option ${action === `distant` ? `selected` : ``} value="distant">Distant Spell</option>` : ``}
							${(data.sorcPoints.value > 0 && checkAction(`Metamagic: Empowered Spell`)) ? `<option ${action === `empowered` ? `selected` : ``} value="empowered">Empowered Spell</option>` : ``}
							${(data.sorcPoints.value > 0 && checkAction(`Metamagic: Extended Spell`)) ? `<option ${action === `extended` ? `selected` : ``} value="extended">Extended Spell</option>` : ``}
							${(data.sorcPoints.value > 2 && checkAction(`Metamagic: Heightened Spell`)) ? `<option ${action === `heightened` ? `selected` : ``} value="heightened">Heightened Spell</option>`: ``}
							${(data.sorcPoints.value > 1 && checkAction(`Metamagic: Quickened Spell`)) ? `<option ${action === `quickened` ? `selected` : ``} value="quickened">Quickened Spell</option>` : ``}
							${(data.sorcPoints.value > 1 && checkAction(`Metamagic: Subtle Spell`)) ? `<option ${action === `subtle` ? `selected` : ``} value="subtle">Subtle Spell</option>` : ``}
							${(data.sorcPoints.value > 0 && checkAction(`Metamagic: Twinned Spell`)) ? `<option ${action === `twinned` ? `selected` : ``} value="twinned">Twinned Spell</option>` : ``}
						</select>
					</h3>
				</div>
				`;
		}
		function getSecondaryActions()
		{
			let { action, second } = getHTML(), label = ``, options = ``;
	
			switch(action)
			{
				case `sp` :
				case `twinned` :
					label = `Pick Spell Slot : `;
					options = data.spellSlots
						.filter(({value})=> value!==0)
						.map(({slot})=>`<option ${second === slot.toString() ? `selected` : ``} value="${slot}">Level ${slot}</option>`).join(``);
	
					if(action === `twinned`)
						options = `<option ${second === "0" ? `selected` : ``} value="0">Cantrip</option>${options}`;
					break;
				case `ss` :
					label = `Pick Spell Slot : `;
					options = data.spellSlots
						.filter(({slot, value, max})=> slot < 6 && data.cost[slot-1] <= data.sorcPoints.value && value < max)
						.map(({slot})=> `<option ${second === slot.toString() ? `selected` : ``} value="${slot}">Level ${slot}</option>`).join(``);
					break;
				case `careful` :
				case `distant` : 
				case `empowered` : 
				case `extended` :
				case `heightened` :
				case `quickened` :
				case `subtle` :
					label = options = ``;
					break;
				default : 
					label = options = `Error`;
					break;
			}
	
			return label === `` ? `` : `
				<div style="display:flex; flex-direction:row; justify-content:space-between; align-items:center; flex-grow:1;">
					<h3 style="flex : 1; justify-content:flex-start;"><label>${label}</label></h3>
					<h3 style="flex : 1; justify-content:flex-end;">
						<select id="${dialog_id}secondary">
							${options}
						</select>
					</h3>
				</div>
				`;
		}
  }
  function update()
  {
    dialog.data.content = getContent();
    dialog.render(true);
  }
  function getHTML()
  {
    let action = $.find(`#${dialog_id}actions`)[0]?.value;
    let second = $.find(`#${dialog_id}secondary`)[0]?.value;

    return { action, second };
  }
  async function executeHTML(html)
  {
    let html_data = {
      action : html.find(`#${dialog_id}actions`)[0]?.value,
      second : html.find(`#${dialog_id}secondary`)[0]?.value
		};
		let level = 0;

    log("Action     | ", html_data.action);
		log("Secondary  | ", html_data.second);

		switch(html_data.action)
		{
			case `sp` :
				level = parseInt(html_data.second);	
				editSpellSlots(level, -1);
				editSorceryPoints(level);
				break;
			case `twinned` :
			case `ss` :
				level = parseInt(html_data.second);
				if(html_data.action === `ss`)
					editSpellSlots(level,+1);
				editSorceryPoints((data.cost[level]-1)*-1);
				break;
			case `careful` :
			case `distant` : 
			case `empowered` : 
			case `extended` :
				editSorceryPoints(-1);
				break;
			case `quickened` :
			case `subtle` :
				editSorceryPoints(-2);
				break;
			case `heightened` :
				editSorceryPoints(-3);
				break;
			default : 
				break;
		}

		await updateActor();
		await executeItem(html_data.action);
	}
}
function checkAction(name)
{
	return data.items.find(i=>i.name === name)._id !== null;
}
function editSorceryPoints(num)
{
	data.sorcPoints.value = Math.clamped(data.sorcPoints.value + num, 0, data.sorcPoints.max);
	data.pointDiff = true;
}
function editSpellSlots(level, num)
{
	let obj = {value, max, slot} = data.spellSlots.find(d=> d.slot === level);
	let index = data.spellSlots.indexOf(obj);
	data.spellSlots[index].value = Math.clamped(value + num, 0, max);
	data.spellSlots[index].diff = true;
	data.spellDiff = true;
}
async function executeItem(item_code)
{
	if(!display_message || !item_code  || item_code === `ss` || item_code === `sp` ) return;
	let item_name = data.items.find(i=>i.name.toLowerCase().includes(item_code))?.name;	

	if(!item_name) return error(`Failed to find ${item_code}`);

	await macroActor.items.getName(item_name)?.roll();
}
async function updateActor()
{
	if(data.pointDiff)
	{
		let uses = duplicate(data.sorcPoints);
		await macroActor.items.getName("Font of Magic").update({ "data.uses" : uses });
	}

	if(data.spellDiff)
	{
		let spells = {};
		data.spellSlots.filter(d=> d.diff).forEach(d=> {
			let key = d.slot === `pact` ? `pact` : `spell${d.slot}`;
			spells[key] = { value : d.value };
		});

		if(spells === {}) return;
		await macroActor.update({"data.spells" : spells});
	}
}


