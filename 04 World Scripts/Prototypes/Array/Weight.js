Array.prototype.weight = function(key){
  if(key == undefined) return this;
  return this.reduce((acc, ele)=> {
    for(let i=0; i < ele[key]; i++)
      acc.push(ele);
    return acc;
  }, []);
}