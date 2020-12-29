function mergeRoll(roll_a = new Roll(``), roll_b = new Roll(``))
{
  if(!roll_a._rolled || !roll_b._rolled) return;

  let output_roll = new Roll(`${roll_a._formula} + ${roll_b._formula}`);
  output_roll.data = {};
  output_roll.results = [...roll_a.results,`+`, ...roll_b.results];
  output_roll.terms = [...roll_a.terms,`+`,...roll_b.terms];
  //output_roll._rolled = true;
  //output_roll._formula = `${roll_a._formula} + ${roll_b._formula}`;
  output_roll._total = roll_a._total + roll_a._total;
  
  return output_roll;
}