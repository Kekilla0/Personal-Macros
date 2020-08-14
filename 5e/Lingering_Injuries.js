(async ()=>{
  let random_number = new Roll(`1d100`).roll().total;

  let html = `
  <div class="dnd5e chat-card item-card">
    <header class="card-header flexrow">
      <img src="https://wow.zamimg.com/images/wow/icons/large/ability_deathknight_brittlebones.jpg" title="Lingering Injuries" width="36" height="36" />
      <h3 class="item-name">Lingering Injuries</h3>
    </header>

    <div class="card-content">
    <div class="rd__b  rd__b--3"><p>Damage normally leaves no lingering effects. This option introduces the potential for long-term injuries.</p></div>
    </div>
    
    <button data-action="save" data-ability="con" id="LI-Save-Button-${random_number}">
        Saving Throw DC 15 Constitution
    </button>
  </div>`;

  ChatMessage.create({content : html}).then((result)=>{
    if(!result) return;

    setTimeout( ()=>{
      document.getElementById(`LI-Save-Button-${random_number}`).addEventListener("click", ()=>
      {
        let target_actor = canvas.tokens.controlled[0];
        if(!target_actor) return;
    
        target_actor.actor.rollAbilitySave("con").then((result)=>{
          if(!result) return;
    
          if(result.total < 15)
          {
            setTimeout (()=> {
              ChatMessage.create({content : `You failed your roll!`});
              game.tables.getName("Lingering Injuries").draw();
            }, 2000);
          }
        })
      });
    }, 1000);
  });
})();

