Folder.prototype.getContentTableText = function(input= []){
  if(this.type !== "RollTable" || (this.content.length === 0 && this.children.length === 0)) return;
  input = input instanceof Array ? input : [];

  let output = [];
  for(let table of this.content)
    output.push({ name : table.name, text : table.getText() })

  for(let folder of this.children)
    output.push(...folder.getTableText());

  return input.concat(output);
}