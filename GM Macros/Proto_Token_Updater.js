(async ()=>{
  if(!token) return ui.notifications.error(`Please select a token`);
  let update = {
    vision : true, 
    dimSight : 0, 
    brightSight : 0, 
    sightAngle : 360,                       //vision 
    dimLight : 0, 
    brightLight : 0, 
    lightColor : "", 
    lightAlpha : 1, 
    lightAngle : 360,                       //light 
    displayName : 50, 
    displayBars : 50, 
    bar1 : {attribute : "attributes.hp"}, 
    bar2 : {attribute : null},              //display
    width : 1, 
    height : 1, 
    scale : 1, 
    mirrorX : false, 
    mirrorY : false, 
    lockRotation : false, 
    tint : null                             //token
  };


  await token.update(update);
  await token.actor.update({ token : update });
})();