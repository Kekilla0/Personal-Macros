async function changeDamage({ item, rollString = "", type = ""}){
  if(!(item instanceof Item)) return console.error(`Item Error`);

  let parts = item.toObject().data.damage.parts;
  parts[0] = [rollString, type];

  return await item.update({ "data.damage.parts" : parts });
}