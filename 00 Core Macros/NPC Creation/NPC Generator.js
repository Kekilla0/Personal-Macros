async function NPC_Generator(){
  const config = {
    race : [`Dragonborn`, `Dwarf`, `Elf`, `Gnome`, `Half-Elf`, `Half-Orc`, `Halfling`, `Human`, `Tiefling`, `Goblin`, `Orc`, `Demon`],
    sex : [`Male`, "Female"],
    job : ["Alchemist","Artisan","Barbarian","Bar Keep / Barmaid","Bounty Hunter","Cobbler","City Guard","Criminal","Farmer","Fisher","Gladiator","Jailer","Town Guard","Healer","Investigator","Knight","Caravaner","Mercenary","Miner","Monk","Monster Hunter","Noble","Poacher","Robber","Smuggler","Pirate","Prison Guard","Priest","Sailor","Seer","Shop Keeper","Soldier","Smith","Traveler","Treasure Hunter","Woodsman", ],
    data : {},
    wait : async (ms) => new Promise((resolve)=> setTimeout(resolve, ms)),
  };

  let dialog = new Dialog({
    title : "NPC Generator",
    content : getHTML(),
    buttons : {},
  }, {
    width : 600,
    height : "auto",
  });

  await dialog._render(true);
  await config.wait(800);
  await addEventListeners(dialog);

  function getHTML(){
    //add class information from both behind the tables & this is your life
    //add organization from behind the tables
    return `
    <div style="display:flex;flex-direction:column;flex-wrap:nowrap;justify-content:space-around;align-items:stretch;align-content:stretch;">
      <div class="npcgen" style="display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:space-around;align-items:stretch;align-content:stretch;">
        <div style="display:flex;flex-direction:column;flex-wrap:nowrap;justify-content:space-around;align-items:stretch;align-content:stretch;">
          <label id="label_race">Race</label>
          <label id="label_sex">Sex</label>
          <label id="label_first">First Name</label>
          <label id="label_last">Last Name</label>
          <label id="label_job">Occupation</label>
        </div>
        <div style="display:flex;flex-direction:column;flex-wrap:nowrap;justify-content:space-around;align-items:stretch;align-content:stretch;">
          <select id="select_race">${config.race.sort().reduce((a,b) => a+=`<option value="${b}">${b}</option>`, `<option value="random">Random</option>`)}</select>
          <select id="select_sex">${config.sex.sort().reduce((a,b) => a+=`<option value="${b}">${b}</option>`, `<option value="random">Random</option>`)}</select>
          <input type="text" id="dummy_input_1" disabled></input>
          <input type="text" id="dummy_input_2" disabled></input>
          <select id="select_job">${config.job.sort().reduce((a,b) => a+=`<option value="${b}">${b}</option>`, `<option value="random">Random</option>`)}</select>
        </div>
        <div style="display:flex;flex-direction:column;flex-wrap:nowrap;justify-content:space-around;align-items:stretch;align-content:stretch;">
          <input type="text" id="input_race" value="Random" disabled></input>
          <input type="text" id="input_sex" value="Random" disabled></input>
          <input type="text" id="input_first" value="John"></input>
          <input type="text" id="input_last" value="Smith"></input>
          <input type="text" id="input_job" value="Random" disabled></input>
        </div>
        <div style="display:flex;flex-direction:column;flex-wrap:nowrap;justify-content:space-around;align-items:stretch;align-content:stretch;">
          <button id="button_race">Randomize</button>
          <button id="button_sex">Randomize</button>
          <button id="button_first">Randomize</button>
          <button id="button_last">Randomize</button>
          <button id="button_job">Randomize</button>
        </div>
      </div>
      <br>
      <div class="npcgenbuttons" style="display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:space-around;align-items:stretch;align-content:stretch;">
        <button id="button_randomize">Randomize All</button>
        <button id="button_write">Write</button>
      </div>
    </div>
    `;  //<button id="button_cancel">Close Window</button>
  }

  async function addEventListeners(dialog){
    let element = document.getElementsByClassName("npcgen");
    let [race_button, sex_button, first_button, last_button, job_button] = Array.from(element[0].children[3].children);
  
    race_button.onclick = (event) => { r(); }
  
    sex_button.onclick = (event) => { s(); }
  
    first_button.onclick = (event) => { n("first"); }
  
    last_button.onclick = (event) => { n("last"); }
  
    job_button.onclick = (event) => { j(); }
  
    element = document.getElementsByClassName("npcgenbuttons");
    let [random_button, write_button, cancel_button ] = Array.from(element[0].children);
  
    random_button.onclick = (event) => { r(); s(); j(); n(); }
  
    write_button.onclick = async (event) => {
      let data = {
        race : document.getElementById("input_race").value,
        sex : document.getElementById("input_sex").value,
        first : document.getElementById("input_first").value,
        last : document.getElementById("input_last").value,
        job : document.getElementById("input_job").value,
      };

      data.description = getDescription(data);
      data.info = getJobInfo(data);

      config.data = data;

      let dialog = new Dialog({
        content : ``,
        buttons : {
          "a" : { label : "Write To Chat", callback : () => { writeToChat(); }},
          "b" : { label : "Write To Actor", callback : () => { writeToActor(); }},
        } 
      }, { width : 300, height : 100, });
      await dialog._render(true);
      dialog.element.find('.dialog-buttons').css({'flex-direction':'column'});
    }
  
    function r(){
      let input = document.getElementById("select_race").value;
      let output = input == "random" ? getRace() : input;
  
      document.getElementById("input_race").value = output;
    }
  
    function s(){
      let input = document.getElementById("select_sex").value;
      let output = input == "random" ? getSex() : input;
  
      document.getElementById("input_sex").value = output;
    }
  
    function j(){
      let input = document.getElementById("select_job").value;
      let race = document.getElementById("input_race").value;
      let output = input == "random" ? getJob(race) : input;
  
      document.getElementById("input_job").value = output;
    }
  
    function n(t = ""){
      let input = {
        race : document.getElementById("input_race").value,
        sex : document.getElementById("input_sex").value,
      }
  
      let data = getName(input);
    
      if(t == "first" || t == "")
        document.getElementById("input_first").value = data.name.first;
      if(t == "last" || t == "")
        document.getElementById("input_last").value = data.name.last;
    }
  }

  async function writeToActor(){
    //make actor (copy data from other actor? humanoid stored in the actor folder)
    let actors = game.actors
      .filter(a => a?.data?.data?.details?.type?.value?.toLowerCase().includes("humanoid") && a.type == "npc")
      .map(a=> ({ id : a.id, name : a.name, proto : a.prototypeToken.name }))
      .unique({key : "name" });

    //search for actor with name --- if none, dialog to choose
    let actor = actors.find(a => a.name == (config.data.first + " " + config.data.last));

    if(!actor){
      //new dialog choose from existing actors that their "name" isn't their "creature name"
      actors = actors.filter(a=> a.name == a.proto);

      actor = await quickDialog({
        data : [{ type  : "select", label : "Choose Proto Actor : ", options : actors.map(a => a.name)}],
        title : "NPC Creator"
      });

      actor = actors.find(a => a.name == actor);

      actor.name = `${config.data.first} ${config.data.last}`;
      actor.id = (await Actor.create(duplicate(game.actors.get(actor.id))))?.id; 
    }

    let update = {
      "name" : actor.name,
      "data.details.race" : config.data.race,
      "data.details.gender" : config.data.sex,
      "data.details.biography.value" : `<h2>Description</h2>${config.data.description}<hr><h2>Job : ${config.data.job}</h2><hr>${config.data.info}`,
    };

    await game.actors.get(actor.id).update(update);
    await game.actors.get(actor.id).sheet.render(true);
  }

  async function writeToChat(){
    await ChatMessage.create({
      whisper : ChatMessage.getWhisperRecipients("GM"),
      content : `
        Name : ${config.data.first} ${config.data.last} <br>
        Race : ${config.data.race} <br>
        Sex  : ${config.data.sex} <br>
        Job  : ${config.data.job} <br>
        <hr> 
        <u>Description</u>\n
        ${config?.data?.description}
        <hr> 
        <u>Details</u>\n
        ${config?.data?.info}
      `,
    });
  }
}
window["npcGen"] = NPC_Generator;