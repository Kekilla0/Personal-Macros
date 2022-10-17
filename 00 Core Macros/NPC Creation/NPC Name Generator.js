/*
  constant functions
*/
const config = {
  message : (...args) => ChatMessage.create({content : args.join(`<br>`)}),
  races : [`Dragonborn`, `Dwarf`, `Elf`, `Gnome`, `Half-Elf`, `Half-Orc`, `Halfling`, `Human`, `Tiefling`, `Goblin`, `Orc`, `Demon`],
  sex : ['Male', 'Female',],
  output : true,
}

let [race, sex, number] = await quickDialog({
  data : [
    {type : 'select', label : 'Choose Race : ',  options : ["Random", ...config.races]},
    {type : 'select', label : 'Choose Sex : ',  options : ["Random", ...config.sex]},
    {type : 'number', label : 'Choose Number of Entries : ',  options : 1},
  ],
});

if(config.output)
  config.message(...Array(number).fill(0).map(() =>{
    let data = getName(race, sex);
    return `${data.name.first} ${data.name.last} - ${data.sex} ${data.race}`;
  }));
 