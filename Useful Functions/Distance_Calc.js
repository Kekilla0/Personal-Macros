(()=>{
  let target = Array.from(game.user.targets)[0];
  if(!token || !target) return;

  let distance = canvas.grid.measureDistance(target, token);

  if(target.data.elevation !== token.data.elevation)
  {
    let h_diff = target.data.elevation > token.data.elevation 
      ? target.data.elevation - token.data.elevation 
      : token.data.elevation - target.data.elevation;

    let hyp = Math.sqrt(Math.pow(h_diff,2) + Math.pow(distance,2));

    display(`${token.name} is ${Math.floor(hyp)} feet away from ${target.name}`);
  }else{
    display(`${token.name} is ${Math.floor(distance)} feet away from ${target.name}`);
  }

  function display(msg)
  {
    ChatMessage.create({ content : msg });
  } 
})();