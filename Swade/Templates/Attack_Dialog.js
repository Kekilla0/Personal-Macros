let dialogID = "";

async function weaponDialog(){
  if(!token) return;

  const actor = token.actor;
  const weapons = actor.items.filter(i=>
    i.type === "weapon" &&
    i.data.data.range !== "0" && i.data.data.range !== "" &&
    i.data.data.quantity > 0
  );

  if(weapons.length === 0) return;

  let html = getHTML();
  let content = getContent();
  let buttons = getButtons();
  
  let dialog = new Dialog({
    content, buttons, title : `Attack Dialog`
  },{
    width : 400,
  });

  dialogID = dialog.appId;

  await dialog._render(true);
  activeListeners();

  function getHTML(){
    let html = document.getElementById(`app-${dialogID}`)?.getElementsByTagName(`select`);
    if(html === undefined) return undefined;
    else return Array.from(html).map(h=> h.value);
  }
  function getContent(){
    let selectedWeapon = html !== undefined
      ? html[0]
      : weapons[0].id;

    console.log(html, selectedWeapon, weapons);
    
    let ammo = weapons.find(w=> w.id === selectedWeapon).data.data.ammo.split(`,`);

    return `
    <form>
      <div class="form-group">
        <label for="shots"># of Shots: </label>
        <input id="shots" type="number" min="0" value="1"></input>
      </div>
      <div class="form-group">
        <label for="weapon">Weapon: </label>
        <select id="weapon">${weapons.reduce((acc,val) => acc += `<option value="${val.id}" ${val.id === selectedWeapon ? `selected` : ``}>${val.name}</option>`, ``)}</select>
      </div>
      <div class="form-group">
        <label for="ammo">Ammo: </label>
        <select id="ammo">${ammo.reduce((acc,val) => acc += `<option value="${val}">${val}</option>`, ``)}</select>
      </div>
      <div class="form-group">
        <label for="sil">Silenced</label>
        <input id="sil" name="silenced" type="checkbox"></input>
      </div>
    </form>
    `
  }
  function getButtons(){
    return {
      a : {
        label : "Shoot", callback : shoot,
      },
      b : {
        label : "Reload", callback: reload,
      }
    }
  }
  function activeListeners(){
    document.getElementById("weapon").onchange = update;
  }
  async function update(){
    html = getHTML();
    dialog.data.content = getContent();
    dialog.data.buttons = getButtons();
    await dialog._render(true);
    activeListeners();
  }
  function shoot(html){
    let [shots, weapon, ammo, sil] = getValues(html);
    let item = actor.items.get(weapon);
    console.log("Shoot | ", shots, weapon, ammo, sil, item);
  }
  function reload(html){
    let [shots, weapon, ammo, sil] = getValues(html);
    let item = actor.items.get(weapon);
    console.log("Shoot | ", shots, weapon, ammo, sil, item);
  }
  function getValues(html)
  {
    return [
      html.find(`#shots`)[0].valueAsNumber,
      html.find(`#weapon`)[0].value,
      html.find(`#ammo`)[0].value,
      html.find(`#sil`)[0].checked,
    ];
  }
}

weaponDialog();

