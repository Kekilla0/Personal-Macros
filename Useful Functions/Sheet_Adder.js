function addBooleanElementHook({ condition, element = "", injector = "", entity = "Item" } = {}){
  Hooks.on(`render${entity}Sheet`, (app, html, data) => {
    if(condition instanceof Function && !condition(app.object)) return;
    let status = app.object.getFlag(`world`, element);

    html.find(injector).append(`
    <label class="checkbox">
      <input type="checkbox" name="${element}" ${status}>
      Remove
    </label>`);

    $(`input[name="${element}"]`)[0].onchange = (event) => {
      let status = event.target.checked ? "checked" : "";
      app.object.setFlag(`world`, element, status);
    }
  });
}