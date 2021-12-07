function getLevel(message){
    const content = message.toObject().content;
    return Number(content.charAt(content.indexOf("data-spell-level")+18)) ?? 0;
}