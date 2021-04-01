(async ()=>{
	let actor = item.actor;
	let tempHP = new Roll(`@abilities.cha.mod + @classes.warlock.levels`, actor.getRollData()).roll().total;

	await item.roll();
	await actor.update({"data.attributes.hp.temp" : tempHP});
})();