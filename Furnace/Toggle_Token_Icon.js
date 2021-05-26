// args[0] = token Uuid
// args[1] = effect or icon path

let [uuid, effect] = args;

(async() =>{
  let token = await fromUuid(uuid);
  if(token.constructor.name === "Token") await token.toggleEffect(effect);
})();
