/*
  this is to be used in a journal, and instead of the normal "name of thing", put the level you want the spell to be.
*/

const message = (...args) => ChatMessage.create({content : args.join(`<br>`)});
const RAE = (arr) => arr[Math.floor(Math.random()* arr.length)]; 
const getNumber = (str) => Number(str.match(/^\d+|\d+\b|\d+(?=\w)/g)[0]);
const macro_args = Array.from($(event.target).parent()).reduce((a,v)=>{
  return a.concat(v.outerText);
}, []);

const keys = ["dnd5e.spells"];
const level = getNumber(macro_args[0]);
const names = await getSpellNamesByLevel(level, keys);
message(`Random Spell (Level ${level})`, RAE(names));

async function getSpellNamesByLevel(level, keys){
    let spell_names = [];
    for(let key of keys){
      let pack = game.packs.get(key);
      if(pack.content.length === 0) await pack.getContent();
      for(let name of pack.content.filter(item => item.data.type === "spell" && item.data.data.level === level).map(item=> item.name))
        if(!spell_names.includes(name)) 
          spell_names.push(name);
    }
    return spell_names;
}