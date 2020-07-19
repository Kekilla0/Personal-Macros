//Pause Game Macro arguments => args[0] === uniqueID

if(args[0] !== undefined || args[0] === "")
{
    let invalid = false;
    for(user of game.users)
    {
        if(invalid) return;
        invalid = user.getFlag(`world`,`${args[0]}`) ? user.getFlag(`world`,`${args[0]}`) : false;
    }
    game.user.setFlag(`world`,`${args[0]}`,true);
}

game.togglePause(true,true);