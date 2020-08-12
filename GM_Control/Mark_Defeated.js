//toggle defeated icon

//change to accept more than 1
//change to work outside of combat

(async ()=>{
  let update = duplicate(game.combats.active)
  for(let token of canvas.tokens.controlled)
  {
    if(token.data.overlayEffect === "icons/svg/skull.svg")
    {
      token.update({overlayEffect : null});
      for(let combatant of update.combatants)
      {
        if(combatant.tokenId === token.id)
        {
          combatant.css = "";
          combatant.defeated = false;
          combatant.img = token.data.img;
        }
      }
    }else{
      token.update({overlayEffect : "icons/svg/skull.svg"});
      for(let combatant of update.combatants)
      {
        if(combatant.tokenId === token.id)
        {
          combatant.css = "defeated";
          combatant.defeated = true;
          combatant.img = "icons/svg/skull.svg";
        }
      }
    }
  }
  await game.combats.active.update(update);
})();


