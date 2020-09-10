//toggle defeated icon

//change to accept more than 1
//change to work outside of combat

(async ()=>{
  const effect = `icons/svg/skull.svg`;
  for(let token of canvas.tokens.controlled)
  {
    await token.toggleOverlay(effect);
    await token.toggleCombat();
  }
})();


