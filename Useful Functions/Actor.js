/*
  Create A Blank Character for a User (and attach it to their account)
*/
function createCharacter({ user })
{
  let data = {
    name : `${user.name} - Character`,
    type : `character`,
    permission : { }
  };

  data.permission[user.id] = 3;

  let actor = await Actor.create(data);
  await user.update({ character : actor.id });
}

/*
  Change Actor Sheet 
*/
async function sheetChange({ actor, sheetName }={})
{
  return await actor.setFlag(`core`,`sheetClass`, sheetName);
}

/*
  Create Linked Actor From Token
*/
async function linkToken({ token })
{
  if(!token || token.data.actorLink || token.data.actorData === {}) return;

  let {actorData} = duplicate(token.data);
  let baseActor = game.actors.get(token.data.actorId), newActor = await Actor.create(baseActor.data);

  await newActor.update({
    "name" : newActor.data.name + "--NEW",
    "token.actorLink" : true,
    ...actorData
  });
}

/*
  Apply Damage (w/ resistances, immunities, & vulnerabilities)
*/
async function applyDamage({ actor , type, value } = {})
{
  if(!actor || !type || !value) return;
  let {di,dr,dv} = actor.data.data.traits;

  let multiplier = 
    arrInclude(di,type) ? null :
    arrInclude(dr,type) ? 0.5 :
    arrInclude(dv,type) ? 2 : 1;

  return multiplier !== null ? await actor.applyDamage(value, multiplier) : actor;

  function arrInclude(obj, val)
  {
    return [...obj.value, ...obj.custom.split(`;`)].includes(val);
  }
}

/*
  Edit/Consume Resource
*/
async function editResource({ actor, name = ``, value = 1 })
{
  if(!actor) return new Error(`Actor Undefined`);
  let { resources } = actor.data.data;
  let [key, object] = Object.entries(resources).find(([key, object])=> key === name || object.label === name);
  if(!key || !object) return new Error(`Resource Undefined`);
  if(!object.value || !object.max)
  {
    object.value = object.max = value;
  }else{
    object.value = Math.clamped(object.value + value, 0, object.max);
  }

  resources[key] = object;
  return await actor.update({ "data.resources" : resources });
}

/*
  Actor - 5e - editHitDie
  accepts an actor instance, value to change the actors hitDie, and event to control value, and a name of a class
  value => negative numbers results in a creation of hit die, where as possitive numbers cause a use of Hit die via "rollHitDice"
  event => shift depressed will create 1 hit die, not depressed will use 1 hit die.

  should return the editted actor
*/
async function editHitDie({actor, value, event, name} = {})
{
  if(!!event) 
    value = event.shiftKey ? -1 : 1;
  if(!value || !actor) return error(`No Value or Actor`);

  let class_items = actor.items
    .filter(item=> item.type === `class`&& item.data.data.hitDiceUsed !== item.data.data.levels);

  if(!class_items) return error(`No Class Items Available`);

  let item = !name ? class_items[0] : class_items.find(i=> i.name === name);

  if(!item) return error(`No Class Item ${!name ? `` : name}`);
  let {hitDice, hitDiceUsed, levels} = item.data.data;

  if(value > 0 && hitDiceUsed !== levels)
    for(let i = 0; i < value; i++)
      await actor.rollHitDie(hitDice, {dialog : false});
  else if(hitDiceUsed < 0)
    await actor.updateOwnedItem({_id : item.id, "data.hitDiceUsed" : Math.clamped(hitDiceUsed - value, 0, levels)});
}

/*
  Toggle Item Equipped Status
*/
async function toggleEquip({ actor, item })
{
  if(!actor || !item) return;

  item = actor.items.getName(item) || actor.items.get(item);

  if(!item) return;

  return await item.update({"data.equipped" : !item.data.data.equipped});
}

async function rollItem({actor, item, versatile = false})
{
  if(!actor && (item instanceof String || typeof item === 'string')) return false;
  if(item instanceof String || typeof item === 'string')
    item = actor.items.get(item) || actor.items.getName(item);

  if(!item.hasAttack && !item.hasDamage) return false;

  return { attack : await item.rollAttack(), damage : await item.rollDamage({versatile})};  
}

