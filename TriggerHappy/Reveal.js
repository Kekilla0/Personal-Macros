//arguments required => args[0] === tokenId

console.log(args);
for(let arg of args)
{
    try{
        canvas.tokens.get(arg).update({"hidden" : false});
        console.log(arg," worked");
    }catch(error){}
}
