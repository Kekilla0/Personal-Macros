/*
  World Scripter Macro : 0 HP Death Overlay
*/
const config = {
  active : false,
  effectData : [
    {
      changes : [],
      duration : {},
      flags : { core : { overlay : true, statusId : "dead" }},
      icon : "icons/svg/skull.svg",
      label : "dead"
    }
  ]
};
if(config.active && game.user.isGM)
  Hooks.on(`preUpdateToken`, deathOverlay);

function deathOverlay(scene, tokenData,updateData)
{
  if(isZeroHealth() && isNPC())
  {
    setProperty(updateData, "actorData.effects", config.effectData);
  }
  function isZeroHealth()
  {
    return getProperty(updateData, "actorData.data.attributes.hp.value") === 0;
  }
  function isNPC()
  {
    return !game.actors.get(tokenData.actorId).hasPlayerOwner;
  }
}