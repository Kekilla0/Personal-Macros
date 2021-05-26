//args[0] = valid UUID
//args[1] = valid Update Data

if(!args[0] || !args[1]) return ui.notifications.error(`${this.name}'s arguments are invalid.`);
let [uuid, updateData] = args;

(async () => {
  let entity = await fromUuid(uuid);
  await entity.update(updateData);
})();