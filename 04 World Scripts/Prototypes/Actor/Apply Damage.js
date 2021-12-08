const original = getDocumentClass("Actor").prototype.applyDamage;
getDocumentClass("Actor").prototype.applyDamage = async function(amount, type){
  const arrInclude = (obj, val) => [...obj.value, ...obj.custom.split(';')].includes(val);
  if(!type) return await original.call(this, amount);
  if(!amount) return;

  let {di, dr, dv} = this.data.data.traits;

  let multiplier = 
    arrInclude(di, type) ? null :
    arrInclude(dr, type) ? 0.5 :
    arrInclude(dv, type) ? 2 : 1;

  return multiplier !== null ? await original.call(this, amount, multiplier) : this;
} 