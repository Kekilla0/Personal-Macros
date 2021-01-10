/*
  Total Distance between two tokens.
*/
function tokenDistance(token1, token2)
{
  if(!token1 || !token2) return;

  let distance = canvas.grid.measureDistance(token1, token2);
  if(token1.elevation !== token2.data.elevation)
  {
    let h_diff = token2.data.elevation > token1.data.elevation 
      ? token2.data.elevation - token1.data.elevation 
      : token1.data.elevation - token2.data.elevation;

    return Math.sqrt(Math.pow(h_diff,2) + Math.pow(distance,2));
  }else{
    return distance;
  }
}

/*
  Will Maximize the Health of an Unlinked Token.
*/
async function maximizeHealth(token)
{
  if(!token || !token.actor.data.data.attributes.hp?.formula ) return null;

  let { hp } = duplicate(token.actor.data.data.attributes);

  hp.value = hp.max = new Roll(hp.formula).evaluate({ maximize : true }).total;

  return (token.actor.data.data.attributes.hp.value === hp.max) 
    ? token : await token.actor.update({ "data.attributes.hp" : hp });
}