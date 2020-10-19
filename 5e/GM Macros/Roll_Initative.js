const init_die = `1d20`;

async function roll_iniative()
{
  if(!game.combats.active) return;
  let updates = duplicate(game.combats.active);

  for(let combatData of updates.combatants)
  {
    let initiative = new Roll(`${init_die} + ${combatData.actor.data.attributes.init.value}`).roll().total;
    combatData.initiative = initiative;
  }

  await game.combats.active.update(updates);
  turn_message();
}

function turn_message()
{
  let combatant = game.combats.active.combatants.sort((a,b)=> b.initiative - a.initiative)[0];

  ChatMessage.create({
    content : `
    <div class="flexrow"><div style="flex:3"><img src="${combatant.img}" style="border:none" /></div>
      <div style="flex:12">
          <h2>${combatant.name} Turn</h2>
      </div>
    </div>`
  });
}

roll_iniative();
