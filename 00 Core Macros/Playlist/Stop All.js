async function stopAll(){
  for (let playlist of game.playlists) {
    if (playlist.playing) {
      await playlist.stopAll();
    };
  }
}