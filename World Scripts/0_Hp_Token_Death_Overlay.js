/*
  World Scripter Macro : 0 HP Death Overlay
*/
Hooks.on(`preUpdateToken`, (scene,tokenData,updateData) => {
  if(game.user.isGM && isZeroHealth() && isNPC())
  {
    let effectData = [
        {
          changes : [],
          duration : {},
          flags : { core : { overlay : true, statusId : "dead" }},
          icon : "icons/svg/skull.svg",
          label : "dead"
        }
    ];
    setProperty(updateData, "actorData.effects", effectData);
  }

  function isZeroHealth()
  {
    return getProperty(updateData, "actorData.data.attributes.hp.value") === 0;
  }
  function isNPC()
  {
    return !game.actors.get(tokenData.actorId).hasPlayerOwner;
  }
});