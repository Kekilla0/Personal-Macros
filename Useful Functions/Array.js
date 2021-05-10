/*
  Async rewrite for forEach
*/
Array.prototype.forEachAsync = async function (callback) {
  for(let index = 0; index < this.length; index++)
      await callback(this[index], index, this);
}

/*
  Array shuffle Add
*/
Array.prototype.shuffle = function() {
  var t, r;
  for(let i = this.length; i > 0;){
    r = Math.floor(Math.random() * i); 
    i-=1;
    t = this[i]; 
    this[i] = this[r]; 
    this[r] = t;
  }
  return this;
}

Array.prototype.shuffleSort = function(){
  return this.sort((a,b)=> (0.5 - Math.random()));
}