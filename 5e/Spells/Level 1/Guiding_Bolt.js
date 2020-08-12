//Guiding Bolt

(()=>{
  if(game.user.targets.size !== 1) return ui.notifications.error(`Please target exactly 1 token.`);
  let macro = game.macros.getName("Toggle_Token_Icon");
  let target = game.user.targets.values().next().value;

  item.actor.useSpell(item).then((result)=>{
    if(!result) return;
    let content = result.data.content;
    let level = parseInt(content.charAt(content.indexOf("data-spell-level")+18));

    item.rollAttack().then(result => {
      if(!result) return;

      if(result.total >= target.actor.data.data.attributes.ac.value)
      {
        item.rollDamage({spellLevel : level}).then(result => {
          if(!result) return;
        });
        macro.execute(target.id,item.data.img,0.1);
      }
    });
  });
})();
