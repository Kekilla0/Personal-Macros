let log = (...args) => console.log("Hitdie Macro | ", ...args);

(async ()=> {
    if(canvas.tokens.controlled.length !== 1) return ui.notifications.warn(`Please select one token.`);
    let actorObj = game.actors.get(canvas.tokens.controlled[0].actor.id);
    let classItems = canvas.tokens.controlled[0].actor.data.items.filter(i=>i.type==="class");

    let confirmed = false;
    let dialog_Content = `
        <p>Choose option.</p>
        <div class="form-group">
        <label>Select Control Type</label>
        <select id ="hitdie" name="hitdie">
            <option value ="add">Add Hit Die</option>
            <option value ="sub">Remove Hit Die</option>
            <option value ="use">Use Hit Die</option>
        </select>
        <br>
        <label>Select Class</label>
        <select id ="class" name="class">`;
    for(let classItem of classItems)
    {
        dialog_Content += `<option value = "${classItem.name}">${classItem.name}</option>`;
    }
    dialog_Content += `</select></div>`;
    
    new Dialog({
        title : "HitDie Control",
        content : dialog_Content,
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
                let tempHD = html.find('[name=hitdie]')[0].value;
                let tempClass = html.find(`[name=class]`)[0].value;
                switch(tempHD)
                {
                    case "add" :
                        add_hitDie(classItems,tempClass,actorObj);
                        break;
                    case "sub" :
                        sub_hitDie(classItems,tempClass,actorObj);
                        break;
                    case "use" :
                        use_hitDie(classItems,tempClass,actorObj);
                        break;
                    default :
                        return;
                }
            }
        }
    }).render(true);
})();

function add_hitDie(classItems,className,actor){
    let confirmed_Class = classItems.find(i=>i.name===className);
    let missingHitDie = confirmed_Class.data.hitDiceUsed;
    log(confirmed_Class);
    if (confirmed_Class.data.hitDiceUsed <= 0) return ui.notifications.warn(`You are at maximum Hitdie!`);

    let confirmed = false;
    let dialog_Content = `
        <p>Choose option.</p>
        <div class="form-group">
        <label>Select # to Add (Max : ${missingHitDie})</label>
        <input type="number" name="num"></input>
        </div>`;
    
    new Dialog({
        title : "HitDie Control",
        content : dialog_Content,
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
        close : async (html) => {
            if(confirmed) {
                let addHitDie = html.find('[name=num]')[0].value;
                if(addHitDie > missingHitDie) return ui.notifications.warn(`Attempted to add too many hit die.`);
                let classItemUpdate= {
                    _id: confirmed_Class._id,
                    data : {
                        hitDiceUsed : Math.clamped(confirmed_Class.data.hitDiceUsed - addHitDie, 0, confirmed_Class.data.levels)
                    }
                };
                await actor.updateEmbeddedEntity("OwnedItem", classItemUpdate);
            }
        }
    }).render(true);
}

function sub_hitDie(classItems,className,actor){
    let confirmed_Class = classItems.find(i=>i.name===className);
    let remainingHitDie = confirmed_Class.data.levels - confirmed_Class.data.hitDiceUsed;
    if (confirmed_Class.data.hitDiceUsed >= confirmed_Class.data.levels) return ui.notifications.warn(`You have no remaining hit dice to spend!`);

    let confirmed = false;
    let dialog_Content = `
        <p>Choose option.</p>
        <div class="form-group">
        <label>Select # to Subract (Max : ${remainingHitDie})</label>
        <input type="number" name="num"></input>
        </div>`;
    
    new Dialog({
        title : "HitDie Control",
        content : dialog_Content,
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
        close : async (html) => {
            if(confirmed) {
                let subHitDie = html.find('[name=num]')[0].value;
                if(subHitDie > remainingHitDie) return ui.notifications.warn(`Attempted to remove too many hit die.`);
                let classItemUpdate= {
                    _id: confirmed_Class._id,
                    data : {
                        hitDiceUsed : Math.clamped(confirmed_Class.data.hitDiceUsed + subHitDie, 0, confirmed_Class.data.levels)
                    }
                };
                await actor.updateEmbeddedEntity("OwnedItem", classItemUpdate);
            }
        }
    }).render(true);
}

function use_hitDie(classItems,className,actor){
    let confirmed_Class = classItems.find(i=>i.name===className);
    let remainingHitDie = confirmed_Class.data.levels - confirmed_Class.data.hitDiceUsed;
    if (confirmed_Class.data.hitDiceUsed >= confirmed_Class.data.levels) return ui.notifications.warn(`You have no remaining hit dice to spend!`);

    let confirmed = false;
    let dialog_Content = `
        <p>Choose option.</p>
        <div class="form-group">
        <label>Select # to Use (Max : ${remainingHitDie})</label>
        <input type="number" name="num"></input>
        </div>`;
    
    new Dialog({
        title : "HitDie Control",
        content : dialog_Content,
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
        close : async (html) => {
            if(confirmed) {
                let useHitDie = html.find('[name=num]')[0].value;
                if(useHitDie > remainingHitDie) return ui.notifications.warn(`Attempted to use too many hit die.`);
                let hitDieRoll = new Roll(`${useHitDie}${confirmed_Class.data.hitDice} + (${useHitDie}*${actor.data.data.abilities.con.mod})`).roll();
                let hpObj = actor.data.data.attributes.hp;
                let actorUpdate = {
                    "data.attributes.hp.value" : Math.clamped(hpObj.value + hitDieRoll.total, hpObj.min, hpObj.max)
                }
                log(confirmed_Class.data.hitDiceUsed,useHitDie,0,confirmed_Class.data.levels);
                let classItemUpdate= {
                    _id: confirmed_Class._id,
                    data : {
                        hitDiceUsed : Math.clamped((confirmed_Class.data.hitDiceUsed + parseInt(useHitDie)), 0, confirmed_Class.data.levels)
                    }
                };
                log(classItemUpdate);
                hitDieRoll.toMessage({
                    user : game.user._id,
                    speaker : speaker,
                    flavor : "Roll Hit Die"
                });
                await actor.updateEmbeddedEntity("OwnedItem", classItemUpdate);          
                await actor.update(actorUpdate);
            }
        }
    }).render(true);
}