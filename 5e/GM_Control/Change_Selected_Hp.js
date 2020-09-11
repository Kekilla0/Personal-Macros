(()=>{
  let dialog_content = `  
  <div class="form-group">
    <label for="hpinc">Enter Percentage (whole number) </label>
    <input name="hpinc" type="number" value="10" min="1" max="100">
  </div>`;

  let x = new Dialog({
    content : dialog_content,
    buttons : 
    {
      Ok : { label : `Ok`, callback : async (html)=> await change_HP(token.actor, parseInt(html.find('[name=hpinc]')[0].value))},
      Cancel : {label : `Cancel`}
    }
  });

  x.options.width = 200;
  x.position.width = 200;

  x.render(true);

})();

async function change_HP(actor, percentage = 0)
{
  console.log(actor,percentage);
  let original_value = actor.data.data.attributes.hp.value;
  let original_max = actor.data.data.attributes.hp.max;
  let hp_value = Math.floor(actor.data.data.attributes.hp.value * (percentage + 100) / 100);
  let hp_max = Math.floor(actor.data.data.attributes.hp.max * (percentage + 100) / 100);

  await actor.update({
    "data.attributes.hp.value" : hp_value,
    "data.attributes.hp.max" : hp_max
  });

  let whisper_content=`
  <div class="form-group">
    <table>
      <tr>
        <th></th>
        <th>Value</th>
        <th>Max</th>
      </tr>
      <tr>
        <td>Original</td>
        <td>${original_value}</td>
        <td>${original_max}</td>
      </tr>
      <tr>
      <td>Updated</td>
        <td>${hp_value}</td>
        <td>${hp_max}</td>
      </tr>
    </table>
  </div>`;
  
  ChatMessage.create({
    content : whisper_content,
    whisper : ChatMessage.getWhisperRecipients("GM")
  })
}