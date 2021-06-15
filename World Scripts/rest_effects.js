//additional data to the effects
Hooks.on(`renderActiveEffectConfig`, (app, html, data) => {
  const options = ["Ignore", "Short Rest", "Long Rest"];
  const value = app.object.getFlag(`world`, `rest`);

  let div = document.createElement(`div`);
  div.className = `form-group`;
  div.innerHTML = `
    <label> Remove after Rest </label>
    <div class="form-fields">
      <select id="rest">
        ${options.reduce((a,v) => a+=`<option value="${v}" ${value === v ? `selected` : ``}>${v}</option>`, ``)}
      </select>
    </div>`;

  html.find(`.tab`)[1].append(div);
  
  $(`select[id="rest"]`)[0].onchange = (event) => {
    app.object.setFlag(`world`, `rest`, event.target.value);
  }
});

//use the data, need to fix both short and long rest functions
const orig_longRest = getDocumentClass("Actor").prototype.longRest;
getDocumentClass("Actor").prototype.longRest = async function({ dialog = true, chat = true, newDay = true} = {}){
  let result = await orig_longRest.call(this, {dialog, chat, newDay});
  if(result !== undefined)
    for(let effect of this.effects){
      let status = effect.getFlag(`world`, `rest`) ?? "Ignore";
      if(status === "Short Rest" || status === "Long Rest")
        await effect.delete();
    }
}

const orig_shortRest = getDocumentClass("Actor").prototype.shortRest;
getDocumentClass("Actor").prototype.shortRest = async function({dialog = true, chat = true, autoHD = false, autoHDThreshold = 3}={}){
  let result = await orig_shortRest.call(this, {dialog, chat, autoHD, autoHDThreshold});
  if(result !== undefined){
    for(let effect of this.effects){
      let status = effect.getFlag(`world`, `rest`) ?? "Ignore";
      if(status === "Short Rest")
        await effect.delete();
    }
  }
}
