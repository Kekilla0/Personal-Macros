const cover_types = [[0, `No Cover`],[1, `Partial Cover`], [2, `Normal Cover`], [0, `Soft Cover`], [4, `Improved Cover`], [200, `Total Cover`]];
const conceal_types = [[0, `No Concealment`], [20, `Normal Concealment`], [50, `Total Concealment`]];

(async ()=>{
  if(game.user.targets.size !== 1) return ui.notifications.error(`Target 1 Enemy.`);

  let { eac, kac, fort, reflex, will } = Array.from(game.user.targets)[0]?.actor.data.data.attributes;
  let { damage, save, equipped, capacity} = item.data.data;

  if(!equipped) return ui.notifications.error(`Cannot attack with an unequipped weapon.`);
  if(capacity.max > 0 && capacity.value === 0) return ui.notifications.error(`Weapon has no ammunition, reload!`);

  target.rollAbilitySave(save.type, {event});

  Hooks.once(`preCreateChatMessage`, async (data, options, userId) => {
    if(userId !== game.userID) return;

    let rollData = JSON.parse(data.roll);

    if(rollData.total < save.dc)
    {
      let cover = await choose(cover_types, `Does the enemy have cover?`);
      let concealment = await choose (conceal_types, `Is the enemy under any concealment?`);
      let concealment_roll = new Roll(`1d100`).roll().total;

      ChatMessage.create({
        content : `DC : ${save.type} - ${save.dc} - ${save.descriptor} <br> Save Total : ${rollData.total} <br> Damage Type : ${damage.parts.map(i=> i[1]).join()} <br> Cover : ${cover} <br> Concealment : ${concealment} <br> Concealment Roll : ${concealment_roll}`,
        speaker : ChatMessage.getSpeaker(),
        whisper : ChatMessage.getWhisperRecipients("GM"),
        blind : true
      });

      if(rollData.total < (save.dc - parseInt(cover)) && concelment_roll >= parseInt(concealment))
      {
        item.rollDamage({event});
      }
    }
  });
})();

async function choose(options = [], prompt = ``)
{
  let value = await new Promise((resolve, reject) => {

    let dialog_options = (options[0] instanceof Array)
      ? options.map(o => `<option value="${o[0]}">${o[1]}</option>`).join(``)
      : options.map(o => `<option value="${o}">${o}</option>`).join(``);
  
    let content = `${prompt}<br><select id="choice">${dialog_options}</select>`;
  
    new Dialog({
      content, 
      buttons : { OK : {label : `OK`, callback : async (html) => { resolve(html.find('#choice').val()); } } }
    }).render(true);
  });
  return value;
}