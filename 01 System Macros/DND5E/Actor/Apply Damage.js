/**
 * Apply Damage : now with resistances, immunities, and vulnerabilities calculated.
 */

async function applyDamage({ actor , type, value } = {}){
  if(!actor || !type || !value) return;
  let {di,dr,dv} = actor.data.data.traits;

  let multiplier = 
    arrInclude(di,type) ? null :
    arrInclude(dr,type) ? 0.5 :
    arrInclude(dv,type) ? 2 : 1;

  return multiplier !== null ? await actor.applyDamage(value, multiplier) : actor;

  function arrInclude(obj, val){
    return [...obj.value, ...obj.custom.split(`;`)].includes(val);
  }
}