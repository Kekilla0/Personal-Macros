/*
  For use with item macro 1.5.2
*/

const message= (...args) => ChatMessage.create({content : args.join(``)});
const rollData = item.getRollData();
const attacks = Math.ceil(rollData.attr.hp.value/5);

let rolls = Array(attacks).fill(0).map((ele, ind)=> {
  let attackRolls = Array(2).fill(0).map((ele, ind) =>
    new Roll(`1d20 + ${rollData.item.proficient ? `@prof` : ``} + @mod`, rollData).roll().total
  );
  let damageRolls = rollData.item.damage.parts.map((ele, ind) =>
    new Roll(`${ele[0]}`, rollData).roll().total //ele[1]
  );

  return `
  <div style="display:flex;text-align:center;flex-direction:row;justify-content:space-evenly;width:100%;">
    <div style="display:flex;flex-direction:row;width:50%;justify-content:space-evenly;${shadowBox()}">${attackRolls.reduce((acc, val)=> acc+=`<div style="display:flex;font-size:12px;flex-shrink:1;">${val}</div>`, ``)}</div>
    <div style="display:flex;flex-direction:row;width:50%;justify-content:space-evenly;${shadowBox()}">${damageRolls.reduce((acc, val)=> acc+=`<div style="display:flex;font-size:12px;flex-shrink:1;">${val}</div>`, ``)}</div>
  </div>
  `;
});

message(
  `<div style="display:flex;flex-direction:column;${shadowBox()}">`,
  getHeader(),
  ...rolls,
  `</div>`
);

function getHeader(){
  return `
  <div style="display:flex;text-align:left;flex-direction:row;">
    <img style="flex : 0 0 36px; margin-right:5px" src="${item.actor.img}" width="42" height="42"/>
    <h3 style="display:flex; flex-direction:column; flex-wrap:nowrap; justify-content: flex-start; align-items:center;">${item.actor.name} - ${item.name}</h3>
  </div>
  <div style="display:flex;text-align:center;flex-direction:row;justify-content:space-evenly;width:100%;">
    <div style="width:50%;justify-content:space-evenly;"><b>Attack Roll</b></div>
    <div style="width:50%;justify-content:space-evenly;"><b>Damage Roll</b></div>
  </div>
  `;
}

function shadowBox(){
  return `background:rgba(0, 0, 0, 0.1);border:1px solid #999;box-shadow: 0 0 0px #fff inset;"`
}