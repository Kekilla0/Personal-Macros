(()=>{
  let maneuvers = [
    "Maneuvers: Commander's Strike",
    "Maneuvers: Disarming Attack",
    "Maneuvers: Distracting Strike",
    "Maneuvers: Evasive Footwork",
    "Maneuvers: Feinting Attack",
    "Maneuvers: Goading Attack",
    "Maneuvers: Lunging Attack",
    "Maneuvers: Maneuvering Attack",
    "Maneuvers: Menacing Attack",
    "Maneuvers: Parry",
    "Maneuvers: Precision Attack",
    "Maneuvers: Pushing Attack",
    "Maneuvers: Rally",
    "Maneuvers: Riposte",
    "Maneuvers: Sweeping Attack",
    "Maneuvers: Trip Attack",
    "Maneuvers: Ambush",
    "Maneuvers: Bait and Switch",
    "Maneuvers: Brace",
    "Maneuvers: Restraining Strike",
    "Maneuvers: Silver Tongue",
    "Maneuvers: Snipe",
    "Maneuvers: Studious Eye",
  ];

  let available_maneuvers = item.actor.items.filter(i=>maneuvers.includes(i.name));

  let macroA = game.macros.getName("Toggle_Token_Icon");
  let macroB = game.macros.getName("Update_Actor_Macro");

  if(game.user.targets.size < 1) return ui.notifications.error(`Please select the correct amount of targets for the manuever you will select.`);

  item.roll().then((result)=> {
    if(!result) return;

    let maneuv_content = ``;

    for(let maneuver of available_maneuvers)
    {
      maneuv_content += `<option value="${maneuver.name}">${maneuver.name}</option>`;
    }

    let dialog_content = `
    <div class=form-group>
      <label for="manu">Choose a Manuever</label>
      <select id="manu">
        ${maneuv_content}
      </select>
    </div>`;

    new Dialog({
      content : dialog_content,
      buttons :
      {
        Ok :
        {
          label : `Ok`,
          callback : (html) => 
          {
            let chosen_maneuver_string = html.find('[id=manu]')[0].value;
            let chosen_maneuver_object = available_maneuvers.find(i=>i.name === chosen_maneuver_string );

            let target = game.user.targets.values().next().value;

            chosen_maneuver_object.roll().then(async (result) => {
              if(!result) return; 

              switch(chosen_maneuver_string)
              {
                case "Maneuvers: Commander's Strike" :
                  ChatMessage.create({
                    content : `${target.name} strike now!`,
                    speaker : ChatMessage.getSpeaker()
                  });
                  make_roll();
                  break;
                case "Maneuvers: Disarming Attack" :
                  await make_attack(true);
                  await make_save(`str`, `${target.name} failed to keep hold of his weapon.`);                  
                  break;
                case "Maneuvers: Distracting Strike":
                  make_attack(true);
                  macroA.execute(target.id,chosen_maneuver_object.data.img, 0.1);
                  break;
                case "Maneuvers: Evasive Footwork":
                  ChatMessage.create({
                    content : `${item.actor.name} adds ${await make_roll(false)} to their AC while moving.`,
                    speaker : ChatMessage.getSpeaker()
                  });
                  break;
                case "Maneuvers: Feinting Attack":
                  ChatMessage.create({
                    content : `${item.actor.name} feigns to the right, gaining advantage on thier next attack on ${target.name}.`,
                    speaker : ChatMessage.getSpeaker()
                  });
                  await make_attack(true);
                  break;
                case "Maneuvers: Goading Attack":
                  ChatMessage.create({
                    content : `${item.actor.name} goads ${target.name} into attacking him. Adding ${await make_roll(false)} damage to their last attack.`,
                    speaker : ChatMessage.getSpeaker()
                  });
                  await make_save(`wis`,`${target.name} must attack ${item.actor.name} at disadvantage the next turn.`);
                  break;
                case "Maneuvers: Lunging Attack":
                  make_attack(true);
                  break;
                case "Maneuvers: Maneuvering Attack":
                  ChatMessage.create({
                    content : `${item.actor.name} gets ${target.name} attention, allowing one of their allies to move into a more adventageous position and adds ${await make_roll(false)} damage to their last attack.`,
                    speaker : ChatMessage.getSpeaker()
                  });
                  break;
                case "Maneuvers: Menacing Attack":
                  ChatMessage.create({
                    content : `${item.actor.name} attempts to frighten ${target.name} and adds ${await make_roll(false)} damage to their last attack.`,
                    speaker : ChatMessage.getSpeaker()
                  });
                  if(!make_save("wis", `${target.name} is frightened.`))
                  {
                    macroA.execute(target.id,chosen_maneuver_object.data.img, 0.1);
                  }
                  break;
                case "Maneuvers: Parry":
                  ChatMessage.create({
                    content : `${item.actor.name} parries ${target.name}'s attack reducing the damage by ${(await make_roll(false) + item.actor.data.data.abilities.dex.mod )}`,
                    speaker : ChatMessage.getSpeaker()
                  });
                  break;
                case "Maneuvers: Precision Attack":
                  ChatMessage.create({
                    content : `${item.actor.name} focuses on their attack against ${target.name} adding ${await make_roll(false)} to their attack roll.`,
                    speaker : ChatMessage.getSpeaker()
                  });
                  break;
                case "Maneuvers: Pushing Attack":
                  ChatMessage.create({
                    content : `${item.actor.name} focuses on their attack against ${target.name} adding ${await make_roll(false)} to their damage roll.`,
                    speaker : ChatMessage.getSpeaker()
                  });
                  await make_save(`str`,`${target.name} is pushed up to 15 feet away!`);
                  break;
                case "Maneuvers: Rally":
                  let temp_hp = (await make_roll(false)) + item.actor.data.data.abilities.cha.mod; 
                  ChatMessage.create({
                    content : `${item.actor.name} rallys behind ${target.name} adding ${temp_hp} temp hp.`,
                    speaker : ChatMessage.getSpeaker()
                  });
                  await macroB.execute(target.id, {"data.attributes.hp.temp" : temp_hp});
                  break;
                case "Maneuvers: Riposte":
                  make_attack(true);
                  break;
                case "Maneuvers: Sweeping Attack" :
                  ChatMessage.create({
                    content : `${item.actor.name} pushes their attack further and attempts to hit a second foe, dealing ${await make_roll(false)} damage.`,
                    speaker : ChatMessage.getSpeaker()
                  });
                  break;
                case "Maneuvers: Trip Attack" :
                  ChatMessage.create({
                    content : `${item.actor.name} attempts to trip ${target.name} adding ${await make_roll(false)} to their damage roll.`,
                    speaker : ChatMessage.getSpeaker()
                  });
                  await make_save(`str`,`${target.name} falls prone at ${item.actor.name}'s feet!`);
                  break;
                case "Maneuvers: Ambush" :
                  ChatMessage.create({
                    content : `${item.actor.name} moves quickly against their foe! Adding ${await make_roll(false)} to their stealth/initiative roll.`,
                    speaker : ChatMessage.getSpeaker()
                  });
                  break;
                case "Maneuvers: Bait and Switch":
                  ChatMessage.create({
                    content : `${item.actor.name} switches position with ${target.name}, bolstering ${target.name}'s AC by ${await make_roll(false)}.`,
                    speaker : ChatMessage.getSpeaker()
                  });
                  break;
                case "Maneuvers: Brace":
                  make_attack(true);
                  break;
                case "Maneuvers: Restraining Strike":
                  ChatMessage.create({
                    content : `${item.actor.name} attempts to grapple ${target.name}, bolstering the attempt by ${await make_roll(false)}!`,
                    speaker : ChatMessage.getSpeaker()
                  });
                  break;
                case "Maneuvers: Silver Tongue":
                  ChatMessage.create({
                    content : `${item.actor.name} superiority exits the battlefield! Adding ${await make_roll(false)} to their deception/persuasion roll.`,
                    speaker : ChatMessage.getSpeaker()
                  });
                  break;
                case "Maneuvers: Snipe":
                  make_attack(true);
                  break;
                case "Maneuvers: Studious Eye":
                  ChatMessage.create({
                    content : `${item.actor.name} sharpens his senses! Adding ${await make_roll(false)} to their insight/investigation roll.`,
                    speaker : ChatMessage.getSpeaker()
                  });
                  break;
              }
            });
          }
        },
        Cancel :
        {
          label : `Cancel`,
        }
      }
    }).render(true);
  });
})();

