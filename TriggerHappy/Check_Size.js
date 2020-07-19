//size?? macro
//arguments required => args[0] === maximum size
////////////////////////args[1] === Succeed Condition
////////////////////////args[2] === Fail Condition
////////////////////////args[3] === Successs Data pass through
////////////////////////args[4] === Failure Data pass through

if(game.user.isGM) return;

let t = canvas.tokens.placeables.find(i=>i.name===game.user.charname);
let g = canvas.scene.data.grid;

console.log(t,g,...args);

switch(args[0])
{
    case "tiny" :
        if((t.w === g && t.h === g) && (t.actor.data.data.traits.size === "tiny"))
        {
            succeed(args[1],args[3]);
        }else{
            fail(args[2],args[4]);
        }
        break;
    case "small" :
        if((t.w === g && t.h === g) && (t.actor.data.data.traits.size === "sm"))
        {
            succeed(args[1],args[3]);
        }else{
            fail(args[2],args[4]);
        }
        break;
    case "medium" :
        if((t.w === g && t.h === g) && (t.actor.data.data.traits.size === "med"))
        {
            succeed(args[1],args[3]);
        }else{
            fail(args[2],args[4]);
        }
        break;
    case "large" :
        if((t.w === g*2 && t.h === g*2) && (t.actor.data.data.traits.size === "lg"))
        {
            succeed(args[1],args[3]);
        }else{
            fail(args[2],args[4]);
        }
        break;
    default :
        fail(args[2],args[4]);
        break;
}

function succeed(condition, pass)
{
    console.log("success");
    let condition_arr = condition.split('.');
    let pass_arr = pass.split('.');
    
    for(let i = 0; i < condition_arr.length; i++)
	{
		switch(condition_arr[i])
		{
			case "Reveal" :
				game.macros.entities.find(i=>i.name==="Reveal").execute(pass_arr[i]);
				break;
			case "Permission" :
				game.macros.entities.find(i=>i.name==="Permission").execute(pass_arr[i],game.user.id);
				break;
			case "Dialog" :
				game.macros.entities.find(i=>i.name==="Dialog").execute(pass_arr[i],(args[6].slice(0,-1) + "D"),"each");
				break;
			default :
				break;
		}		
	}
}

function fail(condition, pass) 
{
    console.log("fail");
    let condition_arr = condition.split('.');
    let pass_arr = pass.split('.');

    ui.notifications.error(`You aren't small enough to fit in here!`);
    
    for(let i = 0; i < condition_arr.length; i++)
	{
		switch(condition_arr[i])
		{
			case "Reveal" :
				game.macros.entities.find(i=>i.name==="Reveal").execute(pass_arr[i]);
				break;
			case "Permission" :
				game.macros.entities.find(i=>i.name==="Permission").execute(pass_arr[i],game.user.id);
				break;
			case "Dialog" :
				game.macros.entities.find(i=>i.name==="Dialog").execute(pass_arr[i],(args[6].slice(0,-1) + "D"),"each");
                break;
            case "Move" :
                game.macros.entities.find(i=>i.name==="Move").execute(t.id,...pass_arr[i].split(','));
			default :
				break;
		}		
	}
}