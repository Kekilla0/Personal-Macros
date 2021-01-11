/*
  Basic Whisper to GM Macro
*/
async function sendMessage({ content, whisper = ChatMessage.getWhisperRecipients("GM"), speaker = ChatMessage.getSpeaker() }={})
{
  return await ChatMessage.create({ content, whisper, speaker });
}

/*
  Two Roll to Message
*/
async function doubleRoll({ rolls , title = ``, img = ``})
{
  let [a,b] = rolls;
  if(!a || !b ) return;

  let template = `
    <hr>
    <div style="display:flex; flex-direction:row; flex-wrap:nowrap; justify-content:flex-start; align-items:center;">
      <img style="flex : 0 0 36px; margin-right:5px" src="${img}" title="${title}" width="36" height="36"/>
      <h3 style="flex : 1">${title}</h3>
    </div>
    <hr>
    <div style="display:flex; flex-direction:row; flex-wrap:nowrap; justify-content:nospace; flex-grow:1">
      <span style="flex:1; background:rgba(0, 0, 0, 0.1);border: 1px solid #999;border-radius: 4px;box-shadow: 0 0 2px #fff inset; font-size: 18px; text-align:center; padding: 8px 0px 8px 0px;">
        ${a._formula}
      </span>
      <span style="flex:1; background:rgba(0, 0, 0, 0.1);border: 1px solid #999;border-radius: 4px;box-shadow: 0 0 2px #fff inset; font-size: 18px; text-align:center; padding: 8px 0px 8px 0px;">
        ${b._formula}
      </span>
    </div>
    <div style="display:flex; flex-direction:row; flex-wrap:nowrap; justify-content:nospace; flex-grow:1">
      <span style="flex:1; background:rgba(0, 0, 0, 0.1);border: 1px solid #999;border-radius: 4px;box-shadow: 0 0 2px #fff inset; font-size: 18px; text-align:center; padding: 8px 0px 8px 0px;">
        ${a.total}
      </span>
      <span style="flex:1; background:rgba(0, 0, 0, 0.1);border: 1px solid #999;border-radius: 4px;box-shadow: 0 0 2px #fff inset; font-size: 18px; text-align:center; padding: 8px 0px 8px 0px;">
        ${b.total}
      </span>
    </div>`;

  return await ChatMessage.create({ content : template });
}

