//create test scene
await Scene.create({ name : "Test Scene" });

//create Actors
const actors = Object.keys(CONFIG.Actor.typeLabels);
for(let actor of actors)
    await Actor.create({ name : `Test ${actor}`, type : actor });

//create Items
const items = Object.keys(CONFIG.Item.typeLabels);
for(let item of items)
    await Item.create({ name : `Test ${item}`, type : item });