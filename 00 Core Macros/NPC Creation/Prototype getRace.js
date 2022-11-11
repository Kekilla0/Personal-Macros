function getRace({} = {}){
  const data = [
    {
      name : `Dragonborn`,
      weight : 1,
      parent : null
    },
    {
      name : `Dwarf`,
      weight : 2,
      parent : null,
    },
    {
      name : `Elf`,
      weight : 2,
      parent : null,
    },
    {
      name : `Gnome`,
      weight : 1,
      parent : null,
    },
    {
      name : `Half-Elf`,
      weight : 2,
      parent : [`Human`, `Elf`],
    },
    {
      name : `Half-Orc`,
      weight : 2,
      parent : [`Human`, `Orc`],
    },
    {
      name : `Halfling`,
      weight : 2,
      parent : null,
    },
    {
      name : `Human`,
      weight : 3,
      parent : null,
    },
    {
      name : `Tiefling`,
      weight : 1,
      parent : [`Human`, `Demon`],
    },
    {
      name : `Goblin`,
      weight : 1,
      parent : null,
    },
    {
      name : `Orc`,
      weight : 1,
      parent : null,
    },
    {
      name : `Demon`,
      weight : 1,
      parent : null,
    },
  ];

  return data.weight("weight").shuffle().random().name;
}