function moduleStatus(name){
  return !!game.modules.get(name)?.active;
}