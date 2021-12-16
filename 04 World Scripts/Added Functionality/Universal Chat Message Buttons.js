Hooks.on(`preCreateChatMessage`, parseButton);
Hooks.on(`renderChatMessage`, addFunction);

/*
  Parse if the Message has a Button
*/
function parseButton(message, data){
  if(!("buttons" in data)) return;

  for(let [key, value] of Object.entries(data.buttons)){
    if(value?.callback instanceof Function)
      value.callback = value.callback.toString();

    data.content += `<br><button id="${key}">${value?.icon ?? ""} ${value?.label ?? ""}</button>`;
  }

  message.data.update({ 
    "flags.world.buttons" : data.buttons,
    "content" : data.content,
  });
}

/*
  Add function calls to rendered message
*/
function addFunction(message, html){
  const buttons = message.getFlag(`world`, `buttons`);
  if(!buttons) return;

  for(const key of Object.keys(buttons)){
    const button_DOM = html.find(`#${key}`);
    if(!button_DOM) return;

    button_DOM.off('click');
    button_DOM.on('click', (event) => message.executeButton(key, event));
  }
}

/*
  Execute Button Function
*/
ChatMessage.prototype.executeButton = function(id, event){
  const buttons = this.getFlag(`world`, `buttons`);
  const button = buttons[id] ?? {};

  if(!button) return;

  const speaker = Object.values(this.data.speaker.toObject()).reduce((a,v) => a || !!v, false) ? this.data.speaker : ChatMessage.getSpeaker();
  const character = game.user.character;
  const actor = speaker?.actor ? game.actors.get(speaker.actor) : null;
  const token = speaker?.token ? canvas.tokens.get(speaker.token) : null;

  try{
    eval(button.callback)(event, {speaker, character, actor, token});
  }catch (err){
    ui.notifications.error(`There was an error in ${this.id}'s button "${button.label}'s" callback! See the console (F12) for details.`);
    console.error(err);
  }
}

/*
  Initial Call
*/
for(const message of game.messages){
  addFunction(message, $(`[data-message-id="${message.id}"]`));
}