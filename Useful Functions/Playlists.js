/*
  Update to Streaming
    requires the name of the playlist you want to enable all sounds to be set as "streaming"
*/
async function enableStreaming({ name })
{
  let updates = game.playlists
    .filter(playlist => playlist.name === name)
    .map(playlist=> {
      let sounds = playlist.sounds.map(sound => ({
        ...sound,
        streaming : true
      }));

      return {
        _id : playlist.id,
        sounds
      }
    });

  return await Playlist.update(updates);
}

async function playSound({ playlist, sound, playing })
{
  const randomArrayElement = (arr) => arr[Math.floor(Math.random()* arr.length)]; 

  if(!playlist) return;
  if(playlist instanceof String || typeof playlist === 'string')
    playlist = game.playlists.get(playlist) || game.playlists.getName(playlist); 
  if(!sound) sound = randomArrayElement(playlist.data.sounds.map(s=> s.name));

  let updateData = {};
  updateData.sounds = duplicate(playlist.data.sounds).map((s)=> {
    if(s.name === sound) s.playing = playing === undefined ? !s.playing : playing;
    return s;
  });
  updateData.playing = updateData.sounds.reduce((a,s) => a || s.playing, false);
  
  return await playlist.update(updateData);
}