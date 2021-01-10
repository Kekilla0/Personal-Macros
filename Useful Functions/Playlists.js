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