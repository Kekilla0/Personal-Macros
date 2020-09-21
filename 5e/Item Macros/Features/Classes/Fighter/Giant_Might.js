(async ()=>{
  let item_actor = item.actor;
  let item_token = canvas.tokens.placeables.find(i=>i.name ===item_actor.data.token.name);
  
  if(item_actor.data.data.traits.size === `med`)
  {
    await item_actor.setFlag(`world`,`size`,`med`);
    await item_actor.setFlag(`world`, `mwdb`, item_actor.data.data.bonuses.mwak.damage);
    await item_actor.setFlag(`world`, `rwdb`, item_actor.data.data.bonuses.rwak.damage);

    await item_actor.update({
      "data.traits.size" : "lg",
      "data.bonuses.mwak.damage" : item_actor.data.data.bonuses.mwak.damage + ` + 1d6`,
      "data.bonuses.mwak.damage" : item_actor.data.data.bonuses.rwak.damage + ` + 1d6`
    });

    await item_token.update({height : 2, width : 2});

    if(!item_token.data.effects.includes(item.data.img))
      await item_token.toggleEffect(item.data.img);

    ChatMessage.create({
      content : `${item_actor.name} gains size and strength as they access their inner giant!`,
      Speaker : ChatMessage.getSpeaker({token : item_token}),
    });

    game.Gametime.doIn({minutes : 1}, async () => {
      if(item_actor.data.data.traits.size === `lg`)
      {
        await item_actor.update({
          "data.traits.size" : await item_actor.getFlag(`world`,`size`),
          "data.bonuses.mwak.damage" : await item_actor.getFlag(`world`, `mwdb`),
          "data.bonuses.mwak.damage" : await item_actor.getFlag(`world`, `rwdb`)
        });

        await item_token.update({height : 1, width : 1});

        if(item_token.data.effects.includes(item.data.img))
          await item_token.toggleEffect(item.data.img);

        ChatMessage.create({
          content : `${item_actor.name} size seems to wither.`,
          Speaker : ChatMessage.getSpeaker({token : item_token}),
        });
      }
    });
  }else{
    await item_actor.update({
      "data.traits.size" : await item_actor.getFlag(`world`,`size`),
      "data.bonuses.mwak.damage" : await item_actor.getFlag(`world`, `mwdb`),
      "data.bonuses.mwak.damage" : await item_actor.getFlag(`world`, `rwdb`)
    });

    await item_token.update({height : 1, width : 1});

    if(item_token.data.effects.includes(item.data.img))
      await item_token.toggleEffect(item.data.img);

    ChatMessage.create({
      content : `${item_actor.name} size seems to wither.`,
      Speaker : ChatMessage.getSpeaker({token : item_token}),
    });
  }
})();