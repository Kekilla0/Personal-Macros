let log =(...args) => console.log("Inspiring Leadership | ", ...args);
(async () => {
    //error checking
    log("Starting Macro");
    if(game.user.character === null) return ui.notifications.warn(`You do not have a character.`);
    if(game.user.targets.size <= 0 || game.user.targets.size >= 7) return ui.notifications.warn(`Target between 1 and 6 tokens.`);    
    if(game.user.character.items.find(i=>i.name==="Inspiring Leader") === null) return ui.notifications.warn (`You do not have Inspiring Leadership.`);
    if(game.macros.find(i=>i.name==="Call_New") === null) return ui.notifications.warn(`Call Macro Uninstalled`);
    if(!game.modules.get("furnace").active) return ui.notifications.warn(`The Furnace is not installed/enabled.`);
    //variable calls
    let targets = game.user.targets;
    let myActor = game.user.character;
    let callMacro = game.macros.find(i=>i.name==="Call_New");
    let tempHP = myActor.data.data.abilities.cha.mod + myActor.data.data.details.level;
    let tempActorUpdate = { newData : { data : { attributes :{ hp :{ temp : tempHP }, }, }, }, };
    game.dnd5e.rollItemMacro("Inspiring Leader").then(() => {
        for(let token of targets)
        {
            if(token.actor.data.data.attributes.hp.temp <= tempHP)
            {
                callMacro.execute(token.actor,"","",tempActorUpdate);
            }
        }
    });
})();

