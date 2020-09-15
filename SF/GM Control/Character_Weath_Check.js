/*
  This macros purpose is to automatically calculate expected character wealth, character wealth, and difference.
  //check players weath (total value of gear + credits) vs 11-5 table on page 391

  Usage :
    1. Get Players : either target individual player tokens or the macro will assume any actor of the character type that is a PC
    2. Money : macro will automatically tally the player's wealth and check it vs the table 11-5 on page 391 of the CRB.
    3. Dispaly : macro will then display all gathered information into a ChatMessage (whispered to all GMs)
*/
(()=>{
  const wealth_table = {
    1 : 1000,
    2 : 2000,
    3 : 4000,
    4 : 6000,
    5 : 9000,
    6 : 15000,
    7 : 23000,
    8 : 33000,
    9 : 45000,
    10 : 66000,
    11 : 100000,
    12 : 150000,
    13 : 225000,
    14 : 333000,
    15 : 500000,
    16 : 750000,
    17 : 1125000,
    18 : 1700000,
    19 : 2550000,
    20 : 3775000
  }

  //add check for quantity
  const actors = (game.user.targets.size !== 0) ? Array.from(game.user.targets).map(target=> target.actor) : game.actors.filter(actor => actor.data.type === "character" && actor.isPC);
  const actors_wealth = actors.map(actor=> {
    return {
      wealth : actor.items.reduce((t,i)=> { if(i.data.data?.price > 0 ){ return t+= (i.data.data.price*i.data.data.quantity); }else{ return t; }}, 0) + actor.data.data.currency.credit + actor.data.data.currency.upb,
      img : actor.data.img,
      name : actor.name,
      difference : function () { return (this.wealth - this.perTable); },
      perTable : wealth_table[actor.data.data.details.level.value]
    };
  });
  const total_wealth =  {
    wealth : actors_wealth.reduce((t,w)=> t+=w.wealth, 0),
    perTable : actors.reduce((t,a)=> { return t+=wealth_table[a.data.data.details.level.value]}, 0),
    difference : function (){ return (this.wealth - this.perTable) }
  };

  console.log(actors_wealth, total_wealth);

  let content = `
  <table style="width=100%; text-align:center; border:1px solid black;">
    <tr>
      <th style="width=10%"></th>
      <th style="width=40%">Actor</th>
      <th style="width=25%">$$$$</th>
      <th style="width=25%">Diff</th>
    </tr>
    ${actors_wealth.map(actor=> `<tr>
      <td style="width=10%"><img src="${actor.img}" height="40" width="40"></td>
      <td style="width=40%">${actor.name}</td>
      <td style="width=25%">${actor.wealth}</td>
      <td style="width=25%">${actor.difference()}</td>
    </tr>`).join(``)}
    ${actors.length === 1 ? `</table>` 
    : `<tr style="border: 1px solid black;">
        <td style="width=10%"></td>
        <td style="width=40%"></td>
        <td style="width=25%"><b>${total_wealth.wealth}</b></td>
        <td style="width=25%"><b>${total_wealth.difference()}</b></td>
      </tr>
    </table>` 
    }
    
  `;

  ChatMessage.create({
    content,
    whisper : ChatMessage.getWhisperRecipients("GM")
  });

})();