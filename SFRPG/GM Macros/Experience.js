/*
  This macros purpose is to automatically calculate and distrubute experience to players.
   
  Usage : 
    1. Get Players : either target individual player tokens or the macro will assum any actor of the character type that is a PC
    2. Experience : macro will find all tokens that have a hostile disposition that are marked `defeated` by the skull.svg overlayEffect.
      *If the players are fighting individual enemies, the macro will add all their experience together and use that.
      *If the players are starship fighting it will find both the players ship and the enemy ships and calculate the appropraite experience based on 
        the CRB pages 326 & 390 - if the difficulty is "out of range" of the tables in the CRB it will assume either "Easy" difficulty or "Epic" 
        difficulty (depending on the disparaging levels between player ship and enemy ship).
      *Once a token has given experience, it will not give it again, so if your map has multiple fights... rest assured you won't be giving errant 
        experience.
    3. The Two variable (players and experience) will then be promeniently displayed, allowing the user to see the experience (in total) and add any
      additional experience they want to add.
    4. Once the "Increase Experience" button is pressed, the macro will divide (discarding any excess) the experience and distribute it to each player.
      *If the player's experience gain takes them to the next level, a prompt will display. 
      *The experience gained will be displayed as a ChatMessage.
*/

(() => {
  /*
    effect - overlay effect that the macro checks for
    encounter_difficulty - table 11-1 on page 390 search by difficulty string, returns CR equivalency for encounter
    cr_equivalencies - table 11-2 on page 390 search by # of creatures, returns CR change value.
    experience_points_awards - table 11-3 on page 390 search by CR, returns experience value.
    starship_difficulty - table ?? on page 326 search by difficulty, returns Enemy Starship Tier
  */
  const effect = `icons/svg/skull.svg`;
  const Encounter_Difficulty = {"Easy" : -1,"Average" : 0,"Challenging" : 1,"Hard" : 2,"Epic" : 3};
  const cr_equivalencies = {1 : 0, 2 : 2, 3 : 3, 4 : 4, 6 : 5, 8 : 6, 12 : 7, 16 : 8};
  const experience_points_awards = { 0.02 : 50, 0.16 : 65, 0.25 : 100, 0.33 : 135, 0.5 : 200, 1 : 400, 2 : 600, 3 : 800, 4 : 1200, 5 : 1600,  6 : 2400, 7 : 3200, 8 : 4800, 9 : 6400, 10 : 9600, 
    11 : 12800, 12 : 19200, 13 : 25600, 14 : 38400, 15 : 51200, 16 : 76800, 17 : 102400, 18 : 153600, 19 : 204800, 20 : 307200, 21 : 409600, 22 : 614400, 23 : 819200, 24 : 1228800, 25 : 1638400};
  const starship_difficulty = {"Easy" : -3, "Average" : -2, "Challenging" : -1, "Hard" : 0, "Epic" : 1};
  
  const defeated = canvas.tokens.placeables.filter(token => token.data.disposition === -1 && token.data.overlayEffect === effect).map((token) =>{
    return { type : token.actor.data.type, tier : token.actor.data.data?.details.tier , cr : token.actor.data.data?.details.cr, valid : (token.getFlag(`world`,`experienceGiven`) ? false : true)};
  });
  
  const actors = (game.user.targets.size !== 0) ? Array.from(game.user.targets).map(target=> target.actor) : game.actors.filter(actor => actor.data.type === "character" && actor.isPC);
  const player_ships = game.actors.filter(actor => actor.data.type === "starship" && actor.isPC);
  
  const APL = Math.ceil(actors.reduce((total, actor) => total+=actor.data.data.details.level.value, 0))/actors.length;
  
  let experience;
  
  if(defeated.filter(data => data.type === "npc").length > defeated.filter(data => data.type === "starship").length)
  {
    npc_experience();
  }else if(defeated.filter(data => data.type === "starship").length > defeated.filter(data => data.type === "npc").length){
    ship_experience();
  }else{
    experience = 0;
  }
  
  function npc_experience()
  {
    experience = defeated.reduce((total, data)=>{
      if(data.valid) 
        return total+= experience_points_awards[data.cr];
    }, 0);
  }
  
  function ship_experience()
  {
    let player_ship_level, enemy_ship_level;
  
    if(player_ships.length === 1)
    {
      player_ship_level = player_ships[0].data.data.details.tier;
    }else{
      player_ship_level = muliple_ships(player_ships.map(ship=> {return {tier : ship.data.data.details.tier}}));
    }
  
    if(defeated.length === 1)
    {
      enemy_ship_level = defeated[0].tier;
    }else{
      if(defeated.length === 2 && defeated.reduce((t,s) => t+=s.tier,0)/defeated[0].tier === 2)
      {
        enemy_ship_level = defeated[0].tier + 2;
      } else if(defeated.length === 3 && defeated.reduce((t,s) => t+=s.tier,0)/defeated[0].tier === 3) {
        enemy_ship_level = defeated[0].tier + 3;
      } else {
        enemy_ship_level = muliple_ships(defeated);
      }
    }
  
    function muliple_ships(ships){
      let tiers = ships.map((ship) => ship.tier), max = Math.max(...tiers);
      tiers = tiers.splice(ships.indexOf(max),1);
  
      let ship_level = tiers.reduce((total, ship)=> { 
        if(ship >= (max-2)) return total+=1;
      }, max);
  
      if(ship_level === max) 
      {
          let other_level = tiers.reduce((total, ship) => total += ship, 0);
          if(other_level >= max)
          {
            ship_level++;
          }
      }
  
      return ship_level;
    }
  
    let difficulty = Object.entries(starship_difficulty).find((difficulty)=> difficulty[1]===(enemy_ship_level - player_ship_level))?.[0];
  
    if(difficulty === undefined)
    {
      difficulty = (enemy_ship_level-player_ship_level) > 1 ? "Epic" : "Easy";
      ui.notifications.warn(`Difficulty Out of Bounds (${difficulty==="Epic" ? "High" : "Low"})`);
    }
    experience = experience_points_awards[Encounter_Difficulty[difficulty] + APL];
  }
  
  let content =`
    <table style="width: 100%; text-align:center; border: 1px solid black">
      <tr>
        <th colspan="2">${actors.map(actor=> `<img src=${actor.data.token.img} width="50" height="50">`).join(``)}</th>
      </tr>
      <tr>
        <td style="width=50%"><label for="monsterexp">Added Token Experience</label></td>
        <td style="width=50%"><input name="monsterexp" type="number" value="${experience}" min="0" max="2000000" disabled></td>
      </tr>
      <tr>
        <td style="width=50%"><label for="exp">Add addtional Experience</label></td>
        <td style="width=50%"><input name="exp" type="number" value="0" min="0" max="2000000"></td>
      </tr>
    </table>`;

  new Dialog({
    content, 
    buttons :
    {
      Ok : {icon : ``, label : `Increase Experience`, callback : (html) => {changeExp(actors,html); deleteDefeated();}}
    }
  }).render(true);
})();

