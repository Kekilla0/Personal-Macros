PlaceableObject.prototype.Collision = function(placeable){
  return (
    this.x < placeable.x + placeable.width &&
    this.x + this.width > placeable.x &&
    this.y < placeable.y + placeable.height && 
    this.y + this.height > placeable.y
  );
}