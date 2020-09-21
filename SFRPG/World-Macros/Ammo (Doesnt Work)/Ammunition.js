//get the button to do what we want (console.log(item))

/*
  this probably wont work for tokens yet
*/
const sheets = [
  "SFRPGCharacter"
];

sheets.forEach(sheet => {
  Hooks.on(`renderActorSheet${sheet}`, (app, html, data)=> {
    if(app && app.permission < 3 ) return;

    let reload = html.find(".item-control.reload");

    if(reload.length > 0)
    {
      reload.off();
      reload.click(async (event) =>{
        let li = $(event.currentTarget).parents(".item");
        if(String(li.attr("data-item-id"))==="undefined") return;
        let item = app.actor.getOwnedItem(String(li.attr("data-item-id")));

        /*
          check item capacity type (ammo type).
          search actor for ammo's of same type
          if 1 --- reload using it.
          if >1 ask what type of ammo the user wants

          "updating ammo" -- 
            if existing ammo !== 0, find or create item with name of existing ammo, give it a value of the remaining. 
            update ammo to max #, update ammo name.
            remove ammo # from selected, if the selected becomes 0, reduce quantity
        */

        let item_data = duplicate(item.data);

        if(item.type === `goods`) 
        {
          await reload_ammo(app.actor, item_data);
        }else {
          await reload_weapon(app.actor, item_data);
        }
      });
    }
  });
});

async function choose(options = [], prompt = ``)
{
  let value = await new Promise((resolve, reject) => {

    let dialog_options = (options[0] instanceof Array)
      ? options.map(o => `<option value="${o[0]}">${o[1]}</option>`).join(``)
      : options.map(o => `<option value="${o}">${o}</option>`).join(``);
  
    let content = `${prompt}<br><select id="choice">${dialog_options}</select>`;
  
    new Dialog({
      content, 
      buttons : { OK : {label : `OK`, callback : async (html) => { resolve(html.find('#choice').val()); } } }
    }).render(true);
  });
  return value;
}

async function reload_ammo(actor_data, ammo_data)
{
  ui.notifications.warn(`Not Complete.`);

  ammo_data.data.capacity.value = 0;
}

async function reload_weapon(actor, weap_data)
{  
  let { type } = weap_data.data.capacity;

  await remove_old_ammo(actor, weap_data, {battery : (type === `battery` ? true : false )});

  let ammo_data = await get_ammo(actor, weap_data);

  await add_new_ammo(actor,weap_data,ammo_data);
}

async function get_ammo(actor, weap_data)
{ 
  let { type, value, max } = weap_data.data.capacity;
  let ammo_choices;

  if(type === `battery`)
    { ammo_choices = actor.items.filter(i=> i.data.data?.capacity.type === type && i.type === `goods` && i.data.data?.capacity.max <= max); }
  else 
    { ammo_choices = actor.items.filter(i=> i.data.data?.capacity.type === type && i.type === `goods`); }

  let ammo_choice;

  if(ammo_choices.length === 0 ) return ui.notifications.error(``);
  if(ammo_choices.length === 1)
  { 
    ammo_choice = ammo_choices[0].id;
  }else{
    ammo_choice = await choose(ammo_choices.map(a=> [a.id, `${a.name} (${a.data.data?.capacity.value})`]), `Choose Ammo Type : `);
  }

  return ammo_choices.find(i=> i.id === ammo_choice).data;
}

