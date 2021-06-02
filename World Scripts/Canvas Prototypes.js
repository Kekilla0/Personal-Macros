Canvas.prototype.getEntity = function(type, point){
  const types = Object.keys(Canvas.layers);
  point = point instanceof Array ? { x : point[0], y : point[1] } : point;

  if(!types.includes(type)) return new Error(`Type Error : No Layer name "${type}"`);
  return this[type].placeables.find(e => e.center.x === point.x && e.center.y === point.y);
}