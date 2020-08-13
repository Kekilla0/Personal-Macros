// args[0] = tokenID
// args[1] = icon_path
// args[2] = time
(async() =>{
  await canvas.tokens.get(args[0]).toggleEffect(args[1]);

  if(!args[2]) return;
  game.Gametime.doIn({minutes:args[2]}, async () => {
    await canvas.tokens.get(args[0]).toggleEffect(args[1]);
  });
})();
