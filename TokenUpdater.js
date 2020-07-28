//Token Updater
//displayBars => 0 === None
////////////////10 === Control
////////////////20 === Owner Hover
////////////////30 === Hover
////////////////40 === Owner
////////////////50 === Always

let new_data = {
  displayBars : 0,
  bar1 : {attribute : "attributes.hp"},
  bar2 : {attribute : "attributes.hp"}
};

(async () => {
  for(let scene of game.scenes)
  {
    let updates = scene.data.tokens.map(t => ({
      _id : t._id,
      displayBars : new_data.displayBars,
      bar1 : new_data.bar1,
      bar2 : new_data.bar2
    }));
    await scene.updateEmbeddedEntity("Token", updates);
  }

  let updates = game.actors.map(a=> ({
    _id : a._id,
    token : {
      displayBars : new_data.displayBars,
      bar1 : new_data.bar1,
      bar2 : new_data.bar2
    }
  }));
  await Actor.update(updates);
})();