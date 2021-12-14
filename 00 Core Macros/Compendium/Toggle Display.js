function togglePack({ key = "" } = {}){
  let pack = game.packs.get(key);
  if(!pack)
    return console.error(`No pack with ${key} key.`);

  pack.rendered ? pack.close() : pack.render(true);
  return pack;
}