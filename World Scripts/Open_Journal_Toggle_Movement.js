const log = (...args) => console.log("OJTM | ", ...args);
const randomArrayElement = (arr) => arr[Math.floor(Math.random()* arr.length)]; 
const wait = async (ms) => new Promise((resolve)=> setTimeout(resolve, ms));
const SceneNames = ["World Map"];
const averageLevel = 4;

Hooks.on('preUpdateToken', async (tokenDocument,updateInfo,options, id)=>{
  if(game.user.isGM && SceneNames.includes(canvas.scene.name))
  {
    let data = { x, y, width, height } = tokenDocument._object;
    if(!checkMovement(data, updateInfo)) return;
    let notes = canvas.notes.placeables.filter(note => note.Collision(data));
        
    await wait(200);
    
    if(notes.length > 0)
    {
        notes.forEach(note => {
            let journal = game.journal.get(note.data.entryId);            
            if(journal) journal.sheet.render(true);
        });
    }else{
        /*
            Combat  => > 17
            Event => < 4
            Nothing of Import
        */
        let roll = new Roll(`1d20`).evaluate({ async : false }).total;
        if(roll>17)
        {
            combat();
        }else if(roll<4)
        {
            event();
        }else{
            nothing();
        }
    }

  }

  function checkMovement(data, update)
  {
    if(update?.x) data.x = update.x;
    if(update?.y) data.y = data.y;
    return (update?.x !== undefined || update?.y !== undefined);
  }
  function combat()
  {
    let enemies = game.actors.filter(actor => actor.type === "npc" && actor.data.data.details?.cr <= averageLevel + 1);
    let enemy = randomArrayElement(enemies);
    sendMessage({ content : `You encounter @Actor[${enemy.id}] in your travels, defend yourselves!`})
  }
  function event()
  {
    let tables = [`d100 Travel Complications`, `Beach Encounters`, `Forest Encounters`, `Desert Encounters`, `Long Rest Events`, `Social Encounters`, `Travelers you Meet on the Road`];
    let table = game.tables.getName(randomArrayElement(tables));
    sendMessage({ content : table.getRandom().text });
  }
  function nothing()
  {
    sendMessage({content : `Nothing of import occurs on your 3 mile journey`});
  }
  async function sendMessage({ content, whisper = ChatMessage.getWhisperRecipients("GM"), speaker = ChatMessage.getSpeaker() }={})
  {
    return await ChatMessage.create({ content, whisper, speaker });
  }
  
});