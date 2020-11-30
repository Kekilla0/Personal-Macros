let sizes = Object.entries(CONFIG.DND5E.tokenSizes);

(async ()=>{
  let tokenData = duplicate(item.actor.token.data);

  setProperty(tokenData, "actorData.data.attributes.hp.value", Math.ceil(item.actor.data.data.attributes.hp.value/2));

  let {size} = item.actor.data.data.traits;
  sizes.forEach(([n,s],i)=> {
    if(size===n)
    {
      let p = i !== 0 ? i-1 : i;
      tokenData.width = tokenData.height = sizes[p][1];
      setProperty(tokenData, "actorData.data.traits.size", sizes[p][0]);
    }
  });

  await item.actor.token.delete();

  await canvas.scene.createEmbeddedEntity("Token", {...tokenData, x: tokenData.x + canvas.scene.data.grid , y: tokenData.y + canvas.scene.data.grid});
  await canvas.scene.createEmbeddedEntity("Token", tokenData);
})();