async function choose(options = [], prompt = ``)
{
  let value = await new Promise((resolve, reject) => {

    let dialog_options = (options[0] instanceof Array)
      ? options.map(o => `<option value="${o[0]}">${o[1]}</option>`).join(``)
      : options.map(o => `<option value="${o}">${o}</option>`).join(``);
  
    let content = `${prompt}<br><select id="choice">${dialog_options}</select>`;
  
    new Dialog({
      content, 
      buttons : { OK : {label : `OK`, callback : async (html) => { resolve(html.find('#choice').val()); } } }
    }).render(true);
  });
  return value;
}

(async ()=>{ 
  if(!token) return ui.notifications.error(`Please select a token.`);

  const abilities = Object.entries(CONFIG.PF1.abilities);
  const savingThrows = Object.entries(CONFIG.PF1.savingThrows);
  const skills = Object.entries(CONFIG.PF1.skills);

  let type_choice = await choose(["ability", "saving throw", "skill"], `Choose Type of Roll : `);
  let choice;

  switch(type_choice)
  {
    case "ability" :
      choice = await choose(abilities, `Choose Ability : `);
      token.actor.rollAbility(choice);
      break;
    case "saving throw" :
      choice = await choose(savingThrows, `Choose Saving Throw : `);
      token.actor.rollSavingThrow(choice);
      break;
    case "skill" :
      choice = await choose(skills, `Choose Skill : `);
      token.actor.rollSkill(choice);
      break;
  }
})();