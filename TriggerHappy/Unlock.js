//Unlock Door Macro
//Required arguments => args[0] === doorID
////////////////////////args[1] === t/f open or close

if(args[1] === `t`)
{
    canvas.walls.get(args[0]).update({
        ds : 1
    });
}else{
    canvas.walls.get(args[0]).update({
        ds : 0
    });
}
