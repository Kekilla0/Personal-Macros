/*
  Idea :
    Choose from a list of Merchants.
      These Merchants will be deliniated by having an active effect named "merchant" on them with a true or false value
    Choose from a list of controlled characters/actor (only unlinked? maybe a way to change this in the config)
    Purchase Items 
      Able to see the the merchants and your own money supply, no changes made to the character or the merchant until the `Purchase` Button is pressed.
*/
const log = (...args) => args.forEach(m => console.log(`${this.name} Macro | `, m));
const wait = async (ms) => new Promise((resolve)=> setTimeout(resolve, ms));
const config = {
  merchants : {
    object : game.actors.filter(a => a.data.type === `npc` && !!a.data.effects.find(e=> e.label === `Merchant` && !e.disabled)),
    htmlID : randomID(),
    buttonIds : [],
    percent : 100,
  },
  purchasers : {
    object : game.user.isGM === true 
      ? game.actors.filter(a => a.hasPlayerOwner)
      : [game.user.character],
    htmlID: randomID(),
    buttonIds : [],
    percent : 50,
  },
  appID : ``,
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
  await wait(500);
  log(config);
  addEventListeners();

  function getContent(html){
    /*
      This has to build the whole thing no matter what the input is
    */

    //this is going to break on html => need to fix it
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
      let itemData = config[object].object.find((a,i)=> a.id === selected).items.filter(i=> i.data.data.price !== 0 && !!i.data.data.price).map(i=> ({_id : i.id, actorId : i.actor.id, type : object, img : i.img, name : i.name, quantity : i.data.data.quantity, price : i.data.data.price}));
      config[object].buttonIds = itemData.map(i=> `${i.actorId}.${i._id}.${i.type}`);

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
                <td style="text-align:center;">${price}</td>
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
      one : {label : `Complete`, icon : ``, callback : (html) => {}},
    }
  }
  function getValues(){
    let html = document.getElementById(`app-${config.appID}`)?.getElementsByTagName(`select`);
    if(html === undefined) return html;
    else return Array.from(html).map(h=> h.value);
  }
  async function update(){
    /*
      This needs to accept "button updates" which will push an id to either this function or somewhere else.
    */
    let html = getValues();
    dialog.data.content = getContent(html);
    dialog.data.buttons = getButtons(html);
    dialog.render(true);
    await wait(500);
    addEventListeners();
    log(`Update Ran`);
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
  function transaction(executionString)
  {
    const [merchant, purchaser] = getValues() || [config.merchants.object.length === 1 ? config.merchants.object[0].id : undefined, config.purchasers.object.length === 1 ? config.purchasers.object[0].id : undefined];
    const [actorID, itemID, type] = executionString.split(`.`);

    log(
      `Merchant   : ${merchant}`,
      `Purchaser  : ${purchaser}`,
      `Actor Id   : ${actorID}`,
      `Item Id    : ${itemID}`,
      `Type       : ${type}`
    );

    /*
      find from, find to
        from adds value to from, removes item from from
        to removes value from to, adds item to to

      get percent of the transaction from the config[purchasers/merchants]
        use type as sent to the transaction
    */
    
    log(`----------------------------------------------------------`);
    let from = game.actors.get(actorID);
    let item = from.items.get(itemID);
    let percent = config[type].percent;
    let value = item.data.data.price;
    let to = actorID === merchant ? game.actors.get(purchaser) : game.actors.get(merchant);

    log(
      `From : ${from.name}`,
      `To : ${to.name}`,
      `Item : ${item.name}`,
      `Percent : ${percent} `,
      `Value : ${value}`,
    );
    log(`___________________________________________________________`);
  }
}