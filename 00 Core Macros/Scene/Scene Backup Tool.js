/**
 * Scene Backup Tool
 * 
 * Saves current scene data onto the current scene so the 
 * scene can be easily restored to its original state.
 * 
 * Dependancy : Button Dialog
 */

 async function backup(){
   let data = JSON.stringify(canvas.scene);
   await canvas.scene.setFlag(`world`, `backup`, data);
   ui.notifications.info(`Backup created for ${canvas.scene.name}`);
 }
 
 async function restore(){
   let data = canvas.scene.getFlag(`world`,`backup`);
   if(!data) return ui.notifications.error(`Backup not found in ${canvas.scene.name}`);
   await canvas.scene.importFromJSON(data);
   ui.notifications.info(`Backup restored to ${canvas.scene.name}`);
 }
 
 async function remove(){
   await canvas.scene.unsetFlag(`world`,`backup`);
   ui.notifications.info(`Backup removed from ${canvas.scene.name}`);
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
      width : 300, height : 150
    });

    await dialog._render(true);
    dialog.element.find('.dialog-buttons').css({'flex-direction':'column'});
  });
}
 
 buttonDialog({
   buttons : [
     [`Backup Scene`, backup],[`Restore Scene`, restore],[`Remove Backup`, remove]
   ],
   title : `Scene Backup Tool`,
   content : ``,
 });

