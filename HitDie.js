(async () => {
    const actor = game.actors.find(i => i.name === args[0]); 
    if (!actor) return ui.notifications.warn(`No Actor by that name available.`);
    const classItems = actor.data.items.filter(it => it.type === "class")
    if (!classItems.length) return ui.notifications.warn(`Actor has no class!`);
    let classItem = classItems.find(i=>i.name===args[1]);
	
	if(args[2] === "add")
	{

		if (classItem.data.hitDiceUsed <= 0) return ui.notifications.warn(`You are at maximum Hitdie!`);

		const classItemUpdate = {
			_id: classItem._id,
			data: {
				hitDiceUsed: classItem.data.hitDiceUsed - 1,
			},
		};

		await actor.updateEmbeddedEntity("OwnedItem", classItemUpdate);
	}
	
	if(args[2] === "sub")
	{
		if (classItem.data.hitDiceUsed >= classItem.data.levels) return ui.notifications.warn(`You have no remaining hit dice to spend!`);

		const classItemUpdate = {
			_id: classItem._id,
			data: {
				hitDiceUsed: classItem.data.hitDiceUsed + 1,
			},
		};

		await actor.updateEmbeddedEntity("OwnedItem", classItemUpdate);
	}
	
	if(args[2] === "use")
	{
		if (classItem.data.hitDiceUsed >= classItem.data.levels) return ui.notifications.warn(`You have no remaining hit dice to spend!`);		
		const classItemUpdate = {
			_id: classItem._id,
			data: {
				hitDiceUsed: classItem.data.hitDiceUsed + 1,
			},
		};
		await actor.updateEmbeddedEntity("OwnedItem", classItemUpdate);
		
		const hitDieRoll = new Roll(`1${classItem.data.hitDice} + ${actor.data.data.abilities.con.mod}`);
		hitDieRoll.roll();
		hitDieRoll.toMessage({
			user : game.user._id,
			speaker : speaker,
			flavor : "Roll Hit Dice"
		});
		
		const actorUpdate = {
			data: {
				attributes: {
					hp: {
						value: Math.clamped(
							actor.data.data.attributes.hp.value + hitDieRoll.total,
							actor.data.data.attributes.hp.min,
							actor.data.data.attributes.hp.max
						)
					},
				},
			},
		};
		await actor.update(actorUpdate);
	}    
})();