let log =(...args) => console.log("Hitdie Macro | ", ...args);
//error checking
if(game.macros.entities.find(i=>i.name==="HitDie")===undefined) return ui.notifications.warn(`Macro is missing.`);
if(canvas.tokens.controlled.length >=2 || canvas.tokens.controlled.length <= 0) return ui.notifications.warn(`Please select one token.`);
//variables
const macro = game.macros.entities.find(i=>i.name==="HitDie");
const classItems = canvas.tokens.controlled[0].actor.data.items.filter(i=>i.type==="class");
let confirmed = false;

let newContent  =   `<p>Choose your options.</p>
                    <div class="form-group">
                        <label>Select Control Type</label>
                        <select id ="hitdie" name="hitdie">
                            <option value ="add">Add 1 Hit Die</option>
                            <option value ="sub">Remove 1 Hit Die</option>
                            <option value ="use">Use 1 Hit Die</option>
                        </select>
                        <br>
                        <label>Select Class</label>
                        <select id ="class" name="class">`;
for (var classItem of classItems)
{
    newContent += `<option value = "${classItem.name}">${classItem.name}</option>`;
}
newContent += `</select></div>`;


    //UI
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
            let tempHD = html.find('[name=hitdie]')[0].value;
            let tempClass = html.find(`[name=class]`)[0].value;
            macro.execute(canvas.tokens.controlled[0].actor.name,tempClass,tempHD);
        }
    }
}).render(true);