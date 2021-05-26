/*
  Scene Backup Tool --- backs up current scene data on the current scene, easily restored.
*/
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

async function remove(){
  await canvas.scene.unsetFlag(`world`,`backup`);
  ui.notifications.info(`Backup removed from ${canvas.scene.name}`);
}

buttonDialog({
  buttons : [
    [`Backup Scene`, backup],[`Restore Scene`, restore],[`Remove Backup`, remove]
  ],
  title : `Scene Backup Tool`,
  content : ``,
});