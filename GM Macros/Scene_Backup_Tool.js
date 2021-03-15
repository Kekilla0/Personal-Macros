/*
  Scene Backup Tool --- backs up current scene data on the current scene, easily restored.
*/
async function buttonDialog(data)
{
  return await new Promise((resolve) => {
    let buttons = {}, dialog;

    data.buttons.forEach(([str, callback])=>{
      buttons[str] = {
        label : str,
        callback
      }
    });
  
    dialog = new Dialog({title : data.title , content : data.content, buttons, close : () => resolve(true) }).render(true);
  });
}

async function backup()
{
  let data = JSON.stringify(canvas.scene);
  await canvas.scene.setFlag(`world`, `backup`,data);
  ui.notifications.info(`Backup created for ${canvas.scene.name}`);
}

async function restore()
{
  let data = canvas.scene.getFlag(`world`,`backup`);
  if(!data) return ui.notifications.error(`Backup not found in ${canvas.scene.name}`);
  await canvas.scene.importFromJSON(data);
  ui.notifications.info(`Backup restored to ${canvas.scene.name}`);
}

buttonDialog({
  buttons : [
    [`Backup Scene`, backup],
    [`Restore Scene`, restore],
  ],
  title : `Scene Backup Tool`,
  content : ``,
});