(async ()=>{
  let macro_actor = game.user.targets.size !== 0 ? Array.from(game.user.targets)[0].actor
    : token !== undefined ? token.actor : null;
  
  let img = macro_actor ? macro_actor.data.img : await input(`text`,`URL : `);

  ChatMessage.create({
    speaker : ChatMessage.getSpeaker(),
    content : `<img src="${img}" />`
  });

})();

async function input(type, content_text)
{
  let value = await new Promise((resolve)=>{
    new Dialog({
      title : `Input Dialog`, 
      content : `<div class="form-group"><label>${content_text}</label><input type="${type}" name="input"/><label for="input"></label></div>`,
      buttons : {
        Ok : { label : `Ok`, callback : (html) => { resolve(html.find("input").val()); }}
      }
    }).render(true);
  });
  return value;
}




