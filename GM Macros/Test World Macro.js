//create user
const user = await User.create({ name : "Test User" });

//create test scene
const scene = await Scene.create({ name : "Test Scene" });
//create Actors
const actors = [];
for(let actor of Object.keys(CONFIG.Actor.typeLabels))
    actors.push(await Actor.create({ name : `Test ${actor}`, type : actor }));

//create Items
const items = [];
for(let item of Object.keys(CONFIG.Item.typeLabels))
    items.push(await Item.create({ name : `Test ${item}`, type : item }));

//update entities
await user.update({ character : actors[0].id });
await actors[0].update({ "permission.default" : 3 });
await actors[0].createEmbeddedDocuments("Item", items.map(item => item.data), {});