async function make_attack(add_damage = false)
{
  //look for weapons that have attacks - then make an attack with it adding superiority if add_damage is true

  let weapons = item.actor.items.filter(i=>i.hasAttack && i.data.type === `weapon`);

  let weapons_content = ``;

  for(let weapon of weapons)
  {
    weapons_content+= `<option value="${weapon.name}">${weapon.name}</option>`;
  }

  let dialog_content = `
  <div class=form-group>
    <label for="weap">Choose a Weapon</label>
    <select id="weap">
      ${weapons_content}
    </select>
  </div>`;

  new Dialog({
    content : dialog_content,
    buttons :
    {
      Ok :
      {
        label : `Ok`,
        callback : async (html) => 
        {
          let chosen_weapon_string = html.find('[id=weap]')[0].value;
          let chosen_weapon_object = weapons.find(i=>i.name === chosen_weapon_string );

          let old_damage = `${chosen_weapon_object.data.data.damage.parts[0][0]}`;
          let new_damage = old_damage;

          if(add_damage) new_damage += ` + 1${item.data.data.formula}`;
          
          chosen_weapon_object.data.data.damage.parts[0][0] = new_damage;

          await chosen_weapon_object.rollAttack().then(async (result) => {
            if(!result) return;

            await chosen_weapon_object.rollDamage();
            chosen_weapon_object.data.data.damage.parts[0][0] = old_damage;
          });
        }
      },
      Cancel :
      {
        label : `Cancel`
      }
    }
  }).render(true);
}

async function make_save(save_type = "", message = "")
{
  let target = game.user.targets.values().next().value;

  let save_roll = new Roll(`1d20 + ${target.actor.data.data.abilities[save_type].save}`).roll();

  save_roll.toMessage({
    speaker : ChatMessage.getSpeaker({token : target}),
    rollMode : "blindroll",
    flavor : `${save_type} saving throw`
  })

  if(save_roll.total < item.data.data.save.dc)
  {
    ChatMessage.create({
      content : message,
      speaker : ChatMessage.getSpeaker({token : target}),
      blind : true,
      whisper : ChatMessage.getWhisperRecipients("GM")
    });
    return false;
  }
  return true;
}

async function make_roll(display = true)
{
  let superiority_roll = new Roll(`1${item.data.data.formula}`).roll();

  if(display)
  {
    superiority_roll.toMessage({
      speaker : ChatMessage.getSpeaker({actor : item.actor}),
      rollMode : "blindroll"
    });
  }

  return superiority_roll.total;
}