/*
  Async rewrite for forEach
*/
Array.prototype.forEach = async function (callback) {
  for(let index = 0; index < this.length; index++)
      await callback(this[index], index, this);
}

/*
  Array shuffle Add
*/
Array.prototype.shuffle = function() {
  var currentIndex = this.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = this[currentIndex];
    this[currentIndex] = this[randomIndex];
    this[randomIndex] = temporaryValue;
  }

  return this;
}