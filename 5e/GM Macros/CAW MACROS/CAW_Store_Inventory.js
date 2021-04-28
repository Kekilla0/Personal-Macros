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
  random : (int) =>  Math.floor(Math.random() * int),
  message : (...args) => ChatMessage.create({content : args.join(`<br>`)}),
  randomArrayElement : (arr) => arr[Math.floor(Math.random()* arr.length)],
  weightedArray : (arr, w, e) => { let reArr = []; arr.forEach(ele => { for(let i=0; i< ele[w]; i++) reArr.push(ele[e]); }); return reArr; },
  capitalize : (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`,
  build : true, 
  types : [`Adventuring Supplies`,`Alchemist`,`Herbalist`,`Blacksmith`,`Armory`,`General Store`, `Hunter`, `Leatherworker`],
  sizes : [`Small`, `Basic`,`Urban`,`Premium`],
  races : [`Random`, `Dragonborn`, `Dwarf`, `Elf`, `Gnome`, `Half-Elf`, `Half-Orc`, `Halfling`, `Human`, `Tiefling`, `Goblin`, `Orc`, `Demon`], 
  keys : ["dnd5e.items", "dnd5e.tradegoods", "plutonium.items"],
  gold : {Small : 100, Basic : 200, Urban : 5000, Premium : 10000}, 
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
      let num = new Roll(avail[size]).roll().total;
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
  let rand_char = config.build ? getCharacter(race) : ``;

  let content = `
  ${rand_char}
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
  </table>`;

  let journal = game.journal.getName(`${type} ${size}`);
  if(journal) await journal.delete();

  journal = await JournalEntry.create({ content , folder : ``, name : `${type} ${size}`});

  //display journal
  toggleJournal({ name : journal.name });
})();

function getTableResult({name  = ``} = {})
{
  if(!name) return {name : "", text : ""};
  let {text} = game.tables.getName(name).roll().results[0];

  return { name, text };
}

function getName(race = ``, sex = ``)
{
  const raceData = [
    {
      name : `Dragonborn`,
      lastName : [
        ["","","","","c","cl","cr","d","dr","f","g","k","kl","kr","l","m","my","n","ny","pr","sh","t","th","v","y"],
        ["a","e","i","a","e","i","o","u","a","e","i","a","e","i","o","u","a","e","i","a","e","i","o","u","aa","ia","ea","ua","uu"],
        ["c","cc","ch","lm","lk","lx","ld","lr","ldr","lt","lth","mb","mm","mp","mph","mr","mt","nk","nx","nc","p","ph","r","rd","rj","rn","rrh","rth","st","tht","x"],
        ["a","e","i","a","e","i","o","u","a","e","i","a","e","i","o","u","a","e","i","a","e","i","o","u","aa","ia","ea","ua","uu"],
        ["c","cm","cn","d","j","k","km","l","n","nd","ndr","nk","nsht","nth","r","s","sht","shkm","st","t","th","x"],
        ["a","e","i","a","e","i","o","u","a","e","i","a","e","i","o","u","a","e","i","a","e","i","o","u","aa","ia","ea","ua","uu"],
        ["d","j","l","ll","m","n","nd","rg","r","rr","rd"],
        ["a","e","i","a","e","i","o","u","a","e","i","a","e","i","o","u","a","e","i","a","e","i","o","u","aa","ia","ea","ua","uu"],
        ["c","d","k","l","n","r","s","sh","th"]
      ],
      firstName : {
        Male : [
          ["Ali","Ar","Ba","Bal","Bel","Bha","Bren","Caer","Calu","Dur","Do","Dra","Era","Faer","Fro","Gre","Ghe","Gora","He","Hi","Ior","Jin","Jar","Kil","Kriv","Lor","Lumi","Mar","Mor","Med","Nar","Nes","Na","Oti","Orla","Pri","Pa","Qel","Ravo","Ras","Rho","Sa","Sha","Sul","Taz","To","Trou","Udo","Uro","Vor","Vyu","Vrak","Wor","Wu","Wra","Wul","Xar","Yor","Zor","Zra"],
          ["barum","bor","broth","ciar","crath","daar","dhall","dorim","farn","fras","gar","ghull","grax","hadur","hazar","jhan","jurn","kax","kris","kul","lasar","lin","mash","morn","naar","prax","qiroth","qrin","qull","rakas","rash","rinn","roth","sashi","seth","skan","trin","turim","varax","vroth","vull","warum","wunax","xan","xiros","yax","ythas","zavur","zire","ziros"]
        ],
        Female : [
          ["Ari","A","Bi","Bel","Cris","Ca","Drys","Da","Erli","Esh","Fae","Fen","Gur","Gri","Hin","Ha","Irly","Irie","Jes","Jo","Ka","Kel","Ko","Lilo","Lora","Mal","Mi","Na","Nes","Nys","Ori","O","Ophi","Phi","Per","Qi","Quil","Rai","Rashi","So","Su","Tha","Ther","Uri","Ushi","Val","Vyra","Welsi","Wra","Xy","Xis","Ya","Yr","Zen","Zof"],
          ["birith","bis","bith","coria","cys","dalynn","drish","drith","faeth","fyire","gil","gissa","gwen","hime","hymm","karyn","kira","larys","liann","lyassa","meila","myse","norae","nys","patys","pora","qorel","qwen","rann","riel","rina","rinn","rish","rith","saadi","shann","sira","thibra","thyra","vayla","vyre","vys","wophyl","wyn","xiris","xora","yassa","yries","zita","zys"]
        ],
      },
      weight : 1,
      parent : null
    },
    {
      name : `Dwarf`,
      lastName : [
        ["Ale", "Amber", "Anvil", "Ash", "Axe", "Barbed", "Barrel", "Battle", "Beast", "Bone", "Beryl", "Bitter", "Black", "Blazing", "Blessed", "Blood", "Blunt", "Bone", "Bottle", "Boulder", "Brew", "Brick", "Bright", "Bristle", "Broad", "Bronze", "Brown", "Cave", "Cask", "Chain", "Crag", "Chaos", "Coal", "Coin", "Copper", "Dark", "Deep", "Dim", "Dragon", "Drake", "Dusk", "Earth", "Ember", "Fiery", "Flint", "Flask", "Flint", "Flat", "Forge", "Frost", "Giant", "Gold", "Golden", "Granite", "Gravel", "Gray", "Great", "Grey", "Grim", "Grumble", "Hammer", "Hard", "Heavy", "Hill", "Honor", "Horn", "Ice", "Ingot", "Iron", "Jade", "Keg", "Kobold", "Krag", "Lead", "Large", "Lava", "Leather", "Light", "Long", "Marble", "Magma", "Merry", "Metal", "Mithril", "Mine", "Mountain", "Mud", "Night", "Noble", "Oak", "Oaken", "Onyx", "Opal", "Ore", "Orc", "Plate", "Pebble", "Red", "Rune", "Ruby", "Sapphire", "Shadow", "Shatter", "Smelt", "Silver", "Snow", "Steel", "Storm", "Strong", "Troll", "Thunder", "Twilight", "Treasure", "Under", "War", "Warm", "Whit", "Wind", "Wold", "Wraith", "Wyvern"],
        ["arm", "armour", "axe", "back", "bane", "beard", "basher", "belly", "belt", "bender", "blade", "born", "bow", "braid", "braids", "branch", "brand", "breaker", "brew", "brewer", "bringer", "brow", "buckle", "buster", "chest", "chin", "cloak", "coat", "delver", "digger", "foot", "fall", "fury", "finger", "flayer", "feet", "forge", "forged", "grog", "grip", "guard", "gut", "granite", "hand", "head", "heart", "helm", "hide", "hood", "horn", "jaw", "mace", "mail", "maker", "mantle", "mane", "master", "maul", "miner", "pike", "rock", "river", "shield", "shaper", "sword", "shoulder", "stone", "spine", "sunder", "thane", "toe", "tank", "view"],
      ],
      firstName : {
        Male : [
          ["Ad","Am","Arm","Baer","Daer","Bal","Ban","Bar","Bel","Ben","Ber","Bhal","Bhar","Bhel","Bram","Bran","Brom","Brum","Bun","Dal","Dar","Dol","Dul","Eb","Em","Erm","Far","Gal","Gar","Ger","Gim","Gral","Gram","Gran","Grem","Gren","Gril","Gry","Gul","Har","Hjal","Hjol","Hjul","Hor","Hul","Hur","Kar","Khar","Kram","Krom","Krum","Mag","Mal","Mel","Mor","Muir","Mur","Rag","Ran","Reg","Rot","Thal","Thar","Thel","Ther","Tho","Thor","Thul","Thur","Thy","Tor","Ty","Um","Urm","Von"],
          ["adin","bek","brek","dahr","dain","dal","dan","dar","dek","dir","dohr","dor","drak","dram","dren","drom","drum","drus","duhr","dur","dus","garn","gram","gran","grim","grom","gron","grum","grun","gurn","gus","iggs","kahm","kam","kohm","kom","kuhm","kum","kyl","man","mand","mar","mek","miir","min","mir","mond","mor","mun","mund","mur","mus","myl","myr","nam","nar","nik","nir","nom","num","nur","nus","nyl","rak","ram","ren","rig","rigg","rik","rim","rom","ron","rum","rus","ryl","tharm","tharn","thran","thrum","thrun"],
        ],
        Female : [
          ["An","Ar","Baer","Bar","Bel","Belle","Bon","Bonn","Braen","Bral","Bralle","Bran","Bren","Bret","Bril","Brille","Brol","Bron","Brul","Bryl","Brylle","Bryn","Bryt","Byl","Bylle","Daer","Dear","Dim","Ed","Ein","El","Gem","Ger","Gwan","Gwen","Gwin","Gwyn","Gym","Ing","Jen","Jenn","Jin","Jyn","Kait","Kar","Kat","Kath","Ket","Las","Lass","Les","Less","Lyes","Lys","Lyss","Maer","Maev","Mar","Mis","Mist","Myr","Mys","Myst","Naer","Nal","Nas","Nass","Nes","Nis","Nys","Raen","Ran","Red","Reyn","Run","Ryn","Sar","Sol","Tas","Taz","Tis","Tish","Tiz","Tor","Tys","Tysh"],
          ["belle","bera","delle","deth","dielle","dille","dish","dora","dryn","dyl","giel","glia","glian","gwyn","la","leen","leil","len","lin","linn","lyl","lyn","lynn","ma","mera","mora","mura","myl","myla","nan","nar","nas","nera","nia","nip","nis","niss","nora","nura","nyl","nys","nyss","ra","ras","res","ri","ria","rielle","rin","ris","ros","ryl","ryn","sael","selle","sora","syl","thel","thiel","tin","tyn","va","van","via","vian","waen","win","wyn","wynn"]
        ],
      },
      weight : 2,
      parent : null,
    },
    {
      name : `Elf`,
      lastName : [
        ["Ad","Ae","Ara","Bal","Bei","Bi","Bry","Cai","Car","Chae","Cra","Da","Dae","Dor","Eil","El","Ela","En","Er","Fa","Fae","Far","Fen","Gen","Gil","Glyn","Gre","Hei","Hele","Her","Hola","Ian","Iar","Ili","Ina","Jo","Kea","Kel","Key","Kris","Leo","Lia","Lora","Lu","Mag","Mia","Mira","Mor","Nae","Neri","Nor","Ola","Olo","Oma","Ori","Pa","Per","Pet","Phi","Pres","Qi","Qin","Qui","Ralo","Rava","Rey","Ro","Sar","Sha","Syl","The","Tor","Tra","Tris","Ula","Ume","Uri","Va","Val","Ven","Vir","Waes","Wran","Wyn","Wysa","Xil","Xyr","Yel","Yes","Yin","Ylla","Zin","Zum","Zyl"],
        ["balar","banise","bella","beros","can","caryn","ceran","cyne","dan","di","dithas","dove","faren","fiel","fina","fir","geiros","gella","golor","gwyn","hana","harice","hice","horn","jeon","jor","jyre","kalyn","kas","kian","krana","lamin","lana","lar","lee","len","leth","lynn","maer","maris","menor","moira","myar","mys","na","nala","nan","neiros","nelis","norin","peiros","petor","phine","phyra","qen","qirelle","quinal","ra","ralei","ran","rel","ren","ric","rie","rieth","ris","ro","rona","rora","roris","salor","sandoral","satra","stina","sys","thana","thyra","toris","tris","tumal","valur","varis","ven","vyre","warin","wenys","wraek","wynn","xalim","xidor","xina","xisys","yarus","ydark","ynore","yra","zana","zeiros","zorwyn","zumin"],
      ],
      firstName : {
        Male : [
          ["Ad", "Ae", "Bal", "Bei", "Car", "Cra", "Dae", "Dor", "El", "Ela", "Er", "Far", "Fen", "Gen", "Glyn", "Hei", "Her", "Ian", "Ili", "Kea", "Kel", "Leo", "Lu", "Mira", "Mor", "Nae", "Nor", "Olo", "Oma", "Pa", "Per", "Pet", "Qi", "Qin", "Ralo", "Ro", "Sar", "Syl", "The", "Tra", "Ume", "Uri", "Va", "Vir", "Waes", "Wran", "Yel", "Yin", "Zin", "Zum"],
          ["balar", "beros", "can", "ceran", "dan", "dithas", "faren", "fir", "geiros", "golor", "hice", "horn", "jeon", "jor", "kas", "kian", "lamin", "lar", "len", "maer", "maris", "menor", "myar", "nan", "neiros", "nelis", "norin", "peiros", "petor", "qen", "quinal", "ran", "ren", "ric", "ris", "ro", "salor", "sandoral", "toris", "tumal", "valur", "ven", "warin", "wraek", "xalim", "xidor", "yarus", "ydark", "zeiros", "zumin"],
        ],
        //keeps failing here --- Female === null?
        Female : [
          ["Ad", "Ara", "Bi", "Bry", "Cai", "Chae", "Da", "Dae", "Eil", "En", "Fa", "Fae", "Gil", "Gre", "Hele", "Hola", "Iar", "Ina", "Jo", "Key", "Kris", "Lia", "Lora", "Mag", "Mia", "Neri", "Ola", "Ori", "Phi", "Pres", "Qi", "Qui", "Rava", "Rey", "Sha", "Syl", "Tor", "Tris", "Ula", "Uri", "Val", "Ven", "Wyn", "Wysa", "Xil", "Xyr", "Yes", "Ylla", "Zin", "Zyl"],
          ["banise", "bella", "caryn", "cyne", "di", "dove", "fiel", "fina", "gella", "gwyn", "hana", "harice", "jyre", "kalyn", "krana", "lana", "lee", "leth", "lynn", "moira", "mys", "na", "nala", "phine", "phyra", "qirelle", "ra", "ralei", "rel", "rie", "rieth", "rona", "rora", "roris", "satra", "stina", "sys", "thana", "thyra", "tris", "varis", "vyre", "wenys", "wynn", "xina", "xisys", "ynore", "yra", "zana", "zorwyn"]
        ],
      },
      weight : 2,
      parent : null,
    },
    {
      name : `Gnome`,
      lastName : [
        ["Achen","Adel","Alter","Ammer","Aschen","Auer","Augen","Bam","Bauern","Baum","Bern","Birn","Bitter","Blumen","Brand","Ehren","Eichen","Eisen","Eulen","Feigen","Feuer","Flei","Freuden","Fried","Gold","Gott","Gross","Grun","Guten","Haber","Hage","Hart","Hassel","Hatten","Haven","Heid","Hein","Heit","Herz","Hilde","Himmel","Hoch","Hoenig","Hof","Holder","Honigs","Horn","Junker","Katzen","Klein","Kloster","Kohl","Korn","Kreutz","Kronen","Krucken","Lands","Lehm","Lem","Lichten","Mengel","Mitter","Molden","Nadel","Neu","Nieder","Pfeffer","Ratzen","Reichen","Rein","Roden","Rohr","Rosen","Roth","Rott","Sauer","Scheide","Schild","Schon","Schul","Schutzen","Schwarz","Seel","Spiegel","Stein","Stern","Stock","Stras","Strom","Thal","Uffer","Unter","Wald","Wasser","Weide","Wein","Weiss"],
        ["bach","bauer","beck","berg","berger","blum","burg","dorf","feld","fried","hal","hardt","hauer","haus","heim","hoff","hold","holdt","holt","holz","horn","lich","mann","mayer","meister","schmidt","stein","told","wald"],
      ],
      firstName : {
        Male : [
          ["Al","Ari","Bil","Bri","Cal","Cor","Dav","Dor","Eni","Er","Far","Fel","Ga","Gra","His","Hor","Ian","Ipa","Je","Jor","Kas","Kel","Lan","Lo","Man","Mer","Nes","Ni","Or","Oru","Pana","Po","Qua","Quo","Ras","Ron","Sa","Sal","Sin","Tan","To","Tra","Um","Uri","Val","Vor","War","Wil","Wre","Xal","Xo","Ye","Yos","Zan","Zil"],
          ["bar","ben","bis","corin","cryn","don","dri","fan","fiz","gim","grim","hik","him","ji","jin","kas","kur","len","lin","min","mop","morn","nan","ner","ni","pip","pos","rick","ros","rug","ryn","ser","ston","tix","tor","ver","vyn","win","wor","xif","xim","ybar","yur","ziver","zu"],
        ],
        Female : [
          ["Alu","Ari","Ban","Bree","Car","Cel","Daphi","Do","Eili","El","Fae","Fen","Fol","Gal","Gren","Hel","Hes","Ina","Iso","Jel","Jo","Klo","Kri","Lil","Lori","Min","My","Ni","Ny","Oda","Or","Phi","Pri","Qi","Que","Re","Rosi","Sa","Sel","Spi","Ta","Tifa","Tri","Ufe","Uri","Ven","Vo","Wel","Wro","Xa","Xyro","Ylo","Yo","Zani","Zin"],
          ["bi","bys","celi","ci","dira","dysa","fi","fyx","gani","gyra","hana","hani","kasys","kini","la","li","lin","lys","mila","miphi","myn","myra","na","niana","noa","nove","phina","pine","qaryn","qys","rhana","roe","sany","ssa","sys","tina","tra","wyn","wyse","xi","xis","yaris","yore","za","zyre"]
        ],
      },
      weight : 1,
      parent : null,
    },
    {
      name : `Half-Elf`,
      lastName : [],
      firstName : {
        Male : [
          ["Al","Aro","Bar","Bel","Cor","Cra","Dav","Dor","Eir","El","Fal","Fril","Gaer","Gra","Hal","Hor","Ian","Ilo","Jam","Kev","Kri","Leo","Lor","Mar","Mei","Nil","Nor","Ori","Os","Pan","Pet","Quo","Raf","Ri","Sar","Syl","Tra","Tyr","Uan","Ul","Van","Vic","Wal","Wil","Xan","Xav","Yen","Yor","Zan","Zyl"],
          ["avor","ben","borin","coril","craes","deyr","dithas","elor","enas","faelor","faerd","finas","fyr","gotin","gretor","homin","horn","kas","koris","lamir","lanann","lumin","minar","morn","nan","neak","neiros","orin","ovar","parin","phanis","qarim","qinor","reak","ril","ros","sariph","staer","torin","tumil","valor","voril","warith","word","xian","xiron","yeras","ynor","zaphir","zaren"]
        ],
        Female : [
          ["Alu","Aly","Ar","Bren","Byn","Car","Co","Dar","Del","El","Eli","Fae","Fha","Gal","Gif","Haly","Ho","Ile","Iro","Jen","Jil","Kri","Kys","Les","Lora","Ma","Mar","Mare","Neri","Nor","Ol","Ophi","Phaye","Pri","Qi","Que","Rel","Res","Sael","Saf","Syl","Ther","Tyl","Una","Uri","Ven","Vyl","Win","Wol","Xil","Xyr","Yes","Yll","Zel","Zin"],
          ["aerys","anys","bellis","bwynn","cerys","charis","diane","dove","elor","enyphe","faen","fine","galyn","gwynn","hana","hophe","kaen","kilia","lahne","lynn","mae","malis","mythe","nalore","noa","nys","ona","phira","pisys","qarin","qwyn","rila","rora","seris","stine","sys","thana","theris","tihne","trana","viel","vyre","walyn","waris","xaris","xipha","yaries","yra","zenya","zira"]
        ],
      },
      weight : 2,
      parent : [`Human`, `Elf`],
    },
    {
      name : `Half-Orc`,
      lastName : [],
      firstName : {
        Male : [
          ["Ag", "Agg", "Ar", "Arn", "As", "At", "Atr", "B", "Bar", "Bel", "Bor", "Br", "Brak", "C", "Cr", "D", "Dor", "Dr", "Dur", "G", "Gal", "Gan", "Gar", "Gna", "Gor", "Got", "Gr", "Gram", "Grim", "Grom", "Grum", "Gul", "H", "Hag", "Han", "Har", "Hog", "Hon", "Hor", "Hun", "Hur", "K", "Kal", "Kam", "Kar", "Kel", "Kil", "Kom", "Kor", "Kra", "Kru", "Kul", "Kur", "Lum", "M", "Mag", "Mahl", "Mak", "Mal", "Mar", "Mog", "Mok", "Mor", "Mug", "Muk", "Mura", "N", "Oggu", "Ogu", "Ok", "Oll", "Or", "Rek", "Ren", "Ron", "Rona", "S", "Sar", "Sor", "T", "Tan", "Th", "Thar", "Ther", "Thr", "Thur", "Trak", "Truk", "Ug", "Uk", "Ukr", "Ull", "Ur", "Urth", "Urtr", "Z", "Za", "Zar", "Zas", "Zav", "Zev", "Zor", "Zur", "Zus"],
          ["a", "a", "a", "o", "o", "e", "i", "u", "u", "u"],
          ["bak", "bar", "bark", "bash", "bur", "burk", "d", "dak", "dall", "dar", "dark", "dash", "dim", "dur", "durk", "g", "gak", "gall", "gar", "gark", "gash", "glar", "gul", "gur", "m", "mak", "mar", "marsh", "mash", "mir", "mur", "n", "nar", "nars", "nur", "rak", "rall", "rash", "rim", "rimm", "rk", "rsh", "rth", "ruk", "sk", "tar", "tir", "tur", "z", "zall", "zar", "zur"]
        ],
        Female : [
          ["Al", "Ar", "Br", "Ek", "El", "Fal", "Fel", "Fol", "Ful", "G", "Gaj", "Gar", "Gij", "Gor", "Gr", "Gry", "Gyn", "Hur", "K", "Kar", "Kat", "Ker", "Ket", "Kir", "Kot", "Kur", "Kut", "Lag", "M", "Mer", "Mir", "Mor", "N", "Ol", "Oot", "Puy", "R", "Rah", "Rahk", "Ras", "Rash", "Raw", "Roh", "Rohk", "S", "Sam", "San", "Sem", "Sen", "Sh", "Shay", "Sin", "Sum", "Sun", "Tam", "Tem", "Tu", "Tum", "Ub", "Um", "Ur", "Van", "Zan", "Zen", "Zon", "Zun"],
          ["a", "a", "o", "o", "e", "i", "i", "u"],
          ["d", "da", "dar", "dur", "g", "gar", "gh", "gri", "gu", "sh", "sha", "shi", "gum", "gume", "gur", "ki", "mar", "mi", "mira", "me", "mur", "ne", "ner", "nir", "nar", "nchu", "ni", "nur", "ral", "rel", "ri", "rook", "ti", "tah", "tir", "tar", "tur", "war", "z", "zar", "zara", "zi", "zur", "zura", "zira"]
        ],
      },
      weight : 2,
      parent : [`Human`, `Orc`],
    },
    {
      name : `Halfling`,
      lastName : [
        ["Adel", "Alt", "And", "Ans", "Arm", "Balden", "Berk", "Biber", "Bil", "Blum", "Bottom", "Boulder", "Brace", "Bramble", "Brand", "Brod", "Cull", "Dew", "Edel", "Eisen", "Fair", "Fallo", "Far", "Fass", "Fein", "Finna", "Flor", "Gal", "Gam", "Gell", "Hal", "Ham", "Hand", "Har", "Hard", "Hay", "Hilde", "Hoch", "Hof", "Hog", "Knot", "Korn", "Land", "Lehm", "Lowen", "Mug", "Neu", "Old", "Rei", "Rosen", "Roth", "Stritt", "Tol", "Vander", "Wahr", "Weg", "Weide", "Wein", "Weis", "Whit"],
        ["bach", "bairn", "bald", "baum", "beck", "berg", "berry", "bottom", "brand", "buck", "buhr", "burg", "burrow", "der", "fast", "fel", "feld", "felt", "foot", "gard", "gart", "gund", "ham", "hand", "hang", "hard", "haupt", "haus", "heimer", "hell", "hill", "kranz", "lein", "lich", "ling", "man", "meier", "ming", "mond", "red", "ric", "rich", "ring", "roth", "stein", "stock", "thal", "thorn", "thran", "tram", "veldt", "ville", "wald", "ward", "wend", "wich", "wise", "wort", "yegg", "zel"]
      ],
      firstName : {
        Male : [
          ["An", "Ar", "Bar", "Bel", "Con", "Cor", "Dan", "Dav", "El", "Er", "Fal", "Fin", "Flyn", "Gar", "Go", "Hal", "Hor", "Ido", "Ira", "Jan", "Jo", "Kas", "Kor", "La", "Lin", "Mar", "Mer", "Ne", "Nor", "Ori", "Os", "Pan", "Per", "Pim", "Quin", "Quo", "Ri", "Ric", "San", "Shar", "Tar", "Te", "Ul", "Uri", "Val", "Vin", "Wen", "Wil", "Xan", "Xo", "Yar", "Yen", "Zal", "Zen"],
          ["ace", "amin", "bin", "bul", "dak", "dal", "der", "don", "emin", "eon", "fer", "fire", "gin", "hace", "horn", "kas", "kin", "lan", "los", "min", "mo", "nad", "nan", "ner", "orin", "os", "pher", "pos", "ras", "ret", "ric", "rich", "rin", "ry", "ser", "sire", "ster", "ton", "tran", "umo", "ver", "vias", "von", "wan", "wrick", "yas", "yver", "zin", "zor", "zu"]
        ],
        Female : [
          ["An", "Ari", "Bel", "Bre", "Cal", "Chen", "Dar", "Dia", "Ei", "Eo", "Eli", "Era", "Fay", "Fen", "Fro", "Gel", "Gra", "Ha", "Hil", "Ida", "Isa", "Jay", "Jil", "Kel", "Kith", "Le", "Lid", "Mae", "Mal", "Mar", "Ne", "Ned", "Odi", "Ora", "Pae", "Pru", "Qi", "Qu", "Ri", "Ros", "Sa", "Shae", "Syl", "Tham", "Ther", "Tryn", "Una", "Uvi", "Va", "Ver", "Wel", "Wi", "Xan", "Xi", "Yes", "Yo", "Zef", "Zen"],
          ["alyn", "ara", "brix", "byn", "caryn", "cey", "da", "dove", "drey", "elle", "eni", "fice", "fira", "grace", "gwen", "haly", "jen", "kath", "kis", "leigh", "la", "lie", "lile", "lienne", "lyse", "mia", "mita", "ne", "na", "ni", "nys", "ola", "ora", "phina", "prys", "rana", "ree", "ri", "ris", "sica", "sira", "sys", "tina", "trix", "ula", "vira", "vyre", "wyn", "wyse", "yola", "yra", "zana", "zira"]
        ],
      },
      weight : 2,
      parent : null,
    },
    {
      name : `Human`,
      lastName : [
        ["b", "bh", "c", "d", "dh", "h", "j", "kh", "m", "n", "p", "r", "rh", "sh", "z"],
        ["a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "a", "a", "ei"],
        ["d", "h", "hr", "hl", "k", "kh", "l", "m", "mm", "n", "nn", "ss", "st", "sh"],
        ["a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "a", "a", "ei"],
        ["", "", "", "", "", "d", "l", "m", "n", "r"]
      ],
      firstName : {
        Male : [
          ["", "", "b", "bh", "f", "h", "j", "kh", "m", "n", "nh", "r", "rh", "s", "z"],
          ["a", "e", "u", "a", "e", "u", "a", "e", "u", "i", "ei"],
          ["b", "d", "hm", "hn", "hl", "kh", "l", "m", "rd", "r", "s", "sh", "z"],
          ["a", "e", "u", "a", "e", "u", "a", "e", "u", "i", "ei"],
          ["d", "m", "n", "r"]
        ],
        Female : [
          ["", "", "c", "f", "h", "j", "m", "n", "r", "s", "sh", "y", "z"],
          ["a", "e", "u", "a", "e", "u", "o", "o", "i", "i", "ei"],
          ["d", "f", "hn", "hl", "hm", "hr", "l", "m", "n", "p", "r", "s", "sh", "sm", "sn", "t", "v", "z"],
          ["a", "e", "u", "a", "e", "u", "o", "o", "i", "i", "ei"],
          ["h", "l"]
        ],
      },
      weight : 3,
      parent : null,
    },
    {
      name : `Tiefling`,
      lastName : [],
      firstName : {
        Male : [
          ["Aet", "Ak", "Am", "Aran", "And", "Ar", "Ark", "Bar", "Car", "Cas", "Dam", "Dhar", "Eb", "Ek", "Er", "Gar", "Gu", "Gue", "Hor", "Ia", "Ka", "Kai", "Kar", "Kil", "Kos", "Ky", "Loke", "Mal", "Male", "Mav", "Me", "Mor", "Neph", "Oz", "Ral", "Re", "Rol", "Sal", "Sha", "Sir", "Ska", "The", "Thy", "Thyne", "Ur", "Uri", "Val", "Xar", "Zar", "Zer", "Zher", "Zor"],
          ["adius", "akas", "akos", "char", "cis", "cius", "dos", "emon", "ichar", "il", "ilius", "ira", "lech", "lius", "lyre", "marir", "menos", "meros", "mir", "mong", "mos", "mus", "non", "rai", "rakas", "rakir", "reus", "rias", "ris", "rius", "ron", "ros", "rus", "rut", "shoon", "thor", "thos", "thus", "us", "venom", "vir", "vius", "xes", "xik", "xikas", "xire", "xius", "xus", "zer", "zire"]
        ],
        Female : [
          ["Af", "Agne", "Ani", "Ara", "Ari", "Aria", "Bel", "Bri", "Cre", "Da", "Di", "Dim", "Dor", "Ea", "Fri", "Gri", "His", "In", "Ini", "Kal", "Le", "Lev", "Lil", "Ma", "Mar", "Mis", "Mith", "Na", "Nat", "Ne", "Neth", "Nith", "Ori", "Pes", "Phe", "Qu", "Ri", "Ro", "Sa", "Sar", "Seiri", "Sha", "Val", "Vel", "Ya", "Yora", "Yu", "Za", "Zai", "Ze"],
          ["bis", "borys", "cria", "cyra", "dani", "doris", "faris", "firith", "goria", "grea", "hala", "hiri", "karia", "ki", "laia", "lia", "lies", "lista", "lith", "loth", "lypsis", "lyvia", "maia", "meia", "mine", "narei", "nirith", "nise", "phi", "pione", "punith", "qine", "rali", "rissa", "seis", "solis", "spira", "tari", "tish", "uphis", "vari", "vine", "wala", "wure", "xibis", "xori", "yis", "yola", "za", "zes"]
        ],
      },
      weight : 1,
      parent : [`Human`, `Demon`],
    },
    {
      name : `Goblin`,
      lastName : [],
      firstName : {
        Male : [
          ["","","c","cr","d","g","h","j","kr","m","n","p","r","s","st","t","v","vr","z","zr"],
          ["a","e","i","o","u","a","u"],
          ["ch","dg","dr","g","gd","gl","gg","gr","j","ll","rr","rd"],
          ["a","e","i","o","u","a","u"],
          ["","b","g","gg","k","lk","rg","rk","s","t"]
        ],
        Female : [
          ["","","b","d","g","j","m","n","p","q","r","v","z"],
          ["a","i","u","a","i","u","o","e"],
          ["b","br","d","dr","g","gn","gv","gr","lg","lgr","ld","ldr","lv","lz","ln","nd","nv","nr","rg","rz","rdr","rgr","rt"],
          ["a","i","u","a","i","u","o","e"],
          ["d","dd","g","l","ld","ll","n","nd","nn","y","v","z"],
          ["a","i","u","a","i","u","o","e"],
          ["","","k","l","n","r","s","t"],
        ],
      },
      weight : 1,
      parent : null,
    },
    {
      name : `Orc`,
      lastName : [
        ["The", ""],
        ["Aberrant", "Ancient", "Angry", "Anguished", "Arrogant", "Barbarian", "Barbaric", "Barren", "Berserk", "Bitter", "Bloody", "Broad", "Broken", "Brutal", "Brute", "Butcher", "Coarse", "Cold", "Colossal", "Crazy", "Crooked", "Cruel", "Dark", "Defiant", "Delirious", "Deranged", "Disfigured", "Enormous", "Enraged", "Fearless", "Feisty", "Fierce", "Filthy", "Forsaken", "Frantic", "Gargantuan", "Giant", "Glorious", "Grand", "Grave", "Grim", "Gross", "Gruesome", "Hollow", "Infernal", "Lethal", "Lost", "Loyal", "Macabre", "Mad", "Maniac", "Merciless", "Mighty", "Miscreant", "Noxious", "Outlandish", "Powerful", "Prime", "Proud", "Putrid", "Radical", "Reckless", "Repulsive", "Rotten", "Ruthless", "Shady", "Sick", "Silent", "Simple", "Smug", "Spiteful", "Swift", "Turbulent", "Ugly", "Unsightly", "Vengeful", "Venomous", "Vicious", "Violent", "Vivid", "Volatile", "Vulgar", "Warped", "Wicked", "Wild", "Worthless", "Wrathful", "Wretched", ""],
        ["Anger", "Ankle", "Ash", "Battle", "Beast", "Bitter", "Black", "Blood", "Bone", "Brain", "Brass", "Breath", "Chaos", "Chest", "Chin", "Cold", "Dark", "Death", "Dirt", "Doom", "Dream", "Elf", "Eye", "Fang", "Feet", "Fiend", "Finger", "Flame", "Flesh", "Foot", "Ghost", "Giant", "Gnoll", "Gnome", "Gore", "Hand", "Hate", "Head", "Heart", "Heel", "Hell", "Horror", "Iron", "Joint", "Kidney", "Kill", "Knee", "Muscle", "Nose", "Pest", "Poison", "Power", "Pride", "Rib", "Scale", "Skin", "Skull", "Slave", "Smoke", "Sorrow", "Spine", "Spite", "Steel", "Storm", "Talon", "Teeth", "Throat", "Thunder", "Toe", "Tooth", "Vein", "Venom", "Vermin", "War", ""],
        ["Axe", "Blade", "Brand", "Breaker", "Bruiser", "Burster", "Butcher", "Carver", "Chopper", "Cleaver", "Clobberer", "Conquerer", "Cracker", "Cruncher", "Crusher", "Cutter", "Dagger", "Defacer", "Despoiler", "Destroyer", "Dissector", "Ender", "Flayer", "Gasher", "Glaive", "Gouger", "Hacker", "Hammer", "Killer", "Lance", "Marauder", "Masher", "Mutilator", "Piercer", "Pummel", "Quasher", "Quelcher", "Queller", "Razer", "Render", "Ripper", "Saber", "Sabre", "Scalper", "Shatterer", "Skinner", "Slayer", "Slicer", "Smasher", "Snapper", "Spear", "Splitter", "Squasher", "Squelcher", "Squisher", "Strangler", "Sunderer", "Sword", "Trampler", "Trasher", "Vanquisher", "Wrecker",""]
      ],
      firstName : {
        Male : [
          ["", "", "", "b", "bh", "br", "d", "dh", "dr", "g", "gh", "gr", "j", "l", "m", "n", "r", "rh", "sh", "z", "zh"],
          ["a", "o", "u"],
          ["b", "br", "bz", "d", "dd", "dz", "dg", "dr", "g", "gg", "gr", "gz", "gv", "hr", "hz", "j", "kr", "kz", "m", "mz", "mv", "n", "ng", "nd", "nz", "r", "rt", "rz", "rd", "rl", "rz", "t", "tr", "v", "vr", "z", "zz"],
          ["a", "o", "u"],
          ["b", "d", "g", "g", "k", "k", "kk", "kk", "l", "ll", "n", "r"],
        ],
        Female : [
          ["", "", "", "", "b", "bh", "d", "dh", "g", "gh", "h", "k", "m", "n", "r", "rh", "s", "sh", "v", "z"],
          ["a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "ee", "au", "ye", "ie", "aa", "ou", "ua", "ao"],
          ["d", "dd", "dk", "dg", "dv", "g", "gg", "gn", "gv", "gz", "l", "ll", "lv", "lz", "m", "md", "mz", "mv", "ng", "nk", "ns", "nz", "t", "thr", "th", "v", "vn", "vr", "vg", "vd", "wnk", "wg", "wn"],
          ["a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "ee", "au", "ye", "ie", "aa", "ou", "ua", "ao"],
          ["", "", "", "", "", "f", "h", "k", "l", "m", "n", "ng", "v", "z"],
        ],
      },
      weight : 1,
      parent : null,
    },
    {
      name : `Demon`,
      lastName : [],
      firstName : {
        Male : [
          ["","","","","b","br","d","dr","g","j","k","m","r","s","t","th","tr","v","x","z"],
          ["a","e","i","o","u","a","a","o","o"],
          ["a","e","i","o","u","a","a","o","o"],
          ["a","e","i","o","u","a","a","o","o","a","e","i","o","u","a","a","o","o","a","e","i","o","u","a","a","o","o","a","e","i","o","u","a","a","o","o","a","e","i","o","u","a","a","o","o","iu","uu","au","aa"],
          ["g","g'dr","g'th","gdr","gg","gl","gm","gr","gth","k","l'g","lg","lgr","llm","lm","lr","lv","n","ngr","nn","r","r'","r'g","rg","rgr","rk","rn","rr","rthr","rz","str","th't","z","z'g","zg","zr","zz"],
          ["ch","d","g","k","l","n","n","n","n","n","r","s","th","th","th","th","th","z"],
        ],
        Female : [
          ["","","","","b","br","d","dr","g","j","k","m","r","s","t","th","tr","v","x","z"],
          ["a","e","i","o","u","a","a","o","o"],
          ["g","g'dr","g'th","gdr","gg","gl","gm","gr","gth","k","l'g","lg","lgr","llm","lm","lr","lv","n","ngr","nn","r","r'","r'g","rg","rgr","rk","rn","rr","rthr","rz","str","th't","z","z'g","zg","zr","zz"],
          ["a","e","i","o","u","a","a","o","o","a","e","i","o","u","a","a","o","o","a","e","i","o","u","a","a","o","o","a","e","i","o","u","a","a","o","o","a","e","i","o","u","a","a","o","o","iu","uu","au","aa"],
          ["ch","d","g","k","l","n","n","n","n","n","r","s","th","th","th","th","th","z"],
        ]
      },
      weight : 1,
      parent : null,
    },
  ];

  // build sex & race is necessary
  if (!sex) sex = config.randomArrayElement([`Male`,`Female`].shuffle());
  if (race === "Random")
  {
    let weightedRaces = config.weightedArray(raceData, `weight`, `name`);
    race = config.randomArrayElement(weightedRaces.shuffle());
  }

  let data = duplicate(raceData.find(ele=> race.toLowerCase().includes(ele.name.toLowerCase())));

  if(data.parent !== null)
  {
    let prnt = config.randomArrayElement(data.parent);
    data.lastName = duplicate(raceData.find(ele=> ele.name === prnt).lastName);
  }

  let lnLength = config.random(data.lastName.length);
  lnLength = lnLength > 5 ? lnLength : 5;

  if(!data) return;

  return { 
    firstName : config.capitalize(data.firstName[sex].map(arr=> config.randomArrayElement(arr.shuffle())).join(``)),
    lastName : config.capitalize(data.lastName.map(arr=> config.randomArrayElement(arr.shuffle())).filter((e,i)=> i < lnLength ).join(``)),
    race, sex
  };
}

function getCharacter(r)
{
  let { firstName, lastName, race, sex } = getName(r), characteristics = [];

  const tableNames = [
    `d20 Eyes: The person has...`,
    `d12 Ears: The person has...`,
    `d10 Mouth: The person has...`,
    `d12 Nose: The person has...`,
    `d8 Chin or jaw: He/she has...`,
    `d20 Hair: The person has...`,
    `d6 Height: The person is...`,
    `d20 Body: The person’s body is...`,
    `d6 Hands: The person has...`,
    `d4 Scar: The person has...`,
    `d12 Tattoo: The person has...`,
    `d8 Clothes: The person’s clothing is...`,
    `d32 Calm Trait: When calm, the person is typically...`,
    `d32 Stress Trait: When stressed, the person often becomes...`,
    `d20 Mood: Now, the person is...`,
    `d8 Faith: The person is a...`, 
    `d6 Prejudice: The person is prejudice against...`,
    `d20 Flaw: The person...`,
    `d50 Mannerisms`,
    `d20 Race : The person's linage is...`
  ];

  let num = new Roll(`1d8+1`).roll().total;

  for(let i = 0; i < num; i++)
    characteristics.push(getTableResult({ name : tableNames.shuffle().pop() }));

  return `
  <table>
    <tr><td style="width:50%"> Name : </td><td style="width:50%">${firstName} ${lastName}</td></tr>
    <tr><td style="width:50%"> Race : </td><td style="width:50%">${race}</td></tr>
    <tr><td style="width:50%"> Sex : </td><td style="width:50%">${sex}</td></tr>
    ${characteristics.reduce((acc,val)=> acc += `<tr><td style="width:50%">${val.name}</td><td style="width:50%">${val.text}</td></tr>`, ``)}
  </table>
  `;
}

function toggleJournal({ name })
{
  let journal = game.journal.getName(name);
  journal.sheet.rendered ? journal.sheet.close() : journal.sheet.render(true);
  return journal;
}

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