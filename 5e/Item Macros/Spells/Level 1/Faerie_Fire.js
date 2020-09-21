(()=>{
  let macroA = game.macros.getName("Toggle_Token_Icon");
  let macroB = game.macros.getName("Update_Token_Macro");
  item.actor.useSpell(item).then((result)=>{
    if(!result) return;
    Hooks.once("createMeasuredTemplate", async (scene,template)=>{
      let pixel_width = (template.width/scene.data.gridDistance) * scene.data.grid;
      let targets = canvas.tokens.placeables.filter(t=>
        t.x >= template.x && t.x <= template.x + pixel_width &&
        t.y >= template.y && t.y <= template.y + pixel_width);
      
      for(let target of targets)
      {
        let save_roll = new Roll(`1d20 + ${target.actor.data.data.abilities.dex.save}`).roll();
  
        save_roll.toMessage({
          speaker : ChatMessage.getSpeaker({token : target}),
          rollMode : "blindroll"
        });
  
        if(save_roll.total < item.data.data.save.dc)
        {
          if(target.data.effects.includes(item.data.img))
          {
            await macroA.execute(target.id,item.data.img);
          }
          await macroA.execute(target.id,item.data.img,1);
          await macroB.execute(target.id,{dimLight : 10, brightLight : 0});

          game.Gametime.doIn({minutes:1}, async () => {
            await macroB.execute(target.id,{dimLight : 0, brightLight : 0});
          });
        }
      }
    });
  });
})();