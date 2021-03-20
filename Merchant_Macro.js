/*
  Idea :
    Choose from a list of Merchants.
      These Merchants will be deliniated by having an active effect named "merchant" on them with a true or false value
    Choose from a list of controlled characters/actor (only unlinked? maybe a way to change this in the config)
    Purchase Items 

    To Do : 
*/
const config = {
  merchants : {
    object : game.actors.filter(a => a.data.type === `npc` && !!a.data.effects.find(e=> e.label === `Merchant` && !e.disabled) && a.permission === 3 ),
    htmlID : randomID(),
    buttonIds : [],
  },
  purchasers : {
    object : game.user.isGM === true 
      ? game.actors.filter(a => a.hasPlayerOwner)
      : [game.user.character],
    htmlID: randomID(),
    buttonIds : [],
    percent : `ceil(3.5*(@skills.per.total) + 48)`
  },
  appID : ``,
  fn : {
    log : (...args) => args.forEach(m => console.log(`${this.name} Macro | `, m)),
    wait : async (ms) => new Promise((resolve)=> setTimeout(resolve, ms)), 
    message : (...args) => ChatMessage.create({content : args.join(`<br>`)}),
  }
};

main();

async function main()
{
  let html = getValues();
  let content = getContent(html);
  let buttons = getButtons(html);
  
  let dialog = new Dialog({
    content, buttons, title : `Merchant`
  },{
    width : 800,
  });

  config.appID = dialog.appId;
  dialog.render(true);
  await config.fn.wait(500);
  addEventListeners();

  function getContent(html){
    const [merchant, purchaser] = html || [config.merchants.object[0].id, config.purchasers.object[0].id];

    return `
      <div style="display:flex;justify-content:space-between;height:100%;width:100%;">
        <div style="display:flex;flex-direction:column;width:50%;border-right:1px solid #000;padding-right:5px;">
          <div style="display:flex:flex-direction:row;width:100%;">
            <div style="display:flex;justify-content:center;">
              ${getDropDown("merchants", merchant)}
            </div>
            <br>
            <div style="display:flex;flex-direction:row;flex-grow:2;justify-content:space-evenly;">
              ${getCurrency("merchants", merchant)}
            </div>
            <br>
            <div style="display:flex;">
              ${getItemList("merchants", merchant)}
            </div>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;width:50%;border-left:1px solid #000;padding-left:5px;">
          <div style="display:flex:flex-direction:row;width:100%;">
            <div style="display:flex;justify-content:center;">
              ${getDropDown("purchasers", purchaser)}
            </div>
            <br>
            <div style="display:flex;flex-direction:row;flex-grow:2;justify-content:space-evenly;">
              ${getCurrency("purchasers", purchaser)}
            </div>
            <br>
            <div style="display:flex;flex-direction:column;justify-content:space-evenly;">
              ${getItemList("purchasers", purchaser)}
            </div>
          </div>
        </div>
      </div>`;
    function getDropDown(object = ``, selected){
      return `
      <select name="${object}" id="${config[object].htmlID}" ${config[object].object.length === 1 ? `disabled` : ``}>
        ${config[object].object.reduce((a,v,i,r)=> a += `<option value="${v.id}" ${selected == v.id ? `selected` : ``}>${v.name}</option>`, ``)}
      </select>`;
    }
    function getCurrency(object = ``, selected){
      let currencyData = config[object].object.find((a,i)=> !!selected ? a.id === selected : i === 0).data.data.currency;
      return Object.entries(currencyData).reduce((acc, [key,value])=>
        acc += `<div style="display:flex;background:rgba(0, 0, 0, 0.15);border: 1px solid #999;border-radius: 4px;box-shadow: 0 0 2px #fff inset; font-size: 16px; text-align:center; padding: 4px 10px 4px 10px;">${key} : ${value}</div>`, ``
      );
    }
    function getItemList(object = ``, selected){
      let selectedActor = config[object].object.find(a=> a.id === selected);
      let itemData = selectedActor.items.filter(i=> i.data.data.price !== 0 && !!i.data.data.price).map(i=> ({_id : i.id, actorId : i.actor.id, type : object, img : i.img, name : i.name, quantity : i.data.data.quantity, price : i.data.data.price}));
      config[object].buttonIds = itemData.map(i=> `${i.actorId}.${i._id}.${i.type}`);

      let percent = object === `merchants` 
        ? parseInt(selectedActor.getFlag(`world`, `merchant-percentage`))
        : new Roll(config.purchasers.percent, selectedActor.getRollData()).roll().total;

      return `
      <table style="width:100%">
        <tr>
          <th colspan=2>Name</th>
          <th>Quantity</th>
          <th>Value</th>
          <th></th>
        </tr>
        ${
          itemData.reduce((acc, {_id, name, quantity, price, img, actorId, type})=>
            acc += `
              <tr>
                <td><img src="${img}" width="30" height="30"></td>
                <td>${name}</td>
                <td style="text-align:center;">${quantity}</td>
                <td style="text-align:center;">${(price * (percent/100)).toFixed(2)}</td>
                <td style="text-align:center;"><button id="${actorId}.${_id}.${type}" value="${actorId}.${_id}.${type}" type="button" ${quantity === 0 ? `disabled` : ``}>${object === `merchants` ? `Buy` : `Sell`}</button></td>
              </tr>
            `, ``
          )
        }
      </table>
      `;
    }
  }
  function getButtons(html){
    return {
      one : {label : `Complete`, icon : ``, callback : () => {}},
    }
  }
  function getValues(){
    let html = document.getElementById(`app-${config.appID}`)?.getElementsByTagName(`select`);
    if(html === undefined) return html;
    else return Array.from(html).map(h=> h.value);
  }
  async function update(){
    let html = getValues();
    dialog.data.content = getContent(html);
    dialog.data.buttons = getButtons(html);
    dialog.render(true);
    await config.fn.wait(500);
    addEventListeners();
  }
  function addEventListeners(){
    document.getElementById(config.merchants.htmlID).onchange = update;
    document.getElementById(config.purchasers.htmlID).onchange = update;

    //add on clicks for all the buttons
    config.merchants.buttonIds.forEach(id =>{
      document.getElementById(id).onclick = (...args)=> transaction(id);
    });
    config.purchasers.buttonIds.forEach(id =>{
      document.getElementById(id).onclick = (...args)=> transaction(id);
    });
  }
  async function transaction(executionString)
  {
    const [merchant, purchaser] = getValues() || [config.merchants.object.length === 1 ? config.merchants.object[0].id : undefined, config.purchasers.object.length === 1 ? config.purchasers.object[0].id : undefined];
    const [actorID, itemID, type] = executionString.split(`.`);

    config.fn.log(
      `Merchant   : ${merchant}`,
      `Purchaser  : ${purchaser}`,
      `Actor Id   : ${actorID}`,
      `Item Id    : ${itemID}`,
      `Type       : ${type}`,
      `----------------------------------------------------------`,
    );

    /*
      find from, find to
        from adds value to from, removes item from from
        to removes value from to, adds item to to

      get percent of the transaction from the config[purchasers/merchants]
        use type as sent to the transaction
    */
    let from = game.actors.get(actorID);
    let item = from.items.get(itemID);
    let percent = type === `purchasers` ? new Roll(config.purchasers.percent, from.getRollData()).roll().total : parseInt(from.getFlag(`world`,`merchant-percentage`)) || 100;
    let value = item.data.data.price;
    let to = actorID === merchant ? game.actors.get(purchaser) : game.actors.get(merchant);

    config.fn.log(
      `From : ${from.name}`,
      `To : ${to.name}`,
      `Item : ${item.name}`,
      `Percent : ${percent} `,
      `Value : ${value}`,
      `___________________________________________________________`
    );

    let actualValue = parseFloat(value) * (parseFloat(percent)/100);

    if(getFunds(to) < actualValue)
    {
      ui.notifications.warn(`${to.name} has insufficent funds to purchase ${item.name} at the value of ${actualValue} gp.`);
    }else{
      await give(to, item, actualValue);
      await take(from, item, actualValue);
  
      await update();

      //message?
    }


    async function give(actor,item,value)
    {
      if(actor.items.find(i=> i.name === item.name))
      {
        item = actor.items.find(i=>i.name === item.name);
        await item.update({"data.quantity" : item.data.data.quantity + 1});
      }else{
        let itemData = duplicate(item.data);
        itemData.data.quantity = 1;
        await actor.createOwnedItem(itemData);
      }

      let actor_money = getFunds(actor);
      let remaining_Money = actor_money - value;
      await updateFunds(actor,remaining_Money);
      //money?
    }

    async function take(actor, item, value)
    {
      if(item.data.data.quantity === 1)
      {
        await item.delete();
      }else{
        await item.update({"data.quantity" : item.data.data.quantity - 1});
      }

      let actor_money = getFunds(actor);
      let remaining_Money = actor_money + value;
      await updateFunds(actor, remaining_Money);
      //money?
    }

    function getFunds(actor)
    {
      let { pp, gp, ep, sp, cp } = duplicate(actor.data.data.currency);
      return ((pp*10) + (gp) + (ep/2) + (sp/10) + (cp/100));
    }

    async function updateFunds(actor, value)
    {
      let base = value * 100;
      let pp = (base - (base % 1000))/1000; base = base - pp * 1000;
      let gp = (base - (base % 100))/100; base = base - gp * 100;
      let ep = (base - (base % 50))/50; base = base - ep * 50;
      let sp = (base - (base % 10))/10; base = base - sp * 10;
      let cp = Math.floor(base);

      config.fn.log(
        `Value  : ${value}`,
        `PP     : ${pp}`,
        `GP     : ${gp}`,
        `EP     : ${ep}`,
        `SP     : ${sp}`,
        `CP     : ${cp}`,
      );

      let currency = { pp, gp, ep, sp, cp};
      await actor.update({ "data.currency" : currency });
    }
  }
}


