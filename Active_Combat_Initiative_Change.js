(()=>{
  if(!game.combats.active) return ui.notifications.error(`No active combat.`);
  let update = duplicate(game.combats.active);

  if(canvas.tokens.controlled.length === 0) return ui.notifications.error(`No tokens selected`);

  for(let token of canvas.tokens.controlled)
  {
    let elevation = token.data.elevation;
    let initiative = new Roll(`1d20 +  ${elevation}.${elevation}`).roll().total;

    let combatant = update.combatants.find(i=>i.tokenId===token.id);

    combatant.initiative = initiative;
  }
  game.combats.active.update(update);
})();