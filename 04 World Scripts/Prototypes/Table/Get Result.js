RollTable.prototype.getResult = function(){
  return this.getResultsForRoll(new Roll(this.data.formula).evaluate({ async  : false }).total);
}