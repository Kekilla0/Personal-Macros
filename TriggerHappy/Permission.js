//arguments required => args[0] === tokenId
////////////////////////args[1] === userId

if(game.user.id !== args[1])
{
    let invalid = false;
    for(let user of game.users)
    {
        if(invalid) return;
        invalid = user.getFlag(`world`,`${args[0]}`) ? user.getFlag(`world`,`${args[0]}`) : false;
    }
    game.user.setFlag(`world`,`${args[0]}`,true);
    canvas.tokens.get(args[0]).actor.update({[`permission.${args[1]}`] : 2});
}
