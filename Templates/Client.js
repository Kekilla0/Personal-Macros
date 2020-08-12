//Once Per Client => args[0] === CheckID

//once per client
let invalid = game.user.getFlag(`world`,`${args[0]}`) ? game.user.getFlag(`world`,`${args[0]}`) : false;
if (invalid) return;
game.user.setFlag(`world`,`${args[0]}`,true);

//game.user.unsetFlag(`world`,`${args[0]`});

//once per trigger
let invalid = false;
for(let user of game.users)
{
    if(invalid) return;
    invalid = user.getFlag(`world`,`${args[0]}`) ? user.getFlag(`world`,`${args[0]}`) : false;
}
game.user.setFlag(`world`,`${args[0]}`,true);
//game.user.unsetFlag(`world`,`${args[0]`});
