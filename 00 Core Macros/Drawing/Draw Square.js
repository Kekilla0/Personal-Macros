/**
 * Draw Square
 */

async function drawSquare({ x, y, w, h }){
  if(!isNumber(x) || !isNumber(y) || !isNumber(w) || !isNumber(h)) return console.error(`Number Error`);

  return await canvas.scene.createEmbeddedDocuments("Drawings", {
    author : game.user.id, height : h, width : w, x, y, type : "r", strokeWidth : 2, z : 0,
  });

  function isNumber(n){ return typeof n === 'number'}
}