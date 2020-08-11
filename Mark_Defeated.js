//toggle defeated icon

//change to accept more than 1
//change to work outside of combat


let update = duplicate(game.combats.active)
if(token.data.overlayEffect === "icons/svg/skull.svg")
{
  token.update({overlayEffect : null});
  for(let combatant of update.combatants)
  {
    if(combatant.token._id === token.id)
    {
      combatant.css = "";
      combatant.defeated = false;
      combatant.img = token.data.img;
      console.log(combatant);
    }
  }
  game.combats.active.update(update);
}else{
  token.update({overlayEffect : "icons/svg/skull.svg"});
  for(let combatant of update.combatants)
  {
    if(combatant.token._id === token.id)
    {
      combatant.css = "defeated";
      combatant.defeated = true;
      combatant.img = "icons/svg/skull.svg";
      console.log(combatant);
    }
  }
  game.combats.active.update(update);
}
console.log(update);
console.log(game.combats.active);
