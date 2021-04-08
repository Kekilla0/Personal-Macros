/*
  dialog choices
    region
    unit
    cr ?? 

  output message
*/
const config = {
  wait : async (ms) => new Promise((resolve)=> setTimeout(resolve, ms)),
  random : (int) =>  Math.floor(Math.random() * int),
  message : (...args) => ChatMessage.create({content : args.join(``), whisper : ChatMessage.getWhisperRecipients("GM")}),
  randomArrayElement : (arr) => arr[Math.floor(Math.random()* arr.length)],
  capitalize : (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`,
  keys : [],
  region : ["Artic", "Cold", "Cave", "Arid", "Desert", "Forest", "Lake", "River", "Ocean", "Mountain", "Plain", "Swamp"],
  units : ["1/4", "1/2", "1", "2", "3", "4"],
  collectables : {
    "plants and herbs" : {
      "Artic" : ["Aniseed sap", "Ghostly snowdrop", "Kreet Paste", "Kreet Paste", "Spineflower berries", "White poppy", "Winter turtlehead", "Yeti's Parsley"],
      "Cold" : ["Aniseed sap", "Ghostly snowdrop", "Kreet Paste", "Kreet Paste", "Spineflower berries", "White poppy", "Winter turtlehead", "Yeti's Parsley"],
      "Cave" : ["Abyss Flower", "Banshee's lament", "Ebrium fungus", "Glowing duscle", "Nightshade", "Viper thistle"],
      "Arid" : ["Crimson brittlebush", "Dried ephedra", "Ellond shrub", "Iron thistle", "Twilight wormwood", "Wizard's clover"],
      "Desert" : ["Crimson brittlebush", "Dried ephedra", "Ellond shrub", "Iron thistle", "Twilight wormwood", "Wizard's clover"],
      "Forest" : ["Ash chives", "Blue cress", "Drojos ivy", "Kasuni juice", "Olina petals", "Thunderleaf"],
      "Lake" : ["Blue seaweed", "Chromatic mud", "Golden coneflower", "Healer's boon", "Mermaid braid", "Slime thimbleberry"],
      "River" : ["Blue seaweed", "Chromatic mud", "Golden coneflower", "Healer's boon", "Mermaid braid", "Slime thimbleberry"],
      "Ocean" : ["Blue seaweed", "Chromatic mud", "Golden coneflower", "Healer's boon", "Mermaid braid", "Slime thimbleberry"],
      "Mountain" : ["Angel Flower", "Golden hibiscus", "Lunar nectar", "Storm daisy", "Storm daisy", "Sugar hibiscus berries", "Tempest flower", "Wolf hair"],
      "Plain" : ["Blood herb", "Dragontongue petals", "Dusk itchweed", "Gray gilliflower", "Mandrake root", "Raven silkweed", "Ucre bramble", "Ucre bramble"],
      "Swamp" : ["Blackleaf rose", "Bone garlic", "Ecire laurel", "Frenn moss", "Goblin mud", "Wisp stems"],
    },
    "minerals" : {
      "Artic" : ["Ashmoroch Steel", "Cold Iron", "None","None","None",],
      "Cold" : ["Ashmoroch Steel", "Cold Iron", "None","None","None",],
      "Cave" : ["Adamintine", "Darksteel", "Ignum", "None","None","None","None",],
      "Arid" : ["Obsidian", "None","None",],
      "Desert" : ["Aerocrystal", "Ignum", "None","None","None",],
      "Forest" : ["None",],
      "Lake" : ["Aquastone","None","None",],
      "River" : ["Aquastone","None","None",],
      "Ocean" : ["Aquastone","None","None",],
      "Mountain" : ["Adamintine", "Dwarvenstone", "Mithril", "None","None","None","None",],
      "Plain" : ["None",],
      "Swamp" : ["Plaguesteel","None","None",],
    },
    "non-mineral materials" : {
      "Artic" : ["Eternal Ice", "None","None","None",],
      "Cold" : ["None",],
      "Cave" : ["None",],
      "Arid" : ["Darkwood","None","None",],
      "Desert" : ["None",],
      "Forest" : ["Darkwood", "Leafweave", "Spiritual Wood","None","None","None","None","None",],
      "Lake" : ["None",],
      "River" : ["None",],
      "Ocean" : ["None",],
      "Mountain" : ["Darkwood","None","None",],
      "Plain" : ["Leafweave","None","None",],
      "Swamp" : ["Darkwood","None","None",],
    },
    "creature parts" : {
      "Artic" : ["Beast", "Giant", "Monstrosity","Dragon", "Elemental"],
      "Cold" : ["Beast", "Giant", "Monstrosity","Dragon", "Elemental", "Humanoid", "Plant"],
      "Caves" : ["Beast", "Monstrosity", "Elemental", "Undead", "Plant", "Aberration"],
      "Arid" : ["Beast", "Monstrosity", "Humanoid", "Undead", "Fiend"],
      "Desert" : ["Beast", "Monstrosity", "Humanoid", "Undead", "Fiend"],
      "Forest" : ["Beast", "Monstrosity", "Humanoid", "Fey", "Undead", "Ooze"],
      "Lake" : ["Beast", "Fey", "Ooze", "Humanoid"],
      "River" : ["Beast", "Fey", "Ooze", "Humanoid", "Giant"],
      "Ocean" : ["Beast", "Fey", "Ooze", "Dragon", "Aberration"],
      "Mountain" : ["Construct", "Elemental", "Celestial", "Giant", "Aberration"],
      "Plains" : ["Construct", "Ooze", "Beast", "Fiend"],
      "Swamps" : ["Fiend", "Undead", "Monstrosity", "Beast"],
    },
  }
};

(async ()=> {
  let [DC, region, units] = await quickDialog({
    title : `Collecting Materials`,
    data : [
      {type : `number`, label : `DC : `, options: 10 },
      {type : `select`, label : `Select Region : `, options : ["Random", ...config.region]},
      {type : `select`, label : `Select Units : `, options : ["Random", ...config.units]},
    ],
  });

  //determine region and whatnot based on randoms
  if(region === "Random")
    region = config.randomArrayElement(config.region);

  let content = Object.entries(config.collectables).reduce((acc, [key, val])=> {
    let roll = config.random(20);
    if(roll > DC)
    {
      acc.push(`
      <table>
        <tr>
          <th colspan=2>${key}</th>
        </tr>
        <tr>
          <td>${units === "Random" ? config.randomArrayElement(config.units) : units}</td>
          <td>${config.randomArrayElement(val[region])}</td>
        </tr>
      </table>`);
    }
    return acc;
  }, []);

  config.message(`<h2>${region}</h2>`, ...content);
})();

//find in a compendium?