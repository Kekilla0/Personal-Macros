(()=>{
	let item_actor = item.actor;

	item.roll().then((result)=>{
		if(!result) return;

		let tempHP = item_actor.data.data.abilities.cha.mod + item_actor.items.find(i=>i.name==="Warlock").data.data.levels;
		
		item_actor.update({"data.attributes.hp.temp" : tempHP});
	});
})();