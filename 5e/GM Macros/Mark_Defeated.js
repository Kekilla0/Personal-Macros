//toggle defeated icon

//change to accept more than 1
//change to work outside of combat

(async ()=>{
  const effect = `icons/svg/skull.svg`;
  const combat = game.combats.active;
  
  for(let token of canvas.tokens.controlled)
  {
    //if no combat, add to combat (if the token isn't already affected by the effect)
    if(!combat)
    {
      if(token.data.overlayEffect !== effect)
      { await token.toggleCombat(); }
    }else{
      //if combat & already has the effect --- remove combat
      if(token.data.overlayEffect === effect && combat.data.combatants.includes(token.data))
      {
        await token.toggleCombat();
      }else{
        //if combat & doesn't have the effect, remove combat and add effect
        await token.toggleOverlay(effect);
        await token.toggleCombat();
      }
    }
  }
})();


