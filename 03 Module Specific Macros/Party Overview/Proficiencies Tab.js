Hooks.on(`renderPartyOverviewApp`, (...args) => {
  let actors = [];

  let data = Array.from($('.tab[data-tab="proficiencies"]')[0].children);
  for(let i = 0; i < data.length; i++){
    let [label, ...click] = Array.from(data[i].children).filter(i => i.className != "button" && i.className != "");

    if(label.innerText == "Name"){
      actors.push(...click.map(a => game.actors.find(b => b.name.includes(a.innerText))));
    }else{
      //add execute for label
      label.onclick = (event) => execute({ actors, type : getKey(label.innerText)});
      //iterate over click --- execute for actors @ actors[i]
      for(let x = 0; x < click.length; x++){
        click[x].onclick = (event) => execute({ actors : [actors[x]], type : getKey(label.innerText) });
      }
    }
  }

  async function execute({ actors = [], type = ""}){
    if(type == "") return 0;

    let data = [];

    for(let actor of actors){
      let roll = await actor.rollSkill(type, { fastForward : true, chatMessage : false });
      await game.dice3d.showForRoll(roll, getOwner(actor));

      data.push({actor, roll});
    }

    ChatMessage.create({
      content : `
      <table>
        <tr><th colspan=2>${getSkill(type)} Skill Check </th></tr>
        ${data.reduce((a,{actor, roll},c,d) => a += `<tr><td>${actor.name}</td><td>${roll.total}</td></tr>`, ``)}
      </table>
      `,
      whisper : [],
    });

    function getOwner(actor){
      return game.users.get(Object.entries(actor.ownership).find(([id,lvl]) => lvl === 3 && id !== game.user.id && id !== "default")[0]) ?? "";
    }
  }

  function getKey(skill){
    if(skill == "") return "";
    let object = Object.entries(dnd5e.config.skills).find(([k, o]) => o.label.toLowerCase() == skill.toLowerCase());
    return object[0] ?? "";
  }

  function getSkill(key){
    if(key == "") return "";
    return dnd5e.config.skills[key]?.label ?? ""
  }
});