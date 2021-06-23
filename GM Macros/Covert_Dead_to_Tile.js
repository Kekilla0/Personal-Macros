const dead_tile_img = "systems/dnd5e/icons/skills/affliction_08.jpg";

let locations = canvas.tokens.placeables
  .filter(t => dead(t))
  .map(t => ({ x : t.data.x, y : t.data.y, width : t.data.width * canvas.grid.size , height : t.data.height * canvas.grid.size }));

await canvas.scene.deleteEmbeddedDocuments(
  "Token",
  canvas.tokens.placeables.filter(t => dead(t)).map(t => t.id),
  {}
);

await canvas.scene.createEmbeddedDocuments(
  "Tile",
  locations.map(data => 
    ({
      img : dead_tile_img,
      z : 100,
      ...data
    })
  ), 
  {}
);

function dead(token){
  return !!token.actor.effects.find(e=> e.data.label === "Dead");
}