async function addTempHP({ actor, value, override = false})
{
  let { hp } = actor.data.data.attributes;
  if(override || hp.temp < value)
  {
    return await actor.update({ "data.attributes.hp.temp" : value });
  }else {
    return actor;
  }
}
function hasEffect({ actor, effect = ``})
{
  if(effect === `` || !actor) return false;
  return actor.effects.reduce((a,v) => a || v.data.label.toLowerCase() === effect.toLowerCase(), false);
}

/*
  PF2e Dying Macro
*/
async function rollRecovery({actor}) {
  if(actor.data.type !== "character")
      throw Error("Recovery rolls are only applicable to characters");
  const dying = actor.data.data.attributes.dying.value
    , recoveryDc = 10 + (getProperty(actor.data.data.attributes, "dying.recoveryMod") || 0)
    , flatCheck = new Roll("1d20").roll()
    , dc = recoveryDc + dying;

  let result = 20 === flatCheck.total || flatCheck.total >= dc + 10 ? `${game.i18n.localize("PF2E.CritSuccess")} ${game.i18n.localize("PF2E.Recovery.critSuccess")}` : 1 === flatCheck.total || flatCheck.total <= dc - 10 ? `${game.i18n.localize("PF2E.CritFailure")} ${game.i18n.localize("PF2E.Recovery.critFailure")}` : flatCheck.result >= dc ? `${game.i18n.localize("PF2E.Success")} ${game.i18n.localize("PF2E.Recovery.success")}` : `${game.i18n.localize("PF2E.Failure")} ${game.i18n.localize("PF2E.Recovery.failure")}`;
  const message = `\n      ${game.i18n.format("PF2E.Recovery.rollingDescription", {
      dc,
      dying
  })}.\n      <div class="dice-roll">\n        <div class="dice-formula" style="padding: 0 10px; word-break: normal;">\n          <span style="font-size: 12px; font-weight: 400;">\n            ${result}\n          </span>\n        </div>\n      </div>\n      `;
  flatCheck.toMessage({
      speaker: ChatMessage.getSpeaker({
          actor: actor
      }),
      flavor: message
  }, {
      rollMode: game.settings.get("core", "rollMode")
  });

  if(result.includes("Success"))
  {
    await actor.update({ "data.attributes.dying.value" : Math.clamped(
      actor.data.data.attributes.dying.value - 1,
      0,
      actor.data.data.attributes.dying.max
    )});
  }else{
    await actor.update({ "data.attributes.dying.value" : Math.clamped(
      actor.data.data.attributes.dying.value + 1,
      0,
      actor.data.data.attributes.dying.max
    )});
  }
}

/*
  Increment Data
    Shift : +1 to data
    No Shift : -1 to data
    Ctrl : display Message

  data = [{
    string = "path.to.value"
    value = {
      min = 0, max = value
    }
  }]
 */
async function incrementData({ actor, data, event })
{
  data = data instanceof Array ? data : [data];
  let updateData = {};

  data.forEach(d=> {
    let value = getProperty(actor.data, d.string);
    if(Number.isNaN(value)) return;

    if(event.shiftKey)
    {
      value++;
    }else{
      value--;
    }
    updateData[d.string] = Math.clamped(value, d.value.min, d.value.max);
  });

  if(event.ctrlKey)
  {
    ChatMessage.create({ 
      content : `${actor.name} data update. <hr> ${Object.entries(updateData).reduce((a,[k,v])=> a + `${k} => ${v}`, "")}`
    });
  }

  return await actor.update(updateData);
}

function stringifyRollData({ rollData, iteration = 0}){
  const ignoreKey = [`description`, `appearance`, `bond`, `flaw`, `ideal`, `biography`, `damage`, ], tab = `   `;
  let entryData = Object.entries(rollData), output = ``;

  console.log(entryData);

  entryData.forEach(([key, object])=> {
    if(ignoreKey.includes(key)) return;

    output += `${Array(iteration).fill(tab).join(``)}${key}`
    if( object instanceof Object)
      output += stringifyRollData({ rollData : object, iteration : iteration + 1 });
    else if(object !== null)
      output += ` : ${object}<br>`;
  });
  output += `<br>`
  return output;
}