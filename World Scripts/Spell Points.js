/*
  Configurations
*/
const log = (...args) => console.log(`${config.name} | `, ...args);
const config = {
  active : true,
  name : "World Script Spell Points",
  key : "spellPoint",
  label : "Spell Point",
  data : {
    cost : {
      1 : 2,
      2 : 3, 
      3 : 5,
      4 : 6,
      5 : 7,
      6 : 9,
      7 : 10,
      8 : 11,
      9 : 13,
    },
    points : {
      1 : 4,
      2 : 6,
      3 : 14,
      4 : 17,
      5 : 27,
      6 : 32,
      7 : 38,
      8 : 44,
      9 : 57,
      10 : 64,
      11 : 73,
      12 : 73,
      13 : 83, 
      14 : 83, 
      15 : 94,
      16 : 94, 
      17 : 107,
      18 : 114,
      19 : 123,
      20 : 133,
    },
    class : {
      full : 1, half : 2, third : 3, artificer : 4
    }
  }
};

/*
  _getSpellPoint : gets the spell point value and maximum for an actor
  @return : object with both value and max spell slots
  @todo : 
*/
const _getSpellPoint = function (actor)
{
  let spellData = actor.data.data.spells;

  if(spellData[config.key].max === 0 && getMax() !== 0)
  {
    spellData[config.key].max = getMax();
    actor.update({ "data.spells" : spellData});
  }

  return {value : spellData.value || 0, max : spellData.max };

  function getMax()
  {
    let cumulative_level = actor.items
      .filter(item => item.type === `class`)
      .map((item)=> {
        let {spellcasting, levels} = item.data.data;
        return Math.floor(levels/config.data.class[spellcasting]);
      })
      .reduce((accumulator, value) => accumulator + value, 0);

    return config.data.points[cumulative_level] || 0;
  }
}

/*
  editCharacterSheet : removes spell slots and adds spell points to the character sheet
  
  @todo : 
      fix spell points (save in character sheet somehow)
      allow editing of the spellpoints via a popup (add button / dialog hook)
      fix for "warlock" case
*/
const _editCharacterSheet = function (app, html, data){
    const actor = app.actor, remove = ".spell-slots", add = ".spellcasting-ability";
    const spellPoint = _getSpellPoint(actor);
    
    html.find(remove).remove();
    html.find(add).append(
        `<div style="display:flex; justify-content:space-between; align-items:baseline">
            <label>Spell Points</label>
            <span>${spellPoint.value}/${spellPoint.max}</span>
        </div>`
    );
}

const _prepareData = function ()
{
  CONFIG.DND5E.spellLevels[config.key] = config.label;

  const prep = Actor.prototype.prepareBaseData;
  function extendActorData() {
    const spl = this.data.data.spells;
    spl[config.key] = spl[config.key] || {value : 0, override : null, max : 0};
    return prep.call(this);
  }
  Actor.prototype.prepareBaseData = extendActorData;
}
/*
  Hooks
*/
if(config.active) 
{
  _prepareData();
  Hooks.on("renderActorSheet", _editCharacterSheet);
}

//Add value for spell points?? make sure it updates based on rest type?
//Edit of spell Dialog to change 
//  "Consume Spell Slot" => "Consume Spell Points"
//  Logic behind the warning to account for spell points instead of slots
//  Logic behind what happens when the dialog is closed.

/*
  This might require a module.
*/