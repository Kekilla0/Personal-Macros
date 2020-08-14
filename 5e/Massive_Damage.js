(async ()=>{
  let dialog_content = `
  <div class="form-group">
    <label for="dc">Enter DC</label>
    <input name="dc" type="number" value="10" min="1" max="30">
  </div>`;

  let x = new Dialog({
    content : dialog_content,
    buttons : { enter : { label : `enter`, callback : (html) => displayChatCard(parseInt(html.find('[name=dc]')[0].value)) }}
  });

  x.options.width = 200;
  x.position.width = 200;

  x.render(true);
})();

function displayChatCard(DC = 10)
{
  let random_number = new Roll(`1d100`).roll().total;

  let html = `
  <div class="dnd5e chat-card item-card">
    <header class="card-header flexrow">
      <img src="https://wow.zamimg.com/images/wow/icons/large/achievement_goblinheaddead.jpg" title="Massive Damage" width="36" height="36" />
      <h3 class="item-name">Massive Damage</h3>
    </header>

    <div class="card-content">
    <div class="rd__b  rd__b--3"><p>When a creature takes damage from a single source equal to or greater than half its hit point maximum, it must succeed on a DC 15 Constitution saving throw or suffer a random effect determined by a roll on the System Shock table. For example, a creature that has a hit point maximum of 30 must make that Constitution save if it takes 15 damage or more from a single source.</p></div>
    </div>
    
    <button data-action="save" data-ability="con" id="LI-Save-Button-${random_number}">
        Saving Throw DC ${DC} Constitution
    </button>
  </div>`;

  ChatMessage.create({content : html}).then((result)=>{
    if(!result) return;

    setTimeout( ()=>{
      document.getElementById(`LI-Save-Button-${random_number}`).addEventListener("click", ()=>
      {
        let target_actor = canvas.tokens.controlled[0];
        if(!target_actor) return ui.notifications.error(`Please select a token.`);
    
        target_actor.actor.rollAbilitySave("con").then((result)=>{
          if(!result) return;
    
          if(result.total < DC)
          {
            setTimeout (()=> {
              ChatMessage.create({content : `You failed your roll!`});
              game.tables.getName("Massive Damage").draw();
            }, 2000);
          }
        })
      });
    }, 1000);
  });
}

