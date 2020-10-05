/*
  With help of @Crymic#9452
*/
(()=>{
  let wizard_levels = item.actor.items.find(i=> i.name===`Wizard`)?.data.data.levels;

  if(!wizard_levels) return ui.notifications.error(`You have no Wizard levels!`);
  if(item.data.data.uses.value === 0) return ui.notifications.error(`You have no uses of Arcane Recovery Left!`);

  let cum_slot_rec = Math.ceil(wizard_levels/2), {spells} = item.actor.data.data;

  if(Object.entries(spells).filter(arr=> arr[1].max > 0 && arr[1].value !== arr[1].max).length === 0) return ui.notifications.error(`You have no missing slots!`);

  let content = `
    <form>
      <p>You can regain ${cum_slot_rec} cumulative spell slots.</p>
      ${Object.entries(spells).filter(arr => arr[1].max > 0 && arr[1].value !== arr[1].max && parseInt(arr[0].charAt(5)) < 7).map(([key, value], index) => {
        return `<label for="${key}">Spell Slot Level ${key.charAt(5)} [${value.value}/${value.max}]</label><input id="${key}" type="number" value="0" min="0" max="${value.max}"><br>`;
      })}
    </form>
  `;

  new Dialog({content, title : `Arcane Recovery`, 
      buttons : {
        Ok : {
          label : `Ok`,
          callback : async (html) => {
            let values = Array.from(html.find(`input`));
            if( values.reduce((acc,cur) => acc += (cur.valueAsNumber * parseInt(cur.id.charAt(5))), 0) > cum_slot_rec ) return ui.notifications.error(`You selected too many cumulative spell slots!`);

            let chat_output = ``, update_data = duplicate(item.actor.data); 

            for(let value of values)
            {
              update_data.data.spells[value.id].value += value.valueAsNumber;
              chat_output += `Spell Slot (${value.id.charAt(5)}) : Add ${value.valueAsNumber}, Total :  ${update_data.data.spells[value.id].value} <br>`;
            }

            await item.actor.update(update_data);
            await item.update({ "data.uses.value" : 0 });
            
            ChatMessage.create({ content : chat_output, speaker : ChatMessage.getSpeaker() });
          }
        },
        Cancel : {
          label : `Cancel`
        }
      }
  }).render(true);
})();