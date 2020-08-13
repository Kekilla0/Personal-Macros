(()=>{
  item.roll().then((result)=>{
    if(!result) return;

    new Dialog({
      content : ``,
      buttons :
      {
        STR : 
        {
          label : `Strength`,
          callback : () => { item.actor.rollAbilitySave(`str`, {}); }
        },
        DEX : 
        {
          label : `Dexterity`,
          callback : () => { item.actor.rollAbilitySave(`dex`, {}); }
        },
        CON : 
        {
          label : `Constitution`,
          callback : () => { item.actor.rollAbilitySave(`con`, {}); }
        },
        INT : 
        {
          label : `Intelligence`,
          callback : () => { item.actor.rollAbilitySave(`int`, {}); }
        },
        WIS : 
        {
          label : `Wisdom`,
          callback : () => {item.actor.rollAbilitySave(`wis`, {}); }
        },
        CHA : 
        {
          label : `Charisma`,
          callback : () => {item.actor.rollAbilitySave(`cha`, {}); }
        },
      }
    }).render(true);
  })
})();