/**
 * Get Placeable
 * 
 * a few different placeables dont' follow basic scheme of x/y top left, width hight vs the canvas size.
 */

function getPlaceable(type = ``, point = {}){
  if(!canvas.layers.map(layer => layer.options.name).includes(type)) return console.error(`${type} is not a registered layer.`);
  if(!point?.x || !point?.y) return console.error(`Point Error`);


  return canvas[type].placeables.filter(z=>{
    let {x ,y , width, height} = z;
    return point.x >= x 
      && point.x <= x+width 
      && point.y >= y 
      && point.y <= y+height;
  });
}