//Psyonic_Talent_Die_Control
//Arg(dieRoll, controlString) => # rolled on the Psi Roll, "inc" or "dec" depending on skill
//dieRoll = 0 => no roll was made, default to controlString
//controlString = "" => default to dieRoll

let psiActor = game.actors.getName("Fugile");
let resource = psiActor.data.data.resources.primary;

if(resource.value === 0) return ui.notifications.warn(`You have no Psi Talent Die Left`);

if(args[0] === 0 && args[1] === "") return ui.notifications.warn(`No arguements were passed.`);

if(args[0] > 0)
{
	if(args[0] === resource.value)
	{
		decrease(psiActor,resource);
		return;
	}else if(args[0] === 1){
		increase(psiActor,resource);
		return;
	}
}else if(args[1] === "inc"){
	increase(psiActor,resource);
}else if(args[1] === "dec"){
	decrease(psiActor,resource);
}

function increase(psiActor,resource){
	if(resource.value === resource.max) return;
	let tempResource = duplicate(resource);
	switch(resource.value)
	{
		case 4 :
			tempResource.value = 6;
			break;
		case 6 :
			tempResource.value = 8;
			break;
		case 8 :
			tempResource.value = 12;
			break;
		default :
			return;
			break;
	}
	psiActor.update({"data.resources.primary" : tempResource });
	console.log("Macro | increase");
}

function decrease(psiActor,resource){
	let tempResource = duplicate(resource);
	switch(resource.value)
	{
		case 12 :
			tempResource.value = 8;
		case 8 :
			tempResource.value = 6;
			break;
		case 6 :
			tempResource.value = 4;
			break;
		case 4 :
			tempResource.value = 0;
			break;
		default :
			return;
			break;
	}
	psiActor.update({"data.resources.primary" : tempResource });
	console.log("Macro | decrease");
}