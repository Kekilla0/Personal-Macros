/*
  0 : Entity Type
  1 : Data
  2 : Uuid of Entity to Embed Entity
*/

let [type, data, uuid] = args;

(async () => {
  if(!type || !data || !uuid) return;
  
  let entity = await fromUuid(uuid);
  await entity.createEmbeddedEntity(type, data);
})();