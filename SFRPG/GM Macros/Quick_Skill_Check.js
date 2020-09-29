/*
  Module Requirements --- Whisper Dialog

  How to use : 
    click macro (do not select or target if you want it to be every PC)
    select type
    select specific
    input data for success
    input data for failure
  
*/

const stats = Object.entries(CONFIG.SFRPG.abilities);
const skills = Object.entries(CONFIG.SFRPG.skills);

const actors = (canvas.tokens.controlled.length !== 0) ? canvas.tokens.controlled.map(token=> token.actor) 
: (game.user.targets.size !== 0) ? Array.from(game.user.targets).map(target=> target.actor) 
: game.actors.filter(actor => actor.data.type === "character" && actor.isPC);

console.log(actors);

let value, success, failure, DC;

let user_success = [], user_failure = [];

(async ()=> {
  let type = await choose(["Stat","Skill", "Save"], `Choose roll type : `);

  if(type === "Stat")
  {
    [ value, DC,  success, failure ] = await special_choice(stats, `Choose a stat to roll : `);
  }else if (type === "Skill"){
    [ value, DC,  success, failure ] = await special_choice(skills, `Choose a skill to roll : `); 
  }else {
    [ value, DC,  success, failure ] = await special_choice(skills, `Choose a save to roll : `);
  }

  let content = `<table> <tr> <th colspan=2>${type} - ${value} - ${DC}</th></tr>`;

  for(let actor of actors)
  {
    let actor_userID = game.users.find( user => user.character?.name === actor.name && user.active)?.id;
    let mod = type == "Stat" 
      ? actor.data.data.abilities[value].mod : type == "Skill"
      ? actor.data.data.skills[value].mod : type == "Save"
      ? actor.data.data.attributes[value].bonus : null;
    if(mod === null) continue;
    
    let roll = new Roll(`1d20 + ${mod}`).roll().total;

    content += `<tr><td>${actor.name}</td><td>${roll}</td></tr>`;

    if(!actor_userID) continue;

    if(roll < parseInt(DC))
    {
      user_failure.push(actor_userID);
    }else{
      user_success.push(actor_userID);
    }

      
    //need to make these invisible (maybe just get the stat or something?? idk)
    /*
      if(type == "Stat") actor.rollAbility(value, {event});
      if(type == "Skill") actor.rollSkill(value, {event});
      if(type == "Save") actor. rollSave(value, {event});

      Hooks.once(`preCreateChatMessage`, async (data, options, userID) =>{
        if(userID !== game.userId) {
          console.log(`failure  in hook`, userID, game.userID);
          resolve(false);
          return;
        }

        let rollData = JSON.parse(data.roll);
        data.flavor += ` DC : ${DC}`;

        if(rollData.total < parseInt(DC))
        {
          user_failure.push(actor_userID);
        }else{
          user_success.push(actor_userID)
        }
        resolve(true);
      })
    */
  
  }
  content += `</table>`;

  ChatMessage.create({content, whisper : ChatMessage.getWhisperRecipients("GM")});

  if(success.length !== 0 && user_success.length !== 0) send_data(user_success, success);
  if(failure.length !== 0 && user_failure.length !== 0) send_data(user_failure, failure);
})();

function send_data (ids, message)
{
  WhisperDialog.newDialog({ content : message, whisper : ids, skipDialog : true});
}

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

async function special_choice(options = [], prompt = ``)
{
  let value = await new Promise((resolve) => {

    let dialog_options = (options[0] instanceof Array)
      ? options.map(o => `<option value="${o[0]}">${o[1]}</option>`).join(``)
      : options.map(o => `<option value="${o}">${o}</option>`).join(``);
  
    let content = `${prompt} <select id="choice">${dialog_options}</select><br>
      <label>DC : </label><input id="DC" type="number"></input><br>
      <label>Success : </label><input id="success" type="text"></input><br>
      <label>Failure : </label><input id="failure" type="text"></input>`;

    new Dialog({
        content, 
        buttons : { OK : {label : `OK`, callback : async (html) => { 
          let return_value = [
            html.find('#choice').val(),
            html.find('#DC').val(),
            html.find('#success').val(),
            html.find('#failure').val(),
          ];
          console.log(return_value);
          resolve(return_value); 
      } } }
      }).render(true);
  });
  return value;
}


