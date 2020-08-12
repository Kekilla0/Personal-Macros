//Elevation based Initiative
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

//GM input based Initiative
(()=>{
  if(!game.combats.active) return ui.notifications.error(`No active combat.`);
  let update = duplicate(game.combats.active);

  let token_actors = canvas.tokens.placeables.filter(t=>t.actor.data.type === `character`);

  let dialog_content = ``;

  for(let token of token_actors)
  {
    if(update.combatants.find(c=>c.tokenId===token.id))
    {
      dialog_content += `
      <img src = ${token.data.img} width="25" height="25">
      <label for="${token.actor.name}">${token.actor.name}</label>
      <input name="${token.actor.name}" id="${token.id}" type ="number" value="0"><br>`
    }
  }

  new Dialog({
    content : dialog_content,
    buttons : 
    {
      OK : 
      {
        icon : ``,
        label : `OK`,
        callback : (html) => {
          for(let token of token_actors)
          {
            if(update.combatants.find(c=>c.tokenId===token.id))
            {
              let new_init = parseInt(html.find(`[id=${token.id}]`)[0].value);
              let combatant = update.combatants.find(i=>i.tokenId===token.id);
              combatant.initiative = new_init;
            }
          }
          game.combats.active.update(update);
        }
      }
    }
  }).render(true);
})();