//args[0] = token ID
//args[1] = item object

if(!args[0] || !args[1]) return ui.notifications.error(`${this.name}'s arguments are invalid.`);

(async()=>{
  await canvas.tokens.get(args[0]).actor.createOwnedItem(game.items.getName(args[1]).data);
})();