/*
  Combines an Array of Rolls
*/

function combine(arr){
  return arr.reduce((acc, val, ind)=>{
    if(ind === 0){
      return val;
    }else{
      let returnVal = new Roll(`${acc._formula} + ${val._formula}`);

      returnVal.data = {};
      returnVal.terms = [...acc.terms, new OperatorTerm({ operator : "+" }),...val.terms];
      returnVal._evaluated = true;
      returnVal._total = acc._total + val._total;

      return returnVal;
    }
  });
}