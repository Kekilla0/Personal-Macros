/*
    Auto Death Save World Scripter Macro
*/
const config = {
  enabled : true,
};

if(config.enabled){
  Hooks.on(`updateCombat`, captureTurn)
}

function captureTurn(combat, update, options, id)
{
  let { tokenId } = combat.current;
  let token = game.user?.character.getActiveTokens()[0] || null; 

  if(token && token.data._id === tokenId && checkHP())
  {
      token.actor.rollDeathSave();
  }
  function checkHP()
  {
      return getProperty(token.actor.data, "data.attributes.hp.value") === 0;
  }
}