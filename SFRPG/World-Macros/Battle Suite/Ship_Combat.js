/*
  Basic Overview of Macro Use

  Requirements : 
    Player has a selected character
    Targetting is required as necessary
    Only will work with 1 SS being controlled by the player

  How to Use : 
    fire up the macro
    choose your role
    when its your phase --- chose your action

  How to Edit/Change :
    most of the entries should be complete with function helpers
    if you want to add a battle_station, follow the object structure
    ensure that you create another action object that will allow for continuous operation
    each ()=> is a function call that should follow the basic structure of the action
*/

/*
  Constant Variable Declaration --- Majority of the information is stored here.
*/
const battle_stations = {
  buttons : [
    ["Captain", ()=> { button_dialog(captain_actions) } ],
    ["Engineer", ()=> { button_dialog(engineer_actions); } ],
    ["Gunner", () => { button_dialog(pilot_actions); } ],
    ["Pilot", () => {} ],
    ["Science Officer", ()=> {}]
  ],
  content : `<div sytle="width:100%; text-align:center;><h2>Choose a Station : </h2></div>`,
  title : `Ship Combat Manager`,
}
const captain_actions = {
  buttons : [
    ["Demand (Any Phase)", async ()=> {
      let dc = (15+(1.5*player_SS.data.data.details.tier));
      let cont = "You can make a demand of a crew member to try to improve his performance. You grant a +4 bonus to one specific check by succeeding at an Intimidate check (DC = 15 + 1-1/2 times your starship’s tier). You must use this action before the associated check is rolled, and you can grant this bonus to an individual character only once per combat. Demand might result in negative consequences if used on NPCs, and you can’t make demands of yourself.";
      await roll_check("int", dc , cont);
      button_dialog(battle_stations);
    }],
    ["Encourage (Any Phase)", async ()=> {
      let cont = `You an encourage another member of the crew to give her a bonus to her action. This works like aid another (see page 133), granting a +2 bonus to the check required by a crew action if you succeed at a DC 10 check using the same skill. Alternatively, you can grant this same bonus by succeeding at a DC 15 Diplomacy check. You can’t encourage yourself.`;
      let choice1 = await choose(["Aid Specific Skill", "Use Diplomacy"], `Choose Encourage action option : `);
      if(choice1 === "Use Diplomacy") {
        await roll_check("dip", (15), cont);
      }else{
        let choice2 = await choose(skills, `Choose Encourage skill option : `);
        await roll_check(choice2, 10, cont);
      }
      button_dialog(battle_stations);
    }],
    ["Taunt (Any Phase, Push)", async ()=> {
      let cont = `You can use the communications system to broadcast a taunting message to the enemy vessel. You select an enemy vessel and a phase of combat (engineering, helm, or gunnery), and then attempt a Bluff or Intimidate check (DC = 15 + 1-1/2 times the enemy starship’s tier). If you are successful, each enemy character acting during the selected phase takes a –2 penalty to all checks for [[1d4]] rounds; the penalty increases to –4 if the enemy’s check is made as part of a push action. Once used against an enemy starship, regardless of the outcome, taunt can’t be used against that starship again during the same combat.`;
      let dc = (15 + (1.5*player_SS.data.data.details.tier));
      let choice1 = await choose (["Bluff", "Intimidate"], "Choose Taunt skill option : ");
      if(choice1 === "Bluff")
      {
        await roll_check("blu", dc , cont);
      }else{
        await roll_check("int", dc , cont);
      }
      button_dialog(battle_stations);
    }],
  ],
  content : `<div sytle="width:100%; text-align:center;><h2>Choose a Captain Action : </h2></div>`,
  title : `Captain Action Manager`
}
const engineer_actions = {
  buttons : [
    ["Divert (Engineering Phase)", async ()=> {
      let choice = await choose(["Boost Engines", "Boost Science Equipment", "Boost Starship Weapons", "Boost Shields"], `Choose system to boost : `);
      let cont = `You divert auxiliary power, using it to ${choice}. This requires a successful Engineering check (DC = 10 + 1-1/2 times your starship’s tier), and the results depend on where you decide to send this extra power. If you send it to the engines, your starship’s speed increases by 2 this round. If you send it to the science equipment, all science officers receive a +2 bonus to their crew actions this round. If you send it to the starship’s weapons, treat each damage die that rolls a 1 this round as having rolled a 2 instead. If you send it to the shields, restore an amount of Shield Points equal to 5% of the PCU rating of the starship’s power core (see page 296), up to the shields’ maximum value. You can distribute the restored Shield Points across the shields' four quadrants as you see fit.`;
      let dc = 10 + (1.5 * player_SS_tier);
      await roll_check(`eng`, dc, cont); 
      button_dialog(battle_stations);
    }],
    ["Hold It Together (Engineering Phase)", async ()=> {
      let choice = await choose(["Life Support", "Sensors", "Weapons Array", "Engines", "Power Core"], `Choose system to hold together : `);
      let cont = `You hold ${choice} system together by constantly patching and modifying it. If you succeed at an Engineering check (DC = 15 + 1-1/2 times your starship’s tier), ${choice} system is treated as if its critical damage condition were two steps less severe for the rest of the round (wrecked becomes glitching, and a malfunctioning or glitching system functions as if it had taken no critical damage). This check isn’t modified by penalties from critical damage to the power core.`;
      let dc = 15 + (1.5 * player_SS_tier);
      await roll_check(`eng`, dc, cont); 
      button_dialog(battle_stations);
    }],
    ["Patch (Engineering Phase)", async ()=> {
      let choice1 = await choose(["Life Support", "Sensors", "Weapons Array", "Engines", "Power Core"], `Choose system to patch : `);
      let choice2 = await choose([[10,"Glitching"], [15,"Malfunctioning"], [20,"Wrecked"]], `Choose system to patch : `);
      let cont = `You can patch the ${choice1} system to reduce the effects of a critical damage condition. The number of actions and the DC of the Engineering check required to patch a system depend on how badly the system is damaged, as indicated on the table on page 324. Multiple engineers can pool their actions in a single round to effect repairs more quickly, but each engineer must succeed at her Engineering check to contribute her action to the patch. The number of actions required can be reduced by 1 (to a minimum of 1 action) by increasing the DC by 5. If you succeed at this check, the severity of the critical damage is unchanged, but it is treated as one step less severe for the remainder of the combat, until 1 hour has passed, or until the system takes critical damage again (which removes the patch and applies the new severity). This action can be taken more than once per round, and this check is not modified by any critical damage to the core.`;
      let dc = choice2 + (1.5 * player_SS_tier);
      await roll_check(`eng`, dc, cont); 
      button_dialog(battle_stations);
    }],
  ],
  content : `<div sytle="width:100%; text-align:center;><h2>Choose an Engineer Action : </h2></div>`,
  title : `Engineer Action Manager`
}
const pilot_actions = {
  buttons : [], 
  content : `<div sytle="width:100%; text-align:center;><h2>Choose a Pilot action : </h2></div>`,
  title : `Pilot Combat Manager`,
}
const stunts = {
  buttons : [], 
  content : `<div sytle="width:100%; text-align:center;><h2> Choose a Stunt action : </h2></div>`,
  title : `Stunt Action Manager`,
}

