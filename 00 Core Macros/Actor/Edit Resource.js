async function editResource({ actor, name = "", value = 1} = {}){
  if(!actor || !name) return;

  let resources = actor.toObject().data.resources;
  let [key, object] = Object.entries(resources).find(([key, object]) => key === name || object.label === name);

  if(!key || !object) return;

  if(!object.value || !object.max){
    object.value = object.max = value;
  }else{
    object.value = Math.clamped(object.value + value, 0, object.max);
  }

  resources[key] = object;
  
  return await actor.update({ "data.resources" : resources });
}