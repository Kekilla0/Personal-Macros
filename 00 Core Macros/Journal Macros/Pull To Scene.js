if(!event) return;
const args = Array.from($(event.target).parent())[0].outerText.substring(1).split(".");

const scene = game.scenes.getName(args[0]).id;
const users = game.users.map(user => user.id);

for(let user of users)
  await game.socket.emit("pullToScene", scene, user);