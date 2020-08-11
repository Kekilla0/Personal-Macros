(()=>{
  if(game.user.targets.size !== 1) return ui.notifications.error(`Please target exactly 1 token.`);
  let macro = game.macros.getName(`Update_Actor_Macro`);
  let target = game.user.targets.values().next().value;

  item.actor.useSpell(item).then((result)=>{
    if(!result) return;
    let content = result.data.content;
    let level = parseInt(content.charAt(content.indexOf("data-spell-level")+18));

    item.rollDamage({spellLevel : level}).then(result => {
      if(!result) return;

      let hp = Math.clamped(target.actor.data.data.attributes.hp.value + result.total, 0, target.actor.data.data.attributes.hp.max);
      macro.execute(target.id, {"data.attributes.hp.value" : hp});
    });
  });
})();