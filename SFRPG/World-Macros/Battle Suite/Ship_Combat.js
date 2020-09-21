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

  To Do : 
    Fix GM use
    Add additional book information
    when doing something more than once --- force more than once instead of looping.
*/

/*
  Constant Variable Declaration --- Majority of the information is stored here.
*/
const battle_stations = {
  buttons : [
    ["Captain", ()=> { button_dialog(captain_actions); } ],
    ["Engineer", ()=> { button_dialog(engineer_actions); } ],
    ["Gunner", () => { button_dialog(gunner_actions); } ],
    ["Pilot", () => { button_dialog(pilot_actions); } ],
    ["Science Officer", ()=> { button_dialog (science_actions); }]
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
  buttons : [
    ["Fly (Helm Phase)", async ()=>{
      let cont = `You move your starship up to its speed and can make any turns allowed by its maneuverability. This doesn’t require a skill check.`;
      display(cont)
      button_dialog(battle_stations);
    }],
    ["Maneuver (Helm Phase)", async ()=>{
      let cont = `You move your starship up to its speed. You can also attempt a Piloting check (DC = 15 + 1-1/2 × your starship’s tier) to reduce your starship’s distance between turns by 1 (to a minimum of 0).`;
      let dc = 10 + (1.5 * player_SS_tier);
      await roll_check(`pil`, dc, cont);
      button_dialog(battle_stations);
    }],
    ["Stunt (Helm Phase, Push)", async ()=>{
      let cont = `You can attempt any one of the stunts described on page 319. The DCs of the Piloting checks required and the results of success and failure are described in each stunt’s description.`;
      display(cont); 
      button_dialog(stunts);     
    }]
  ], 
  content : `<div sytle="width:100%; text-align:center;><h2>Choose a Pilot action : </h2></div>`,
  title : `Pilot Combat Manager`,
}
const gunner_actions = {
  buttons : [
    ["Fire At Will (Gunnery Phase, Push)", async ()=> {
      let cont = `You can fire any two starship weapons, regardless of their arc. Each attack is made at a –4 penalty.`;
      display(cont);
      await button_dialog(ship_guns);
      await button_dialog(ship_guns);
      button_dialog(battle_stations);
    }],
    ["Shoot (Gunnery Phase)", async ()=> {
      let cont = `You can fire one of your starship’s weapons. If you use a turret weapon, you can target a ship in any arc.`;
      display(cont);
      await button_dialog(ship_guns);
      button_dialog(battle_stations);
    }]
  ],
  content : `<div sytle="width:100%; text-align:center;><h2>Choose a Gunner Action : </h2></div>`,
  title : `Gunner Combat Manager`
}
const science_actions = {
  buttons : [
    ["Balance (Helm Phase)", async ()=> {
      let cont = `You can balance the shields, redirecting power from one quadrant to protect another. With a successful Computers check (DC = 15 + 1-1/2 times your starship’s tier), you can shift Shield Points (SP) from the shield in one quadrant to the shield in another quadrant, including to depleted shields (after rebalancing, every shield must have at least 10% of the total current SP). Alternatively, you can add up the SP from all the remaining shields and evenly distribute them to all four quadrants, putting any excess SP in the forward quadrant.`;
      let dc = 15 + (1.5 * player_SS_tier);
      await roll_check(`com`, dc, cont);
      button_dialog(battle_stations);
    }],
    ["Scan (Helm Phase)", async ()=> {
      let cont = `You can scan a starship with your sensors to learn information about it. This action requires your starship to have sensors (see page 300). You must attempt a Computers check, applying any modifiers from the starship’s sensors. You can attempt this check untrained. The DC for this check is equal to 5 + 1-1/2 times the tier of the starship being scanned + its bonus from defensive countermeasures (see page 298). If you succeed at this check, you learn the first unknown piece of information on the following list. For every 5 by which you exceed the check, you learn another unknown piece of information. Subsequent checks reveal new pieces of information, continuing down this list.`;
      let target = Array.from(game.user.targets)[0]?.actor;
      if(!target) { ui.notifications.error(`Target an enemy ship`); button_dialog(battle_stations); return; };
      let dc = 5 + (1.5 * target.data.data.details.tier ); //add defensive countermeasure number here?
      await roll_check(`com`, dc, cont);
      button_dialog(battle_stations);
    }],
    ["Target System (Helm Phase, Push)", async ()=> {
      let target = Array.from(game.user.targets)[0]?.actor;
      if(!target) { ui.notifications.error(`Target an enemy ship`); button_dialog(battle_stations); return; };
      let choice = await choose(["Core","Engines","Life Support","Sensors", "Weapons"], `Choose system to target : `);
      let cont = `You use your starship’s sensors to target the <b>${choice}</b> system on the enemy starship. This action requires your starship to have sensors. You must attempt a Computers check, applying any modifiers from the starship’s sensors. The DC equals 5 + 1-1/2 the tier of the enemy starship + its bonus from defensive countermeasures (see page 298). If you succeed, The next attack made by your starship that hits the enemy ship scores a critical hit on a natural roll of 19 or 20. If that attack deals critical damage, it affects the chosen system. For any further critical damage resulting from the attack, determine which system is affected randomly as normal. Your starship’s sensors can target only one system on a specific enemy starship at a time, though this action can be used to concurrently target systems on multiple starships.`;
      let dc = 5 + (1.5 * target.data.data.details.tier ); //add defensive countermeasure number here?
      await roll_check(`com`, dc, cont);
      button_dialog(battle_stations);
    }]
  ],
  content : `<div sytle="width:100%; text-align:center;><h2>Choose a Science Officer Action : </h2></div>`,
  title : `Science Officer Manager`
}
const stunts = {
  buttons : [
    ["Back Off", async ()=>{
      let cont = `The starship moves up to half its speed in the direction of the aft edge without changing facing. It can’t take any turns during this movement. To perform this stunt, you must succeed at a Piloting check (DC = 10 + 1-1/2 times your starship’s tier). On a failed check, your starship moves backward only 1 hex. If you fail this check by 5 or more, your starship does not move at all and takes a –4 penalty to its AC and TL until the start of the next round.`;
      let dc = 10 + (1.5 * player_SS_tier);
      await roll_check(`pil`, dc, cont);
      button_dialog(battle_stations);
    }],
    ["Barrel Roll", async ()=>{
      let cont = `The starship moves up to half its speed and flips along its central axis. For the next gunnery phase, the starship’s port shields and weapons function as if they were in the starboard firing arc and vice versa. The starship reverts to normal at the beginning of the next round. To perform this stunt, your starship must be Large or smaller and you must succeed at a Piloting check (DC = 10 + 1-1/2 times your starship’s tier). On a failed check, the starship moves half its speed but doesn’t roll. If you fail by 5 or more, your starship moves half its speed, doesn’t roll, and takes a –4 penalty to its AC and TL until the start of the next round.`;
      let dc = 10 + (1.5 * player_SS_tier);
      await roll_check(`pil`, dc, cont);
      button_dialog(battle_stations);
    }],
    ["Evade", async ()=>{
      let cont = `The ship moves up to its speed and can turn as normal, but it gains a +2 circumstance bonus to its AC and TL until the start of the next round. To perform this stunt, you must succeed at a Piloting check (DC = 10 + 1-1/2 times your starship’s tier). If you fail, the starship moves as normal. If you fail the check by 5 or more, the starship moves as normal, but it also takes a –2 penalty to its AC and TL until the start of the next round.`;
      let dc = 10 + (1.5 * player_SS_tier);
      await roll_check(`pil`, dc, cont);
      button_dialog(battle_stations);
    }],
    ["Flip And Burn", async ()=>{
      let cont = `The ship moves forward up to half its speed (without turning) and rotates 180 degrees to face the aft edge at the end of the movement. To perform this stunt, you must succeed at a Piloting check (DC = 15 + 1-1/2 times your ship’s tier). If you fail this check, your starship moves forward half its speed but doesn’t rotate.`;
      let dc = 15 + (1.5 * player_SS_tier);
      await roll_check(`pil`, dc, cont);
      button_dialog(battle_stations);
    }],
    ["Flyby", async ()=>{
      let cont = `The ship moves as normal, but it can move through 1 hex occupied by an enemy starship without provoking a free attack (as described in Moving through Other Starships). During the following gunnery phase, you can select one arc of your starship’s weapons to fire at the enemy vessel as if the vessel were in close range (treat the range as 1 hex), against any quadrant of the enemy starship. To perform this stunt, you must succeed at a Piloting check (DC = 15 + 1-1/2 times the tier of the enemy starship). If you fail this check, your starship still moves as described above, but you follow the normal rules for attacking (based on your starship’s final position and distance), and the movement provokes a free attack from that starship as normal.`;
      let dc =  15 + (1.5 * player_SS_tier);
      await roll_check(`pil`, dc, cont);
      button_dialog(battle_stations);
    }],
    ["Slide", async ()=>{
      let cont = `The starship moves up to its speed in the direction of either the forward-port or forward-starboard edge without changing its facing. To perform this stunt, you must succeed at a Piloting check (DC = 10 + 1-1/2 times your ship’s tier). If you fail this check, the ship moves forward up to half its speed and can’t make any turns.`;
      let dc = 10 + (1.5 * player_SS_tier);
      await roll_check(`pil`, dc, cont);
      button_dialog(battle_stations);
    }],
    ["Turn in Place", async ()=>{
      let cont = `The ship does not move but instead can turn to face any direction. If the ship has a maneuverability of clumsy, it takes a –4 penalty to its AC and TL until the start of the next round. If it has a maneuverability of poor, it instead takes a –2 penalty to its AC and TL until the start of the next round. Ships with a maneuverability of average or better do not take a penalty. This stunt doesn’t require a skill check.`;
      display(cont);
      button_dialog(battle_stations);
    }],
  ], 
  content : `<div sytle="width:100%; text-align:center;><h2> Choose a Stunt action : </h2></div>`,
  title : `Stunt Action Manager`,
}
const ship_guns = {
  buttons : [],
  content : `<div sytle="width:100%; text-align:center;><h2>Choose a Gunner Action : </h2></div>`,
  title : `Gunner Combat Manager`
}

const skills = Object.entries(CONFIG.SFRPG.skills);
let player_SS, player_SS_tier, player, target_SS_tier;

(async ()=>{

  let choices = (game.user.isGM) 
    ? game.actors.filter(actor => !actor.isPC && actor.data.type === `starship`)
    : game.actors.filter(actor => actor.owner && actor.data.type === `starship`);

  if(choices.length !== 1)
  {
    let choice = await choose(choices.map(actor => [actor.id, actor.name]), `Choose your Starship : `);
    player_SS = game.actors.get(choice);
  }else{
    player_SS = choices[0];
  }

  player_SS_tier = player_SS.data.data.details.tier;

  choices = (game.user.isGM) 
    ? game.actors.filter(actor => !actor.isPC && actor.data.type === `character`)
    : game.actors.filter(actor => actor.owner && actor.data.type === `character`);
  
  if(choices.length !== 1)
  {
    let choice = await choose(choices.map(actor => [actor.id, actor.name]), `Choose Crew Member : `);
    player = game.actors.get(choice);
  }else{
    player = choices[0];
  }

  /*
    Add actions based on the characters level & class ranks
  */
  switch(player.data.data.details.level.value)
  { 
    case 20 :
    case 19 :
    case 18 :
    case 17 :
    case 16 :
    case 15 :
    case 14 :
    case 13 :
    case 12 :
      captain_actions.buttons.push(["Moving Speech (Any Phase)", async ()=>{
        let cont =`At 12th level, you can spend 1 Resolve Point and use your action to give a moving speech to the crew during one phase of combat with a successful Diplomacy check (DC = 15 + 1-1/2 times your starship’s tier). For the remainder of that phase, your allies can roll twice and take the better result when performing crew actions.`;
        let dc = 15 + (1.5 * player_SS.data.data.details.tier);
        reduce_resolve();
        await roll_check("dip", dc, cont);
        button_dialog(battle_stations);
      }]);
      gunner_actions.buttons.push(["Precise Targetting (Gunnery Phase)", async ()=> {
        let cont = `At 12th level, you can perform a very precise strike by spending 1 Resolve Point and firing one starship weapon at a single target. If the attack hits and the enemy ship’s shields on that quadrant are depleted before your attack, you deal critical damage to a random system. If the attack would normally cause critical damage, the normal critical damage applies as well (meaning your attack could potentially deal critical damage multiple times; determine which system is damaged as normal each time).`;
        button_dialog(ship_guns);
        reduce_resolve();
        button_dialog();
      }]);
      if(player.data.data.skills?.eng.ranks >= 12)
      {
        engineer_actions.buttons.push(["Quick Fix (Engineering Phase)", async ()=> {
          let choice1 = await choose(["Life Support", "Sensors", "Weapons Array", "Engines", "Power Core"], `Choose system to quick fix : `);
          let cont = `If you have at least 12 ranks in Engineering, you can try to repair the ${choice1} system quickly by spending 1 Resolve Point and attempting an Engineering check (DC = 20 + 1-1/2 times you starship’s tier). If successful, you remove the critical damage condition from one system for 1 hour (allowing it to function as if it had taken no critical damage), after which time it must be repaired as normal.`;
          let dc = 20 + (1.5*player_SS_tier);
          reduce_resolve();
          await roll_check(`eng`, dc, cont);
          button_dialog(battle_stations);
        }]);
      }
      if(player.data.data.skills?.pil.ranks >= 12)
      {
        pilot_actions.buttons.push(["Audacious Gambit (Helm Phase)", async ()=> {
          let cont = `If you have at least 12 ranks in Piloting, you can spend 1 Resolve Point and attempt a Piloting check (DC = 15 + 1-1/2 × your starship’s tier) to pull off complex maneuvers. You can move your starship up to its speed, treating its distance between turns as if it were 2 lower (minimum 0). You can also fly through hexes occupied by enemy vessels without provoking free attacks. At the end of your starship’s movement, you can rotate your starship to face in any direction. If you fail the check, you instead move as if you had taken the fly action (but still lose the Resolve Point).`;
          let dc = (15 + 1.5 * player_SS_tier);
          reduce_resolve();
          await roll_check(`pil`, dc, cont);
          button_dialog(battle_stations);
        }]);
      }
      if(player.data.data.skills?.com.ranks >= 12)
      {
        science_actions.buttons.push(["Improve Countermeasures (Helm Phase)", async ()=> {
          let target = Array.from(game.user.targets)[0]?.actor;
          if(!target) { ui.notifications.error(`Target an enemy ship`); button_dialog(battle_stations); return; };
          reduce_resolve();
          let cont = `If you have at least 12 ranks in Computers, you can try to foil enemy targeting arrays and incoming projectiles by spending 1 Resolve Point and attempting a Computers check. The DC equals 5 + 1-1/2 times the tier of the target starship + its bonus from defensive countermeasures (see page 298). If you’re successful, gunners aboard the target starship roll twice and take the worse result for gunnery checks during this round (including checks for tracking weapons).`;
          let dc = 5 + (1.5 * target.data.data.details.tier ); //add defensive countermeasure number here?
          await roll_check(`com`, dc, cont);
          button_dialog(battle_stations);
        }]);
      }
    case 11 :
    case 10 :
    case 9 :
    case 8 :
    case 7 :
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
      gunner_actions.buttons.push(["Broadside (Gunnery Phase, Push)", async ()=> {
        let cont = `At 6th level, you can expend 1 Resolve Point to fire all of the starship weapons mounted in one arc (including turret-mounted weapons). Each weapon can target any vessel in that arc. All of these attacks are made with a –2 penalty.`;
        reduce_resolve();
        display(cont);
        let choice = await choose(["Forward","Starboard","Port","Aft"], `Choose a firing arc : `);
        player_SS.forEach(async (item) => {
          if(item.type === `starshipWeapon` && item.data.data.mount.arc === choice.toLowerCase())
          {
            await item.roll();
          }
        });
        button_dialog(battle_stations);
      }]);
      if(player.data.data.skills?.eng.ranks >= 6)
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
      if(player.data.data.skills?.pil.ranks >= 6)
      {
        pilot_actions.buttons.push(["Full Power (Helm Phase, Push)", async ()=> {
          let cont = `If you have at least 6 ranks in Piloting, you can spend 1 Resolve Point to move your starship up to 1-1/2 times its speed. You can make turns during this movement, but you add 2 to your starship’s distance between turns.`;
          reduce_resolve();
          display(cont);
          button_dialog(battle_stations);
        }]);
      }
      if(player.data.data.skills?.com.ranks >= 6)
      {
        science_actions.buttons.push(["Lock On (Helm Phase, Push)", async ()=> {
          let target = Array.from(game.user.targets)[0]?.actor;
          if(!target) { ui.notifications.error(`Target an enemy ship`); button_dialog(battle_stations); return; };
          reduce_resolve();
          let cont = `If you have at least 6 ranks in Computers, you can lock your starship’s targeting system on to one enemy vessel. You must spend 1 Resolve Point and attempt a Computers check. The DC equals 5 + 1-1/2 times the tier of the target starship + its bonus from defensive countermeasures (see page 298). If you succeed, your starship’s gunners gain a +2 bonus to gunnery checks against the target for the rest of the round. This action can be taken only once per round.`;
          let dc = 5 + (1.5 * target.data.data.details.tier ); //add defensive countermeasure number here?
          await roll_check(`com`, dc, cont);
          button_dialog(battle_stations);
        }]);
      }
    default :
      break;
  }

  /*
    Add actions based on the player starship weapons
  */
  player_SS.items.forEach( item => {
    if(item.type === `starshipWeapon`)
    {
      ship_guns.buttons.push([`${item.name} - ${item.data.data.mount.arc}`, async () => {
        item.roll();
      }]);
    }
  });

  button_dialog(battle_stations);
})();

/*
  Base Methods in use.
*/
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
async function display(content)
{
  ChatMessage.create({content, speaker : { actor : player }});
}
async function reduce_resolve(point = 1)
{
  let {min, max, value} = player.data.data.attributes.rp;
  if((value - point) <  min) return ChatMessage.create({content : `${player.name} does not have enough resolve points to complete action.`});
  player.update({ "data.attributes.rp.value" : Math.clamped(value - point, min, max)});
}

/*
  Will need to be changed due to promise being returned eventually (hopefully)
*/
async function roll_check(type, dc, message)
{
  player.rollSkill(type, {event});

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
  let bab = player.data.data.attributes.bab > player.data.data.skills.pil.ranks ? player.data.data.attributes.bab : player.data.data.skills.pil.ranks;
  let roll = new roll(`1d20 + ${bab} + ${player.data.data.abilities.dex.mod}`).roll();

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

