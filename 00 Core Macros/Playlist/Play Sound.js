async function playSound({ playlist, sound, stopAll = true }){
  const randomArrayElement = (arr) => arr[Math.floor(Math.random()* arr.length)]; 

  if(!playlist) return;
  if(playlist instanceof String || typeof playlist === 'string')
    playlist = game.playlists.get(playlist) || game.playlists.getName(playlist); 

  if(!sound) sound = randomArrayElement(playlist.sounds.map(s=> s.name));
  if(!sound) return;

  if(stopAll) await stopAll();

  return await playlist.playSound(playlist.sounds.getName(sound));
}