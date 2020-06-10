//requires 1 target & about-time to be installed
if(game.user.targets.size === 0 || game.user.targets.size > 1) return ui.notifications.error(`Please Target a Token.`);
if(game.modules.get("about-time").active !== true) return ui.notifications.error(`About Time isn't Loaded`);
const t = game.user.targets.values().next().value;
//const t = canvas.tokens.controlled[0];
game.dnd5e.rollItemMacro("Light").then (() => {
	let old_dimLight = t.data.dimLight;
	let old_brightLight = t.data.brightLight;
	t.update({
		dimLight : 40,
		brightLight : 20
	});
        display("Light Added to : " + t.name);	
	game.Gametime.doIn({minutes:60}, () => {
		t.update({
			dimLight : old_dimLight,
			brightLight : old_brightLight
		});
                display("Light Removed from : " + t.name);	
	});
});
function display(data = "")
{
	if(!data === "")
	{
		ChatMessage.create({
			user : game.user._id,
			content : data,
			speaker : speaker,
			whisper : game.users.entities.filter(u=>u.isGM).map(u=>u._id)
		});
	}
}