/*
  this is to be used in a journal, and instead of the normal "name of thing", put the level you want the enemy to be.
*/

const message = (...args) => ChatMessage.create({content : args.join(`<br>`)});
const RAE = (arr) => arr[Math.floor(Math.random()* arr.length)]; 
const getNumber = (str) => Number(str.match(/^\d+|\d+\b|\d+(?=\w)/g)[0]);
const macro_args = Array.from($(event.target).parent()).reduce((a,v) => a.concat(v.outerText) , []);

const keys = ["dnd5e.monsters"];
const level = getNumber(macro_args[0]);
const links = await getMonsterLinksByLevel(level, keys);
message(`Random Monster (Level ${level})`, RAE(links));

async function getMonsterLinksByLevel(level, keys){
    let monster_links = [];
    for(let key of keys){
      let pack = game.packs.get(key);
      if(pack.size === 0) await pack.getContent();
      for(let item of pack.filter(actor => actor.data.data.details.cr <= level ))
        monster_links.push(`@Compendium[${key}.${item.id}]{${item.name}}`)
    }
    return monster_links;
}