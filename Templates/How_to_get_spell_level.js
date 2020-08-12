let actor_name = "Fugile";
let spell_name = "Magic Missile";

(()=>{
  let acto = game.actors.getName(actor_name);
  let item = acto.items.find(i=>i.name===spell_name);

  acto.useSpell(item).then((result)=>{
    if(!result) return;
    let content = result.data.content;
    let level = content.charAt(content.indexOf("data-spell-level")+18);
    console.log(level);
  });
})();



