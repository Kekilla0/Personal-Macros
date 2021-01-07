/*
  Send to OOC Chat
*/

(async ()=>{
  let content = await getContent();

  if(!content) return;

  ChatMessage.create({
    content,
    speaker : ChatMessage.getSpeaker({alias : game.user.name }),
    type : 1,
  });
})();

async function getContent()
{
  let value = await new Promise((resolve)=>{
    new Dialog({
      title : `OOC Chat Dialog`, 
      buttons : { OK : {label : `Ok`, callback : (html)=> { const val = html.find('[name=content]')[0]?.value; resolve(val);}}},
      content : `
      <div class="form-group" style="display:flex">
        <div> <textarea name="content" rows="4" style="width: 380px"></textarea> </div>
      </div>
      <br>`
    }).render(true);

  });
  return value;
}