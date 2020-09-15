/*
  Macro will allow players to sell items at 10% value, allows a GM to choose the % value

  To use : if you are the owner of a character (as set by the bottom left hand box) it will default to this actor, if not it will
  default to a selected token, and lastly it will pick up on a the first target you have selected.

  This will delete items that are reduced to 0 quantity over the course of use and will also increase the credits of the actor that is selling when done.

  Items sold and value associated will be displayed in the chat window when complete.
*/

(async ()=>{
  let macro_actor = game.user.targets.size !== 0 ? Array.from(game.user.targets)[0].actor
    : token !== undefined ? token.actor : character;

  if(!macro_actor) return ui.notifications.error(`Actor Null.`);

  let items = macro_actor.items.filter(i=> i.data.data?.price > 0);
  let percentage = 10, money = macro_actor.data.data.currency.credit;

  //if gm ask for %
  if(game.user.isGM) percentage = parseInt(await choose(`percent`,percentage,`Percentage of value available : `));


  display();

  async function choose(option = "", default_value, prompt = ``)
  {
    let value = await new Promise((resolve, reject) => {    
      let content = `${prompt}<br><input class="choose-input" id="value" type="number" value="${default_value}">`;
    
      new Dialog({
        content, 
        buttons : { OK : {label : `OK`, callback : async (html) => { resolve(html.find(`#value`).val()); } } }
      }).render(true);
    });
    return value;
  }

  //build display similar to vendor
  function display()
  {
    let interval, inventory, content, buttons, display_dialog, time;

    time = .5;

    inventory = items.map(item=> {
      return { img : item.img, id : item.id, name : item.name, price : (item.data.data.price*percentage/100), quantity : item.data.data.quantity, sold : 0};
    });

    content = getContent();
    buttons = getButtons();

    display_dialog = new Dialog({content, buttons, close : () => { clearInterval(interval); }});
    display_dialog.options.width = display_dialog.position.width = 600;

    display_dialog.render(true);

    interval = setInterval(()=>{
      update_data();
    }, time * 1000);

    function getContent(){
      return `
      <table style="width=100%; text-align:center;">
        <tr>
          <th style="width=20%"></th>
          <th style="width=30%;">Name</th>
          <th style="width=10%;">Value</th>
          <th style="width=10%;">Quantity</th>
          <th style="width=30%;">Sell</th>
        </tr>
        ${
          inventory.map(item=>
            `
            <tr>
              <td style="width=20%"><img src="${item.img}" height="40" width="40"></td>
              <td style="width=50%;">${item.name}</td>
              <td style="width=10%;">${item.price}</td>
              <td style="width=10%;">${item.quantity}</td>
              <td style="width=30%;"><input class="macro-sell" type="number" name="${item.id}" value="${item.sold}" min="0" max="${item.quantity}"></td>
            </tr>
            `
          ).join(``)
        }
      </table>`;
    }

    function getButtons(){
      return {
        Ok :{
          label : `0 Credits`, callback : async (html) => {
            clearInterval(interval);

            //remove items and give money (last to do here)
            let overall_value = 0;
            inventory.forEach(item=> { overall_value += (item.sold * item.price); });

            await macro_actor.update({"data.currency.credit" : money + Math.floor(overall_value)});

            let update_items = inventory.map( (item)=> {
              let update = items.find(i=>i.id===item.id);    
              update.data.data.quantity = (item.quantity-item.sold);
              return update;
            });

            await macro_actor.deleteOwnedItem(update_items.filter(item=> item.data.data.quantity === 0).map(item=> item.id));
            await macro_actor.updateOwnedItem(update_items.filter(item=> item.data.data.quantity !== 0).map(item=> {return {_id : item.id, data : item.data}}));

            ChatMessage.create({
              speaker : ChatMessage.getSpeaker(macro_actor),
              content : `
              <h2> Sold Items </h2>
              <table style="width=100%; text-align:center;">
              <tr style="border-bottom:1px solid #000">
                <th style="width=60%"><img src="${macro_actor.data.token.img}" width="50" height="50"></th>
                <th style="width=40%" colspan="2">${macro_actor.name}</th>
              </tr>
              <tr style="border-bottom:1px solid #000">
                <th style="width=60%"></th>
                <th style="width=20%">Price</th>
                <th style="width=20%">Sold</th>
              </tr>
              ${inventory.map(item=> {
                if(item.sold === 0) return;
                else return `<tr>
                  <td style="width=60%"><img src="${item.img}" width="40" height="40"></td>
                  <td style="width=20%">${item.price}</td>
                  <td style="width=20%">${item.sold}</td>
                </tr>
              `}).join(``)}
            </table>
            <hr>
            Overall Value : ${Math.floor(overall_value)}
              `
            })
          }
        },
        Cancel : {
          label : `Cancel`, callback : (html) => {
            clearInterval(interval);
          }
        }
      };
    }

    function update_data(){
      let elements = Array.from($("input.macro-sell")).map(element => {
        return {id : element.name, value : element.valueAsNumber};
      });

      if(elements.length === 0) return;

      for(let item of inventory)
      {
        let element = elements.find(e=>e.id===item.id);

        if(element.value !== undefined && element.value !== item.sold)
        {
          item.sold = element.value;
          let overallvalue = 0;
          inventory.forEach(item=> { overallvalue += (item.sold * item.price); });
          display_dialog.data.buttons.Ok.label = `${Math.floor(overallvalue)} Credits`;
          display_dialog.data.content = getContent();
          display_dialog.render(true);
          break;
        }
      }
    }
  }
})();