function lastRoll(condition){
  let messages = Array.from(game.messages);
  if(condition instanceof Function) messages = messages.filter(condition);

  for(let message of messages.reverse())
    if(message.isRoll);
      return message.roll;
}