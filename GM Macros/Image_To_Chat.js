(async ()=>{
  let macro_actor = game.user.targets.size !== 0 ? Array.from(game.user.targets)[0].actor
    : token !== undefined ? token.actor : null;
  
  let img = macro_actor ? macro_actor.data.img : await input(`text`,`URL : `); //stored in /Useful Functions/Dialog.js

  ChatMessage.create({
    speaker : ChatMessage.getSpeaker(),
    content : `<img src="${img}" />`
  });

})();




