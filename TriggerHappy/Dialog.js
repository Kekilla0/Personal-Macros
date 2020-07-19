//Dialog Arguments Required => args[0] === Dialog Contents
///////////////////////////////args[1] === unique ID
///////////////////////////////args[2] === single/each

if(args[2] === "single")
{
    let invalid = false;
    for(let user of game.users)
    {
        if(invalid) return;
        invalid = user.getFlag(`world`,`${args[0]}`) ? user.getFlag(`world`,`${args[0]}`) : false;
    }
    game.user.setFlag(`world`,`${args[0]}`,true);
}else{
    if(args[1] !== undefined || args[1] !== "")
    {
        let invalid = game.user.getFlag(`world`,`${args[1]}`) ? game.user.getFlag(`world`,`${args[1]}`) : false;
        if (invalid) return;
        game.user.setFlag(`world`,`${args[1]}`,true);
    }
}
 let content = args[0];

new Dialog({
   content : content,
   buttons : 
   { 
      ok : { label : "OK" } 
   } 
}).render(true);