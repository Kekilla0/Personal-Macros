//Tides_of_Chaos_Casting_Call
//args[charName]
(async () => {
	const actor = game.actors.find(i=>i.name===args[0]);
	const feat = actor.data.items.find(j=>j.name==="Tides of Chaos");
	const tableA = game.tables.entities.find(m=>m.name==="WMS");	//Table that rolls on the d100 WMS table.
	const tableB = game.tables.entities.find(m=>m.name==="WMSR");	//Table that rolls WMS if it rolls a 1.

	/*if tides of choas feat is used => roll directly on WMS table and regain use of tides of chaos
	 *otherwise roll on the WMSR table, which rolls on the WMS table if a 1 is rolled.
	 */
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
		display(roll.results[0].text;
	}
	else
	{
		let roll = tableB.roll();
		display(roll.results[0].text;
	}
})();
function display(data = "")
{
	if(data !== "")
	{
		ChatMessage.create({
			user : game.user._id,
			content : data,
			speaker : speaker,
			whisper : game.users.entities.filter(u=>u.isGM).map(u=>u._id)
		});
	}
}