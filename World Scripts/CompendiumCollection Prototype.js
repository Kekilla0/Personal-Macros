/*
  Prototype Function for Toggle Compendium
*/
CompendiumCollection.prototype.togglePack = function () {
  let status = this.apps.reduce((acc, val) => acc || val.rendered, false);
  if(status)
      this.apps.forEach(app => app.close());
  else
      this.render(true);
  return !status;    
}

/*
  Prototype Function for getting an Index and all its contents
*/
CompendiumCollection.prototype.getItemIndex = async function (fn) {
  let index = this.index ?? (await this.getIndex());
  let document_index = index.find(fn);

  if(document_index){
    return {
      comp_link : `@Compendium[${this.collection}.${document_index._id}]{${document_index.name}}`,
      img_link : `<img src="${document_index.img}" width="25" height="25">`,
      key : this.collection,
      ...document_index
    }
  }

  return undefined;
}