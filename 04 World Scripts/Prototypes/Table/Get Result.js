RollTable.prototype.getResult = function(value){
  return this.getResultsForRoll(value ?? new Roll(this.data.formula).evaluate({ async  : false }).total)[0];
}