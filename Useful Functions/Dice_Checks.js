function isMax(d = new Die(``))
{
  return d.results.reduce((c,a)=> c && (a.result === d.faces), true); 
}

function isSame(d = new Die(``))
{
  return d.results.reduce((c,a,i)=>{
    if(i === 0) return true;
    return c && a.result === d.results[i-1].result;
  }, true);
}

function getSame()
{
  let roll = new Roll(`2d6`).roll();
  if(roll.terms[0].results[0].result[0] !== roll.terms[0].results[0].result[1])
  {
    roll = getSame();
  }
  return roll;
}