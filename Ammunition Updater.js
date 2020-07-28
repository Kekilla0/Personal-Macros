//Ammunition Updater
(() => {
  if(canvas.tokens.controlled.length !== 1) return ui.notificiations.error(`Select 1 Token.`);

  let target = canvas.tokens.controlled[0];
  let items = target.actor.items;

  let weapons = items.filter(i=>i.type === "weapon" && i.data.data.properties.amm);
  let weapon_options = ``;
  for(let weapon of weapons)
  {
    weapon_options += `<option value="${weapon.id}">${weapon.name}</option>`;
  }

  let ammos = items.filter(i=>i.type === "consumable" && i.data.data.consumableType === "ammo");
  let ammo_options = ``;
  for(let ammo of ammos)
  {
    ammo_options += `<option value="${ammo.id}">${ammo.name}</option>`;
  }

  let dialog_context = `
    <p>Choose Options</p>
    <div class ="form-group">
      <label>Select Weapon</label>
      <select id="weapon" name="weapon">
        ${weapon_options}
      </select>
      <p></p>
      <label>Select Ammunition</label>
      <select id ="ammo" name ="ammo">
        ${ammo_options}
      </select>
      <p></p>
    </div>`;

  new Dialog({
    content : dialog_context,
    buttons : {
      one : {
        icon :`<i class="fas fa-check"></i>`,
        label : "Switch Ammo",
        callback : async (html) => {
          let update_weapon = items.get(html.find('[name=weapon]')[0].value);
          let old_ammo = items.get(update_weapon.data.data.consume.target);
          let update_ammo = items.get(html.find('[name=ammo]')[0].value);
          let update = {
            _id : update_weapon._id,
            data : { 
              consume : {
                type : "ammo",
                target : update_ammo.id,
                amount : 1
              },
              attackBonus : (update_weapon.data.data.attackBonus + update_ammo.data.data.attackBonus - old_ammo.data.data.attackBonus),
              damage :{
                parts : [
                  update_weapon.data.data.damage.parts[0],
                  update_ammo.data.data.damage.parts[0]
                ]
              }
            }
          };
          await target.actor.updateEmbeddedEntity("OwnedItem",update);
          display(`
            <img src=${target.data.img} width="50" height="50">
            <img src=${update_weapon.data.img} width="25" height="25">
            =>
            <img src=${update_ammo.data.img} width="25" height="25">
            <p></p>
            <table>
              <tr>
                <td>
                  ${target.data.name} has loaded ${update_weapon.name} with ${update_ammo.name}.
                </td>
              </tr>
            </table>`);
            //console.log(target,update_weapon,old_ammo,update_ammo,update);
        }
      }
    }
  }).render(true);
})();

function display(data = "")
{
  ChatMessage.create({
    content : data
  });
}
