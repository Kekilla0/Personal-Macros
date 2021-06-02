
/*
  Consume Use
*/
async function consumeUse({ item }){
  if(!item) return false

  let { quantity , uses } = item.data.data;

  if(uses && uses.value > 0){
    uses.value -= 1;
    if(quantity && quantity > 0 && uses.value === 0){
      uses.value = uses.max;
      quantity -= 1;
    }
  }else if(quantity){
    if(uses){
      uses.value = uses.max;
    }
    quantity -= 1;
  }else{
    throw new Error(`No uses or quantity left in ${item.name}.`);
  }

  let data = { 
    data : (uses && quantity !== undefined) ? {uses, quantity} 
      : quantity !== undefined ? {quantity}
      : uses ? {uses} : null
  };

  return await item.update(data);
}

/*
  changeDamage?
*/
async function changeDamage({ item, str = ``, type = ``}){
  let {parts} = duplicate(item.data.data.damage);
  parts[0] = [str, type];

  return await item.update({ "data.damage.parts" : parts });
}