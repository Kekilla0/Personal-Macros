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
const languages = Object.entries(CONFIG.SFRPG.languages);

const actor_update = {
  actor : {}, items : [], gender : "", add_feat : [], add_skill : [], add_spell : [], level : 0, stats : {
    str : 0, dex : 0, con : 0, wis : 0, int : 0, cha : 0, roll : true
  }  
}

/*
  add_skill : [{ reason : ``, limitations : [], number : 0 } ],
  add_feat : [{ reason : ``, limitations : [], number : 0 } ],
  add_spell : [{ reason : ``, limitations : [], number : 0 } ]
*/

main();


/*
  Add items to the actor_update.actor instead 
 */
async function main()
{
  //add some logic for "start this character" & "level up this character"



  await get_actor(await choose(actors, `Choose Actor : `));

  switch(actor_update.level)
  {
    case 1 :
      actor_update.add_feat.push({reason : `Level 1`, limitations : [], number : 1});
      await get_gender(await choose(gender,`Choose Gender : `));
      await get_alignment(await choose (alignments, `Choose Alignment : `));
      await get_race(await choose(races, `Choose Race : `));
      await get_theme(await choose(themes, `Choose Theme : `)); 
      await get_class(await choose(classes, `Choose Class : `));      
      if(actor_update.stats.roll) await roll_stats();
      await get_skills();
      //await get_spells();
      //fix theme
      await update_actor();
      break;
  }
  

  
  //get_spell(going to need to figure something out here!)

  //prompt to ask what style of roll choice

  //need to figure out prerequisites for multiple things
  
  

  //theme skill validation, maybe get the option from choose and then use get_theme after everything else is done

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
    if(actor_update.actor.data.abilities[stat[0]].base !== 10) actor_update.stats.roll = false;
  }

  console.log(actor_update);
}

async function get_race(name=``)
{
  if(name === "Lashunta")
    name = actor_update.gender ==="Male" ? "Damaya Lashunta" : "Korasha Lashunta";

  
  let race_item = race_pack.find(r=>r.name === name);
  let unarmed_item = equip_pack.find(i=>i.name==="Unarmed strike");

  if(!race_item) return ui.notifications.error(`Race does not exist`);
  if(!unarmed_item) return ui.notifications.error(`Unarmed strike does not exist`);

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
      actor_update.add_feat({reason : ``, limitations : [], number : 1});
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
        actor_update.items.push(d.data);
      });
      actor_update.add_skill.push({reason : `Lashunta Student`, limitations : [], number : 2 })
      break;
    default : 
  }
  race_item = fix_stats(race_item);
  actor_update.items.push(race_item.data);
  actor_update.items.push(unarmed_item.data);
  actor_update.actor.token.vision = true;
  actor_update.actor.data.details.race = name;  
  actor_update.actor.token.lockRotation = true;
  actor_update.actor.token.displayName = 50;
  actor_update.actor.token.displayBars = 40;
  actor_update.actor.token.bar1 = {attribute : "attribute.hp"};
  actor_update.actor.token.bar1 = {attribute : "attribute.sp"};
}

async function get_theme(name=``)
{
  let theme_item = theme_pack.find(r=>r.name === name);
  if(!theme_item) return ui.notifications.error(`Theme does not exist`);

  switch(name)
  {
    //nothing needs to be done?? i guess??
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
      //choose_skill();
      break;
    case "Spacefarer" :
      //Physical Sciences
      break;
    case "Xenoseeker" :
      //life sciences
      break;
    default :
      break;
  }
  fix_stats(theme_item);
  actor_update.items.push(theme_item.data);
}

