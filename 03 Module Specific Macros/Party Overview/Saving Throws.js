Hooks.on(`renderPartyOverviewApp`, (...args) => {
  let actors = [];

  for(let info of Array.from($('.tab[data-tab="saves"]')[0].children)){
    let [button, name, str, dex, con, int, wis, cha] = Array.from(info.children);
    let actor = "";

    if(name.innerText == "Name"){
      str.onclick = (e) => execute({ actors, type : "str" });
      dex.onclick = (e) => execute({ actors, type : "dex" });
      con.onclick = (e) => execute({ actors, type : "con" });
      int.onclick = (e) => execute({ actors, type : "int" });
      wis.onclick = (e) => execute({ actors, type : "wis" });
      cha.onclick = (e) => execute({ actors, type : "cha" });
    }else{
      actor = game.actors.find(a => a.name.includes(name.innerText)) ?? "";
      //if(actor == "") return 0;

      actors.push(actor);

      name.onclick = (e) => actor.sheet.render(true);
      str.onclick  = (e) => execute({ actors : [actor] , type : "str" });
      dex.onclick  = (e) => execute({ actors : [actor] , type : "dex" });
      con.onclick  = (e) => execute({ actors : [actor] , type : "con" });
      int.onclick  = (e) => execute({ actors : [actor] , type : "int" });
      wis.onclick  = (e) => execute({ actors : [actor] , type : "wis" });
      cha.onclick  = (e) => execute({ actors : [actor] , type : "cha" });
    }
  }

  async function execute({ actors = [], type = ""}){
    if(type == "") return 0;

    let data = [];

    for(let actor of actors){
      let roll = await actor.rollAbilitySave(type, { fastForward : true, chatMessage : false });
      await game.dice3d.showForRoll(roll, getOwner(actor));

      data.push({actor, roll});
    }

    ChatMessage.create({
      content : `
      <table>
        <tr><th colspan=2>${type.capitalize()} Saving Throw </th></tr>
        ${data.reduce((a,{actor, roll},c,d) => a += `<tr><td>${actor.name}</td><td>${roll.total}</td></tr>`, ``)}
      </table>
      `,
      whisper : [],
    });

    function getOwner(actor){
      return game.users.get(Object.entries(actor.ownership).find(([id,lvl]) => lvl === 3 && id !== game.user.id && id !== "default")[0]) ?? "";
    }
  }
});