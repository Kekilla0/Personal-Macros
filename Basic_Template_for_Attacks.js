let actor_name = "Sando";
let item_name = "Shortsword +1";

(()=>{
  let barb = game.actors.getName(actor_name);

  if(!barb) return ui.notification.error(`No actor by the name ${actor_name}.`);

  let item1 = barb.items.find(i=>i.name==="Reckless Attack");
  let item2 = barb.items.find(i=>i.name===item_name);

  if(!item1) return ui.notification.error(`Actor ${actor_name} does not have an item called Reckless Attack.`);
  if(!item2) return ui.notification.error(`Actor ${actor_name} does not have an item called ${item_name}.`);

  item1.roll()
    .then(()=>{
      item2.rollAttack().then((result)=>{
        //check if hit?
        console.log("Macro | Attack 1 | ",result);
        item2.rollDamage().then((result) => {
          //deal damage?
          console.log("Macro | Damage 1 | ",result);
        });
      })
    })
    .then(()=>{
      item2.rollAttack().then((result)=>{
        //check if hit?
        console.log("Macro | Attack 2 | ",result);
        item2.rollDamage().then((result) => {
          //deal damage?
          console.log("Macro | Damage 2 | ",result);
        });
      })
    });
})();