const skills = Object.entries(CONFIG.SFRPG.skills);

const target_SS = Array.from(game.user.targets)[0];
const player_SS = game.actors.find(i=>i.owner && i.data.type === "starship");
const player_SS_tier = player_SS.data.data.details.tier;

/*
  Add actions based on the characters level & class ranks
*/
switch(character.data.data.details.level.value)
{ 
  case 12 :
    captain_actions.buttons.push(["Moving Speech (Any Phase)", async ()=>{
      let cont =`At 12th level, you can spend 1 Resolve Point and use your action to give a moving speech to the crew during one phase of combat with a successful Diplomacy check (DC = 15 + 1-1/2 times your starship’s tier). For the remainder of that phase, your allies can roll twice and take the better result when performing crew actions.`;
      let dc = 15 + (1.5 * player_SS.data.data.details.tier);
      reduce_resolve();
      await roll_check("dip", dc, cont);
      button_dialog(battle_stations);
    }]);
    if(character.data.data.skills.eng.ranks >= 12)
    {
      engineer_actions.buttons.push(["Quick Fix (Engineering Phase)", ()=> {
        let choice1 = await choose(["Life Support", "Sensors", "Weapons Array", "Engines", "Power Core"], `Choose system to quick fix : `);
        let cont = `If you have at least 12 ranks in Engineering, you can try to repair the ${choice1} system quickly by spending 1 Resolve Point and attempting an Engineering check (DC = 20 + 1-1/2 times you starship’s tier). If successful, you remove the critical damage condition from one system for 1 hour (allowing it to function as if it had taken no critical damage), after which time it must be repaired as normal.`;
        let dc = 20 + (1.5*player_SS_tier);
        reduce_resolve();

        await roll_check(`eng`, dc, cont);
        button_dialog(battle_stations);
      }]);
    }
  case 6 :
    captain_actions.buttons.push(["Orders (Any Phase, Push)", async ()=> {
      let cont = `At 6th level, you can grant an additional action to one member of the crew by spending 1 Resolve Point and succeeding at a difficult skill check at the beginning of the phase in which the crew member would normally act. The type of check depends on the role of the crew member targeted: a Computers check for a science officer, an Engineering check for an engineer, a gunnery check (see page 320) for a gunner, and a Piloting check for a pilot. The DC of this check is equal to 10 + 1-1/2 times your starship’s tier. If the check succeeds, the crew member can take two actions in her role this round (both when she would normally act), but she can’t take the same action twice. You can’t give yourself orders.`;
      let dc = (10 + (3*player_SS.data.data.details.tier))
      reduce_resolve();
      let choice1 = await choose([["com", "Science Officer"],["eng", "Engineer"],["pil", "Pilot"],["gun", "Gunner"],], `Choose Station to Help : `);
      if(choice1 === "gun"){
        await gunner_check(dc, cont);
      }else{
        await roll_check(choice1, dc, cont);
      }
      button_dialog(battle_stations);
    }]);
    if(character.data.data.skills.eng.ranks >= 6)
    {
      engineer_actions.buttons.push(["OverPower (Engineering Phase, Push)", async ()=> {
        let choice_array = ["Boost Engines", "Boost Science Equipment", "Boost Starship Weapons", "Boost Shields"];
        let choice1 = await choose(choice_array, `Choose system to boost : `);
        let choice2 = await choose(choice_array.filter(i=>!i.includes(choice1)), `Choose system to boost : `);
        let choice3 = await choose(choice_array.filter(i=>!i.includes(choice1) && !i.includes(choice2)), `Choose system to boost : `);
        let cont = `If you have at least 6 ranks in Engineering, you can spend 1 Resolve Point and attempt an Engineering check (DC = 10 + 1-1/2 × your starship’s tier) to squeeze more out of your ship’s systems. If you’re successful, this functions as the divert action, but you can send extra power to any three systems listed in that action (${choice1}, ${choice2}, ${choice3}) This action and the divert action can’t be taken in the same round.`;
        let dc = 10 + (1.5*player_SS_tier);
        reduce_resolve();

        await roll_check(`eng`, dc, cont);
        button_dialog(battle_stations);
      }]);
    }
  default :
    break;
}

