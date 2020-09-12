(async ()=>{
  const equip_pack = await game.packs.find(p=>p.metadata.label === "Equipment" && p.metadata.package === "sfrpg");
  const equip_items = await equip_pack.getContent();
  const settlement_options =[[0,"Level Specific (0)"], [-1,"Small (-1)"], [1,"Medium (+1)"], [2,"Large (+2)"]];
  const vendor_options =[["equipment","Equipment Vendor"],["weapon","Weapons Vendor"],["fusion","??? Vendor"],["goods","Goods Vendor"],["upgrade","Upgrade Vendor"], ["technological","Tech Vendor"],["augmentation","Augmentation Vendor"]];

  let macro_actor = character !== null ? character
    : token !== undefined ? token.actor
    : game.user.targets.size !== 0 ? Array.from(game.user.targets)[0].actor : null;
  
  if(!macro_actor) return ui.notifications.error(`Actor Null.`);

  let money = macro_actor.data.data.currency.credit;
  let level = macro_actor.data.data.details.level.value;

  let settlement_size = parseInt(await choose(settlement_options, `Choose settlement size : `));
  let vendor_type = await choose(vendor_options, `Choose vendor type : `);

  let vendor_item_list = equip_items.filter(i=> i.data.data.level <= (level+settlement_size) && i.type === vendor_type);

  display();

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
  
  async function display()
  {
    let interval;
    let inventory = vendor_item_list.map((item)=>{
      return {
        id : item.id,
        name : item.name,
        price : item.data.data.price,
        quantity : (Math.ceil(Math.random() * 4) + ((item.data.data.level - level)*-1)),
        purchased : 0
      };
    });

    let dialog_content = update_content();

    let dialog_buttons = {
      Ok : {
        label : `0 Credits`,
        callback : async (html)=> {
          clearInterval(interval);
          let cost = update_buttons();
          if(cost > money)  return ui.notifications.error(`Actor does not have enough money for that.`);

          await macro_actor.update({"data.currency.credit" : (money-cost)});

          let items = inventory.map(item=> {
            let new_item = equip_items.find(i=>i.id === item.id);
            
            if(item.purchased > 0)
            {
              new_item.data.data.quantity = item.purchased;
              return new_item;
            }            
          }).filter(element=> element !== undefined);

          console.log(items);

          await macro_actor.createEmbeddedEntity("OwnedItem", items);

          //chat output
          ChatMessage.create({
            speaker : ChatMessage.getSpeaker(macro_actor),
            content : `<table style="width=100%; text-align:center;">
              <tr style="border-bottom:1px solid #000">
                <th style="width=60%"><img src="${macro_actor.data.token.img}" width="50" height="50"></th>
                <th style="width=40%" colspan="2">${macro_actor.name}</th>
              </tr>
              <tr style="border-bottom:1px solid #000">
                <th style="width=60%"></th>
                <th style="width=20%">Price</th>
                <th style="width=20%">Quantity</th>
              </tr>
              ${items.map(item=>`
                <tr>
                  <td style="width=60%"><img src="${item.img}" width="40" height="40"></td>
                  <td style="width=20%">${item.data.data.price}</td>
                  <td style="width=20%">${item.data.data.quantity}</td>
                </tr>
              `).join(``)}
            </table>
            <hr>
            Overall cost : ${cost}
            `
          })
        }
      },
      Cancel : {
        label : `Cancel`,
        callback : ()=> {
          clearInterval(interval);
        }
      }
    };

    let display_dialog = new Dialog({
      content : dialog_content,
      buttons : dialog_buttons
    });

    display_dialog.options.width = 600;
    display_dialog.position.width = 600; 

    display_dialog.render(true);

    interval = setInterval(()=>{
      update_data();
    }, 500);

    function update_buttons()
    {
      let overall_price = 0;
      inventory.forEach(item => { overall_price += (item.purchased * item.price)});
      return overall_price;
    }
    function update_content()
    {
      return `
        <table style="width=100%; text-align:center"> 
        <tr>
          <th style="width=40%">Name</th>
          <th style="width=10%">Price</th>
          <th style="width=10%">Quantity</th>
          <th style="width=40%">Amount</th>
        </tr>
        ${inventory.map(item=>
          `<tr>
              <td style="width=40%"><a class="entity-link" data-pack="${equip_pack.collection}" data-id="${item.id}"><i class"fas fa-suitcase">${item.name}</i></a></td>
              <td style="width=10%">${item.price} cr</td>
              <td style="width=10%">${item.quantity}</td>
              <td style="width=40%"><input class="macro-vendor" name="${item.id}" type="number" value="${item.purchased}" min="0" max="${item.quantity}"></td>
            </tr>`).join(``)}
      </table>`;
    }

    function update_data()
    {
      let elements = Array.from($("input.macro-vendor")).map(element => {
        return {id : element.name, value : element.valueAsNumber};
      });

      if(elements.length === 0) return;

      for(let item of inventory)
      {
        let element = elements.find(a=>a.id === item.id);

        if(element.value !== item.purchased)
        {
          item.purchased = element.value;
          
          display_dialog.data.buttons.Ok.label = `${update_buttons()} Credits`;
          display_dialog.data.content = update_content(); 
          display_dialog.render(true);
          break;
        }
      }
    }
  }
})();