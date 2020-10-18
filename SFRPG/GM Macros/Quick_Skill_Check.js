/*
  Module Requirements --- Whisper Dialog (comment out line 83 if you don't want to use Whisper Dialog)

  Macro can be used with furnace and arguments
    args[0] - type of check (Stat, Skill, Save)
    args[1] - further specification of check
    args[2] - DC of check
    args[3] - success text
    args[4] - failure text

  How to use : 
    click macro (do not select or target if you want it to be every PC)
    select type
    select specific
    input data for success
    input data for failure

  To do :
    correct checks vs trained or not --- possibly allow roll and prompt for GM input?
*/

const stats = Object.entries(CONFIG.SFRPG.abilities);
const skills = Object.entries(CONFIG.SFRPG.skills);

const actors = (canvas.tokens.controlled.length !== 0) ? canvas.tokens.controlled.map(token=> token.actor) 
: (game.user.targets.size !== 0) ? Array.from(game.user.targets).map(target=> target.actor) 
: game.actors.filter(actor => actor.data.type === "character" && actor.isPC);

let value, success, failure, DC;

let user_success = [], user_failure = [];

(async ()=> {

  let type = !args[0] ? await choose(["Stat","Skill", "Save"], `Choose roll type : `) : args[0];

  if(!args[1] && !args[2]) {
    if(type === "Stat")
    {
      [ value, DC,  success, failure ] = await special_choice(stats, `Choose a stat to roll : `);
    }else if (type === "Skill"){
      [ value, DC,  success, failure ] = await special_choice(skills, `Choose a skill to roll : `); 
    }else {
      [ value, DC,  success, failure ] = await special_choice(stats, `Choose a save to roll : `);
    }
  }else{
    value = args[1];
    DC = args[2];
    success = args[3];
    failure = args[4];
  }

  let content = `
    <table style="width:100%; text-align:center; border:1px solid black"> 
      <tr> 
        <th colspan=2 style="width:100%;">${type} - ${value} - ${DC}</th>
      </tr>
      ${actors
        .map(actor => {
          let actor_userID = game.users.find( user => user.character?.name === actor.name && user.active)?.id;
          let mod = type === "Stat" ? actor.data.data.abilities[value].mod 
            : type === "Skill" ? actor.data.data.skills[value].mod 
            : type === "Save" ? actor.data.data.attributes[value].bonus : null;

          console.log(actor_userID, mod);

          if(mod === null || mod === undefined) return `<tr><td colspan=2 style="width=100%">${actor.name} ${type} ${value} failed.</td></tr>`;

          let roll = new Roll(`1d20 + ${mod}`).roll().total;
          if(actor_userID)
          {
            if(roll < parseInt(DC))
            {
              user_failure.push(actor_userID);
            }else{
              user_success.push(actor_userID);
            }
          }

          return `
          <tr>
            <td style="width:50%;">${actor.name}</td>
            <td style="width:50%; ${roll < parseInt(DC) ? `color:red;` : `color:green;`}"><b>${roll}</b></td>
          </tr>`;
      })}
      </table>`;

  ChatMessage.create({content, whisper : ChatMessage.getWhisperRecipients("GM")});

  console.log(user_success, user_failure);

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

    let content = `
    <table style="width:100%; text-align:center; border:1px solid black">
      <tr>
        <th style="width:50%;">${prompt}</th>
        <th style="width:50%;"><select id="choice">${dialog_options}</select></th>
      <tr>
      <tr>
        <td style="width:50%;">DC : </td>
        <td style="width:50%;"><input id="DC" type="number"></input></td>
      </tr>
      <tr>
        <td style="width:50%;">Success Text :</td>
        <td style="width:50%;"><input id="success" type="text"></input></td>
      </tr>
      <tr>
        <td style="width:50%;">Failure Text :</td>
        <td style="width:50%;"><input id="failure" type="text"></input></td>
      </tr>
    </table>`;

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


