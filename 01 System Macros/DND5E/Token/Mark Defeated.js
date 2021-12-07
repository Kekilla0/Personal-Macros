const effect = {
  icon : "icons/svg/skull.svg", label : "dead",
  flags : { core : { overlay : true, statusId : "dead" }}
}

if(!game.combat) return;

for(let token of canvas.tokens.controlled){
  if(!token.actor.effects.find(e => e.data.label === "dead"))
    await token.actor.createEmbeddedDocuments("ActiveEffect", [effect]);

  if(game.combat.data.combatants.find(c => c.id === token.combatant.id))
    await token.toggleCombat();
}