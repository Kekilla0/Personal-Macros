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
let data = { items : [], spellSlots : [], sorcPoints : {}, spells : [], cost : [2,3,5,6,7]};
let display_message = true;
let dialog_id = randomID();

(async ()=>{
  await dataCheck();

  log(data);

  updateDialog();
})();

  //add more information

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

  Object.entries(macroActor.data.data.spells).forEach(([key, {value, max}])=>{
    if(key !== `pact` && max !== 0) data.spellSlots.push({ slot : parseInt(key.charAt(5)), value, max });
    if(key === `pact` && max !== 0) data.spellSlots.push({ slot : `pact`, value, max });
  });

  if(data.items.find(i=> i.name === `Sorcerer`)._id === null) return error(`${macroActor.name} does not have a level in Sorcerer`);
  if(data.items.find(i=> i.name === `Font of Magic`)._id === null) return error(`${macroActor.name} does not have the Font of Magic item/feature.`);

  await fixFont();

  // add checkSlotsAvailable, checkSlotsMissing here --- maybe?

  // populate a new variable in data --- one for spells

  async function fixFont()
  {
    let font = macroActor.items.getName("Font of Magic");
    let { levels } = macroActor.items.getName("Sorcerer").data.data;
    let { uses} = font.data.data;

    if(uses.max !== levels)
    {
      let difference = levels - uses.max;
      uses.max = levels;
      uses.value = levels - difference;
      await font.update({ "data.uses" : uses });
    }
    data.sorcPoints = uses;
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
  buttons = { Ok : { label : `Ok`, callback : (html) => { executeHTML(html); }}, Cancel : { label : `Cancel` } };

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
        <h3 style="flex : 3; justify-content:flex-start;">Spell Slots : ${data.spellSlots.map(ss=> ss.value).join(`/`)}</h3>
        <h3 style="flex : 2; justify-content:flex-end;">Sorcery Points : ${data.sorcPoints.value}/${data.sorcPoints.max}</h3>
      </div>
      ${getActions()}
      ${getSecondaryActions()}
    </div>`;
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

  function getActions()
  {
    let { action, second } = getHTML();

    return `
      <div style="display:flex; flex-direction:row; justify-content:space-between; align-items:center; flex-grow:1;">
        <h3 style="flex : 1; justify-content:flex-start;"><label>Select Action : </label></h3>
        <h3 style="flex : 1; justify-content:flex-end;">
          <select id="${dialog_id}actions">
            ${(data.sorcPoints.value !== data.sorcPoints.max && checkSlotsAvailable()) ? `<option ${action === `sp` ? `selected` : ``} value="sp">Spell Slot => Sorcery Point</option>` : ``}
            ${(data.sorcPoints.value > 2 && checkSlotsMissing()) ? `<option ${action === `ss` ? `selected` : ``} value="ss">Sorcery Point => Spell Slot</option>` : ``}
            ${(data.sorcPoints.value > 0 && checkAction(`Metamagic: Careful Spell`)) ? `<option ${action === `cr` ? `selected` : ``} value="cr">Careful Spell</option>` : ``}
            ${(data.sorcPoints.value > 0 && checkAction(`Metamagic: Distant Spell`)) ? `<option ${action === `ds` ? `selected` : ``} value="ds">Distant Spell</option>` : ``}
            ${(data.sorcPoints.value > 0 && checkAction(`Metamagic: Empowered Spell`)) ? `<option ${action === `em` ? `selected` : ``} value="em">Empowered Spell</option>` : ``}
            ${(data.sorcPoints.value > 0 && checkAction(`Metamagic: Extended Spell`)) ? `<option ${action === `ex` ? `selected` : ``} value="ex">Extended Spell</option>` : ``}
            ${(data.sorcPoints.value > 3 && checkAction(`Metamagic: Heightened Spell`)) ? `<option ${action === `hi` ? `selected` : ``} value="hi">Heightened Spell</option>`: ``}
            ${(data.sorcPoints.value > 1 && checkAction(`Metamagic: Quickened Spell`)) ? `<option ${action === `qu` ? `selected` : ``} value="qu">Quickened Spell</option>` : ``}
            ${(data.sorcPoints.value > 1 && checkAction(`Metamagic: Subtle Spell`)) ? `<option ${action === `sb` ? `selected` : ``} value="sb">Subtle Spell</option>` : ``}
            ${(data.sorcPoints.value > 0 && checkAction(`Metamagic: Twinned Spell`)) ? `<option ${action === `tw` ? `selected` : ``} value="tw">Twinned Spell</option>` : ``}
          </select>
        </h3>
      </div>
      `;
  }
  function getSecondaryActions()
  {
    let { action, second } = getHTML(), label = ``, options = ``;

    // build secondary list for dialog
    switch(action)
    {
      case `sp` :
      case `tw` :
        label = `Pick Spell Slot : `;
        options = data.spellSlots
          .filter(({value})=> value!==0)
          .map(({slot})=>`<option ${second === slot.toString() ? `selected` : ``} value="${slot}">Level ${slot}</option>`).join(``);

        if(action === `tw`)
          options = `<option ${second === "0" ? `selected` : ``} value="0">Cantrip</option>${options}`;
        break;
      case `ss` :
        label = `Pick Spell Slot : `;
        options = data.spellSlots
          .filter(({slot, value, max})=> slot < 6 && data.cost[slot-1] <= data.sorcPoints.value && value < max)
          .map(({slot})=> `<option ${second === slot.toString() ? `selected` : ``} value="${slot}">Level ${slot}</option>`).join(``);
        break;
      case `cr` :
      case `ds` : 
      case `em` : 
      case `ex` :
      case `hi` :
      case `qu` :
      case `sb` :
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
  function checkAction(name)
  {
    return data.items.find(i=>i.name === name)._id !== null;
  }
  async function executeHTML(html)
  {
    let html_data = {
      action : html.find(`#${dialog_id}actions`)[0]?.value,
      second : html.find(`#${dialog_id}secondary`)[0]?.value
    };


    //execute and update based on what the user chose

    log("Action     | ", html_data.action);
    log("Secondary  | ", html_data.second);
  }
}



