/*
  Update to Streaming
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

  await Playlist.update(updates);
}