//Token Updater
//displayBars => 0 === None
////////////////10 === Control
////////////////20 === Owner Hover
////////////////30 === Hover
////////////////40 === Owner
////////////////50 === Always

let displayName = 0, displayBars = 0, lockRotation = false;
let bar1 = {attribute : "attribute.hp"}, bar2 = null;

(async () => {
  for(let scene of game.scenes)
  {
    let updates = scene.data.tokens.map(t => ({_id : t._id, displayName, displayBars, lockRotation, bar1, bar2 }));
    await scene.updateEmbeddedEntity("Token", updates);
  }

  let updates = game.actors.map(a=> ({_id : a._id, displayName, displayBars, lockRotation, bar1, bar2 }));
  await Actor.update(updates);
})();
