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

async function importPlaylists(){
  const extensions = [`.ogg`, `.wav`, `.mp3`];
  const folderNames = [`music`, `audio`, `sound`];
  const normalVolume = 0.5;
  
  /* Add check to see if playlist is already created, then check vs the fileList, append additional sounds to the playlist then? */

  let rootFolder = await FilePicker.browse(`user`, ``);
  if(rootFolder.dirs.length === 0) return;

  for(let folder of rootFolder.dirs)
  {
    if(folderNames.includes(folder.toLowerCase()))
    {
      let folderContent  = await FilePicker.browse(`user`, folder);
      if(folderContent .dirs.length === 0) continue;
      for(let subFolder of folderContent .dirs)
        await createPlaylist(subFolder, await getPlaylistFiles(subFolder))
    }
  }

  async function getPlaylistFiles(folderName){
    let fileList = await FilePicker.browse(`user`, folderName, {extensions});
    let arr = [...fileList.files];
    for(let folder  of fileList.dirs)
      arr = [...arr, await getPlaylistFiles(folder)];
    return arr;
  }
  async function createPlaylist(path, fileList){
    let name = path.split('/').pop();
    let sounds = fileList.map(f=> createSound(f));

    let playlist = game.playlist.getName(name);
    if(!playlist) await Playlist.create({mode : 0, name, playing : false, sounds});

    sounds = [...playlist.data.sounds, ...sounds.filter(sound => !playlist.data.sounds.map(s=> s.path).includes(sound.path))];
    await playlist.update({ sounds });

    function createSound(filePath){
      return {
        path : filePath, name : filePath.split('/').pop().replace(/\..+$/,''),
        playing : false, repeat : false, streaming : false, volume : normalVolume
      }
    }
  }
}