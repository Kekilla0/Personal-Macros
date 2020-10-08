async function button_dialog(data)
{
  let value = await new Promise((resolve) => {
    let buttons = {}, dialog;

    data.buttons.forEach(([str, callback])=>{
      buttons[str] = {
        label : str,
        callback
      }
    });
  
    dialog = new Dialog({title : data.title , content : data.content, buttons, close : () => resolve(true) }).render(true);
  });
  return value;
}