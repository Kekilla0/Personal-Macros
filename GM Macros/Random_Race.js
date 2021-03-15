const message = (...args) => ChatMessage.create({content : args.join(`<br>`)});
const races = ["Dragonborn", "Dwarf", "Elf", "Gnome", "Half-Elf", "Half-Orc", "Halfling", "Human", "Tiefling",];
let chosen_races = Array(4).fill(0).map(()=> { races.shuffle(); return races.pop(); });

message(chosen_races);



