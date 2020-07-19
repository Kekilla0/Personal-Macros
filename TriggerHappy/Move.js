//////////////////////////////move macro//////////////////////////
//required arguments => args[0] === tokenID///////////////////////
////////////////////////args[1] === right (# of squares)//////////
////////////////////////args[2] === down (# of squares)///////////

let t = canvas.tokens.get(args[0]) ? canvas.tokens.get(args[0]) : canvas.notes.get(args[0]); 

let g = canvas.scene.data.grid;

let newX = (t.data.x + (g *parseInt(args[1])));
let newY = (t.data.y + (g *parseInt(args[2])));

console.log(...args,t,newX,newY);

t.update({
    x : newX,
    y : newY
});
