function getResult(table){
  return table.getResultsForRoll(new Roll(table.data.formula).evaluate({ async : false}).total)[0];
}