//bubble macro 
//arguments required => args[0] === token
////////////////////////args[1] === chatContent
////////////////////////args[2] === language
////////////////////////args[3] === time in seconds

let invalid = false;
for(let user of game.users)
{
    if(invalid) return;
    invalid = user.getFlag(`world`,`${args[0]}`) ? user.getFlag(`world`,`${args[0]}`) : false;
}
game.user.setFlag(`world`,`${args[0]}`,true);

setTimeout(function() {
    let t = canvas.tokens.get(args[0]);

    //target token

    //set language?
    $(`#polyglot select option [value=${args[2]}]`).attr("selected","selected");

    ChatMessage.create(    
    { 
        speaker : { token : t, actor : t.actor, scene : canvas.scene },
        content : args[1],
        type : CONST.CHAT_MESSAGE_TYPES.IC,
    },{chatBubble : true});
}, (args[3]*1000));

let args = ["bIKRBxAEqV2rhVPI","Grog hungry now.","goblin", 0];


