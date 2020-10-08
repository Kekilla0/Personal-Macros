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