async function get_class(name=``, level = 1)
{
  let class_item = class_pack.find(r=>r.name === name);
  if(!class_item) return ui.notifications.error(`Class does not exist`);

  switch(name)
  {
    case "Envoy" : await envoy(); break;
    case "Mechanic" : await mechanic(); break;
    case "Mystic" : await mystic(); break;
    case "Operative" : await operative(); break;
    case "Solarian" : await solarian(); break;
    case "Solider" : await solider(); break;
  }
  actor_update.items.push(class_item.data);
  
  if(level === 1)
  {
    actor_update.actor.data.currency.credit = 1000;
  }

  async function envoy()
  {
    const envoy_class_levels = {
      1 : ["Envoy Improvisation", "Expertise (Ex)", "Skill Expertise (Ex)"]
    }

    const envoy_improv_options =
    {
      1: ["Clever Feint (Ex)", "Dispiriting Taunt (Ex)", "Don't Quit (Ex)", "Expanded Attunement (Ex)","Get 'Em (Ex)", "Inspiring Boost (Ex)", "Look Alive (Ex)", "Not in the Face (Ex)", "Universal Expression (Ex)", "Watch Your Step (Ex)"]
    };

    console.log(envoy_class_levels,level);

    let features = class_feature_pack.filter(i=> envoy_class_levels[level].includes(i.name));

    for(let feature of features)
    {
      let option;
      switch(feature.name)
      {
        case "Envoy Improvisation":
          option = await choose(envoy_improv_options[level], `Choose an Envoy Improvisation : `);
          actor_update.items.push(class_feature_pack.find(i=>i.name===option).data);
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
          option = await choose(skills.filter(s=> !["sen", "lsc", "mys", "phs", "sur"].includes(s[0])), `Choose a skil for Skill Expertise(Ex) : `);
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
      }
      actor_update.items.push(feature.data);
    }
  }
  async function mechanic()
  {
    const mechanic_class_levels = {
      1 : ["Artificial Intelligence (Ex)", "Bypass (Ex)", "Custom Rig (Ex)"]
    }

    const mechanic_ai_options = [
      "Drone","Exocortex"
    ];

    let features = class_feature_pack.filter(i=>mechanic_class_levels[level].includes(i.name));

    for(let feature of features)
    {
      let option;
      switch(feature.name)
      {
        case "Artificial Intelligence (Ex)":
          option = await choose(mechanic_ai_options, `Choose Artificial Intelligence Option : `);
          actor_update.items.push(class_feature_pack.find(i=>i.name===option).data);
          if(option === "Exocortex")
          {
            //Combat Tracking Proficencies
            actor_update.items.push(class_feature_pack.find(i=>i.name === "Combat Tracking (Ex)").data);
            //add_prof("weaponProf","larms");
            add_prof("armorProf","hvy");
            
            actor_update.items.push(class_feature_pack.find(i=>i.name === "Memory Module (Ex)").data);
            //add feat --- Skill Focus
          }
          break;
        case "Bypass (Ex)" :
          feature.create_modifier({
            item : feature,
            condition : "", 
            effectType : "skill", 
            modifier : "1", 
            modifierType : "constant", 
            name : `Class COM Modifier`,
            notes : "Level 1", 
            source : `${feature.name}`, 
            subtab : "misc", 
            type : "insight", 
            valueAffected : "com"
          });
          feature.create_modifier({
            item : feature,
            condition : "", 
            effectType : "skill", 
            modifier : "1", 
            modifierType : "constant", 
            name : `Class ENG Modifier`,
            notes : "Level 1", 
            source : `${feature.name}`, 
            subtab : "misc", 
            type : "insight", 
            valueAffected : "eng"
          });
          break;
      }
      actor_update.items.push(feature.data);
    }
  }
  async function mystic()
  {
    const mystic_class_levels = {
      1 : ["Connection", "Healing Touch (Su)"]
    }

    const mystic_connection_options = [
      "Akashic","Empath","Healer", "Mindbreaker", "Overlord", "Star Shaman", "Xenodruid"
    ];

    let features = class_feature_pack.filter(i=>mystic_class_levels[level].includes(i.name));

    for(let feature of features)
    {
      let option;
      switch(feature.name)
      {
        case "Connection":
          option = await choose(mystic_connection_options, `Choose your Mystic Connection Option : `);
          actor_update.items.push(class_feature_pack.find(i=>i.name===option));
          switch(option) {
            case "Akashic" :
              actor_update.items.push(class_feature_pack.find(i=>i.name==="Akashic Knowledge"));
              actor_update.items.push(class_feature_pack.find(i=>i.name==="Channel Skill (Su)"));
              actor_update.items.push(spell_pack.find(i=>i.name==="Identify"));
              break;
            case "Empath" :
              actor_update.items.push(class_feature_pack.find(i=>i.name==="Empath (Su)"));
              actor_update.items.push(spell_pack.find(i=>i.name==="Detect Thoughts"));
              break;
            case "Healer":
              actor_update.items.push(class_feature_pack.find(i=>i.name==="Healing Channel (Su)"));
              actor_update.items.push(spell_pack.find(i=>i.name==="Mystic Cure*"));
              break;
            case "Mind Breaker" :
              actor_update.items.push(class_feature_pack.find(i=>i.name==="Share Pain (Su)"));
              actor_update.items.push(spell_pack.find(i=>i.name==="Mind Thrust"));
              break;
            case "Overlord" :
              actor_update.items.push(class_feature_pack.find(i=>i.name==="Inexplicable Commands (Su)"));
              actor_update.items.push(spell_pack.find(i=>i.name==="Command"));
              break;
            case "Star Shaman" :
              actor_update.items.push(class_feature_pack.find(i=>i.name==="Walk the Void (Su)"));
              class_item.data.csk["pil"] = true;
              actor_update.items.push(spell_pack.find(i=>i.name==="Magic Missile"));
              break;
            case "Xenodruid" :
              actor_update.items.push(class_feature_pack.find(i=>i.name==="Speak with Animals (Su)"));
              actor_update.items.push(spell_pack.find(i=>i.name==="Life Bubble"));
              break;
          }  
          break;
      }
      actor_update.items.push(feature.data);
    }
  }
  async function operative(){
    const operative_class_levels = {
      1 : ["Operative's Edge (Ex)", "Specialization", "Trick Attack (Ex)"]
    }

    const operative_specialization_options = [
      "Daredevil","Detective","Explorer", "Ghost", "Hacker", "Spy", "Thief"
    ];

    let features = class_feature_pack.filter(i=> operative_class_levels[level].includes(i.name));

    for(let feature of features)
    {
      let option;
      switch(feature.name)
      {
        case "Operative's Edge (Ex)":
          feature.create_modifier({
            item : feature,
            condition : "", 
            effectType : "all-skills", 
            modifier : "1", 
            modifierType : "constant", 
            name : `Class Skill Modifier`,
            notes : "Level 1", 
            source : `${feature.name}`, 
            subtab : "misc", 
            type : "insight", 
            valueAffected : ""
          }); 
          break;
        case "Specialization" :
          option = await choose(operative_specialization_options, `Chose Operative Specialization : `);
          actor_update.items.push(class_feature_pack.find(i=>i.name===option));
          let spec_option;
          switch(option)
          {
            case "Daredevil" :
              spec_option = "Versatile Movement (Ex)";
              break;
            case "Detective" :
              spec_option = "Glimpse the Truth (Ex)";
              break;
            case "Explorer" :
              spec_option = "Ever Vigilant (Ex)";
              break;
            case "Ghost" :
              spec_option = "Cloaking Field (Ex)"
              break;
            case "Hacker" :
              spec_option = "Elusive Hacker (Ex)"
              break;
            case "Spy" :
              spec_option = "Master of Disguise (Ex)"
              break;
            case "Thief" :
              spec_option = "Holographic Distraction (Ex)"
              break;
          }
          actor_update.items.push(class_feature_pack.find(i=>i.name===spec_option));
          break;
      }
      actor_update.items.push(feature.data);
    }
  }
  async function solarian(){
    const solarian_class_levels = {
      1 : ["Skill Adept", "Solar Manifestation (Su)", "Stellar Mode (Su)", "Stellar Revelation"]
    }

    const stellar_revelation = {
      1 : ["Black Hole (Su)", "Supernova (Su)"]
    }

    let features = class_feature_pack.filter(i=> solarian_class_levels[level].includes(i.name));
    for(let feature of features)
    {
      let option;
      switch(feature.name)
      {
        case "Skill Adept" :
          actor_update.add_skill.push({reason : `Solarian Skill Adept`, limitations : [], number : 2});
          break;
        case "Solar Manifestation (Su)":
          option = await choose(["Solar Armor","Solar Weapon"],`Choose your Solar Manifestation : `);
          actor_update.items.push(class_feature_pack.find(i=>i.name===option).data);
          break;
        case "Stellar Revelation" :
          if (level = 1 )
          {
            class_feature_pack.filter(i=>stellar_revelation[level].includes(i.name)).forEach(i=>{
              actor_update.items.push(i.data);
            })
          }
          break;
      }
      actor_update.items.push(feature.data);
    }
  }
  async function solider(){

  }
  //create a class feature "getter" that gets any class feature available based on the classes options
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

async function get_skills()
{
  let class_item = actor_update.items.find(i=>i.type === `class`);
  let missing_Skills = Object.entries(class_item.data.csk).filter(s=>!s[1]).map(s=>[s[0],CONFIG.SFRPG.skills[s[0]]]);
  let option = ``;

  console.log(class_item,missing_Skills,actor_update);

  for(let skill of actor_update.add_skill)
  {
    missing_Skills = skill.limitations.length !== 0 
      ? missing_Skills.filter(s=> skill.limitations.includes(s))
      : missing_Skills;

    for(let i = 0; i < skill.number; i++)
    {
      option = await choose(missing_Skills,`Choose one skill (${skill.reason}) : `);
      missing_Skills = missing_Skills.filter(s=> s[0]!==option);
      class_item.data.csk[option] = true;
    }
  }
}

async function roll_stats(){
  let stat_rolls =  Array(6).fill(0).map(e=>new Roll(`4d6kh3`).roll()).sort((a,b)=>{return b.total-a.total});
  let remove_choice = [], remove_rolls = [];

  for(let stat of stat_rolls)
  {
    let prompt = `
    <table style="text-align:center">
      <tr><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr>
      <tr>${Object.entries(actor_update.stats).map(s => `<td style="${getColor(remove_choice,`${s[0]}`)}">${s[1]}</td>`).join(``)}</tr>
    </table><hr><table style="text-align:center">
      <tr>${stat_rolls.filter(s=> !remove_rolls.includes(s)).map(s=> `<td style="${getColor(remove_rolls,`${s}`)}">${s.total}</td>`).join(``)}</tr>
    </table>
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
  //console.log(prompt,value);
  return value;
}

async function update_actor()
{
  let actor = game.actors.get(actor_update.actor._id);
  await actor.update(actor_update.actor);
  await actor.createEmbeddedEntity("OwnedItem", actor_update.items);
}