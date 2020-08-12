/*new call macro (removes need for about-time, use in base macros)
  args[0] => actor              
  args[1] => {name , setAs}                     //Conditions
  args[2] => {name , setAs}                     //Passive Effect
  args[3] => {originalActordata, newActorData}  //update actor data
  args[4] => {data , data}                      //two data sets to compare 
  args[5] => time                               //Stored as seconds                         
*/
let log =(...args) => console.log("Call Macro | ", ...args);
log(`Passed Arguments :`);
for(let arg of args){if (arg !== "") log(arg);}

(async () => {
    let message = "";
    if(args[1] !== "" && args[1] !== undefined)
    {
        updateCondition(args[0]._id,args[1]).then (()=>{
            message += `${args[0].name} : ${args[1].name} condition `;
            if(args[1].setAs === true)
            {
                message+= "applied."
            }else{
                message+= "removed."
            }
            display(messsage);
        });
        if(args[5] !== "" && args[5] !== undefined && game.modules.get("about-time").active)
        {
            game.Gametime.doIn({seconds : args[5]}, () =>{
                let message = "";
                args[1].setAs = !args[1].setAs;
                updateCondition(args[0]._id,args[1]).then (()=>{
                    message += `${args[0].name} : ${args[1].name} condition `;
                    if(args[1].setAs === true)
                    {
                        message+= "applied."
                    }else{
                        message+= "removed."
                    }
                    display(messsage);
                });
            });
        }
	}
    if(args[2] !== "" && args[2] !== undefined)
    {
        updateEffect(args[0]._id,args[2]).then (()=>{
            message += `${args[0].name} : ${args[2].name} effect `;
            if(args[2].setAs === true)
            {
                message+= "applied."
            }else{
                message+= "removed."
            }
            display(message);
        });
        if(args[5] !== "" && args[5] !== undefined && game.modules.get("about-time").active)
        {
            game.Gametime.doIn({seconds : args[5]}, () =>{
                let message = "";
                args[2].setAs = !args[2].setAs;
                updateEffect(args[0]._id,args[2]).then (()=>{
                    message += `${args[0].name} : ${args[2].name} condition `;
                    if(args[2].setAs === true)
                    {
                        message+= "applied."
                    }else{
                        message+= "removed."
                    }
                    display(messsage);
                });
            });
        }
    }
    if(args[3] !== "" && args[3] !== undefined)
    {
        updateData(args[0]._id,args[3].newData).then ((result)=>{
            message += `${args[0].name} : actor data updated.`;
            display(message);
        });
        if(args[5] !== "" && args[5] !== undefined && game.modules.get("about-time").active)
        {
            game.Gametime.doIn({seconds : args[5]}, () =>{
                updateCondition(args[0]._id,args[3].original).then (()=>{
                    message += `${args[0].name} : ${args[3].name} actor data updated. `;
                    display(messsage);
                });
            });
        }
    }
})();
function display(data = ""){
    if(data!=="")
    {
        ChatMessage.create({
            user : game.user._id,
            content : data,
            speaker : speaker,
            whisper : game.users.entities.filter(u=>u.isGM).map(u=>u._id)
        });
    }
}
async function updateCondition(_id,condition){
    if(_id === "") return false;
    if(condition === "") return false;
    if(!game.modules.get("combat-utility-belt").active) return ui.notifications.warn(`CUB isnt loaded`);
    let actor = game.actor.find(i=>i._id===_id);
    if(condition.setAs){ 
        game.cub.applyCondition(condition.name,actor.getActiveTokens()); 
    }else{
        game.cub.removeCondition(condition.name,actor.getActiveTokens());
    }
    return true;
}
async function updateEffect(_id = "", effect= ""){
    if(_id === "") return false;
    if(effect === "") return false;
    if(!game.modules.get("dynamiceffects").active) return ui.notification.warn (`Dynamic Effects isnt loaded`);
    DynamicEffects._toggleActorIdEffect(_id,effect.name,"",effect.setAs);
    return true;
}
async function updateData (_id = "",data = ""){
    if (_id === "") return false;
    if (data === "") return false;
    let actor = game.actors.find(i=>i._id===_id);
    await actor.update(data);
    log("Actor after update :   ", actor);
}
/* Check Change Function 
   checks for a change in a data structure and returns the data.*/