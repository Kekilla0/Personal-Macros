//arguments required => args[0] === save type//////
////////////////////////args[1] === save value/////
////////////////////////args[2] === damage type////
////////////////////////args[3] === roll String////
////////////////////////args[4] === any effects////
////////////////////////args[5] === limit//////////

if(args[5] === "once")
{
    let invalid = false;
    for(user of game.users)
    {
        if(invalid) return;
        invalid = user.getFlag(`world`,`${args[0]}`) ? user.getFlag(`world`,`${args[0]}`) : false;
    }
    game.user.setFlag(`world`,`${args[0]}`,true);
}


let originalRollMode = game.settings.get("core","rollMode");
game.settings.set("core","rollMode","gmroll");
if(Object.entries(game.dnd5e.config.skills).map(a=>a[0]).includes(args[0]))
{
    game.user.character.rollSkill(args[0]).then(()=>{
        after();
        game.settings.set("core","rollMode",originalRollMode);
    });

}else if(Object.entries(game.dnd5e.config.abilities).map(a=>a[0]).includes(args[0])){
    game.user.character.rollAbilitySave(args[0]).then(() => {
        after();
        game.settings.set("core","rollMode",originalRollMode);
    });
}else if(args[0]==="none")
{
    after();
}else {
    return ui.notifications.error(`Save Type Error.`);
}

function after()
{
    let contentTemplate = `
    <div>
        <table>
            <tr><th style="text-align:center">DC ${args[1]} ${args[0]}</th></tr>
            <tr>
                <td style="text-align:center">
                    ${args[4]}
                </td>
            </tr>
        </table>
    </div>`;

    try {
        let damageRoll = new Roll(`${args[3]}`).roll();
        contentTemplate += `
            <table>
                <tr>
                    <td style="text-align:center">
                        ${damageRoll.formula}
                    <td>
                </tr>
            </table>
            <table>
                <tr>
                    <th style = "text-align:center">
                        ${damageRoll.total}
                    </th>
                </tr>
            </table>
        </div>`;
    }catch (error)
    {
        //console.log(error);
    }

    ChatMessage.create({
        user : game.user._id,
        content : contentTemplate,
        whisper : game.users.entities.filter(u=>u.isGM).map(u=>u._id)
    });
}
