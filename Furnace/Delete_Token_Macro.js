//args[0] = token name

(async()=>{
  let token = canvas.tokens.placeables.find(i=>i.name===args[0]);
  await canvas.tokens.deleteMany(token.data._id);
})();