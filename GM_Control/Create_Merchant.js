/*
  ask DM for options

  options : 
    npc creation (true false),
    merchant type (list : inn/tavern, general store, tailor/clothing, stable/animal vendor, transportation, blacksmith, adventuring, temple, alchemist, hunter, jeweler, library, magic, black market)
    store/city type (list : small, basic, urban, permium)
*/

/*
  create loot actor, put all relavent npc creation information in "biography"

  randomize object {items} information based on CAW rules

  transfer items to new loot actor

  give players permission to interact with the loot actor
*/

const url = "https://wa1z1p0757.execute-api.eu-west-1.amazonaws.com/dev";


let npc_type = {
  gender : ["male", "female"],
  race : {
    name : [],
    type : []
  },
};

let merchant_type = {
  a : {
    names : ["Inn", "Tavern"],
    inventory : [
      {
        name : "",
        quantity : ""
      }
    ]
  },
  b : {    
    names : ["General Store", "Trading Post", "Bodega"],
    inventory : []
  },
  c : {
    names : ["Tailor", "Clothing Store", "Clothier", "Outfitter"],
    inventory : []
  },
  d : {
    names : ["Stable", "Animal Vendor", "Animal Merchant"],
    inventory : []
  },
  e : {
    names : ["Vehicles", "Transporation"],
    inventory : []
  },
  f : {
    names : ["Blacksmith", "Smithy", "Armory"],
    inventory : []
  },
  g : {
    names : ["Adventuring Supplies"],
    inventory : []
  },
  h : {
    names : ["Temple", "Faith Supplies", "Church"],
    inventory : []
  },
  i : {
    names : ["Alchemist", "Herbalist", "Shaman", "Seer"],
    inventory : []
  }, 
  j : {
    names : ["Hunter", "Leather Worker"],
    inventory : []
  },
  k : {
    names : ["Jeweler", "Silversmith", "Goldsmith"],
    inventory : []
  },
  l : {
    names : ["Library", "Bookstore", "Study"],
    inventory : []
  },
  m : {
    names : ["Magic Store"],
    inventory : []
  }, 
  n : {
    names : ["Black Market Vendor", "Thieving Supplies"],
    inventory : []
  }
};

let npc = {
  gender : npc_type.gender[Math.ceil(Math.random()*npc_type.gender.length)],
  race : {
    name : npc_type.race.name[Math.ceil(Math.random()*npc_type.race.name.length)],
    type : "" //find index of race.name?
  }
};