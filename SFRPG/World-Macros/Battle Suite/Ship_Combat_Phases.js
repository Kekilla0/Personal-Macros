(async ()=> {
  let scene = game.scenes.active;
  let phase = await scene.getFlag(`world`, `phase`);
  let turn = await scene.getFlag(`world`, `turn`);

  console.log(phase, turn);

  if(!phase && !turn )  { phase = `Open`; turn = 0; new Macro({ command : `/narrate Turn : ${turn} -  ${phase} Phase!`, type : `chat` }).execute(); }
  else {
    switch(phase)
    {
      case "Open" :
        phase = "Engineering";
        break;
      case "Engineering" :
        phase = "Helm";
        break;
      case "Helm" :
        phase = "Gunnery";
        break;
      case "Gunnery" :
        phase = "Damage";
        break;
      case "Damage" : 
        phase = "Open";
        turn = parseInt(turn) + 1;
        break;
    }
    new Macro({ command : `/narrate Turn : ${turn} -  ${phase} Phase!`, type : `chat` }).execute();
  }

  scene.setFlag(`world`, `phase`, phase);
  scene.setFlag(`world`, `turn`, turn);
})();



