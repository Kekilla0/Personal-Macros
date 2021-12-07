/**
 * GM Control Macro
 * 
 * !WARNING COULD ALLOW PLAYERS FULL ACCESS TO ALL ENTITIES!
 * 
 * Arguments : 
 * 0 - MODE
 * 1 - UUID 
 * 2 - DATA
 * 3 - TYPE
 * 4 - SENDER
 */
const [mode, uuid, data, type, sender] = args;
const entity = await fromUuid(uuid);

if(!entity) return notify(`Missing UUID`);

switch(mode.toLowerCase()){
  case "create" :
    await createEntity();
    break;
  case "delete" :
    await deleteEntity();
    break;
  case "update" :
    await updateEntity();
    break;

}

function notify(msg){
  return ui.notifications.notify(`${this.name} :  ${msg} - Sender [${sender}]`);
}

async function createEntity(){
  if(!type) return notify(`Missing Type`);
  if(!data) return notify(`Missing Data`);

  return await entity.createEmbeddedDocuments(type, data);
}

function deleteEntity(){
  return await entity.delete();
}

function updateEntity(){
  if(!data) return notify(`Missing Data`);
  
  return await entity.update(data);
}