async function changeExp(actors,html)
{
  let difference_experience = parseInt(html.find('[name=exp]')[0].value) + parseInt(html.find('[name=monsterexp]')[0].value);

  difference_experience = divideValue(difference_experience, actors.length);

  let update_content = ``;
  for(let actor of actors)
  {
    let new_experience = Math.clamped(difference_experience + actor.data.data.details.xp.value, 0, actor.data.data.details.xp.max);
    await actor.update({"data.details.xp.value" : new_experience});
    update_content += `${actor.name}/`;
    if(new_experience === actor.data.data.details.xp.max)
    {
      ui.notifications.notify(`${actor.name} is ready to level up!`);
    }
  }
  update_content = update_content.slice(0,-1);
  ChatMessage.create({
    content : `${update_content} has gained ${difference_experience} experience.`
  })
}

function divideValue(Obj, Value)
{
  if(Value === 1) return Obj;
  let Remainder = 0;
  let Update = Obj;

  Remainder = Update%Value;
  Update = Math.floor(Update/Value);

  console.log(`Experience Macro | There was ${Remainder} experience left over.`);

  return Update;
}

async function deleteDefeated()
{
  let defeated = canvas.tokens.placeables.filter(t=>
    t.data.disposition === -1 && t.data.overlayEffect === `icons/svg/skull.svg`
  );
  
  //set flag on token
  for(let token of defeated)
  {
    await token.setFlag(`world`,`experienceGiven`,true);
  }
  //await canvas.tokens.deleteMany(defeated);
}