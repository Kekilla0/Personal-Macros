const macro = game.macros.entities.find(m => m.name === "HitDie");
game.dnd5e.rollItemMacro("Healing Surge").then(result => {
	if (result !== undefined)
	{
        let confirmed = false;
        let newContent  =   `<p>Choose your options.</p>
                    <div class="form-group">
                        <label>Select Class</label>
                        <select id ="class" name="class">`;
        for (var classItem of game.user.character.data.items.filter(i=>i.type==="class"))
        {
            newContent += `<option value = "${classItem.name}">${classItem.name}</option>`;
        }
        newContent += `</select></div>`;
        new Dialog({
            title : "HitDie Control",
            content : newContent,
            buttons : {
                one : {
                    icon :`<i class="fas fa-check"></i>`,
                    lable : "Continue",
                    callback : () => confirmed = true
                },
                two : {
                    icon : `<i class="fas fa-times"></i>`,
                    lable : "Cancel",
                    callback : () => confirmed = false
                }
            },
            default :  "Cancel",
            close : html => {
                if(confirmed) {
                    let tempClass = html.find(`[name=class]`)[0].value;
                    macro.execute(game.user.charname,tempClass,"use");
                }
            }
        }).render(true);
	}
});