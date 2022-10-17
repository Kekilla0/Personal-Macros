Hooks.on(`renderPartyOverviewApp`, (...args) => {
  let actors = [];

  for(let info of Array.from($('.tab[data-tab="general"]')[0].children)){
    let [button, name, insp, hp, ac, prc, inv, ins, ste, exp] = Array.from(info.children);
    let actor = "";

    if(name.innerText == "Name"){
      prc.onclick = (e) => execute({ actors, type : "prc" });
      inv.onclick = (e) => execute({ actors, type : "inv" });
      ins.onclick = (e) => execute({ actors, type : "ins" });
      ste.onclick = (e) => execute({ actors, type : "ste" });
      exp.onclick = (e) => execute({ actors, type : "exp" });
    }else{
      actor = game.actors.find(a => a.name.includes(name.innerText)) ?? "";
      //if(actor == "") return 0;

      actors.push(actor);

      name.onclick = (e) => actor.sheet.render(true);
      hp.onclick   = (e) => execute({ actors : [actor], type : "hp"  });
      prc.onclick  = (e) => execute({ actors : [actor], type : "prc" });
      inv.onclick  = (e) => execute({ actors : [actor], type : "inv" });
      ins.onclick  = (e) => execute({ actors : [actor], type : "ins" });
      ste.onclick  = (e) => execute({ actors : [actor], type : "ste" });
      exp.onclick  = (e) => execute({ actors : [actor], type : "exp" });
    }
  }

  async function execute({ actors = [], type = ""}){
    if(type == "") return 0;

    if(type == "hp"){
      let [value, damage_type] = lastRollData();
      let [change, type] = await quickDialog({
        data : [
          {type : "number", label : "Damage Done : ", options : [value ?? 0],},
          {type : "select", label : "Damage Type : ", options : [damage_type, ...[...Object.values(dnd5e.config.damageTypes),... Object.values(dnd5e.config.healingTypes)].filter(d => d != damage_type)],},
        ],
        title : "Damage/Healing",
      });
      await actors[0].applyDamage(change, type);
    }else if(type == "exp"){
      let [change] = await quickDialog({
        data : [{type : "number", label : `Experience Gained [${actors.length}] : `, options : 0,},],
        title : "Increase Experience",
      });
      for(let actor of actors) await actor.applyExperience(Math.floor(change/actors.length));        
    }else{
      let data = [];

      for(let actor of actors){
        let roll = await actor.rollSkill(type, { fastForward : true, chatMessage : false });
        await game.dice3d.showForRoll(roll, getOwner(actor));
        data.push({actor, roll});
      }

      ChatMessage.create({
        //add border
        content : `
        <table>
          <tr><th colspan=2>${dnd5e.config.skills[type].label} Skill Check </th></tr>
          ${data.reduce((a,{actor, roll},c,d) => a += `<tr><td>${actor.name}</td><td>${roll.total}</td></tr>`, ``)}
        </table>
        `,
        whisper : [],
      });
    }

    function lastRollData(condition){
      let messages = Array.from(game.messages).filter(m => m?.isRoll);
      if(condition instanceof Function) messages = messages.filter(condition);
      
      if(messages.length == 0) return [0,""];
    
      for(let message of messages.reverse())
        return [
            message.roll.total,
            [...Object.values(dnd5e.config.damageTypes),... Object.values(dnd5e.config.healingTypes)].find(e => message.content.includes(e)) ?? "",
          ];;
    }

    function getOwner(actor){
      return game.users.get(Object.entries(actor.ownership).find(([id,lvl]) => lvl === 3 && id !== game.user.id && id !== "default")[0]) ?? "";
    }
  }
});

