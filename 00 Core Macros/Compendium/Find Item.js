async function findItem({keys = [], name = "", id = ""} = {}){
  keys = keys instanceof Array ? keys : [keys];

  for(const key of keys){
    const pack = game.packs.get(key);
    if(!pack) continue;

    let _id = (await pack.getIndex()).find(e => e._id == id || e.name == name)?._id;

    if(_id)
      return await pack.getDocument(_id);
  }
}