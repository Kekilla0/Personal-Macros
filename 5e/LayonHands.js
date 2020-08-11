let confirmed = false;
let actorData = game.actors.getName("");
let featData = actorData.items.find(i=>i.name==="Lay on Hands");
let featUpdate = duplicate(featData);
let updateMacro = game.macros.find(m=>m.name==="Update");
if(game.user.targets.size === 0 || game.user.targets.size > 1) return ui.notifications.error(`Please Target one token.`);
let targetData = game.user.targets.values().next().value;

let content = `<p>How much HP do you want to Restore?</p>
                    <form>
                        <div class="form-group">
                            <label>Type HP Amount to Restore: (Max : ${featData.data.data.uses.value}) </label>
                            <input name="num"></input>
                        </div>
                    </form>`;

game.dnd5e.rollItemMacro("Lay on Hands").then (() =>{
    new Dialog({
        title: "Lay on Hands Healing",
        content: content,      
        buttons: {
            one: {
                label: "Heal!",
                callback: () => confirmed = true
            },
            two: {
                label: "Cancel",
                callback: () => confirmed = false
            }
        },
        default: "Cancel",
        close: html => {
            if (confirmed) {
                let number = html.find('[name=num]')[0].value;
                if(isNaN(number)) return ui.notifications.error(`Must input numbers only.`);
                if((Number(number)-1) > featData.data.data.uses.value) return ui.notifications.error(`Not enough charges left.`);

                updateMacro.execute(targetData.actor.name, {
                    "data.attributes.hp.value" : Math.clamped(
                        targetData.actor.data.data.attributes.hp.value + Number(number),
                        0, targetData.actor.data.data.attributes.hp.max)
                });
                featUpdate.data.uses.value = featUpdate.data.uses.value - (Number(number)-1);
                actorData.updateEmbeddedEntity("OwnedItem", featUpdate);
            }
        }
    }).render(true);
});

