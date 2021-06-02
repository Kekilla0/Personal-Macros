/*
  dialog choices 
    type of store
    size of store
    race of storekeep
    percentage increase of prices
  create store inventory
  randomly generates storekeep
    random attributes
    random characteristics
    random name
  outputs all information in a journal
*/

const config = {
  wait : async (ms) => new Promise((resolve)=> setTimeout(resolve, ms)),
  message : (...args) => ChatMessage.create({content : args.join(`<br>`)}),
  build : true, 
  types : [`Adventuring Supplies`,`Alchemist`,`Herbalist`,`Blacksmith`,`Armory`,`General Store`, `Hunter`, `Leatherworker`],
  sizes : [`Small`, `Basic`,`Urban`,`Premium`],
  races : [`Random`, `Dragonborn`, `Dwarf`, `Elf`, `Gnome`, `Half-Elf`, `Half-Orc`, `Halfling`, `Human`, `Tiefling`, `Goblin`, `Orc`, `Demon`], 
  keys : ["dnd5e.items", "dnd5e.tradegoods"],
  gold : {Small : 100, Basic : 200, Urban : 5000, Premium : 10000}, 
  //add services
  //split magic items?
  items : {
    //Armor
    //Light
    "Padded Armor" : {
      cost : `5 gp`,
      weight : `8 lb.`, 
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`},
        { name : `Leatherworker`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`}
      ]
    },
    "Leather Armor" : {
      cost : `10 gp`,
      weight : `10 lb.`, 
      stores: [
        { name : `Leatherworker`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    "Studded Leather Armor" : {
      cost : `45 gp`,
      weight : `13 lb.`, 
      stores: [
        { name : `Leatherworker`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    //Medium
    "Hide Armor" : {
      cost : `10 gp`,
      weight : `12 lb.`, 
      stores: [
        { name : `Leatherworker`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    "Chain Shirt" : {
      cost : `10 gp`,
      weight : `20 lb.`,
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`},
        { name : `Blacksmith`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
        { name : `Armory`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+2`, Premium : `1d4+3`},
      ]
    },
    "Scale Mail" : {
      cost : `50 gp`,
      weight : `45 lb.`,
      stores: [
        { name : `Blacksmith`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
        { name : `Armory`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+2`, Premium : `1d4+3`},
      ]
    },
    "Breastplate" : {
      cost : `400 gp`,
      weight : `20 lb.`,
      stores: [
        { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4+1`},
        { name : `Armory`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`},
      ]
    },
    "Half plate" : {
      cost : `750 gp`,
      weight : `40 lb.`,
      stores: [
        { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`},
        { name : `Armory`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`},
      ]
    },
    //Heavy
    "Ring Mail" : {
      cost : `30 gp`,
      weight : `40 lb.`,
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`},
        { name : `Blacksmith`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
        { name : `Armory`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+2`, Premium : `1d4+3`},
      ]
    },
    "Chain mail" : {
      cost : `75 gp`,
      weight : `55 lb.`,
      stores: [
        { name : `Blacksmith`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`},
        { name : `Armory`, Small : 0, Basic : `1d4`, Urban : `1d4`, Premium : `1d4`},
      ]
    },
    "Split" : {
      cost : `200 gp`,
      weight : `60 lb.`,
      stores: [
        { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`},
        { name : `Armory`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4`},
      ]
    },
    "Plate" : {
      cost : `1500 gp`,
      weight : `65 lb.`,
      stores: [
        { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`},
        { name : `Armory`, Small : 0, Basic : 0, Urban : `1d4-2`, Premium : `1d4-1`},
      ]
    },
    //Shield
    "Buckler" : {
      cost : `8 gp`,
      weight : `3 lb.`,
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`},
        { name : `Blacksmith`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
        { name : `Armory`, Small : 0, Basic : `1d4`, Urban : `1d4`, Premium : `1d4`},
      ]
    },
    "Shield" : {
      cost : `10 gp`,
      weight : `6 lb.`,
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`},
        { name : `Blacksmith`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`},
        { name : `Armory`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`},
      ]
    },
    "Tower Shield" : {
      cost : `20 gp`,
      weight : `30 lb.`,
      stores: [
        { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`},
        { name : `Armory`, Small : 0, Basic : 0, Urban : `1d4-2`, Premium : `1d4-1`},
      ]
    },
    //Weapons
    //Simple Melee Weapons
    "Club" : {
      cost : `1 sp`,
      weight : `2 lb.`,
      stores: [
        { name : `Hunter`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+2`, Premium : `1d4+4`},
      ]
    },
    "Dagger" : {
      cost : `2 gp`,
      weight : `1 lb.`,
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
        { name : `Blacksmith`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+2`, Premium : `1d4+4`},
        { name : `Armory`, Small : `2d4`, Basic : `2d4+1`, Urban : `2d4+2`, Premium : `2d4+4`},
        { name : `Hunter`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+2`, Premium : `1d4+4`},
      ]
    },
    "Handaxe" : {
      cost : `5 gp`,
      weight : `2 lb.`,
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
        { name : `Blacksmith`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+2`, Premium : `1d4+4`},
        { name : `Armory`, Small : `2d4`, Basic : `2d4+1`, Urban : `2d4+2`, Premium : `2d4+4`},
        { name : `Hunter`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
      ]
    },
    "Great Club" : {
      cost : `2 sp`,
      weight : `10 lb.`,
      stores: [
        { name : `Hunter`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
      ]
    },
    "Quarterstaff" : {
      cost : `2 sp`,
      weight : `4 lb.`,
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`}
      ]
    },
    "Spear" : {
      cost : `1 gp`,
      weight : `3 lb.`,
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`},
        { name : `Blacksmith`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
        { name : `Armory`, Small : `1d4`, Basic : `2d4`, Urban : `2d4+1`, Premium : `2d4+2`},
        { name : `Hunter`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
      ]
    },
    "Javelin" : {
      cost : `5 sp`,
      weight : `2 lb.`,
      stores: [
        { name : `Blacksmith`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
        { name : `Armory`, Small : `2d4-1`, Basic : `2d4`, Urban : `2d4+1`, Premium : `2d4+2`},
        { name : `Hunter`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
      ]
    },
    "Light hammer" : {
      cost : `2 gp`,
      weight : `2 lb.`,
      stores: [
        { name : `Blacksmith`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+2`, Premium : `1d4+3`},
        { name : `Armory`, Small : `1d4-1`, Basic : `1d4-1`, Urban : `1d4-1`, Premium : `1d4-1`},
      ]
    },
    "Mace" : {
      cost : `5 gp`,
      weight : `4 lb.`,
      stores: [
        { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4+1`, Premium : `1d4+2`},
        { name : `Armory`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4`},
      ]
    },
   "Sickle" : {
      cost : `1 gp`,
      weight : `2 lb.`,
      stores: [
        { name : `Blacksmith`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+2`, Premium : `1d4+3`},
        { name : `Armory`, Small : `1d4-1`, Basic : `1d4-1`, Urban : `1d4-1`, Premium : `1d4-1`},
      ]
    },
    //Simple Ranged Weapons
    "Shortbow" : {
      cost : `25 gp`,
      weight : `5 lb.`,
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`},
        { name : `Hunter`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
      ]
    },
    "Crossbow, light" : {
      cost : `25 gp`,
      weight : `5 lb.`,
      stores: [
        { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4+1`, Premium : `1d4+2`},
        { name : `Armory`, Small : 0, Basic : `1d4`, Urban : `1d4`, Premium : `1d4`},
      ]
    },
    "Dart" : {
      cost : `5 cp`,
      weight : `1/4 lb.`,
      stores: [
        { name : `Blacksmith`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+2`, Premium : `1d4*3`},
      ]
    },
    //Martial Melee Weapons
    "Longsword" : {
      cost : `15 gp`,
      weight : `3 lb.`,
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`},
        { name : `Blacksmith`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
        { name : `Armory`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
        { name : `Hunter`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
      ]
    },
    "Shortsword" : 
    {
      cost : `10 gp`,
      weight : `2 lb.`,
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
        { name : `Hunter`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+2`, Premium : `1d4+3`},
      ]
    },
    "Battleaxe" : 
    {
      cost : `10 gp`,
      weight : `4 lb.`,
      stores: [
        { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4+1`, Premium : `1d4+2`},
        { name : `Armory`, Small : 0, Basic : `1d4`, Urban : `1d4`, Premium : `1d4`},
      ]
    },
    "Flail" : 
    {
      cost : `10 gp`,
      weight : `2 lb.`,
      stores: [
        { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`},
      ]
    },
    "Glaive" : 
    {
      cost : `20 gp`,
      weight : `6 lb.`,
      stores: [
        { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`},
        { name : `Armory`, Small : 0, Basic : `1d4`, Urban : `1d4`, Premium : `1d4`},
      ]
    },
    "Greataxe" : 
    {
      cost : `30 gp`,
      weight : `7 lb.`,
      stores: [
        { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`},
        { name : `Armory`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`},
      ]
    },
    "Greatsword" : 
    {
      cost : `50 gp`,
      weight : `6 lb.`,
      stores: [
        { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`},
        { name : `Armory`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`},
      ]
    },
    "Halberd" : 
    {
      cost : `20 gp`,
      weight : `6 lb.`,
      stores: [
        { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`},
        { name : `Armory`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`},
      ]
    },
    "Lance" : 
    {
      cost : `10 gp`,
      weight : `6 lb.`,
      stores: [
        { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`},
        { name : `Armory`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4`},
      ]
    },
    "Maul" : 
    {
      cost : `10 gp`,
      weight : `10 lb.`,
      stores: [
        { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`},
        { name : `Armory`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`},
      ]
    },
    "Morning Star" : 
    {
      cost : `15 gp`,
      weight : `4 lb.`,
      stores: [
        { name : `Blacksmith`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`},
        { name : `Armory`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`},
      ]
    },
    "Whip" : 
    {
      cost : `2 gp`,
      weight : `3 lb.`,
      stores: [
        { name : `Leatherworker`, Small : 0, Basic : `1d4-1`, Urban : `1d4+1`, Premium : `1d4+3`},
      ]
    },
    //Martial Ranged Weapons
    "Longbow" : 
    {
      cost : `50 gp`,
      weight : `2 lb.`,
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`},
        { name : `Hunter`, Small : 0, Basic : 0, Urban : `1d4+1`, Premium : `1d4+2`},
      ]
    },
    "Net" : 
    {
      cost : `1 gp`,
      weight : `3 lb.`, 
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`},
        { name : `Hunter`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
        { name : `Leatherworker`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
      ]
    },
    //Ammunition
    "Arrows" : 
    {
      cost : `1 gp`,
      weight : `1 lb.`, 
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`},
        { name : `Hunter`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
      ]
    },
    "Arrows, Acid (5)" : 
    {
      cost : `2 gp`,
      weight : `1/2 lb.`, 
      stores: [
        { name : `Alchemist`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+2`}
      ]
    },
    "Bolts, Acid (5)" : 
    {
      cost : `2 gp`,
      weight : `1/2 lb.`, 
      stores: [
        { name : `Alchemist`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+2`}
      ]
    },
    "Sling Bullets, Acid (5)" : 
    {
      cost : `2 gp`,
      weight : `1/2 lb.`, 
      stores: [
        { name : `Alchemist`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+2`}
      ]
    },
    "Arrows, Cold (5)" : 
    {
      cost : `2 gp`,
      weight : `1/2 lb.`, 
      stores: [
        { name : `Alchemist`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+2`}
      ]
    },
    "Bolts, Cold (5)" : 
    {
      cost : `2 gp`,
      weight : `1/2 lb.`, 
      stores: [
        { name : `Alchemist`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+2`}
      ]
    },
    "Sling Bullets, Cold (5)" : 
    {
      cost : `2 gp`,
      weight : `1/2 lb.`, 
      stores: [
        { name : `Alchemist`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+2`}
      ]
    },
    "Arrows, Fire (5)" : 
    {
      cost : `2 gp`,
      weight : `1/2 lb.`, 
      stores: [
        { name : `Alchemist`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+2`}
      ]
    },
    "Bolts, Fire (5)" : 
    {
      cost : `2 gp`,
      weight : `1/2 lb.`, 
      stores: [
        { name : `Alchemist`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+2`}
      ]
    },
    "Sling Bullet, Fire (5)" : 
    {
      cost : `2 gp`,
      weight : `1/2 lb.`, 
      stores: [
        { name : `Alchemist`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+2`}
      ]
    },
    //Adventuring Gear
    "Abacus" : 
    {
      cost : `2 gp`,
      weight : `2 lb.`,  
      stores: [
        { name : `General Store`, Small : `0`, Basic : `0`, Urban : `1d4`, Premium : `1d4+2`}
      ]
    },
    "Backpack" : 
    {
      cost : `2 gp`,
      weight : `5 lb.`,  
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
      ]
    },
    "Barrel" : 
    {
      cost : `2 gp`,
      weight : `70 lb.`,  
      stores: [
        { name : `General Store`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+2`, Premium : `1d4+3`}
      ]
    },
    "Basket" : 
    {
      cost : `4 sp`,
      weight : `2 lb.`,  
      stores: [
        { name : `General Store`, Small : `1d4`, Basic : `1d4+2`, Urban : `1d4+4`, Premium : `1d4+5`}
      ]
    },
    "Blanket" : 
    {
      cost : `5 sp`,
      weight : `3 lb.`,  
      stores: [
        { name : `General Store`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`}
      ]
    },
    "Bedroll" : 
    {
      cost : `1 gp`,
      weight : `7 lb.`, 
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
      ]
    },
    "Bell" : 
    {
      cost : `1 gp`,
      weight : `2 lb.`,  
      stores: [
        { name : `General Store`, Small : `0`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`}
      ]
    },
    "Bottle, glass" : 
    {
      cost : `2 sp`,
      weight : `2 lb.`,  
      stores: [
        { name : `General Store`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
      ]
    },
    "Bucket" : 
    {
      cost : `5 cp`,
      weight : `2 lb.`,  
      stores: [
        { name : `General Store`, Small : `1d4`, Basic : `1d4+2`, Urban : `1d4+4`, Premium : `1d4+5`}
      ]
    },
    "Candle" : 
    {
      cost : `4 sp`,
      weight : `2 lb.`,  
      stores: [
        { name : `General Store`, Small : `1d4`, Basic : `1d4+2`, Urban : `1d4+4`, Premium : `1d4+5`}
      ]
    },
    "Chalk" : 
    {
      cost : `1 cp`,
      weight : `0 lb.`,  
      stores: [
        { name : `General Store`, Small : `1d4`, Basic : `1d4+2`, Urban : `1d4+4`, Premium : `1d4+5`}
      ]
    },
    "Chest" : 
    {
      cost : `5 gp`,
      weight : `25 lb.`,  
      stores: [
        { name : `General Store`, Small : `0`, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+2`}
      ]
    },
    "Chest" : 
    {
      cost : `5 gp`,
      weight : `25 lb.`,  
      stores: [
        { name : `General Store`, Small : `0`, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+2`}
      ]
    },
    "Climber's Kit" : 
    {
      cost : `25 gp`,
      weight : `12 lb.`,  
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    "Clothes, Common" : 
    {
      cost : `5 sp`,
      weight : `3 lb.`,  
      stores: [
        { name : `General Store`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+5`, Premium : `1d4+7`}
      ]
    },
    "Clothes, Fine" : 
    {
      cost : `15 gp`,
      weight : `6 lb.`,  
      stores: [
        { name : `General Store`, Small : `0`, Basic : `0`, Urban : `1d4`, Premium : `1d4+3`}
      ]
    },
    "Clothes, Traveler's" : 
    {
      cost : `2 gp`,
      weight : `4 lb.`,  
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
      ]
    },
    "Crowbar" : 
    {
      cost : `2 gp`,
      weight : `5 lb.`,  
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    "Fishing Tackle" : 
    {
      cost : `1 gp`,
      weight : `4 lb.`, 
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
      ]
    },
    "Flask" : 
    {
      cost : `2 cp`,
      weight : `1 lb.`, 
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
        { name : `Alchemist`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
        { name : `Herbalist`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
        { name : `General Store`, Small : `1d4`, Basic : `1d4+2`, Urban : `1d4+4`, Premium : `1d4+6`},
      ]
    },
    "Grappling Hook" : 
    {
      cost : `2 gp`,
      weight : `4 lb.`, 
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`}
      ]
    },
    "Hammer" : 
    {
      cost : `1 gp`,
      weight : `3 lb.`,  
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
        { name : `General Store`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+3`, Premium : `1d4+5`},
      ]
    },
    "Hammock" : 
    {
      cost : `5 gp`,
      weight : `1 lb.`, 
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`}
      ]
    },
    "Healer's Kit" : 
    {
      cost : `5 gp`,
      weight : `3 lb.`,  
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`},
        { name : `Herbalist`, Small : 0, Basic : `1d4-1`, Urban : `1d4+1`, Premium : `1d4+3`}
      ]
    },
    "Hour Glass" : 
    {
      cost : `25 gp`,
      weight : `1 lb.`, 
      stores: [
        { name : `General Store`, Small : `0`, Basic : `0`, Urban : `1d4`, Premium : `1d4+2`}
      ]
    },
    "Hunting Trap" : 
    {
      cost : `5 gp`,
      weight : `25 lb.`, 
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+3`, Premium : `1d4+5`},
        { name : `Hunter`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
      ]
    },
    "Ink" : 
    {
      cost : `10 gp`,
      weight : `0 lb.`, 
      stores: [
        { name : `General Store`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+2`, Premium : `1d4+3`}
      ]
    },
    "Ink Pen" : 
    {
      cost : `2 cp`,
      weight : `0 lb.`, 
      stores: [
        { name : `General Store`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+2`, Premium : `1d4+3`}
      ]
    },
    "Jug" : 
    {
      cost : `2 cp`,
      weight : `0 lb.`, 
      stores: [
        { name : `General Store`, Small : `1d4`, Basic : `1d4 + 2`, Urban : `1d4+3`, Premium : `1d4+5`}
      ]
    },
    "Ladder (10-foot)" : 
    {
      cost : `1 sp`,
      weight : `25 lb.`, 
      stores: [
        { name : `General Store`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+2`, Premium : `1d4+3`}
      ]
    },
    "Lamp" : 
    {
      cost : `5 sp`,
      weight : `1 lb.`, 
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+2`, Premium : `1d4+3`},
        { name : `General Store`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+2`, Premium : `1d4+3`}
      ]
    },
    "Lantern, Bullseye" : 
    {
      cost : `10 gp`,
      weight : `2 lb.`,  
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+2`},
        { name : `General Store`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+2`},
      ]
    },
    "Lantern, Hooded" : 
    {
      cost : `5 gp`,
      weight : `2 lb.`, 
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+2`},
        { name : `General Store`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+2`}
      ]
    },
    "Lock" : 
    {
      cost : `10 gp`,
      weight : `1 lb.`, 
      stores: [
        { name : `General Store`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+2`}
      ]
    },
    "Magnifying glass" : 
    {
      cost : `100 gp`,
      weight : `0 lb.`, 
      stores: [
        { name : `General Store`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`}
      ]
    },
    "Map Case" : 
    {
      cost : `1 gp`,
      weight : `1 lb.`,  
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    "Mess kit" : 
    {
      cost : `2 sp`,
      weight : `1 lb.`,  
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`},
        { name : `General Store`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+2`, Premium : `1d4+3`}
      ]
    },
    "Mirror, Steel" : 
    {
      cost : `5 gp`,
      weight : `1/2 lb.`,  
      stores: [
        { name : `General Store`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    "Money belt" : 
    {
      cost : `4 gp`,
      weight : `1 lb.`,  
      stores: [
        { name : `General Store`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    "Pick, Miner's" : 
    {
      cost : `2 gp`,
      weight : `10 lb.`,  
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`},
        { name : `General Store`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
      ]
    },
    "Piton" : 
    {
      cost : `5 cp`,
      weight : `1/4 lb.`, 
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
      ]
    },
    "Pole (10-foot)" : 
    {
      cost : `5 cp`,
      weight : `7 lb.`, 
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+2`},
        { name : `General Store`, Small : 0, Basic : `1d41`, Urban : `1d4+1`, Premium : `1d4+3`},
      ]
    },
    "Pot, iron" : 
    {
      cost : `2 gp`,
      weight : `10 lb.`, 
      stores: [
        { name : `General Store`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
      ]
    },
    "Potion of Healing" : 
    {
      cost : `50 gp`,
      weight : `1/2 lb.`,  
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+2`},
        { name : `Herbalist`, Small : 0, Basic : `1d4`, Urban : `1d4+2`, Premium : `1d4+3`}
      ]
    },
    "Pouch" : 
    {
      cost : `5 sp`,
      weight : `1 lb.`, 
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`},
        { name : `General Store`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`},
      ]
    },
    "Purification Kit" : 
    {
      cost : `5 gp`,
      weight : `3 lb.`,  
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`},
        { name : `Herbalist`, Small : 0, Basic : `1d4`, Urban : `1d4+2`, Premium : `1d4+4`},
        { name : `Alchemist`, Small : 0, Basic : `1d4`, Urban : `1d4+2`, Premium : `1d4+4`}
      ]
    },
    "Quiver" : 
    {
      cost : `1 gp`,
      weight : `5 lb.`,  
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+3`, Premium : `1d4+5`},
        { name : `Leatherworker`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`},
      ]
    },
    "Quiver Scabbard" : 
    {
      cost : `10 gp`,
      weight : `2 lb.`, 
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`},
        { name : `Leatherworker`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4+1`},
      ]
    },
    "Rations" : 
    {
      cost : `5 sp`,
      weight : `2 lb.`, 
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
      ]
    },
    "Robes" : 
    {
      cost : `1 gp`,
      weight : `4 lb.`, 
      stores: [
        { name : `General Store`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+2`, Premium : `1d4+3`}
      ]
    },
    "Rope, Hempen" : 
    {
      cost : `1 gp`,
      weight : `10 lb.`, 
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+2`, Premium : `1d4+3`},
        { name : `General Store`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+2`, Premium : `1d4+3`},
      ]
    },  
    "Rope, Silk" : 
    {
      cost : `10 gp`,
      weight : `5 lb.`, 
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+2`},
        { name : `General Store`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+2`},
      ]
    },
    "Sack" : 
    {
      cost : `1 cp`,
      weight : `1/2 lb.`, 
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`},
        { name : `General Store`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`},
      ]
    },
    "Scale, merchant's" : 
    {
      cost : `5 gp`,
      weight : `3 lb.`, 
      stores: [
        { name : `General Store`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`},
      ]
    },
    "Sealing wax" : 
    {
      cost : `5 sp`,
      weight : `0 lb.`, 
      stores: [
        { name : `General Store`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`},
      ]
    },
    "Shovel" : 
    {
      cost : `2 gp`,
      weight : `5 lb.`,  
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`},
        { name : `General Store`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`},
      ]
    },
    "Signal Whistle" : 
    {
      cost : `5 cp`,
      weight : ``,  
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
      ]
    },
    "Soap" : 
    {
      cost : `2 cp`,
      weight : `0 lb.`, 
      stores: [
        { name : `General Store`, Small : 0, Basic : `1d4-1`, Urban : `1d4+1`, Premium : `1d4+3`},
      ]
    },
    "Spyglass" : 
    {
      cost : `1000 gp`,
      weight : `1 lb.`,  
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`}
      ]
    },
    "Tent, four-person" : 
    {
      cost : `4 gp`,
      weight : `40 lb.`,  
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    "Tent, two-person" : 
    {
      cost : `2 gp`,
      weight : `20 lb.`,  
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+3`}
      ]
    },
    "Tinderbox" : 
    {
      cost : `5 sp`,
      weight : `1 lb.`,  
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
      ]
    },
    "Torch" : 
    {
      cost : `1 cp`,
      weight : `1 lb.`,  
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
      ]
    },
    "Waterskin" : 
    {
      cost : `2 sp`,
      weight : `5 lb.`,  
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
      ]
    },
    "Whetstone" : 
    {
      cost : `1 cp`,
      weight : `1 lb.`,   
      stores: [
        { name : `Adventuring Supplies`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+3`}
      ]
    },
    "Acid (vial)" : 
    {
      cost : `25 gp`,
      weight : `1 lb.`,   
      stores: [
        { name : `Alchemist`, Small : `1d4-1`, Basic : `1d4x2`, Urban : `1d4x3`, Premium : `1d4x5`}
      ]
    },
    "Alchemist Fire (flask)" : 
    {
      cost : `50 gp`,
      weight : `1 lb.`,   
      stores: [
        { name : `Alchemist`, Small : 0, Basic : `1d4-1`, Urban : `1d4x2`, Premium : `1d4x5`}
      ]
    },
    "Antitoxin (vial)" : 
    {
      cost : `50 gp`,
      weight : ``,   
      stores: [
        { name : `Alchemist`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+3`, Premium : `1d4+5`},
        { name : `Herbalist`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+3`, Premium : `1d4+5`}
      ]
    },
    "Bottle, Glass" : 
    {
      cost : `2 gp`,
      weight : `2 lb.`,   
      stores: [
        { name : `Alchemist`, Small : `1d4`, Basic : `1d4+2`, Urban : `1d4+3`, Premium : `1d4+5`},
        { name : `Herbalist`, Small : `1d4`, Basic : `1d4+2`, Urban : `1d4+3`, Premium : `1d4+5`}
      ]
    },
    "Component Pouch" : 
    {
      cost : `25 gp`,
      weight : `2 lb.`,   
      stores: [
        { name : `Herbalist`, Small : `1d4`, Basic : `1d4+2`, Urban : `1d4+3`, Premium : `1d4+5`}
      ]
    },
    "Oil (flask)" : 
    {
      cost : `1 sp`,
      weight : `1 lb.`,   
      stores: [
        { name : `Alchemist`, Small : 0, Basic : `1d4-1`, Urban : `1d4+1`, Premium : `1d4+3`},
        { name : `Herbalist`, Small : 0, Basic : `1d4-1`, Urban : `1d4+1`, Premium : `1d4+3`},
        { name : `General Store`, Small : 0, Basic : `1d4`, Urban : `1d4+2`, Premium : `1d4+5`}
      ]
    },
    "Paper (one sheet)" : 
    {
      cost : `2 sp`,
      weight : `0 lbs`,   
      stores: [
        { name : `General Store`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+5`, Premium : `1d4+10`}
      ]
    },
    "Parchment (one sheet)" : 
    {
      cost : `1 sp`,
      weight : `0 lbs`,   
      stores: [
        { name : `General Store`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+5`, Premium : `1d4+10`}
      ]
    },
    "Perfume (vial)" : 
    {
      cost : `5 gp`,
      weight : ``,   
      stores: [
        { name : `Herbalist`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+2`}
      ]
    },
    "Poison, basic (vial)" : 
    {
      cost : `100 gp`,
      weight : ``,   
      stores: [
        { name : `Herbalist`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    "Vial" : 
    {
      cost : `1 gp`,
      weight : ``,   
      stores: [
        { name : `Herbalist`, Small : `1d4`, Basic : `1d4+2`, Urban : `1d4+4`, Premium : `1d4+5`},
        { name : `Alchemist`, Small : `1d4`, Basic : `1d4+2`, Urban : `1d4+4`, Premium : `1d4+5`}
      ]
    },
    //Tools
    "Brewer's supplies" : 
    {
      cost : `20 gp`,
      weight : `8 lb.`,  
      stores: [
        { name : `General Store`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    "Carpenter's tools" : 
    {
      cost : `8 gp`,
      weight : `6 lb.`,  
      stores: [
        { name : `General Store`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    "Cartographer's Tools" : 
    {
      cost : `15 gp`,
      weight : `6 lb.`,  
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    "Cobbler's tools" : 
    {
      cost : `1 gp`,
      weight : `5 lb.`,  
      stores: [
        { name : `General Store`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    "Cook's utensils" : 
    {
      cost : `1 gp`,
      weight : `8 lb.`,  
      stores: [
        { name : `General Store`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    "Glassblower's tools" : 
    {
      cost : `30 gp`,
      weight : `5 lb.`,  
      stores: [
        { name : `General Store`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    "Mason's tools" : 
    {
      cost : `10 gp`,
      weight : `8 lb.`,  
      stores: [
        { name : `General Store`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    "Navigator's Tools" : 
    {
      cost : `25 gp`,
      weight : `2 lb.`,   
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : 0, Urban : `1d4-1`, Premium : `1d4`}
      ]
    },
    "Painter's supplies" : 
    {
      cost : `10 gp`,
      weight : `5 lb.`,   
      stores: [
        { name : `General Store`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    "Potter's tools" : 
    {
      cost : `10 gp`,
      weight : `3 lb.`,   
      stores: [
        { name : `General Store`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    "Weaver's tools" : 
    {
      cost : `1 gp`,
      weight : `5 lb.`,   
      stores: [
        { name : `General Store`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    "Weaver's tools" : 
    {
      cost : `1 gp`,
      weight : `5 lb.`,   
      stores: [
        { name : `General Store`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    "Alchemist's Tools" : 
    {
      cost : `50 gp`,
      weight : `8 lb.`,   
      stores: [
        { name : `Alchemist`, Small : 0, Basic : `1d4`, Urban : `1d4+2`, Premium : `1d4+3`}
      ]
    },
    "Herbalism Kit" : 
    {
      cost : `5 gp`,
      weight : `3 lb.`,   
      stores: [
        { name : `Alchemist`, Small : 0, Basic : `1d4-1`, Urban : `1d4+1`, Premium : `1d4+2`},
        { name : `Herbalist`, Small : 0, Basic : `1d4-1`, Urban : `1d4+1`, Premium : `1d4+2`}
      ]
    },
    "Smith's Tools" : 
    {
      cost : `20 gp`,
      weight : `8 lb.`,   
      stores: [
        { name : `Blacksmith`, Small : 0, Basic : `1d4-1`, Urban : `1d4+1`, Premium : `1d4+1`},
        { name : `Armory`, Small : 0, Basic : `1d4-1`, Urban : `1d4+1`, Premium : `1d4+1`}
      ]
    },
    "Tinker's Tools" : 
    {
      cost : `50 gp`,
      weight : `10 lb.`,   
      stores: [
        { name : `Blacksmith`, Small : 0, Basic : `0`, Urban : `1d4`, Premium : `1d4+1`},
        { name : `Armory`, Small : 0, Basic : `0`, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    //Gaming Set
    "Dice set" : 
    {
      cost : `1 sp`,
      weight : `0 lb.`,   
      stores: [
        { name : `General Store`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    "Dragonchess set" : 
    {
      cost : `1 gp`,
      weight : `1/2 lb.`,   
      stores: [
        { name : `General Store`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    "Playing card set" : 
    {
      cost : `5 sp`,
      weight : `0 lb.`,   
      stores: [
        { name : `General Store`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    "Three-Dragon Ante set" : 
    {
      cost : `1 gp`,
      weight : `0 lb.`,   
      stores: [
        { name : `General Store`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    //Tack, Harness
    "Bit and bridle" : 
    {
      cost : `2 gp`,
      weight : `1 lb.`,  
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    //Saddles
    "Saddle, Riding" : 
    {
      cost : `10 gp`,
      weight : `25 lb.`,   
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    "Saddlebags" : 
    {
      cost : `4 gp`,
      weight : `8 lb.`,  
      stores: [
        { name : `Adventuring Supplies`, Small : 0, Basic : `1d4-1`, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    //Trade goods
    "Cotton Cloth" : 
    {
      cost : `5 sp`,
      weight : `4 lb.`,   
      stores: [
        { name : `General Store`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+3`}
      ]
    },
    "Cinnamon" : 
    {
      cost : `2 gp`,
      weight : `1 lb.`,   
      stores: [
        { name : `General Store`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
      ]
    },
    "Cloves" : 
    {
      cost : `3 gp`,
      weight : `1 lb.`,   
      stores: [
        { name : `General Store`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
      ]
    },
    "Copper" : 
    {
      cost : `5 sp`,
      weight : `1 lb.`,   
      stores: [
        { name : `General Store`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
      ]
    },
    "Flour" : 
    {
      cost : `2 cp`,
      weight : `1 lb.`,   
      stores: [
        { name : `General Store`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
      ]
    },
    "Ginger" : 
    {
      cost : `1 gp`,
      weight : `1 lb.`,   
      stores: [
        { name : `General Store`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
      ]
    },
    "Gold" : 
    {
      cost : `50 gp`,
      weight : `1 lb.`,   
      stores: [
        { name : `General Store`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    "Iron" : 
    {
      cost : `5 gp`,
      weight : `1 lb.`,   
      stores: [
        { name : `General Store`, Small : 0, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+3`}
      ]
    },
    "Pepper" : 
    {
      cost : `2 gp`,
      weight : `1 lb.`,   
      stores: [
        { name : `General Store`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
      ]
    },
    "Saffron" : 
    {
      cost : `15 gp`,
      weight : `1 lb.`,   
      stores: [
        { name : `General Store`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
      ]
    },
    "Salt" : 
    {
      cost : `5 cp`,
      weight : `1 lb.`,   
      stores: [
        { name : `General Store`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
      ]
    },
    "Silver" : 
    {
      cost : `3 gp`,
      weight : `1 lb.`,   
      stores: [
        { name : `General Store`, Small : 0, Basic : 0, Urban : `1d4`, Premium : `1d4+1`}
      ]
    },
    "Wheat" : 
    {
      cost : `1 cp`,
      weight : `1 lb.`,   
      stores: [
        { name : `General Store`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+3`, Premium : `1d4+5`}
      ]
    },
    //Miscellaneous
    "Alchemical Reagents" : 
    {
      cost : `See Unit`,
      weight : ``,  
      stores: [
        { name : `Alchemist`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+2`, Premium : `1d4+3`},
        { name : `Herbalist`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`}
      ]
    },
    "Spell Components" : 
    {
      cost : `See Spell`,
      weight : ``,  
      stores: [
        { name : `Herbalist`, Small : `1d4`, Basic : `1d4+1`, Urban : `1d4+2`, Premium : `1d4+3`},
        { name : `Alchemist`, Small : `1d4-1`, Basic : `1d4`, Urban : `1d4+1`, Premium : `1d4+2`}
      ]
    },
    "Special Materials" : 
    {
      cost : `See Material`,
      weight : ``,  
      stores: [
        { name : `Blacksmith`, Small : `1d4-2`, Basic : `1d4-1`, Urban : `1d4+1`, Premium : `1d4+2`},
        { name : `Armory`, Small : `1d4-3`, Basic : `1d4-2`, Urban : `1d4-1`, Premium : `1d4+1`}
      ]
    },
  },
};

(async ()=>{
  //input function
  let [type, size, race, percent] = await quickDialog({
    data : [
      {type : `select`, label : `Store Type : `, options : config.types},
      {type : `select`, label : `Store Size : `, options : config.sizes},
      {type : `select`, label : `Store Keeper Race : `, options : config.races},
      {type : `number`, label : `Percent Profit : `, options : 5}
    ],
    title : `CAW Inventory Dialog`
  });

  //create inventory --- fix to be a map
  let inventory = Object.entries(config.items).reduce((acc, [key , val]) => {
    let avail = val.stores.find(i=>i.name === type);
    if(avail && avail[size] !== 0)
    {
      let num = new Roll(avail[size]).evaluate({async : false}).total;
      let cost = getCost(val.cost, percent);
      if(num > 0)
        acc.push({name : key, cost , weight : val.weight, units : num });
    }
    return acc;
  }, []);

  /*
    Add total Gold
    Roll Random Characteristics of the Shop/Shopkeep
    weapon metal types? differences? changes in moneys?
    links to the items (aka find them in a compendium and link to them)
  */
  let content = `
    <table>
        <tr>
            <th colspan=3>${type} (${size})</th>
            <th colspan=2>${config.gold[size]} gp</th>
        </tr>
        <tr>
            <th colspan=2 style="width:45%">Name</th>
            <th style="width:30%">Cost</th>
            <th style="width:12%">Weight</th>
            <th style="width:12%">Units</th>
        </tr>
        ${inventory.reduce((acc, {name,cost,weight,units})=> acc += `<tr><td>${getImg({name}) || ""}</td><td>${getLink({name}) || name}</td><td>${cost}</td><td>${weight}</td><td>${units}</td></tr>`, ``)}
    </table>;
  `;

  let journal = game.journal.getName(`${type} ${size}`);
  if(journal) await journal.delete();

  journal = await JournalEntry.create({ content , folder : ``, name : `${type} ${size}`});
  journal.toggle();
})();

function getCost(cost, percent)
{
  const moneys = ["pp", "gp", "sp", "cp"];

  let arr = cost.split(" ");
  let base = arr[1], value = parseInt(arr[0]) * (1 + (percent/100)), base_ind = moneys.indexOf(base);

  return moneys.reduce((acc, val, ind)=> {
    if(ind < base_ind || value <= 0) return acc;
    else{
      let whole = ind === 4 ? Math.ceil(value) : Math.floor(value);
      value = (value - whole) * 10;

      if(whole > 0)
        return acc += `${whole} ${val} `;
      else 
        return acc;
    }
  }, "")
}

/*
  @Compendium[dnd5e.classfeatures.kYJsED0rqqqUcgKz]{Additional Fighting Style}
  @Compendium[compendium-key.entity-id]{entity-name}
*/
function getLink({ keys = config.keys, name = ""}){
  keys = keys instanceof Array ? keys : [keys];  

  for(let key of keys)
  {
    let pack = game.packs.get(key);
    let item_index = pack.index.find(i=>i.name.toLowerCase() === name.toLowerCase());
    if(item_index)
      return `@Compendium[${key}.${item_index._id}]{${item_index.name}}`;
  }
  return undefined;
}
function getImg({ keys = config.keys, name = ""}){
  keys = keys instanceof Array ? keys : [keys];  

  for(let key of keys)
  {
    let pack = game.packs.get(key);
    let item_index = pack.index.find(i=>i.name.toLowerCase() === name.toLowerCase());
    if(item_index)
      return `<img src="${item_index.img}" width="25" height="25">`;
  }
  return undefined;
}