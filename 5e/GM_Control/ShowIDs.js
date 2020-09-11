//Display Name & IDs
for(let token of canvas.tokens.controlled)
{
    ChatMessage.create({
        content : token.name + " " + token.id
    });
}

for(let wall of canvas.walls.controlled)
{
    ChatMessage.create({
        content : wall.name + " " + wall.id
    })
}

for(let light of canvas.lights.controlled)
{
    ChatMessage.create({
        content : light.name + " " + light.id
    })
}