const macro = game.macros.entities.find(m => m.name === "HitDie");
let macro_actor = item.actor;
let macro_actor_classes = macro_actor.data.items.filter(i=>i.type==="class");



game.dnd5e.rollItemMacro("Healing Surge").then(result => {
	if (result !== undefined)
	{
        if (macro_actor_classes.length !== 1)
        {
            let dialog_content = `
            <div class="form-group>
                <label>Select Class</label>
                <select name="class">`;
            for(let classItem of macro_actor_classes)
            {
                dialog_content += `<option value = "${classItem.name}">${classItem.name}</option>`;
            }
            dialog_content += `</select></div>`;
            new Dialog({
                content : dialog_content,
                buttons : { OK : {icon :``, label : `OK`, callback : (html) => macro.execute(
                    macro_actor.name,
                    html.find('[name=class]')[0].value,
                    "use"
                )}}
            }).render(true);
        }else{
            macro.execute(
                macro_actor.name,
                macro_actor_classes[0].name,
                "use"
            )
        }
    }
});