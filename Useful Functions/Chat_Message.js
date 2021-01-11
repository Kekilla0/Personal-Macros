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