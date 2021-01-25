/*
  updateLayerEntity
*/

/*
  Check Movement takes an Entity update Data and checks if the Entity Moved.
*/
function checkMovement(data)
{
  return (data?.x !== undefined || data?.y !== undefined)
}