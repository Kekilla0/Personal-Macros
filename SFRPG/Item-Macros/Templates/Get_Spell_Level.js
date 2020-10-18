(async ()=> {
  item.actor.useSpell(item).then( result => {
    if(!result) return;
    let content = result.data.content;
    let level = content.charAt(content.indexOf("card-footer")+28);
    console.log(level);
  });
})();