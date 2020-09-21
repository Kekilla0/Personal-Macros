//Token Icon Control

( () =>{
  let content =`
  <table style="border:1px solid black;margin-left:auto;margin-right:auto;">
    <tr>
      <th>Icon Image</th>
      <th>Toggle Off</th>
    </tr>
    ${token.data.effects.map( effect => `
    <tr>
      <td><img src="${effect}" width="50" height="50"></td>
      <td><input type="checkbox" name"box" id="${effect}" checked></td>
    </tr>`).join(``)}
  </table>`;

  new Dialog({
    content,
    buttons :
    {
      Ok : { label : `Update Effects`, callback : async (html) => {
          let check_boxes = html.find('[name=box]');
          for(let key of check_boxes)
          {
            if(!key.checked)
            {
              await token.toggleEffect(`${key.id}`);
            }
          }
        }}}
  }).render(true);
})();