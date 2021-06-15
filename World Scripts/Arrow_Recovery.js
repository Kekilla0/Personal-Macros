Hooks.on(`preUpdateItem`, (item, diff) => {
  //if you dont own the item, ignore
  if(!item.owner) return;          
  //if its not a consumable, ignore                         
  if(item.type !== "consumable") return;  
  //if its an update that doesn't change quantity, ignore                  
  if(!diff?.data?.quantity) return;       
   //if its an update that doesn't reduce, ignore                  
  if(diff.data.quantity > item.data.data.quantity)  return;

  let as = item.getFlag(`world`, `arrowShot`) ?? 0;
  setProperty(diff, "flags.world.arrowShot", as + (item.data.data.quantity - diff.data.quantity));  
});


game.dnd5e.entities.Item5e.prototype.recoverAmmo = async function({ bonus = 0 } = {}) {
  let arrows_shot = this.getFlag(`world`,`arrowShot`);
  let arrow_recover = Math.clamped(Math.floor(arrows_shot/2 + bonus), 0, arrows_shot);
  await this.setFlag(`world`, `arrowShot`, 0);

  let quantity = this.data.data.quantity;
  this.update({ "data.quantity" : quantity + arrow_recover });
};


item.recoverAmmo();