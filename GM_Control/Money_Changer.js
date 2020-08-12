//Money Give/Remover

(()=>{
	let targets = game.user.targets;

	let targets_content =``;

	for(let target of targets)
	{
		targets_content += `<img src=${target.data.img} width="50" height="50">`
	}

	let dialog_content = `
	<p></p>
	${targets_content}
	<div class = "form-group">
		<label for="pp">Platnium<label>
		<input name="pp" type ="number" value="0" min="-999" max="999"><br>
		<label for="gp">Gold    <label>
		<input name="gp" type ="number" value="0" min="-999" max="999"><br>
		<label for="ep">Electrum<label>
		<input name="ep" type ="number" value="0" min="-999" max="999"><br>
		<label for="sp">Silver  <label>
		<input name="sp" type ="number" value="0" min="-999" max="999"><br>
		<label for="cp">Copper  <label>
		<input name="cp" type ="number" value="0" min="-999" max="999"><br>
	</div>`;

	new Dialog({
		content : dialog_content,
		buttons : 
		{
			Ok : {icon : ``, label : `Change Money.`, callback : (html) => changeMoney(targets,html)}
		}
	}).render(true);
})();

async function changeMoney(targets,html)
{
	let difference_money = {
		pp : parseInt(html.find('[name=pp]')[0].value),
		gp : parseInt(html.find('[name=gp]')[0].value),
		ep : parseInt(html.find('[name=ep]')[0].value),
		sp : parseInt(html.find('[name=sp]')[0].value),
		cp : parseInt(html.find('[name=cp]')[0].value)
	}

  //console.log(targets,update_money);
  
  //divide update_money based on # of targets
  difference_money = divideValue(difference_money, targets.size);

  console.log(difference_money);

	for(let target of targets)
	{
    let original_money = duplicate(target.actor.data.data.currency);
    let update_money = changeValue(original_money,difference_money);    

    console.log(target.actor.name)
    console.log(original_money)
    console.log(difference_money)
    console.log(update_money);

    await target.actor.update({"data.currency" : update_money});
	}
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
  let Update = {pp :0, gp:0, ep:0, sp :0, cp: 0};

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
  console.log(`There was ${remainder/10} cp left over.`);
  return Update;
}

