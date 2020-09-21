(()=>{
  if(item.actor.data.data.attributes.hp.value !== 0) return;

  item.roll().then((result)=>{
    if(!result) return;

    item.actor.update({"data.attributes.hp.value" : 1});
  });
})();
