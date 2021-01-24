let log = (...args) => console.log("OJTM | ", ...args);

Hooks.on('preUpdateToken', (scene,tokenData,updateData, diff, user)=>{
  if(game.user.isGM && checkMovement(updateData))
  {
    let token_center = canvas.grid.getCenter(
      updateData?.x === undefined ? tokenData.x : updateData.x,
      updateData?.y === undefined ? tokenData.y : updateData.y
    );

    canvas.notes.placeables
        .filter(note =>
        {
            let note_center = canvas.grid.getCenter(note.x,note.y);
            return (token_center[0] === note_center[0] && token_center[1] === note_center[1]);
        })
        .forEach(note => {
            let journal = game.journal.get(note.data.entryId);            
            if(journal) journal.sheet.render(true);
         });
  }

  function checkMovement(data)
  {
    return (data?.x !== undefined || data?.y !== undefined)
  }
});