/*
  Idea : 
    Second Macro to Handle "Merchants"

  To Do :
    Make it look better?
*/
const config = {
  merchants : {
    object : game.actors.filter(a => a.data.type === `npc` && !!a.data.effects.find(e=> e.label === `Merchant` && !e.disabled)), 
  },
  users : {
    object : game.users.filter(u => !u.isGM),
  },
  fn : {
    log : (...args) => args.forEach(m => console.log(`${this.name} Macro | `, m)),
    wait : async (ms) => new Promise((resolve)=> setTimeout(resolve, ms)), 
    message : (...args) => ChatMessage.create({content : args.join(`<br>`)}),
  },
  appID : ``,
  eventIDs : {
    merchant : "merchant-dropdown",
    updateButton : "update-data-button",
    percent : "percentage-input",
    pp : "p-input", gp : "g-input", ep : "e-input", sp : "s-input", cp : "c-input",
    users : game.users.filter(u=>!u.isGM).map(u=> `user.${u.id}`),
  }
}

main();

async function main()
{
  let html = getHTML();
  let content = getContent(html);
  let buttons = getButtons(html);
  
  let dialog = new Dialog({
    content, buttons, title : `Merchant Handler`
  },{
    width : 800,
  });

  config.appID = dialog.appId;
  dialog.render(true);
  await config.fn.wait(500);
  addEventListeners();

  config.fn.log(config);

  function getHTML(){
    let data = {};
    Object.entries(config.eventIDs).forEach(([key, value])=> {
      if(key.includes("updateButton")) return;
      if(value instanceof Array){
        for(let v of value)
          data[v] = document.getElementById(v)?.checked;
      }else{
        if(value.includes("input")){
          data[key] = document.getElementById(value)?.valueAsNumber;
        }else{
          data[key] = document.getElementById(value)?.value;
        }
      }
    })
    config.fn.log(data);
    return data;
  }
  function getContent(html){
    let selectedMerchant = html.merchant || config.merchants.object[0].id;

    return `
      <div style="display:flex;flex-direction:column;justify-content:space-between;height:100%;width:100%;">
        <div style="display:flex;justify-content:right;width:100%;height:40px">
          ${getMerchants()}
        </div>
        <hr>
        <div style="display:flex;width:100%;flex-direction:row;">
          <div style="display:flex;width:50%;flex-direction:column">
            ${getMoney()}
          </div>
          <div style="display:flex;width:50%;flex-direction:column">
            ${getPermission()}
          </div>
        </div>
        <div>
          <button type="button" id="${config.eventIDs.updateButton}">Update Merchant</button>
        </div>
      </div>
    `;

    function getMerchants(){
      return `
      <select name="merchants" id="${config.eventIDs.merchant}" ${config.merchants.object.length === 1 ? `disabled` : ``}>
        ${config.merchants.object.reduce((a,v,i,r)=> a += `<option value="${v.id}" ${selectedMerchant == v.id ? `selected` : ``}>${v.name}</option>`, ``)}
      </select>`;
    }
    function getMoney(){
      let gma = game.actors.get(selectedMerchant);
      let percent = gma?.getFlag(`world`,`merchant-percentage`);
      let currency = gma.data.data.currency;

      return `
        <table style="">
          <tr>
            <td>Percentage Sell Cost</td>
            <td><input type="number" id="${config.eventIDs.percent}" value="${percent || 100}"></td>
          </tr>
          <tr>
            <td>PP</td>
            <td><input type="number" id="${config.eventIDs.pp}" value="${currency?.pp || 0}"></td>
          </tr>
          <tr>
            <td>GP</td>
            <td><input type="number" id="${config.eventIDs.gp}" value="${currency?.gp || 0}"></td>
          </tr>
          <tr>
            <td>EP</td>
            <td><input type="number" id="${config.eventIDs.ep}" value="${currency?.ep || 0}"></td>
          </tr>
          <tr>
            <td>SP</td>
            <td><input type="number" id="${config.eventIDs.sp}" value="${currency?.sp || 0}"></td>
          </tr>
          <tr>
            <td>CP</td>
            <td><input type="number" id="${config.eventIDs.cp}" value="${currency?.cp || 0}"></td>
          </tr>
        </table>
      `;
    }
    function getPermission(){
      let gpa = game.actors.get(selectedMerchant);
      return `
        ${config.users.object.reduce((acc, val, ind, arr)=> acc += `
          <div style="display:flex;width:100%;height:40px;justify-content:space-between;">
            <label>${val.name}</label><input type="checkbox" id="user.${val.id}" ${gpa.data.permission[val.id] === 3  ? `checked` : ``}> 
          </div>
        `, ``)}
      `;
    }
  }
  function getButtons(html){
    return {
      one : {label : `Done`, icon : ``, callback : () => {}},
    }
  }
  async function update(){
    let html = getHTML();
    dialog.data.content = getContent(html);
    dialog.data.buttons = getButtons(html);
    dialog.render(true);
    await config.fn.wait(500);
    addEventListeners();
  }
  function addEventListeners(){
    document.getElementById(config.eventIDs.merchant).onchange = update;
    document.getElementById(config.eventIDs.updateButton).onclick = updateMerchant;
  }
  async function updateMerchant()
  {
    let html = getHTML();
    let actor = game.actors.get(html.merchant);

    let { pp, gp, ep, sp, cp, percent } = html;

    let data = {
      data : {
        currency : {
          pp, gp, ep, sp, cp,
        }
      },
      "flags.world.merchant-percentage" : percent,
      permission : {},
    }

    Object.entries(html).forEach(([key,value])=>{
      if(key.includes(`user`)){
        let id = key.split(`.`)[1];
        data.permission[id] = value === true ? 3 : 0;
      }
    });

    await actor.update(data);
  }
}