/*
  type = `html input type ie number, text`
  prompt = `display_prompt_question` 
*/

async function input(type, prompt)
{
  let value = await new Promise((resolve)=>{
    new Dialog({
      title : `Input Dialog`, 
      content : `<table style="width:100%"><tr><th style="width:50%"><label>${prompt}</label></th><td style="width:50%"><input type="${type}" name="input"/></td></tr></table>`,
      buttons : {
        Ok : { label : `Ok`, callback : (html) => { resolve(html.find("input").val()); }}
      }
    }).render(true);
  });
  return value;
}