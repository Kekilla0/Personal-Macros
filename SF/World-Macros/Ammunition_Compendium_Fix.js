(async ()=>{
  let pack = game.packs.find(p=>p.metadata.label === "Equipment" && p.metadata.package === "sfrpg");
  let contents = await pack.getContent();

  pack.locked = false;

  /*
    Types of Ammo : 
      battery
      dart
      flare
      mini-rocket
      petrol
      small arm
      longarm and sniper
      heavy
      scattergun
  */
  let ammo = {
    "Arrows" : {
      type : "arrow",
      value : 20,
      max : 20
    },
    "Explosive, Arrow" : {
      type : "arrow",
      value : 20,
      max : 20
    },
    "Battery, High-Capacity" : {
      type : "battery",
      value : 40,
      max : 40
    },
    "Battery, Standard" : {
      type : "battery",
      value : 20,
      max : 20
    },
    "Battery, Super-Capacity" :{
      type : "battery",
      value : 80,
      max : 80
    },
    "Battery, Ultra-Capacity" : {
      type : "battery",
      value : 100,
      max : 100
    }, 
    "Darts" :{
      type : "dart",
      value : 25,
      max : 25
    },
    "Explosive, Darts" : {
      type : "dart",
      value : 25,
      max : 25
    },
    "Flare" : {
      type : "flare",
      value : 1,
      max : 1
    },
    "Mini-Rockets" : {
      type : "mini-rocket",
      value : 10,
      max : 10
    },
    "Explosive, Mini-Rockets" : {
      type : "mini-rocket",
      value : 10,
      max : 10
    },
    "Petrol Tank, Standard" : {
      type : "petrol",
      value : 20,
      max : 20
    },
    "Petrol Tank, High-Capacity" : {
      type : "petrol",
      value : 40,
      max : 40
    },
    "Rounds, Small Arm" : {
      type : "small arm",
      value : 30,
      max : 30
    },
    "Explosive, Rounds, Small Arms" : {
      type : "small arm",
      value : 30,
      max : 30
    },
    "Rounds, Longarm and Sniper" : {
      type : "longarm and sniper",
      value : 25,
      max : 25
    },
    "Explosive, Rounds, Longarm and Sniper" : {
      type : "longarm and sniper",
      value : 25,
      max : 25
    },
    "Rounds, Heavy" : {
      type : "heavy",
      value : 20,
      max : 20
    },
    "Explosive, Rounds, Heavy" : {
      type : "heavy",
      value : 20,
      max : 20
    },
    "Scattergun Shells" : {
      type : "scattergun",
      value : 25,
      max : 25
    },
    "Explosive, Scattergun Shells" : {
      type : "scattergun",
      value : 25,
      max : 25
    },

  }

  let guns = {
    battery : ["Laser pistol, azimuth", "Laser pistol, aphelion", "Laser pistol, corona", "Laser pistol, parallax", "Laser pistol, perihelion", "Laser pistol, zenith"],
    dart : ["Needler pistol", "Needler pistol, Advanced", "Needler pistol, Elite", "Needler pistol, Paragon", "Needler pistol, supreme", "Needler pistol, Tactical"],
    flare : [],
    "mini-rocket" : [],
    petrol : [],
    "small arm" : [],
    "longarm and sniper" : [],
    heavy : [],
    scatterygun : []
  }

  let ammo_items = contents.filter(i=> Object.keys(ammo).includes(i.name));

  let gun_items = Object.entries(guns).map(([name,array])=>{
    return {
      type : name,
      items : contents.filter(i=> array.includes(i.name))
    }
  });

  let ids = [] , data = [];

  ammo_items.forEach((item) => {
    ids.push(item.id);
    item.data.data.capacity = ammo[item.name];
    data.push(item.data);
  });

  gun_items.forEach(({type, items}) => items.forEach( item => {
    ids.push(item.id);
    item.data.data.capacity.type = type;
    data.push(item.data);
  }));

  await pack.deleteEntity(ids);
  await pack.createEntity(data);
})();