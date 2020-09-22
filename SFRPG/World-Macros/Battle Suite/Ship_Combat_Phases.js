(async ()=> {
  let scene = game.scenes.active;
  let phase = await scene.getFlag(`world`, `phase`);
  let turn = await scene.getFlag(`world`, `turn`);

  if(!phase && !turn )  { phase = `Open`; turn = 0; }
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
  }

  Narrator.createSpecialChatMessage("narrate", `Turn : ${turn} -  ${phase} Phase!`); 

  scene.setFlag(`world`, `phase`, phase);
  scene.setFlag(`world`, `turn`, turn);
})();



