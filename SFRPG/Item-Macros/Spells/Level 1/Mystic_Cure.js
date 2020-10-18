(async()=>{
  let target = Array.from(game.user.targets)[0];
  if(!target) return ui.notificiations.error(`Target 1 creature.`);
  let target_hp = target.actor.data.data.attributes.hp;
  let itemActor_hp = item.actor.data.data.attributes.hp;

  await item.actor.useSpell(item);

  Hooks.once(`createChatMessage`, async (data) => {
    let { total } = data._roll;

    if(total > (target_hp.max - target_hp.value))
    {
      let remainder = total - (target_hp.max - target_hp.value);
      let item_actor_hp = Math.clamped(
        itemActor_hp.value + remainder, 
        itemActor_hp.min,
        itemActor_hp.max
      );
      await item.actor.update({ "data.attributes.hp.value" :  item_actor_hp});
      game.macros.getName(`Update_Actor_Macro`).execute({_id : target.id, data : { data : { attributes : { hp : { value : target_hp.max }}}}});
    }else{
      let target_actor_hp = Math.clamped(
        target_hp.value + total,
        target_hp.min,
        target_hp.max
      );

      let input_value = parseInt( await input(`number`, `Use your HP?<br>Current hp : ${itemActor_hp.value}<br>Target missing hp : ${target_hp.max - target_actor_hp})`));

      if(input_value)
      {
        target_actor_hp += input_value;

        let item_actor_hp = Math.clamped(
          itemActor_hp.value - input_value,
          itemActor_hp.min,
          itemActor_hp.max
        );
        await item.actor.update({"data.attributes.hp.value" : item_actor_hp });
      }
      game.macros.getName(`Update_Actor_Macro`).execute({_id : target.id, data : { data : { attributes : { hp : { value : target_actor_hp }}}}});
    }
  });

  await item.rollDamage({event});
})();


async function input(type, content_text)
{
  let value = await new Promise((resolve)=>{
    new Dialog({
      title : `Input Dialog`, 
      content : `<table style="width:100%"><tr><th style="width:50%"><label>${content_text}</label></th><td style="width:50%"><input type="${type}" name="input"/></td></tr></table>`,
      buttons : {
        Ok : { label : `Ok`, callback : (html) => { resolve(html.find("input").val()); }}
      }
    }).render(true);
  });
  return value;
}