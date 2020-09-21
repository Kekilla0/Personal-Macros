/*
*/

(()=>{
  const actors = (canvas.tokens.controlled.length !== 0) ? canvas.tokens.controlled.map(token=> token.actor) 
    : (game.user.targets.size !== 0) ? Array.from(game.user.targets).map(target=> target.actor) 
    : game.actors.filter(actor => actor.data.type === "character" && actor.isPC);

  //evenly space??
  let content = `
  <table style="width: 100%; text-align:center; border: 1px solid black">
    <tr>
      <th colspan="2">${actors.map(actor=> `<img src=${actor.data.token.img} width="30" height="30">`).join(``)}</th>
    </tr>
    <tr>
      <th colspan="2">${actors.map(actor=> `<span>${actor.data.token.name}</span>`).join(``)}</th>
    </tr>
    <tr>
      <td><label for="cred">Credits<label></td>
      <td><input name="cred" type ="number" value="0" min="-999" max="999"></td>
    </tr>
    <tr>
      <td><label for="upbs">UPB's    <label></td>
      <td><input name="upbs" type ="number" value="0" min="-999" max="999"></td>
    </tr>
  </table>`;

  new Dialog({
		content,
		buttons : 
		{
			Ok : {label : `Change Money.`, callback : (html) => changeMoney(actors,html)}
		}
  }).render(true);
  
  function changeMoney(actors, html)
  {
    let money = {
      cred : parseInt(html.find('[name=cred]')[0].value),
      upbs : parseInt(html.find('[name=upbs]')[0].value)
    };

    divideMoney(money, actors.length);

    let update = actors.map(actor=> {return { _id : actor.id, 
      "data.currency.credit" : (money.cred + actor.data.data.currency.credit),
      "data.currency.upd" : (money.upbs + actor.data.data.currency.upd)
    }});

    //fix styling
    let content = `  
    <table style "width: 100%; text-align:center; border: 1px solid black">
      <tr>
        <th colspan="2">${actors.map(actor=> `<img src=${actor.data.token.img} width="30" height="30">`).join(``)}</th>
      </tr>
      <tr>
        <th colspan="2">${actors.map(actor=> `<span>${actor.data.token.name}</span>`).join(``)}</th>
      </tr>
      <tr>
        <th colspan="2">Money Change :</th>
      </tr>
      <tr>
        <td>Credits : </td>
        <td>${money.cred}</td>
      </tr>
      <tr>
        <td>UPB's : </td>
        <td>${money.upbs}</td>
      </tr>
    </table>`;

    ChatMessage.create({content, speaker : ChatMessage._getSpeakerFromUser({user : game.user})});
  }

  function divideMoney(money, ways)
  {
    console.log(`Money Changer | Remainder left behind, Credits | `, (money.cred%ways));
    console.log(`Money Changer | Remainder left behind, UPB's   | `, (money.upbs%ways));

    console.log(money, ways);
;
    money.cred = Math.floor(money.cred/ways);
    money.upbs = Math.floor(money.upbs/ways);  
  }
})();