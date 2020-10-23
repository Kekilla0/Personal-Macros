/*
  1. Get tokens that need to be added to combat.
  2. Resolve "Suprise" (ask the question?? -- dialog with option "Players/Monsters/None")
  3. Add enemies to combat_tracker & set their initative
  4. Release both controlled & targets
  5. Set up running macros for the combat using turn alert
    a. Exp_Loot_Combat_Macro
    b. Round_Initiative
    c. Lengendary Actions -- (Might add this for to test out.)
*/
const options = [`Players`, `Monsters`, `None`];
const combatants = (canvas.tokens.controlled.length !== 0)
  ? canvas.tokens.controlled : Array.from(game.user.targets);
const players = combatants.filter(token => token.data.disposition !== -1);
const monsters = combatants.filter(token => token.data.disposition === -1);

let suprised = [];

(async ()=>{
  let suprise = await button_selection(options, `Who is suprised?`);
  let stealth_average = 
    suprise === `Players` ? get_average(monsters) :
    suprise === `Monsters` ? get_average(players) : null;

  if(suprise === `Players`)
  {
    for(let player of players)
    {
      let roll = new Roll(`1d20 + ${player.actor.data.data.skills[`per`].mod}`).roll().total;
      if( roll < stealth_average )
        suprised.push(player.id);
    }
  }
  if(suprise === `Monsters`)
  {
    for(let monster of monsters)
    {
      let roll = new Roll(`1d20 + ${monster.actor.data.data.skills[`per`].mod}`).roll().total;
      if( roll < stealth_average )
        suprised.push(monster.id);
    }
  }

  await add_to_combat();
  await roll_iniative();
  await game.combats.active.startCombat();
  await ui.combat.createPopout().render(true);
  await build_combat_control();
})();

async function button_selection(options, title = ``)
{
  let value = await new Promise((resolve)=>{
    let buttons = {};
    options.forEach(option => {
      buttons[option] = {
        label : option,
        callback : () => {resolve(option)} 
      }
    })
    new Dialog({
      title,
      buttons
    }).render(true);
  });
  return value;
}

function get_average(tokens = [], check = `ste`)
{
  if(!tokens) return 0;

  let total =  tokens.reduce((acc, token)=>{
    let roll = new Roll(`1d20 + ${token.actor.data.data.skills[check].mod}`).roll().total;
    return acc + roll;
  }, 0);

  return Math.min(total/tokens.length);
}

async function add_to_combat()
{
  for(let token of combatants)
  {
    await token.toggleCombat();
  }
}

async function roll_iniative()
{
  if(!game.combats.active) return;
  let updates = duplicate(game.combats.active);

  for(let token of combatants)
  {
    let initiative = suprised.includes(token.id)
      ? 0 : new Roll(`1d20 + ${token.actor.data.data.attributes.init.value}`).roll().total;

    updates.combatants.find(tokenData => tokenData.tokenId === token.id).initiative = initiative;
  }

  await game.combats.active.update(updates);
}

async function build_combat_control()
{
  //return if turn_alert isn't installed or active
  if(!game.modules.get("turnAlert").active) return;

  TurnAlert.create({
    round : 1, 
    roundAbsolute : false, 
    repeating : {
      frequency : 1
    },
    macro : `Exp_Loot_Combat_Macro`,
    message : "Executing Experience and Loot Combat Macro.",
    recipientIds : ChatMessage.getWhisperRecipients("GM")
  });

  TurnAlert.create({
    round : 1,
    roundAbsolute : false,
    repeating : {
      frequency : 1
    }, 
    macro : `Roll_Initative`,
    message : "Executing Initative Roll Macro",
    recipientIds : ChatMessage.getWhisperRecipients("GM")
  });
}