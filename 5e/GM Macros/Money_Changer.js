//Money Give/Remover
async function changeMoney(actors,html)
{
	let difference_money = {
		pp : parseInt(html.find('[name=pp]')[0].value),
		gp : parseInt(html.find('[name=gp]')[0].value),
		ep : parseInt(html.find('[name=ep]')[0].value),
		sp : parseInt(html.find('[name=sp]')[0].value),
		cp : parseInt(html.find('[name=cp]')[0].value)
	}
  
  //divide update_money based on # of targets
  difference_money = divideValue(difference_money, targets.length);

  //get rid of "extra" stuff, display all names in header
  let actor_content = ``;
  for(let actor of actors) {actor_content += `${actor.name}, `;}

  let table_content = ``;
  for(let key in difference_money)
  {
    if(difference_money[key] !== 0)
      table_content += `<tr><td>${key} :</td><td>${difference_money[key]}</td></tr>`
  }

  let content = `
  <table style "width: 100%; text-align:center; border: 1px solid black">
    <tr>
      <th colspan="2">Money Change :</th>
    </tr>
    <tr>
      <th colspan="2">${actor_content}</th>
    </tr>
    ${table_content}
  </table>`;

	for(let actor of actors){
    let original_money = duplicate(actor.data.data.currency);
    let update_money = changeValue(original_money,difference_money);    

    await actor.update({"data.currency" : update_money});
  }

  ChatMessage.create({content, speaker : ChatMessage._getSpeakerFromUser({user : game.user})})
}

function changeValue(Original, Difference)
{
  let Update = {pp :0, gp:0, ep:0, sp :0, cp: 0};

  for(let key in Original)
  {
    Update[key] = Original[key] + Difference[key];
    if(Update[key] < 0)
    {
      switch(key)
      {
        case "cp" :
          if (Update["sp"] > 0)
          {
            Update["cp"] += 10;
            Update["sp"] -= 1;
          }
          else if(Update["ep"] > 0)
          {
            Update["cp"] += 50;
            Update["ep"] -= 1;
          }
          else if(Update["gp"] > 0)
          {
            Update["cp"] += 100;
            Update["gp"] -= 1;
          }
          else if(Update["pp"] > 0)
          {
            Update["cp"] += 1000;
            Update["pp"] -= 1;
          }else{
            throw new Error(`Not enough money to do that.`);
          }
          Update = changeValue(Update, {pp :0, gp:0, ep:0, sp :0, cp: 0});
          break;
        case "sp" :
          if (Update["ep"] > 0)
          {
            Update["sp"] += 5;
            Update["ep"] -= 1;
          }
          else if(Update["gp"] > 0)
          {
            Update["sp"] += 10;
            Update["gp"] -= 1;
          }
          else if(Update["pp"] > 0)
          {
            Update["sp"] += 100;
            Update["pp"] -= 1;
          }
          else if(Update["cp"] > 9)
          {
            Update["sp"] += 1;
            Update["cp"] -= 10;
          }else{
            throw new Error(`Not enough money to do that.`);
          }
          Update = changeValue(Update, {pp :0, gp:0, ep:0, sp :0, cp: 0});
          break;
        case "ep" :
          if (Update["gp"] > 0)
          {
            Update["ep"] += 2;
            Update["gp"] -= 1;
          }
          else if(Update["pp"] > 0)
          {
            Update["ep"] += 20;
            Update["pp"] -= 1;
          }
          else if(Update["sp"] > 4)
          {
            Update["ep"] += 1;
            Update["sp"] -= 5;
          }
          else if(Update["cp"] > 49)
          {
            Update["ep"] += 1;
            Update["cp"] -= 50;
          }else{
            throw new Error(`Not enough money to do that.`);
          }
          Update = changeValue(Update, {pp :0, gp:0, ep:0, sp :0, cp: 0});
          break;
        case "gp" :
          if (Update["pp"] > 0)
          {
            Update["gp"] += 10;
            Update["pp"] -= 1;
          }
          else if(Update["ep"] > 1)
          {
            Update["gp"] += 1;
            Update["ep"] -= 2;
          }
          else if(Update["sp"] > 9)
          {
            Update["gp"] += 1;
            Update["sp"] -= 10;
          }
          else if(Update["cp"] > 99)
          {
            Update["gp"] += 1;
            Update["cp"] -= 100;
          }else{
            throw new Error(`Not enough money to do that.`);
          }
          Update = changeValue(Update, {pp :0, gp:0, ep:0, sp :0, cp: 0});
          break;
        case "pp" :
          if (Update["gp"] > 9)
          {
            Update["pp"] += 1;
            Update["gp"] -= 10;
          }
          else if(Update["ep"] > 19)
          {
            Update["pp"] += 1;
            Update["ep"] -= 20;
          }
          else if(Update["sp"] > 99)
          {
            Update["pp"] += 1;
            Update["sp"] -= 100;
          }
          else if(Update["cp"] > 999)
          {
            Update["pp"] += 1;
            Update["cp"] -= 1000;
          }else{
            throw new Error(`Not enough money to do that.`);
          }
          Update = changeValue(Update, {pp :0, gp:0, ep:0, sp :0, cp: 0});
      }
    }
  }
  return Update;
}

function divideValue(Object, Value)
{
  if(Value === 1) return Object;
  let remainder = 0;
  let Update = {pp :0, gp:0, ep:0, sp :0, cp: 0, remainder : 0};

  for(let key in Object)
  {
    Update[key] = Object[key] + remainder;
    remainder = Object[key]%Value;
    if(Update[key] > 0) Update[key] = Math.floor(Update[key]/Value);
    if(Update[key] < 0) Update[key] = Math.ceil(Update[key]/Value);
    if(remainder !== 0)
    {
      if(key === "ep")
      {remainder *= 5;}
      else if (key === "gp")
      {remainder *= 2;}
      else
      {remainder *= 10;}
    }
  }
  Update.remainder = remainder/10;
  return Update;
}

function getTargetActors(){
  if(game.user.targets.size > 0) return Array.from(game.user.targets).map(t => t.actor);
  if(canvas.tokens.controlled.length > 0) return canvas.tokens.controlled.map(t => t.actor);
  return game.users.filter(u => u.character).map(u => u.character);
}



let actors = getTargetActors();
let content = `
<div class = "form-group">
  <table style="width: 100%; text-align:center; border: 1px solid black">
    <tr>
      <thcolspan="2">${actors.reduce((a,v) => a+=`<img src=${v.data.img} width="50" height="50"></img>`, ``)}</th>
    </tr>
    <tr>
      <td><label for="pp">Platnium<label></td>
      <td><input name="pp" type ="number" value="0" min="-999" max="999"></td>
    </tr>
    <tr>
      <td><label for="gp">Gold    <label></td>
      <td><input name="gp" type ="number" value="0" min="-999" max="999"></td>
    </tr>
    <tr>
      <td><label for="ep">Electrum<label></td>
      <td><input name="ep" type ="number" value="0" min="-999" max="999"></td>
    </tr>
    <tr>
      <td><label for="sp">Silver  <label></td>
      <td><input name="sp" type ="number" value="0" min="-999" max="999"></td>
    </tr>
    <tr>
      <td><label for="cp">Copper  <label></td>
      <td><input name="cp" type ="number" value="0" min="-999" max="999"></td>
    </tr>
  </table>
</div>`;

let dialog = new Dialog({
  content,
  buttons : 
  {
    Ok : {icon : ``, label : `Change Money.`, callback : (html) => changeMoney(actors,html)}
  }
});

await dialog._render(true);





