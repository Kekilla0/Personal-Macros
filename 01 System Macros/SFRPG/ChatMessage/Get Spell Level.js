function getLevel(message){
  const content = message.toObject().content;
  return Number(content.charAt(content.indexOf("card-footer")+28)) ?? 0;
}