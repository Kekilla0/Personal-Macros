Item.prototype.getCardHTML = function ({ attacks = 1, sendMessage = true, description = false, whisper = game.settings.get("core", "rollMode"), event = {}} = {}){
  const message = (...args) => ChatMessage.create(ChatMessage.applyRollMode({content : args.join(``)}, whisper));
  let crit = Array(attacks).fill(false);
  const item = this;
  const HTML = `
  <div style="display:flex;flex-direction:column;background:rgba(0, 0, 0, 0.1);border:1px solid #999;box-shadow: 0 0 0px #fff inset;">
    ${getHeaderHTML()}
    ${description ? getDescriptionHTML() : ``}
    ${this.hasSave ? getSaveHTML() : ``}
    <div style="display:flex;flex-direction:row;width:100%">
      <div style="display:flex;flex-direction:column;justify-content:space-evenly;text-align:center;width:100%;">${this.hasAttack ? getAttackHTML(attacks) :  ``}</div>
      <div style="display:flex;flex-direction:column;justify-content:space-evenly;text-align:center;width:100%;">${this.hasDamage ? getDamageHTML(attacks) :  ``}</div>
    </div>
    
  </div>
  `;

  if(sendMessage) message(HTML);
  console.log(crit);
  return HTML;

  

  function getHeaderHTML(){
    return `
    <div style="display:flex;text-align:left;flex-direction:row;">
      <img style="flex : 0 0 36px; margin-right:5px" src="${item.actor.img}" width="42" height="42"/>
      <img style="flex : 0 0 36px; margin-right:5px" src="${item.img}" width="42" height="42"/>
      <div style="display:flex;flex-direction:column;flex-wrap:nowrap;justify-content:flex-start;">
        <div style="font-size:small;">${item.actor.name}</div>
        <div style="font-size:small;">${item.name}</div>
      </div>
    </div>
    `;
  }

  function getDescriptionHTML(){
    return `
    <div style="display:flex;justify-content:center;align-items:center;width:100%;height:100%;">
      <div style="display:flex;text-align:center;font-size:small;padding:5px;margin:5px;background:rgba(0, 0, 0, 0.1);border:1px solid #999;box-shadow: 0 0 0px #fff inset;">
        ${item.data.data.description.value}
      </div>
    </div>
    `;
  }

  function getSaveHTML(){
    let { ability, dc } = getSaveINFO();
    return `
    <div style="display:flex;flex-direction:row;width:100%;">
      <div style="display:flex;flex-direction:column;justify-content:space-evenly;text-align:center;width:100%;"> ${ability} </div>
      <div style="display:flex;flex-direction:column;justify-content:space-evenly;text-align:center;width:100%;"> DC : ${dc} </div>
    </div>
    `;
  
    function getSaveINFO(){
      if(!item.hasSave) return;
      let { ability, dc } = item.data.data.save;
      return { 
        ability : `${CONFIG.DND5E.abilities[ability]} Save`,
        dc
      }
    }
  }

  function getAttackHTML(number){
    const attackRolls = Array(number).fill(0).map((e,i)=>{
      let info = getAttackINFO();
      if(info[0].roll.dice[0].total === info[0].roll.dice[0].faces || info[1].roll.dice[0].total === info[1].roll.dice[0].faces) 
        crit[i] = true;
      return info;
    });
    const formula = attackRolls[0][0].roll?.formula;
    return `
    <div style="font-size:x-small;">Attack Roll</div>
    <div style="font-size:x-small;">[${formula}]</div>
    ${attackRolls.reduce((acc, rolls)=> acc += `
      <div style="display:flex;flex-direction:row;justify-content:space-evenly;background:rgba(0, 0, 0, 0.1);border:1px solid #999;box-shadow: 0 0 0px #fff inset;">
        ${rolls.reduce((acc, {roll})=> acc += `<div style="display:flex;font-size:12px;flex-shrink:1;${roll.terms[0].results[0].result === 1 ? `color:red` : ``}${roll.terms[0].results[0].result === roll.terms[0].faces ? `color:green` : ``}">${roll.total}</div>`, ``)}
      </div>
    `, ``)}
    `;
  
    function getAttackINFO(){
      if(!item.hasAttack) return;
      let {parts, rollData} = item.getAttackToHit();
      return Array(2).fill(0).map((e,i)=> ({ roll : new Roll(`1d20 + ${parts.join(` + `)}`, rollData).evaluate() }));
    } 
  }

  function getDamageHTML(number){
    const damageInfo = Array(number).fill(0).map((e,i)=> getDamageINFO(crit[i]));
    console.log( damageInfo );
    return `
    <div style="font-size:x-small;">Damage Roll</div>
    <div style="font-size:x-small;flex-wrap:nowrap;">[${damageInfo[0].formula}]</div>
    ${damageInfo.reduce((acc, { formula, type, rolls })=> acc += `
      <div style="display:flex;flex-direction:row;justify-content:space-evenly;background:rgba(0, 0, 0, 0.1);border:1px solid #999;box-shadow: 0 0 0px #fff inset;">
        ${rolls.reduce((acc, {roll, type, textColor, backgroundColor})=> acc += `
        <div style="display:flex;font-size:12px;color:${textColor};background:${backgroundColor};">${roll.total}</div>
        `, ``)}
      </div>
    `, ``)}
    `;
  
    /*
      Change the INFO functions to return array of div's (row) for #s rolls
    */
    function getDamageINFO(isCrit){
      if(!item.hasDamage) return;
      let damageArray = item.getDerivedDamageLabel();
      if(item.isVersatile && event?.shiftKey){
        let versitileDice = item.data.data.damage.versatile.split("+")[0];
        let [ originalDice, ...modifiers ] = damageArray[0].formula.split("+");
        damageArray[0].formula =  `${versitileDice} + ${modifiers.join(` + `)}`;
      } 
      if(isCrit) item.data.data.damage.parts.forEach((ele) => damageArray.push({ formula : ele[0].split("+")[0], damageType : "crit" }));

      let damageColors = {
        acid : "MediumSeaGreen", bludgeoning : "Gainsboro", cold : "AliceBlue", fire : "OrangeRed", force : "Plum", 
        lightning : "RoyalBlue", necrotic : "DimGrey", piercing : "Gainsboro", poison : "YellowGreen", psychic : "MediumPurple", 
        radiant : "Yellow", slashing : "Gainsboro", thunder : "LavenderBlush", crit : "HotPink",
      }

      return {
        formula : damageArray.reduce((acc, {formula}, ind) =>{
          if(ind == 0) return formula;
          else return acc += ` + ${formula}`;
        }, ``),
        type : damageArray.reduce((acc, {damageType}, ind) =>{
          if(ind == 0) return damageType;
          else return acc += `/${damageType}`;
        }, ``),
        rolls : damageArray.map(({formula, damageType}, i)=>{
          let roll = new Roll(`${formula}`).evaluate();
          let isMin = roll.terms[0].results[0].result === 1;
          let isMax = roll.terms[0].results[0].result === roll.terms[0].faces;
          return {
            roll, type : damageType, backgroundColor : damageColors[damageType], textColor : isMin ? `Red` : isMax ? `Green` : `Black`,
          }
        })
      }
    }
  }
}

