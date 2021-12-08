/*
  Button Dialog
    Send an array of buttons to create a dialog that will execute specific callbacks based on button pressed.
    returns a promise (no value)
  data = {
    buttons : [[`Label`, ()=>{Callback} ], ...]
    title : `title_label`,
    content : `Html_Content`
  }
*/
async function buttonDialog(data)
{
  return await new Promise(async (resolve) => {
    let buttons = {}, dialog;

    data.buttons.forEach(([str, callback])=>{
      buttons[str] = {
        label : str,
        callback
      }
    });
  
    dialog = new Dialog({
      title : data.title , 
      content : data.content, 
      buttons, 
      close : () => resolve(true) 
    },{
      width : 300, height : 75 + ( 50 * data.buttons.length)
    });

    await dialog._render(true);
    dialog.element.find('.dialog-buttons').css({'flex-direction':'column'});
  });
}