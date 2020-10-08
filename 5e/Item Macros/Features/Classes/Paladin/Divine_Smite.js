(async ()=> {
  let {spells} = item.actor.data.data, critical = false, boost = false, slot = 0, dice = 1;

  let target = Array.from(game.user.targets)[0];
  if(!target) return ui.notifications.error(`Target the enemy you hit with a melee strike.`);

  if(Object.entries(spells).filter(([key,value])=> value.value > 0 ).length === 0) return ui.notifications.warn(`You have no spellslots left!`);

  slot = await choose(Object.entries(spells).filter(([key,value]) => value.value > 0 && (parseInt(key.charAt(5)) <= 5 || key === `pact`)).map(([key, value])=> key)
    , `Choose spellslot to expend : `);
  critical = await choose([`no`,`yes`], `Critical Strike?`) === `yes` ? true : false;

  spells[slot].value -= 1;
  await item.actor.update({ data : spells });

  boost = [`undead`, `fiend`].includes(target.actor.data.data.details.type) ? true : false;

  dice += (slot === `pact`) ? spells[slot].level : parseInt(slot.charAt(5));
  dice += boost ? 1 : 0;
  dice *= critical ? 2 : 1;

  new Roll(`${dice}d8`).roll().toMessage({flavor : `${item.actor.name} smites ${target.name}`});
})();

async function choose(options = [], prompt = ``)
{
  let value = await new Promise((resolve) => {

    let dialog_options = (options[0] instanceof Array)
      ? options.map(o => `<option value="${o[0]}">${o[1]}</option>`).join(``)
      : options.map(o => `<option value="${o}">${o}</option>`).join(``);
  
    let content = `<table style="width 100%"><tr><th style="width 50%">${prompt}</th><td style="width 50%"><select id="choice">${dialog_options}</select></td></tr></table>`;
  
    new Dialog({
      content, 
      buttons : { OK : {label : `OK`, callback : async (html) => { resolve(html.find('#choice').val()); } } }
    }).render(true);
  });
  return value;
}
