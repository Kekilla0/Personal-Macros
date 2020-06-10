let log =(...args) => console.log("Call Macro | ", ...args);
(async () => {
    //args[actor,condition,time,effects,data]
	const called_Character = game.actors.find(i => i.name === args[0]);
	const called_Condition = args[1];
	const called_Time = args[2];
    const called_Effects = args[3];
    const called_Data = args[4];
	let initial_message = "";
	let final_message = "";

	if(called_Condition !== ""){
		await Call_Condition(called_Character,called_Condition,called_Time).then((result) => {
			if (result === true) {
				initial_message += "<p>Condition : " + called_Condition + " added.</p>";
				final_message += "<p>Condition : " + called_Condition + " removed.</p>";
			}
		});
	}
	if(called_Effects !== ""){
		await Call_Effects(called_Character,called_Effects,called_Time).then((result) => {
			if (result === true) {
				initial_message += "<p>Effect : " + called_Effects + " added.</p>";
				final_message += "<p>Effect : " + called_Effects + " removed.</p>";
			}
		});
    }
    if(called_Data !== "")
    {
        await updateData(called_Character,called_Data).then((result)=>{
            if (result == true)
            {
                //yay!
            }
        });
    }
	//message handling
	ChatMessage.create({
		user : game.user._id,
		content : initial_message,
		whisper : game.users.entities.filter(u=>u.isGM).map(u=>u._id)
	});
	if(game.modules.get("about-time").active && called_Time !== 0){
		game.Gametime.doIn({minutes : called_Time}, () => {
			ChatMessage.create({
				user : game.user._id,
				content : final_message,
				whisper : game.users.entities.filter(u=>u.isGM).map(u=>u._id)
			});
		});
	}

	async function Call_Condition(actor,condition,time = 0){
		if(!game.modules.get("combat-utility-belt").active) return ui.notifications.warn(`CUB isnt loaded`);
		game.cub.applyCondition(condition,actor.getActiveTokens());
		if(game.modules.get("about-time").active && time !== 0){
			game.Gametime.doIn({minutes: time},() => {
				game.cub.removeCondition(condition,actor.getActiveTokens());
			});
		}
		return true;
	}
	async function Call_Effects(actor, effects, time = 0){
		if(!game.modules.get("dynamiceffects").active) return ui.notification.warn (`Dynamic Effects isnt loaded`);
		DynamicEffects._toggleActorIdEffect(actor._id,called_Effects,"",true);
		if(game.modules.get("about-time").active && time !== 0)
		{
			game.Gametime.doIn({minutes: time}, () => {
				DynamicEffects._toggleActorIdEffect(actor._id,effects,"",false);
			});
		}	
		return true;
	}
/*	async function Call_Stats(actor, stat, value, time = 0){
		let original = getProperty(actor, stat);
		actor.update({ stat : value });
		if(game.modules.get("about-time").active && time !== 0){
			game.Gametime.doIn({minutes: time},() => {
				actor.update({ stat : original });
			});
		}
		return true;
    }*/
    async function updateData (actor = "",data = ""){
        if (actor === "") return false;
        if (data === "") return false;
        actor.update(data).then ((result) =>
        {
            log(result);
            if(result === true)
            {
                log(`${actor.data.name} successfully updated.`, data);
                return true;
            }
            return false;
        });
    }
})();