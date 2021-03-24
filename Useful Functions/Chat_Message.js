/*
  Basic Whisper to GM Macro
*/
async function sendMessage({ content, whisper = ChatMessage.getWhisperRecipients("GM"), speaker = ChatMessage.getSpeaker() }={})
{
  return await ChatMessage.create({ content, whisper, speaker });
}

/*
  Two Roll toMessage
*/
async function doubleRoll({ rolls , title = ``, img = ``, flavor = ``})
{
  let [a,b] = rolls;
  if(!a || !b ) return;

  let template = `
    <hr>
    <div style="display:flex; flex-direction:row; flex-wrap:nowrap; justify-content:flex-start; align-items:center;">
      <img style="flex : 0 0 36px; margin-right:5px" src="${img}" title="${title}" width="42" height="42"/>
      <div style="display:flex; flex-direction:column; flex-wrap:nowrap; justify-content: flex-start; align-items:center;">
        <h3 style="flex : 1">${title}</h3>
        <p>${flavor}</p>
      </div>
      
    </div>
    <hr>
    <div style="display:flex; flex-direction:row; flex-wrap:nowrap; justify-content:nospace; flex-grow:1">
      <span style="flex:1; background:rgba(0, 0, 0, 0.15);border: 1px solid #999;border-radius: 4px;box-shadow: 0 0 2px #fff inset; font-size: 16px; text-align:center; padding: 2px 0px 2px 0px;">
        ${a._formula}
      </span>
      <span style="flex:1; background:rgba(0, 0, 0, 0.15);border: 1px solid #999;border-radius: 4px;box-shadow: 0 0 2px #fff inset; font-size: 16px; text-align:center; padding: 2px 0px 2px 0px;">
        ${b._formula}
      </span>
    </div>
    <div style="display:flex; flex-direction:row; flex-wrap:nowrap; justify-content:nospace; flex-grow:1; padding: 4px 0px 0px 0px">
      <span style="flex:1; background:rgba(0, 0, 0, 0.15);border: 1px solid #999;border-radius: 4px;box-shadow: 0 0 2px #fff inset; font-size: 18px; text-align:center; padding: 2px 0px 2px 0px;">
        <b>${a.total}</b>
      </span>
      <span style="flex:1; background:rgba(0, 0, 0, 0.15);border: 1px solid #999;border-radius: 4px;box-shadow: 0 0 2px #fff inset; font-size: 18px; text-align:center; padding: 2px 0px 2px 0px;">
        <b>${b.total}</b>
      </span>
    </div>`;

  return await ChatMessage.create({ content : template });
}

/*
  get last roll result
*/
function lastRoll({ user = null}){
  let messages = Array.from(game.messages);
  if(user) messages = messages.filter(m=> m.data.user === user);

  let data;
  while(!data && messages.length !== 0)
  {
    let message = messages.pop();
    if(message.isRoll)
      data = message.roll.total;
  }
  
  return data;
}
