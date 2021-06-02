const log = (...args) => console.log("OJTM | ", ...args);
const wait = async (ms) => new Promise((resolve)=> setTimeout(resolve, ms));
const SceneNames = ["World Map"];
const averageLevel = 4;

Hooks.on('preUpdateToken', async (tokenDocument,updateInfo,options, id)=>{
  if(game.user.isGM && SceneNames.includes(canvas.scene.name)){
    let { x, y, } = tokenDocument._object;
    if(!checkMovement({x, y,}, updateInfo)) return;
    let center = canvas.grid.getCenter(x,y);

    //check collision isn't working
    let notes = canvas.notes.placeables.filter(note => note.Collision({ x : center[0], y : center[1] }));

    await wait(200);
    
    if(notes.length > 0){
        notes.forEach(note => {
            let journal = game.journal.get(note.data.entryId);            
            if(journal) journal.toggle();
        });
    }else{
        /*
            Combat  => > 17
            Event => < 4
            Nothing of Import
        */
        let roll = new Roll(`1d20`).evaluate({ async : false }).total;
        if(roll>17){
            combat();
        }else if(roll<4){
            event();
        }else{
            nothing();
        }
    }
  }

  function checkMovement(data, update){
    if(update?.x) data.x = update.x;
    if(update?.y) data.y = update.y;
    return (update?.x !== undefined || update?.y !== undefined);
  }
  function combat(){
    let enemy = game.actors.filter(actor => actor.type === "npc" && actor.data.data.details?.cr <= averageLevel + 1).shuffle().random();
    sendMessage({ content : `You encounter @Actor[${enemy.id}] in your travels, defend yourselves!`})
  }
  function event(){
    let tables = [`d100 Travel Complications`, `Beach Encounters`, `Forest Encounters`, `Desert Encounters`, `Long Rest Events`, `Social Encounters`, `Travelers you Meet on the Road`];
    let table = game.tables.getName(tables.shuffle().random());
    sendMessage({ content : `${table.name}<br> ${table.getText()}` });
  }
  function nothing(){
    sendMessage({content : `Nothing of import occurs on your 3 mile journey`});
  }
  async function sendMessage({ content, whisper = ChatMessage.getWhisperRecipients("GM"), speaker = ChatMessage.getSpeaker() }={}){
    return await ChatMessage.create({ content, whisper, speaker });
  }
});