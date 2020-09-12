(async ()=> {
  ui.notifications.warn(`Loading, may take a few seconds.`);

  const race_pack = await game.packs.find(p=>p.metadata.label === "Races" && p.metadata.package === "sfrpg").getContent();
  const theme_pack = await game.packs.find(p=>p.metadata.label === "Themes" && p.metadata.package === "sfrpg").getContent();
  const class_pack = await game.packs.find(p=>p.metadata.label === "Classes" && p.metadata.package === "sfrpg").getContent();

  const class_feature_pack = await game.packs.find(p=>p.metadata.label === "Class Features" && p.metadata.package === "sfrpg").getContent();
  const spell_pack = await game.packs.find(p=>p.metadata.label === "Spells" && p.metadata.package === "sfrpg").getContent();
  const equip_pack = await game.packs.find(p=>p.metadata.label === "Equipment" && p.metadata.package === "sfrpg").getContent();

  const actors = game.actors.filter(a=>a.isPC && a.owner).map(a=> [a.id,a.name]);
  const gender = ["Male","Female"];
  const races = ["Android","Human","Kasatha","Lashunta","Shirren","Vesk","Ysoki"];
  const themes = ["Ace Pilot","Bounty Hunter","Icon", "Mercenary", "Outlaw", "Priest", "Scholar", "Spacefarer", "Xenoseeker", "Themeless"];
  const classes = ["Envoy","Mechanic","Mystic","Operative","Solarian","Soldier","Technomancer"];

  const stats = Object.entries(CONFIG.SFRPG.abilities);
  const skills = Object.entries(CONFIG.SFRPG.skills);
  const alignments = Object.entries(CONFIG.SFRPG.alignments);
  const languages = Object.entries(CONFIG.SFRPG.languages);   //add languages logic?

  const actor_update = {
  actor : {}, gender : "", items : [], add_feat : [], add_skill : [], add_spell : [], level : 0, stats : {
    str : 0, dex : 0, con : 0, int : 0, wis : 0, cha : 0}, roll : true
  }

  /*
    limitations === `What can't be there`
    restrictions === `What can they choose from`

    add_skill : [{ reason : ``, limitations : [], restrictions : [], number : 0 }],
    add_feat : [{ reason : ``, limitations : [], restrictions : [], number : 0 }],
    add_spell : [{ reason : ``, limitations : [], restrictions : [], number : 0 }]
  */

  main();

  async function main()
  {
    await get_actor(await choose(actors, `Choose Actor : `));

    switch(actor_update.level)
    {
      case 1 :
        actor_update.add_feat.push({reason : `Level 1`, limitations : [], restrictions : [], number : 1});
        await get_gender(await choose(gender,`Choose Gender : `));
        await get_alignment(await choose (alignments, `Choose Alignment : `));
        await get_race(await choose(races, `Choose Race : `));
        await get_theme(await choose(themes, `Choose Theme : `)); 
        await get_class(await choose(classes, `Choose Class : `));      
        if(actor_update.roll) await roll_stats();
        await get_skills();
        await get_spells();
        await fix_theme();
        //await get_feats();
        //await get_languages();

        await update_actor();
        break;
    }
    console.log(actor_update);
  }

  async function get_gender(gender=``)
  {
    actor_update.gender = gender;
  }

  async function get_actor(id=``)
  {
    actor_update.actor = duplicate(await game.actors.get(id));

    let class_items = actor_update.items.filter(i=>i.type==="class");

    if(class_items.length === 0)
    {
      actor_update.level = 1
    }else{
      class_items.forEach(c=>{
        actor_update.level += c.data.data.levels;
      });
      actor_update.level++;
    }

    for(let stat of stats)
    {
      actor_update.stats[stat[0]] = actor_update.actor.data.abilities[stat[0]].base;
      if(actor_update.actor.data.abilities[stat[0]].base !== 10) actor_update.roll = false;
    }
  }

  async function get_race(name=``)
  {
    if(name === "Lashunta")
      name = actor_update.gender ==="Male" ? "Damaya Lashunta" : "Korasha Lashunta";

    
    let race_item = race_pack.find(r=>r.name === name);
    let unarmed_item = equip_pack.find(i=>i.name==="Unarmed strike");

    if(!race_item) return ui.notifications.error(`Race does not exist`);
    if(!unarmed_item) return ui.notifications.error(`Unarmed strike does not exist`);

    //add level switch

    switch(name)
    {
      case "Android" :
        actor_update.actor.data.traits.size = "medium";
        actor_update.actor.data.traits.senses =  "Exceptional Vision";
        actor_update.actor.token.dimSight = 60;

        //flat effect - -2 sense motive;
        //upgrade slot - single armor upgrade slot in their bodies 
        break;
      case "Human" :
        actor_update.actor.data.traits.size = "medium";
        race_item.data.data.abilityMods.parts[0][1] = await choose(stats, `Choose One ability (Human Ability Boost) : `);
        
        //bonus feat
        actor_update.add_feat.push({reason : `Human Race`, limitations : [], restrictions : [], number : 1});
        //bonus ranks
        break;
      case "Kasatha" :
        actor_update.actor.data.traits.size = "medium";
        actor_update.actor.data.attributes.arms = "4";
        race_item = create_modifier({
          item : race_item,
          condition : "", 
          effectType : "skill", 
          modifier : 2, 
          modifierType : "constant", 
          name : `Race CUL Modifier`,
          notes : "Level 0", 
          source : `${race_item.name}`, 
          subtab : "misc", 
          type : "racial", 
          valueAffected : "cul"
        });
        race_item = create_modifier({
          item : race_item,
          condition : "", 
          effectType : "skill", 
          modifier : 2, 
          modifierType : "constant", 
          name : `Race ACR Modifier`,
          notes : "Level 0", 
          source : `${race_item.name}`, 
          subtab : "misc", 
          type : "racial", 
          valueAffected : "acr"
        });
        race_item = create_modifier({
          item : race_item,
          condition : "", 
          effectType : "skill", 
          modifier : 2, 
          modifierType : "constant", 
          name : `Race ATH Modifier`,
          notes : "Level 0", 
          source : `${race_item.name}`, 
          subtab : "misc", 
          type : "racial", 
          valueAffected : "ath"
        });
        break;
      case "Shirren":
        actor_update.actor.data.traits.size = "medium";
        actor_update.actor.data.traits.senses =  "Blindsense";
        actor_update.actor.token.brightSight = 30;
        race_item = create_modifier({
          item : race_item,
          condition : "", 
          effectType : "skill", 
          modifier : 2, 
          modifierType : "constant", 
          name : `Race CUL Modifier`,
          notes : "Level 0", 
          source : `${race_item.name}`, 
          subtab : "misc", 
          type : "racial", 
          valueAffected : "cul"
        });
        race_item = create_modifier({
          item : race_item,
          condition : "", 
          effectType : "skill", 
          modifier : 2, 
          modifierType : "constant", 
          name : `Race DIP Modifier`,
          notes : "Level 0", 
          source : `${race_item.name}`, 
          subtab : "misc", 
          type : "racial", 
          valueAffected : "dip"
        });
        break;
      case "Vesk" :
        actor_update.actor.data.traits.size = "medium";
        actor_update.actor.data.traits.senses =  "Low-Light Vision";
        actor_update.actor.token.dimSight = 60;
        unarmed_item.data.data.chatFlavor = "lethal";
        unarmed_item.data.data.properties.archaic = false;

        //armor savant?? not sure how to deal with this
        break;
      case "Ysoki" :
        actor_update.actor.data.traits.size = "small";
        actor_update.actor.data.traits.senses =  "Darkvision";
        actor_update.actor.token.dimSight = 60;
        race_item = create_modifier({
          item : race_item,
          condition : "", 
          effectType : "skill", 
          modifier : 2, 
          modifierType : "constant", 
          name : `Race ENG Modifier`,
          notes : "Level 0", 
          source : `${race_item.name}`, 
          subtab : "misc", 
          type : "racial", 
          valueAffected : "eng"
        });
        race_item = create_modifier({
          item : race_item,
          condition : "", 
          effectType : "skill", 
          modifier : 2, 
          modifierType : "constant", 
          name : `Race STE Modifier`,
          notes : "Level 0", 
          source : `${race_item.name}`, 
          subtab : "misc", 
          type : "racial", 
          valueAffected : "ste"
        });
        race_item = create_modifier({
          item : race_item,
          condition : "", 
          effectType : "skill", 
          modifier : 2, 
          modifierType : "constant", 
          name : `Race SUR Modifier`,
          notes : "Level 0", 
          source : `${race_item.name}`, 
          subtab : "misc", 
          type : "racial", 
          valueAffected : "sur"
        });
        break;
      case "Damaya Lashunta" :
      case "Korasha Lashunta" :
        actor_update.actor.data.traits.size = "medium";
        spell_pack.filter(s=>s.name==="Daze" || s.name ==="Psychokinetic Hand" || s.name === "Detect Thoughts").forEach(d => {
          d.data.data.preparation.mode = "innate"
          if(d.name ==="Detect Thoughts"){
            d.data.data.preparation.uses = {
              value : 1, max : 1, per : "day"
            };
          }
          actor_update.items.push(d);
        });
        actor_update.add_skill.push({reason : `Lashunta Student`, limitations : [], restrictions : [],  number : 2 })
        break;
      default : 
    }
    race_item = fix_stats(race_item);
    actor_update.items.push(race_item);
    actor_update.items.push(unarmed_item);
    actor_update.actor.token.vision = true;
    actor_update.actor.data.details.race = name;  
    actor_update.actor.token.lockRotation = true;
    actor_update.actor.token.displayName = 50;
    actor_update.actor.token.displayBars = 40;
    actor_update.actor.token.bar1 = {attribute : "attribute.hp"};
    actor_update.actor.token.bar1 = {attribute : "attribute.sp"};
    actor_update.actor.data.space = "5 ft.";
  }

  async function get_theme(name=``)
  {
    let theme_item = theme_pack.find(r=>r.name === name);
    if(!theme_item) return ui.notifications.error(`Theme does not exist`);

    //add level switch
    let option;

    switch(name)
    {
      case "Ace Pilot" :
        //Piloting
        break;
      case "Bounty Hunter" :
        //Survival
        break;
      case "Icon" :
        //Culture
        break;
      case "Mercenary" :
        //Athletics
        break;
      case "Outlaw" :
        //Sleight of Hand
        break;
      case "Priest" :
        //Mysticism
        break;
      case "Scholar" :
        option = await choose(skills, `Choose one skill (Scholar Skill Change) : `);
        theme_item.data.data.skill = option;
        break;
      case "Spacefarer" :
        //Physical Sciences
        break;
      case "Xenoseeker" :
        //life sciences
        break;
    }
    fix_stats(theme_item);
    actor_update.items.push(theme_item);
    //add theme to character sheet
  }

  async function get_class(name=``)
  {
    //change actor_update.level with class_item.level
    let levels, options, spells, spellsKnown;

    let class_item = class_pack.find(r=>r.name === name);
    if(!class_item) return ui.notifications.error(`Class does not exist`);

    switch(name)
    {
      case "Envoy" : await envoy(); break;
      case "Mechanic" : await mechanic(); break;
      case "Mystic" : await mystic(); break;
      case "Operative" : await operative(); break;
      case "Solarian" : await solarian(); break;
      case "Soldier" : await soldier(); break;
      case "Technomancer" : await technomancer(); break;
    }

    for(let i=0; i < spellsKnown[actor_update.level].length; i++)
    {
      if(spellsKnown[actor_update.level][i] !== 0)
      {
        actor_update.add_spell.push({reason : `${class_item.name} Level ${actor_update.level}`, limitations : [], restrictions : spells[i] , number : spellsKnown[actor_update.level][i]});
      }
    } 

    await get_feature(levels[actor_update.level]);

    actor_update.items.push(class_item);
    
    if(actor_update.level === 1)
    {
      actor_update.actor.data.currency.credit = 1000;
      actor_update.actor.data.attributes.keyability = class_item.data.data.kas;
      actor_update.actor.data.details.class = name;
    }

    async function envoy(){
      levels = {
        1 : ["Envoy Improvisation", "Expertise (Ex)", "Skill Expertise (Ex)"]
      };

      options = {
        "Envoy Improvisation" : {
          1 : ["Clever Feint (Ex)", "Dispiriting Taunt (Ex)", "Don't Quit (Ex)", "Expanded Attunement (Ex)","Get 'Em (Ex)", "Inspiring Boost (Ex)", "Look Alive (Ex)", "Not in the Face (Ex)", "Universal Expression (Ex)", "Watch Your Step (Ex)"]
        }
      }

      spells = {};

      spellsKnown = {
        1 : [0,0,0,0,0,0,0],
      }
    }
    async function mechanic(){
      levels = {
        1 : ["Artificial Intelligence (Ex)", "Bypass (Ex)", "Custom Rig (Ex)"]
      }

      options = {
        "Artificial Intelligence (Ex)" : {
          1 : ["Drone","Exocortex"]
        }
      }
      spells = {};

      spellsKnown = {
        1 : [0,0,0,0,0,0,0],
      }

    }
    async function mystic(){
      levels = {
        1 : ["Connection", "Healing Touch (Su)"]
      }

      options = {
        "Connection" : {
          1 : ["Akashic","Empath","Healer", "Mindbreaker", "Overlord", "Star Shaman", "Xenodruid"]
        },
        "Akashic" : {
          1 : {
            spell : "Identify",
            feature : "Akashic Knowledge (Ex)"
          }
        },
        "Empath" : {
          1 : {
            spell : "Detect Thoughts",
            feature : "Empath (Su)"
          }
        },
        "Healer" : {
          1 : {
            spell : "Mystic Cure*",
            feature : "Healing Channel (Su)"
          }
        },
        "Mindbreaker" : {
          1 : {
            spell : "Mind Thrust", 
            feature : "Share Pain (Su)"
          }
        },
        "Overlord" : {
          1 : {
            spell : "Command",
            feature : "Inexplicable Commands (Su)"
          }
        },
        "Star Shaman" : {
          1 : {
            spell : "Magic Missile",
            feature : "Walk the Void (Su)"
          }
        }, 
        "Xenodruid" : {
          1 : {
            spell : "Life Bubble",
            feature : "Speak with Animals (Su)"
          }
        }
      }

      spells = {
        0 : ["Daze", "Detect Afflication", "Detect Magic", "Fatigue", "Ghost Sound", "Grave Words", "Psychokinetic Hand", "Stabilize", "Telekinetic Projectile", "Telepathic Message", "Token Spell"],
        1 : ["Charm Person", "Command", "Confusion, Lesser", "Detect Radiation", "Detect Thoughts", "Disguise Self", "Fear", "Identify", "Keen Senses", "Life Bubble", "Mind Link", "Mind Thrust", "Mystic Cure*", "Reflecting Armor*", "Remove Condition, Lesser*", "Share Language", "Wisp Ally"]
      }

      spellsKnown = {
        1 : [4,2,0,0,0,0,0],
      }

      actor_update.actor.data.attributes.spellcasting = class_item.data.data.kas;
    }
    async function operative(){
      levels = {
        1 : ["Operative's Edge (Ex)", "Specialization", "Trick Attack (Ex)"]
      };

      options = {
        "Specialization" : {
          1 : ["Daredevil","Detective","Explorer", "Ghost", "Hacker", "Spy", "Thief"]
        },
        "Daredevil" : {
          1 : "Versatile Movement (Ex)",
        },
        "Detective" : {
          1 : "Glimpse the Truth (Ex)",
        },
        "Explorer" : {
          1 : "Ever Vigilant (Ex)",
        },
        "Ghost" : {
          1 : "Cloaking Field (Ex)",
        },
        "Hacker" : {
          1 : "Elusive Hacker (Ex)",
        },
        "Spy" : {
          1 : "Master of Disguise (Ex)",
        },
        "Thief" : {
          1 : "Holographic Distraction (Ex)",
        }
      }

      spells = {};

      spellsKnown = {
        1 : [0,0,0,0,0,0,0],
      }
    }
    async function solarian(){
      levels = {
        1 : ["Skill Adept", "Solar Manifestation (Su)", "Stellar Mode (Su)", "Stellar Revelation", "Black Hole (Su)", "Supernova (Su)"]
      };

      options = {
        "Solar Manifestation (Su)" : {
          1 : ["Solar Armor", "Solar Weapon"]
        },
        "Stellar Revelation" : {
          1 : []
        }
      };

      spells = {};

      spellsKnown = {
        1 : []
      }
    }
    async function soldier(){
      levels = {
        1 : ["Fighting Style", "Primary Style Technique"]
      };

      options = {
        "Fighting Style" : {
          1 : ["Arcane Assailant", "Armor Storm", "Blitz", "Bombard", "Guard", "Hit-and-Run", "Sharpshoot"]
        },
        "Arcane Assailant" : {
          1 : "Rune of the Eldritch Knight (Su)(1st)"
        },
        "Armor Storm" : {
          1 : "Hammer Fist (Ex)(1st)"
        },
        "Blitz" : {
          1 : "Rapid Response (Ex)(1st)"
        },
        "Bombard" : {
          1 : "Grenade Expert (Ex)(1st)"
        },
        "Guard" : {
          1 : "Armor Training (Ex)(1st)"
        },
        "Hit-and-Run" : {
          1 : "Opening Volley (Ex)(1st)"
        },
        "Sharpshoot" : {
          1 : "Sniper's Aim (Ex)(1st)"
        }
      };

      spells = {};

      spellsKnown = { 
        1 : []
      };
    }
    async function technomancer(){
      levels = {
        1 : "Spell Cache (Su)",
      };

      options = {

      };

      spells = {
        0 : ["Dancing Lights", " Daze", "Detect Affliction", "Detect Magic", "Energy Ray", "Ghost Sound", "Mending", "Psychokinetic Hand", "Telephatic Message", "Token Spell", "Transfer Charge"],
        1 : ["Comprehend Languages", "Detect Radiation", "Detect Tech", "Disguise Self", "Erase", "Flight", "Grease", "Hold Portal", "Holographic Image", "Identify", "Jolting Surge", "Keen Senses", "Life Bubble", "Magic Missile", "Overheat", "Supercharge Weapon", "Unseen Servant"],
      };

      spellsKnown = {
        1 : [4,2,0,0,0,0,0],
      }

      actor_update.actor.data.attributes.spellcasting = class_item.data.data.kas;
    }
    async function get_feature(value)
    {
      if(value instanceof Array)
      {
        for(let v of value)
        {
          await get_feature(v);
        }
      }else{
        let feature = class_feature_pack.find(i=> i.name===value);
        let option;

        switch(value)
        {
          case "Envoy Improvisation" :
          case "Specialization" :
          case "Solar Manifestation (Su)" :
          case "Artificial Intelligence (Ex)" :
          case "Connection" :
          case "Fighting Style":
            option = await choose(options[value][actor_update.level], `Choose an ${value} : `);
            await get_feature(option);
            break;
          case "Daredevil" : 
          case "Detective" :
          case "Explorer" :
          case "Ghost" :
          case "Hacker" :
          case "Spy" :
          case "Thief" :
          case "Arcane Assailant" :
          case "Armor Storm" :
          case "Blitz" :
          case "Bombard" :
          case "Guard" :
          case "Hit-and-Run" :
          case "Sharpshoot" :
            await get_feature(options[value][actor_update.level]);
            break;
          case "Akashic" :
          case "Empath" :
          case "Healer" :
          case "Mind Breaker" : 
          case "Overlord" :
          case "Star Shaman" :
          case "Xenodruid" :
            await get_feature(options[value][actor_update.level].feature);
            await get_spell(options[value][actor_update.level].spell); 
            break;
          case "Expertise (Ex)" :
            feature = create_modifier({
              item : feature,
              condition : "", 
              effectType : "skill", 
              modifier : "1d6", 
              modifierType : "formula", 
              name : `Class SEN Modifier`,
              notes : "Level 1", 
              source : `${feature.name}`, 
              subtab : "misc", 
              type : "insight", 
              valueAffected : "sen"
            });
            break;
          case "Skill Expertise (Ex)" :
            option = await choose(skills.filter(s=> !["sen", "lsc", "mys", "phs", "sur"].includes(s[0])), `Choose a skill for ${value} : `);
            feature = create_modifier({
              item : feature,
              condition : "", 
              effectType : "skill", 
              modifier : "1d6", 
              modifierType : "formula", 
              name : `Class ${option.toUpperCase()} Modifier`,
              notes : "Level 1", 
              source : `${feature.name}`, 
              subtab : "misc", 
              type : "insight", 
              valueAffected : option
            });
            break;
          case "Bypass (Ex)" :
            feature = create_modifier({
              item : feature,
              condition : "", 
              effectType : "skill", 
              modifier : 1, 
              modifierType : "constant", 
              name : `Class COM Modifier`,
              notes : "Level 1", 
              source : `${feature.name}`, 
              subtab : "misc", 
              type : "insight", 
              valueAffected : "com"
            });
            feature = create_modifier({
              item : feature,
              condition : "", 
              effectType : "skill", 
              modifier : 1, 
              modifierType : "constant", 
              name : `Class ENG Modifier`,
              notes : "Level 1", 
              source : `${feature.name}`, 
              subtab : "misc", 
              type : "insight", 
              valueAffected : "eng"
            });
            break;
          case "Exocortex" : 
            add_prof("armorProf","hvy");
            await getFeature(["Combat Tracking (Ex)", "Memory Module (Ex)"]);
            break;
          case "Akashic Knowledge (Ex)" :
            await getFeature("Channel Skill (Su)");
            break;
          case "Walk the Void (Su)" :
            class_item.data.data.csk["pil"] = true;
            break;
          case "Operative's Edge (Ex)":
            feature = create_modifier({
              item : feature,
              condition : "", 
              effectType : "all-skills", 
              modifier : 1, 
              modifierType : "constant", 
              name : `Class Skill Modifier`,
              notes : "Level 1", 
              source : `${feature.name}`, 
              subtab : "misc", 
              type : "insight", 
              valueAffected : ""
            }); 
            feature = create_modifier({
              item : feature,
              condition : "", 
              effectType : "initiative", 
              modifier : 1, 
              modifierType : "constant", 
              name : `Class Skill Modifier`,
              notes : "Level 1", 
              source : `${feature.name}`, 
              subtab : "misc", 
              type : "insight", 
              valueAffected : ""
            });
            break;
          case "Skill Adept" :
            actor_update.add_skill.push({reason : `Solarian Skill Adept`, limitations : [], restrictions :[],  number : 2});
            break;
        }
        actor_update.items.push(feature);
      }
    }
  }

  async function get_alignment(name=``){
    actor_update.actor.data.details.alignment = name;
  }

  function create_modifier({item, condition="", effectType="", enabled=true, modifier, modifierType="", name="", notes="", source="", subtab="", type="", valueAffected="" })
  {
    if(!item.data.data?.modifiers)
    {
      item.data.data.modifiers = [];
    }

    item.data.data.modifiers.push({
      condition, effectType, enabled, modifier, modifierType, name, notes, source, subtab, type, valueAffected, _id : game.sfrpg.generateUUID()
    });

    return item;
  }

  function add_prof(profType, value){
    if(!actor_update.actor.data?.traits[profType].value instanceof Array)
    {
      actor_update.actor.data.traits[profType].value = [value];
    }else{
      if(!actor_update.actor.data?.traits[profType].value.includes(value))
      {
        actor_update.actor.data.traits[profType].value.push(value);
      }
    }
  }

  function fix_stats(item)
  {
    if(item.data.data?.abilityMods.parts instanceof Array && item.data.data?.abilityMods.parts.length > 0)
    {
      for(let abilityMods of item.data.data.abilityMods.parts)
      {
        item = create_modifier({
          item : item,
          condition : "", 
          effectType : "ability-score", 
          modifier : abilityMods[0], 
          modifierType : "constant", 
          name : `Race ${abilityMods[1].toUpperCase()} Modifier`,
          notes : "Level 0", 
          source : `${item.name}`, 
          subtab : "misc", 
          type : "racial", 
          valueAffected : `${abilityMods[1]}`
        });
        actor_update.stats[abilityMods[1]] += abilityMods[0];
      }
    }else if(item.data.data?.abilityMod) {
      item = create_modifier({
        item : item,
        condition : "", 
        effectType : "ability-score", 
        modifier : item.data.data.abilityMod.mod, 
        modifierType : "constant", 
        name : `Race ${item.data.data.abilityMod.ability.toUpperCase()} Modifier`,
        notes : "Level 0", 
        source : `${item.name}`, 
        subtab : "misc", 
        type : "racial", 
        valueAffected : item.data.data.abilityMod.ability
      });
      actor_update.stats[item.data.data.abilityMod.ability] += item.data.data.abilityMod.mod;
    }
    return item;
  }

  //dont think this is working
  function fix_theme()
  {
    let theme_item = actor_update.items.find(i=>i.type==="theme");
    let class_item = actor_update.items.find(i=>i.type==="class");

    let missing_Skills = Object.entries(class_item.data.data.csk).filter(s=>!s[1]).map(s=>[s[0],CONFIG.SFRPG.skills[s[0]]]);

    //change all calls of create_modifier to use item.data instead of item.
    if(missing_Skills.find(s=>s[0] === theme_item.data.data.skill))
    {
      theme_item = create_modifier({
        item : theme_item,
        condition : "", 
        effectType : "skill", 
        modifier : 1, 
        modifierType : "constant", 
        name : `Theme ${theme_item.data.skill} Modifier`,
        notes : "Level 0", 
        source : `${theme_item.name}`, 
        subtab : "misc", 
        type : "untyped", 
        valueAffected : theme_item.data.skill
      });
    }
  }

  async function get_skills()
  {
    let class_item = actor_update.items.find(i=>i.data.type === `class`);
    let missing_Skills = Object.entries(class_item.data.data.csk).filter(s=>!s[1]).map(s=>[s[0],CONFIG.SFRPG.skills[s[0]]]);
    let option = ``;

    for(let skill of actor_update.add_skill)
    {
      missing_Skills = skill.limitations.length !== 0 
        ? missing_Skills.filter(s=> skill.limitations.includes(s))
        : missing_Skills;

      //figure out how to handle "restrictions"

      for(let i = 0; i < skill.number; i++)
      {
        option = await choose(missing_Skills,`Choose one skill (${skill.reason}) : `);
        missing_Skills = missing_Skills.filter(s=> s[0]!==option);
        class_item.data.data.csk[option] = true;
      }

      missing_Skills.push(...skill.limitations);
    }
  }

  async function get_feats()
  {
    //gain feats_list
    //gain items_actor
    //check prereq for remaining feats_list

    for(let feat of actor_update.add_feat)
    {
      //check vs limitations of feats

      //check vs restrictions of feats

      for(let i=0; i<feat.number;i++)
      {
        //get option
        //remove option from feat_list
        //retrieve and add item to actor_update.items
      }
      //reapply the limitations to feats_list
    }
  }

  async function get_spells()
  {
    for(let spell of actor_update.add_spell)
    {
      let option;
      //remove from spell.restrictions based on already owned items.
      for(let i = 0; i < spell.number; i++)
      {
        option = await choose(spell.restrictions, `Choose Spell (${spell.reason}) : `);
        spell.restrictions = spell.restrictions.filter(i=> i !== option);
        await get_spell(option);
      }
    }
  }

  async function get_spell(value)
  {
    if(value instanceof Array)
    {
      for(let v of value)
      {
        await get_spell(v);
      }
    }else{
      let spell = spell_pack.find(i=>i.name===value);
      actor_update.items.push(spell);
    }
  }

  //problem with stuff here? the way its displayed at least
  async function roll_stats(){
    let stat_rolls =  Array(6).fill(0).map(e=>new Roll(`4d6kh3`).roll()).sort((a,b)=>{return b.total-a.total});
    let remove_choice = [], remove_rolls = [];

    for(let stat of stat_rolls)
    {
      let prompt = `
      <table style="text-align:center">
        <tr><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr>
        <tr>${Object.entries(actor_update.stats).map(s => `<td style="${getColor(remove_choice,`${s[0]}`)}">${s[1]}</td>`).join(``)}</tr>
      </table>
      <hr>
      <table style="text-align:center">
        <tr>${stat_rolls.filter(s=> !remove_rolls.includes(s)).map(s=> `<td>${s.total}</td>`).join(``)}</tr>
      </table>
      <hr>
      <h2>Choose stat for <b>${stat.total}</b> roll : </h2>`;
      let options = stats.filter(s=> !remove_choice.includes(s[0]));
      let choice = await choose(options, prompt);

      remove_choice.push(choice);
      remove_rolls.push(stat);
      actor_update.stats[choice] += stat.total-10;

      actor_update.actor.data.abilities[choice].base = stat.total;
    }

    function getColor(choices= [], value)
    {
      return choices.includes(value) ? "color:red" : "color:green";
    }
  }

  //change this to make it "prettier"
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

  async function update_actor()
  {
    let actor = game.actors.get(actor_update.actor._id);
    await actor.update(actor_update.actor);
    await actor.createEmbeddedEntity("OwnedItem", actor_update.items);

    //update actors hp/sp/rp
  }
})();



