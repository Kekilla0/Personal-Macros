function moduleStatus(name)
{
  if(!name instanceof String) return false;
  return !!game.modules.get(name)?.active;
}