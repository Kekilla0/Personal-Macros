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