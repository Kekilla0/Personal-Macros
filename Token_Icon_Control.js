//Token Icon Control

( () =>{
  let dialog_content = `
  <div class = "form-group">
    <table>
      <tr>
        <th>Icon Image</th>
        <th>Toggle Off</th>
      </tr>`;

  for(let effect of token.data.effects)
  {
    dialog_content += `
    <tr>
      <td><img src="${effect}" width="50" height="50"></td>
      <td><input type="checkbox" name="box" id="${effect}" checked></td>
    </tr>`;
  }

  dialog_content += `</table></div>`;

  new Dialog({
    content : dialog_content,
    buttons :
    {
      Ok : 
      {
        icon  : ``,
        label : `Update Effects`,
        callback : async (html) =>
        {
          let check_boxes = html.find('[name=box]');
          for(let key of check_boxes)
          {
            if(!key.checked)
            {
              await token.toggleEffect(`${key.id}`);
            }
          }
        }
      }
    }
  }).render(true);
})();