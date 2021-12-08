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