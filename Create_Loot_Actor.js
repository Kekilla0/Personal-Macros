
(async ()=>{
  let items = [];

  let defeated = canvas.tokens.placeables.filter(t=>
    t.data.disposition === -1 && t.data.overlayEffect === `icons/svg/skull.svg`
  );

  for(let token of defeated)
  {
    let invalid = token.getFlag(`world`,`lootactor`) ? token.getFlag(`world`,`lootactor`) : false;

    if(!invalid)
    {
      let temp_items = token.actor.items.filter(i=>
        (
          i.type === "weapon" ||
          i.type === "equipment" ||
          i.type === "consumeable"
        ) && (
          i.data.data.price !== null ||
          i.data.data.price > 0
        ) 
      ).map(i=> items.push(i));
    }

    token.setFlag(`world`,`lootactor`,true);
  }

  //create token from "Loot Actor"

  let new_token = game.actors.getName("Loot Actor").data.token;
  if(!new_token) return ui.notifications.error(`There is no token by the "Loot Actor" name.`);

  new_token.img = `Icons/0OzpTIY%5B1%5D.png`;
  new_token.x = defeated[0].data.x;
  new_token.y = defeated[0].data.y;

  new_token = await canvas.tokens.createMany(new_token, {});

  new_token = canvas.tokens.get(new_token._id);

  for(let item of items)
  {
    await new_token.actor.createOwnedItem(item, {});
  }
  
  await canvas.tokens.placeables.find(i=>i.name==="Loot Actor").actor.update({[`permission.default`] : 2});

})();