/*
  Base Method in use.
*/
async function button_dialog(data)
{
  let buttons = {}, dialog;

  data.buttons.forEach(([str, callback])=>{
    buttons[str] = {
      label : str,
      callback
    }
  });

  dialog = new Dialog({title : data.title , content : data.content, buttons}).render(true);
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

/*
  Will need to be changed due to promise being returned eventually (hopefully)
*/
async function roll_check(type, dc, message)
{
  character.rollSkill(type, {event});

  Hooks.once(`preCreateChatMessage`, (data, options, id) =>{
    let rollData = JSON.parse(data.roll);
    if(rollData.total >= Math.floor(dc))
    {
      data.content += `<hr><div style = "text-align:center;"><span>${message} <b> <br> DC : ${Math.floor(dc)}, Success! </b></span></div>`;
    }else{
      data.content += `<hr><div style = "text-align:center;"><span>${message} <b> <br> DC : ${Math.floor(dc)}, Failure! </b></span></div>`;
    }
  });
}
async function gunner_check(dc, message)
{
  let bab = character.data.data.attributes.bab > character.data.data.skills.pil.ranks ? character.data.data.attributes.bab : character.data.data.skills.pil.ranks;
  let roll = new roll(`1d20 + ${bab} + ${character.data.data.abilities.dex.mod}`).roll();

  Hooks.once(`preCreateChatMessage`, (data, options, id) =>{
    let rollData = JSON.parse(data.roll);
    if(rollData.total >= Math.floor(dc))
    {
      data.content += `<hr><div style = "text-align:center;"><span>${message} <b> <br> DC : ${Math.floor(dc)}, Success! </b></span></div>`;
    }else{
      data.content += `<hr><div style = "text-align:center;"><span>${message} <b> <br> DC : ${Math.floor(dc)}, Failure! </b></span></div>`;
    }
  });

  roll.toMessage();
}

async function reduce_resolve(point = 1)
{
  let {min, max, value} = character.data.data.attributes.rp;
  if((value - point) <  min) return ChatMessage.create({content : `${character.name} does not have enough resolve points to complete action.`});
  character.update({ "data.attributes.rp.value" : Math.clamped(value - point, min, max)});
}

button_dialog(battle_stations);