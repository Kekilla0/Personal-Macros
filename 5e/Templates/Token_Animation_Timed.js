let tokenID = "K7minTK8KBUxNClB";
let transition = "Icons/orbeetletriplecast.webm";
let second_icon = "Icons/orbeetleidle2.webm";
let time = 2.2;

let target = canvas.tokens.get(tokenID);

target.update({img: transition}).then(target => {
  target.texture.baseTexture.source.currentTime = 0;
});


setTimeout( ()=> {
  target.update({img: second_icon}).then(target => {
    target.texture.baseTexture.source.currentTime = 0;
  });  
}, time*1000);