async function remove_old_ammo(actor, weap_data, options = { battery : false })
{
  let { type, value, max, ammodata } = weap_data.data.capacity;
  let item_updates = [], item_creates = [], item_deletes = [];

  if(ammodata)
  {
    ammodata.data.capacity.value = value;

    if(options.battery) {
      let dupl_data = actor.items.find(i=>
        i.type === `goods` &&
        i.name === ammodata.name &&
        i.data.data?.capacity.value === ammodata.data.capacity.value
        )?.data;

      if(dupl_data)
      {
        dupl_data.data.quantity += 1;
        item_updates.push(dupl_data);
      }else{
        item_creates.push(ammodata);
      } 
    }else{
      let dupl_data = actor.items.find(i=>
        i.type === `goods` &&
        i.name === ammodata.name
        )?.data;

      if(dupl_data && value !== 0)
      {
        let total = ((dupl_data.data.quantity - 1 )* dupl_data.data.capacity.max) + dupl_data.data.capacity.value + value;
        dupl_data.data.quantity = Math.ceil(total/ dupl_data.data.capacity.max);
        dupl_data.data.capacity.value = ( total % dupl_data.data.capacity.max === 0 ) ? dupl_data.data.capacity.max : total % dupl_data.data.capacity.max;

        console.log("Total ", total);
        console.log("Quantity ", dupl_data.data.quantity);
        console.log("Capacity ", dupl_data.data.capacity);
        console.log("Full Data ", dupl_data);
        
        //add 0 value to weapon

        item_updates.push(dupl_data);
      }else{
        if(value !== 0)
          item_creates.push(ammodata);
      }
    }
  }
  await update_actor(actor, {item_updates, item_creates, item_deletes});

  console.log("REMOVE OLD COMPLETE REMOVE OLD COMPLETE REMOVE OLD COMPLETE");
  console.log("-----------------------------------------------------------");  
}

async function add_new_ammo(actor, weap_data, ammo_data)
{  
  let item_updates = [], item_creates = [], item_deletes = [];
  let total = (ammo_data.data.capacity.max*(ammo_data.data.quantity-1) + ammo_data.data.capacity.value);

  console.log("Before Total : ", total);
  console.log("Weap Before : ", weap_data.data.capacity);
  console.log("Ammo Before : ", ammo_data.data.capacity);
  console.log("Ammo Quantity Before : ", ammo_data.data.quantity);

  if(total <= weap_data.data.capacity.max)
  {
    weap_data.data.capacity.ammodata = duplicate(ammo_data);
    weap_data.data.capacity.value = total;
    ammo_data.data.capacity.value = 0;
    ammo_data.data.quantity = 0;
  }else{
    weap_data.data.capacity.ammodata = duplicate(ammo_data);
    total -= weap_data.data.capacity.max;
    weap_data.data.capacity.value = weap_data.data.capacity.max;
    ammo_data.data.quantity = Math.ceil(total / ammo_data.data.capacity.max);
    ammo_data.data.capacity.value = (total % ammo_data.data.capacity.max === 0) ? ammo_data.data.capacity.max : total % ammo_data.data.capacity.max;
  }

  console.log("After Total : ", total);
  console.log("Weap After : ", weap_data.data.capacity);
  console.log("Ammo After : ", ammo_data.data.capacity);
  console.log("Ammo Quantity After : ", ammo_data.data.quantity);

  item_updates.push(weap_data, ammo_data);

  if(ammo_data.data.quantity === 0)
  {
    item_deletes.push(ammo_data);
  }

  await update_actor(actor, {item_updates, item_creates, item_deletes});
  console.log("ADD NEW COMPLETE ADD NEW COMPLETE ADD NEW COMPLETE ADD NEW COMPLETE");
  console.log("-------------------------------------------------------------------");  
}

//const item_updates = [], item_creates = [], item_deletes = [];
async function update_actor(actor, options = { item_updates : [] , item_creates : [] , item_deletes : [] })
{
  console.log("Updates ", options.item_updates);
  console.log("Creates ", options.item_creates);
  console.log("Deletes ", options.item_deletes);    

  await actor.updateEmbeddedEntity("OwnedItem", options.item_updates);
  await actor.createEmbeddedEntity("OwnedItem", options.item_creates);
  await actor.deleteEmbeddedEntity("OwnedItem", options.item_deletes.map(i=>i._id));
}