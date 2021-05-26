/*
  0 : Entity Type
  1 : Data
  2 : Uuid of Entity 
  3 : Mode
*/

let [type, data, uuid, mode] = args;

(async () => {
  if(!uuid) return notify(`${this.name} : Missing UUID`);
  let entity = await fromUuid(uuid);
  if(!entity) return notify(`${this.name} : Entity Error`);
  if(!data) return notify(`${this.name} : Missing Data`);

  switch(mode.toLowerCase()){
    case "create" :
      if(!type) return notify(`${this.name} : Missing Type.`);
      await entity.createEmbeddedEntity(type, data);
      break;
    case "delete" :
      await entity.delete();
      break;
    case "update" :
      await entity.update(data);
      break;
    default :
      return notify(`${this.name} Mode Error`);
  }
})();

function notify(msg){
  ui.notifications.notify(msg);
}