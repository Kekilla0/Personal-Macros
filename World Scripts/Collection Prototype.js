/*
  Should only be used for compendium Collections
*/
Collection.prototype.getIndexofItem = async function({ name, type } = {}){
  let collections = Array.from(this);
  if(type) collections.filter(c => c.entity === type);

  for(let pack of collections){
    let index = pack.index ?? (await pack.getIndex());
    let document_index = index.find(i => i.name.toLowerCase() === name.toLowerCase());

    if(document_index)
      return {
        c_link : `@Compendium[${pack.collection}.${document_index._id}]{${document_index.name}}`,
        i_link : `<img src="${document_index.img}" width="25" height="25">`,
        key : pack.collection,
        ...document_index,
      }
  }
  return undefined;
}

Collection.prototype.findItem = async function({ name, id, type }= {}){
  let collection = Array.from(this);
  if(type) collection.filter(c => c.entity === type);

  for(let pack of collection){
    let itemID = id ?? (await pack.getIndex()).find(i=> i.name === name)?._id;
    console.log("Pack | ", pack, itemID, name);
    if(itemID)
      return await pack.getDocument(itemID);
  }
  return undefined;
}