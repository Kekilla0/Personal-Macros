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
  const id = randomID();
  let template = `
    <div style="display:flex; flex-direction:column;">
      <div style="display:flex; flex-direction:row; flex-wrap:nowrap; justify-content:space-between;">
        <img style="flex:1" src="${img}" title="${title}" width="36" height="36"/>
        <h3 style="flex:3">${title}</h3>
      </div>
    </div>`;
    /*
      <div>
        <div>
          Roll 1 {Formula}
        </div>
        <div>
          Roll 2 {Formula}
        </div>
      </div>
      <div>
        Total
      </div>
    </div>`;
    */

  return await ChatMessage.create({ content : template });
}

