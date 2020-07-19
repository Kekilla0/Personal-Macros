//arguments required => args[0] === tokenId

for(let arg of args)
{
    try{
        canvas.tokens.get(arg).update({"hidden" : false});
    }catch(error){}
    try{
        canvas.drawings.get(arg).update({"hidden" : false});
    }catch(error){}
}
