/*
  Macro Use :
    Ensure that players have a `character` selected.
    Ensure that GM selected a token to get "actor" data --- and doesn't have a `character` selected.
  Requirements :
    None
*/

/*
  Constants
*/
const actor_use = character || token.actor;
const targe_use = Array.from(game.user.targets)[0]?.actor;
const stats = [`ego`,`insight`,`power`,`speed`,`stamina`, `willpower`];
const vanta = [[1,`Advantage`], [0,`Normal`], [-1, `Disadvantage`]];

/*
  Functions
*/
async function main(){
  const main_options = {
    buttons : [
      [`Attack`, () => { attack(); }],
      [`Check`, () => { check(); }],
      [`Contested Check`, () => { contest(); }]
    ],
    title : `Actor Control`,
    content : `Choose Option : `
  };

  await button_dialog(main_options);
}

async function attack(){
  if(!actor_use || !targe_use) return;

  let attack_stat = await choose(stats, `Choose ${actor_use.name} attacking stat : `);
  let defend_stat = await choose(stats, `Choose ${targe_use.name} defending stat : `);

  let actorRollData = actor_use.getRollData();
  let targeRollData = targe_use.getRollData();

  let data = {
    exp : actorRollData.Hyper,
    stat : actorRollData.stat[attack_stat],
    count : true,
    c_stat : targeRollData.stat[defend_stat],
    type : parseInt(await choose(vanta, `Choose roll type : `))
  };

  let attack_roll = await roll(data);
  display(attack_roll, ChatMessage.getSpeaker({actor : actor_use}), `${actor_use.name} attacks ${targe_use.name}!`);
}

async function check(){
  if(!actor_use) return;
  
  let check_stat = await choose(stats, `Choose ${actor_use.name} check stat : `);
  let actorRollData = actor_use.getRollData();

  let data = {
    stat : actorRollData.stat[check_stat],
    type : parseInt(await choose(vanta, `Choose roll type : `))
  };

  console.log(data);

  let check_roll = await roll(data);
  display(check_roll,ChatMessage.getSpeaker({actor : actor_use}), `${actor_use.name} makes a ${check_stat} check!`);
}

async function contest(){
  if(!actor_use || !targe_use) return;

  let actorRollData = actor_use.getRollData();
  let targeRollData = targe_use.getRollData();

  let actor_stat = await choose(stats, `Choose ${actor_use.name} contested check stat : `);
  let targe_stat = await choose(stats, `Choose ${targe_use.name} contested check stat : `);

  let actor_data = {
    stat : actorRollData.stat[actor_stat],
    type : parseInt(await choose(vanta, `Choose roll type for ${actor_use.name}: `))
  };
  let targe_data = {
    stat : targeRollData.stat[targe_stat],
    type : parseInt(await choose(vanta, `Choose roll type for ${targe_use.name}: `))
  };

  let actor_roll = await roll(actor_data);
  let targe_roll = await roll(targe_data);

  display(actor_roll ,ChatMessage.getSpeaker({actor : actor_use}), `${actor_use.name} makes a contested check!`);
  display(targe_roll ,ChatMessage.getSpeaker({actor : targe_use}), `${targe_use.name} makes a contested check!`);
}

async function roll({type = 0, exp = false, count = false,  stat = 0, c_stat = 0}= {}){
  let value = Array(type === 0 ? 1 : 2).fill(0).map(e => new Roll(`${stat}d6${count ? `cs>${c_stat}` : ``}${exp ? `x6`: ``}`).roll());
  return value;
}

async function display(rolls = [], speaker = ChatMessage.getSpeaker(), flavor = ``)
{
  rolls.forEach((ele)=> ele.toMessage({
    speaker, flavor
  }));
}

async function button_dialog(data)
{
  let value = await new Promise((resolve) => {
    let buttons = {}, dialog;

    data.buttons.forEach(([str, callback])=>{
      buttons[str] = {
        label : str,
        callback
      }
    });
  
    dialog = new Dialog({title : data.title , content : data.content, buttons, close : () => resolve(true) }).render(true);
  });
  return value;
}

async function choose(options = [], prompt = ``)
{
  let value = await new Promise((resolve) => {

    let dialog_options = (options[0] instanceof Array)
      ? options.map(o => `<option value="${o[0]}">${o[1]}</option>`).join(``)
      : options.map(o => `<option value="${o}">${o}</option>`).join(``);
  
    let content = `
    <table style="width=100%">
      <tr><th>${prompt}</th></tr>
      <tr><td><select id="choice">${dialog_options}</select></td></tr>
    </table>`;
  
    new Dialog({
      content, 
      buttons : { OK : {label : `OK`, callback : async (html) => { resolve(html.find('#choice').val()); } } }
    }).render(true);
  });
  return value;
}

main();

