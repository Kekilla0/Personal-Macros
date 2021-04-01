/*
  Play Sound
*/
async function playSound({file = ``, volume = 0.8 , wait = 0}={})
{
  /* Play File */
  if(file)
  {
    let audio = AudioHelper.play({src: file, volume, autoplay: true, loop: false}, true);
    //await wait((audio._duration*1000) + wait);
  }
}