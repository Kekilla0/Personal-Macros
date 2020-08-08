//arguments required => args[0] === check type
////////////////////////args[1] === DC
////////////////////////args[2] === Succeed Condition
////////////////////////args[3] === Fail Condition
////////////////////////args[4] === Successs Data pass through
////////////////////////args[5] === Failure Data pass through
////////////////////////args[6] === checkID

if(args[6] !== undefined || args[6] === "")
{
	let invalid = game.user.getFlag(`world`,`${args[6]}`) ? game.user.getFlag(`world`,`${args[6]}`) : false;
	if (invalid) return;
	game.user.setFlag(`world`,`${args[6]}`,true);
}

if(Object.entries(game.dnd5e.config.skills).map(a=>a[0]).includes(args[0]))
{
    console.log(game.user.character, game.user.character.data.data.skills[args[0]].passive, args[1]);
    let actor = game.user.character;
    let skill = actor.data.data.skills[args[0]].passive;
    
    if(skill >= parseInt(args[1]))
    {
        succeed(args[2],args[4]);
        ChatMessage.create({
            content : `${actor.name} Succeeded on Passive Test.`,
            speaker : speaker,
            whisper : ChatMessage.getWhisperRecipients("GM"),
            blind : true
        });
    }else{
        fail(args[3],args[5]);
        ChatMessage.create({
            content : `${actor.name} Failed on Passive Test.`,
            speaker : speaker,
            whisper : ChatMessage.getWhisperRecipients("GM"),
            blind : true
        });
    }
}

function succeed(condition, pass)
{
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
            case "PauseGame" :
                game.macros.entities.find(i=>i.name==="PauseGame").execute();
                break;
			default :
				break;
		}		
	}
}

function fail(condition, pass)
{
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
			default :
				break;
		}		
	}
}
