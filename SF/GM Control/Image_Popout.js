(()=>{
  let macro_actor = game.user.targets.size !== 0 ? Array.from(game.user.targets)[0].actor
  : token !== undefined ? token.actor : character;

  let IP = new ImagePopout(macro_actor.data.img, {
    title : macro_actor.name,
    shareable : true,
    uuid : macro_actor.uuid
  }).render(true);
  IP.shareImage();
})();