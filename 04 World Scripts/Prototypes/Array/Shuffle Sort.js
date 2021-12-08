Array.prototype.shuffleSort = function(){
  return this.sort(()=> (0.5 - Math.random()));
}