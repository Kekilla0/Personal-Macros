Hooks.on(`renderPartyOverviewApp`, (...args) => {
  let actors = [];

  for(let info of Array.from($('.tab[data-tab="currencies"]')[0].children)){
    let [button, name, pp, gp, ep, sp, cp, tw] = Array.from(info.children);
    let actor = "";

    if(name.innerText == "Name"){

    }else{
      actor = game.actors.find(a => a.name.includes(name.innerText)) ?? "";
      //if(actor == "") return 0;

      actors.push(actor);
      name.onclick = (e) => actor.sheet.render(true);

      //click
      pp.onclick   = (e) => execute({ actors : [actor], type : "pp", value : 1  });
      gp.onclick   = (e) => execute({ actors : [actor], type : "gp", value : 1  });
      ep.onclick   = (e) => execute({ actors : [actor], type : "ep", value : 1  });
      sp.onclick   = (e) => execute({ actors : [actor], type : "sp", value : 1  });
      cp.onclick   = (e) => execute({ actors : [actor], type : "cp", value : 1  });
      //right click
      pp.oncontextmenu   = (e) => execute({ actors : [actor], type : "pp", value : -1  });
      gp.oncontextmenu   = (e) => execute({ actors : [actor], type : "gp", value : -1  });
      ep.oncontextmenu   = (e) => execute({ actors : [actor], type : "ep", value : -1  });
      sp.oncontextmenu   = (e) => execute({ actors : [actor], type : "sp", value : -1  });
      cp.oncontextmenu   = (e) => execute({ actors : [actor], type : "cp", value : -1  });
    }
  }

  async function execute({ actors = [], type = "", value = 0}){
    console.log({ actors, type, value });

    for(let actor of actors){
      let currency = actor.data.data.currency;
      currency[type] += value;
      await actor.update({ "data.currency" : currency });
    }
  }
});