(() => {
  let targets = game.user.targets;

  if(targets.size < 1) return ui.notifications.error(`Please target more than 0 tokens.`);

  let targets_content = ``;

  for(let target of targets)
	{
		targets_content += `<img src=${target.data.img} width="50" height="50">`;
  }
  
  let dialog_content =`
  <p></p>
  ${targets_content}
  <div class = "form-group">
    <label for="exp">Experience</label>
    <input name="exp" type="number" value="0" min="0" max="20000"><br>
  </div>`;

  new Dialog({
    content : dialog_content,
    buttons :
    {
      Ok : {icon : ``, label : `Increase Experience`, callback : (html) => changeExp(targets,html)}
    }
  }).render(true);
})();

async function changeExp(targets,html)
{
  let difference_experience = parseInt(html.find('[name=exp]')[0].value);

  difference_experience = divideValue(difference_experience, targets.size);

  let update_content = ``;
  for(let target of targets)
  {
    await target.actor.update({"data.details.xp.value" : difference_experience + target.actor.data.data.details.xp.value});
    update_content += `${target.actor.name}/`;
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
