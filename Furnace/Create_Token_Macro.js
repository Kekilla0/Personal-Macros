//args[0] = actor name
//args[1] = token data update object

(async()=>{
  let token_data = game.actors.getName(args[0]).data.token;
  await canvas.tokens.createMany(token_data, {});
  let token = canvas.tokens.placeables.find(i=>i.name===args[0]);
  await token.update(args[1]);
})();