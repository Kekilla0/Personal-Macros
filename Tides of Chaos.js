//Tides_of_Chaos_Casting_Call
//args[charName]
(async () => {
	const actor = game.actors.find(i=>i.name===args[0]);
	const feat = actor.data.items.find(j=>j.name==="Tides of Chaos");
	const tableA = game.tables.entities.find(m=>m.name==="WMS");
	const tableB = game.tables.entities.find(m=>m.name==="WMSR");
	if (feat.data.uses.value === 0)
	{
		const featUpdate ={
			_id : feat._id,
			data : {
				uses : {
					value : 1,
				},
			},
		}
		await actor.updateEmbeddedEntity("OwnedItem",featUpdate);
		let roll = tableA.roll();
		ChatMessage.create({
			user : game.user._id,
			content : roll.results[0].text,
			speaker : speaker,
			whisper : game.users.entities.filter(u=>u.isGM).map(u=>u._id)
		});		
	}
	else
	{
		let roll = tableB.roll();
		ChatMessage.create({
			user : game.user._id,
			content : roll.results[0].text,
			speaker : speaker,
			whisper : game.users.entities.filter(u=>u.isGM).map(u=>u._id)
		});	
	}
})();