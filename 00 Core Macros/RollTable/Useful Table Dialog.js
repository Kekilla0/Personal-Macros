/**
 * Useful Table Dialog
 * 
 * Rolls tables by name indicated in tables const, 
 * reset resets all tables by name indicated in the tables const
 */

 const tables= [
  "Lingering Injuries",
];


buttonDialog({
    buttons : [...tables.map(t => ([t, () => game.tables.getName(t).draw() ])), ["Reset All", () => resetAll() ]],
    title : "Useful Game Tables",
    content : ``,
});


async function resetAll(){
  for(let t of tables)
      await game.tables.getName(t).reset();
}

async function buttonDialog(data){
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
      width : 300, height : 75 + 50 * (tables.length), 
    });

    await dialog._render(true);
    dialog.element.find('.dialog-buttons').css({'flex-direction':'column'});
  });
}