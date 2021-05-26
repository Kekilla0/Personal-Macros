//args[0] = UUID

(async()=>{
  let entity = await fromUuid(args[0]);
  await entity.delete();
})();