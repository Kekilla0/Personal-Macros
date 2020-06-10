/*Token Control (GM Token Executer)
	args [ objectName,updateData,options ]*/
(async () => {
	if(args[2] === "create")
	{
		await create_Token(args[0],args[1]);
	}
	if(args[2] === "update")
	{
		await update_Token(args[0],args[1]);
	}
	if(args[2] === "delete")
	{
		await delete_Token(args[0],args[1]);
	}
})();
async function create_Token(obj = "", data = "")
{
	let token = game.actors.find(i=>i.name===args[0]).data.token;
	if(!token) return ui.notifications.error(`There is no token by that name in this game.`);
	await canvas.tokens.createMany(token,"");	
	await update_Token(args[0],args[1]);
	display(args[0] + " token created");
}
async function update_Token(obj = "", data = "")
{
	let token = canvas.tokens.placeables.find(i=>i.name===args[0]);
	if(!token) return ui.notifications.error(`There is no token by that name on this canvas.`);
	await token.update(args[1]);
	display(args[0] + " token updated");
}
async function delete_Token(obj = "", data = "")
{
	let token = canvas.tokens.placeables.find(i=>i.name===args[0]);
	if(!token) return ui.notifications.error(`There is no token by that name on this canvas.`);
	await canvas.tokens.deleteMany(token.data._id,{});
	display (args[0] + " token deleted");
}
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