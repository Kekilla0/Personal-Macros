function getSex({data = ["male", "female"]} = {}){
  return data.shuffle().random();
}