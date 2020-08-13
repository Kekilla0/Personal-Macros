//args[0] = token ID
//args[1] = item name
//args[2] = data update

if(!args[0] || !args[1] || !args[2]) return ui.notifications.error(`${this.name}'s arguments are invalid.`);

(async()=>{
  await canvas.tokens.get(args[0]).actor.items.find(i=>i.name===args[1]).update(args[2]);
})();