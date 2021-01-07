/*
  checks if a dies value is maximum for its roll, returns boolean
*/
function isMax(d = new Die(``))
{
  return d.results.reduce((c,a)=> c && (a.result === d.faces), true); 
}

/*
  Will check to see if all die, returns boolean
*/
function isSame(d = new Die(``))
{
  return d.results.reduce((c,a,i)=>{
    if(i === 0) return true;
    return c && a.result === d.results[i-1].result;
  }, true);
}

/*
  Send a variable with 2dX, will roll until both are the same, returns roll
*/
function getSame(rollString)
{
  let roll = new Roll(rollString).roll();
  if(roll.terms[0].results[0].result[0] !== roll.terms[0].results[0].result[1])
  {
    roll = getSame();
  }
  return roll;
}

/*
  takes 2 rolls and merges their values to 1 roll, returns roll
*/
function mergeRoll(roll_a = new Roll(``), roll_b = new Roll(``))
{
  if(!roll_a._rolled || !roll_b._rolled) return;

  let output_roll = new Roll(`${roll_a._formula} + ${roll_b._formula}`);
  output_roll.data = {};
  output_roll.results = [...roll_a.results,`+`, ...roll_b.results];
  output_roll.terms = [...roll_a.terms,`+`,...roll_b.terms];
  output_roll._rolled = true;
  output_roll._total = roll_a._total + roll_b._total;
  
  return output_roll;
}