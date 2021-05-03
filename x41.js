(async ()=> {
  //get the two numbers
  let [pos_num, neg_num] = await quickDialog({
    data : [
      { type : "number", label : "Positive Dice Pool", options : 1, },
      { type : "number", label : "Negative Dice Pool", options : 1, },
  ],
    title : "The World Zombie Apocalypse",
  });

  //get arrays rolled
  let pos_arr = fill_array(pos_num);
  let neg_arr = fill_array(neg_num);

  //display rolls in 1 chat card
  doubleRoll({ rolls : [pos_arr, neg_arr], title : "Zombie Roll Apocalypse Roll", flavor : ``, img : ``} )
})();

async function quickDialog({data, title = `Quick Dialog`} = {})
{
  data = data instanceof Array ? data : [data];

  return await new Promise((resolve) => {
    let content = `
    <table style="width:100%">
      ${data.map(({type, label, options}, i)=> {
        if(type.toLowerCase() === `select`)
        {
          return `<tr><th style="width:50%"><label>${label}</label></th><td style="width:50%"><select id="${i}qd">${options.map((e,i)=> `<option value="${e}">${e}</option>`).join(``)}</td></tr>`;
        }else if(type.toLowerCase() === `checkbox`){
          return `<tr><th style="width:50%"><label>${label}</label></th><td style="width:50%"><input type="${type}" id="${i}qd" ${options || ``}/></td></tr>`;
        }else{
          return `<tr><th style="width:50%"><label>${label}</label></th><td style="width:50%"><input type="${type}" id="${i}qd" value="${options instanceof Array ? options[0] : options}"/></td></tr>`;
        }
      }).join(``)}
    </table>`;

    new Dialog({
      title, content,
      buttons : {
        Ok : { label : `Ok`, callback : (html) => {
          resolve(Array(data.length).fill().map((e,i)=>{
            let {type} = data[i];
            if(type.toLowerCase() === `select`)
            {
              return html.find(`select#${i}qd`).val();
            }else{
              switch(type.toLowerCase())
              {
                case `text` :
                case `password` :
                case `radio` :
                  return html.find(`input#${i}qd`)[0].value;
                case `checkbox` :
                  return html.find(`input#${i}qd`)[0].checked;
                case `number` :
                  return html.find(`input#${i}qd`)[0].valueAsNumber;
              }
            }
          }));
        }}
      }
    }).render(true);
  });
}

function fill_array(num){
  return Array(num).fill(0).map(e=> new Roll(`1d6`).roll()).sort((a,b)=>a.total - b.total);
}

function remove_element(arr, ele){
  const index = arr.indexOf(ele);
  return arr.splice(index, 1);
}

function combine(arr)
{
  return arr.reduce((acc, val, ind)=>{
    if(ind === 0)
    {
      return val;
    }else{
      let returnVal = new Roll(`${acc._formula} + ${val._formula}`);

      returnVal.data = {};
      returnVal.results = [...acc.results,`+`, ...val.results];
      returnVal.terms = [...acc.terms,`+`,...val.terms];
      returnVal._rolled = true;
      returnVal._total = acc._total + val._total;

      return returnVal;
    }
  });
}

async function doubleRoll({ rolls , title = ``, img = ``, flavor = ``})
{
  let [original_a,original_b] = rolls;
  original_a = combine(original_a);
  original_b = combine(original_b);

  await displayRoll(original_a);
  await displayRoll(original_b);

  //iterate through pos array, removing any duplicates from both pos and neg array
  for(const roll of rolls[0]){
    const find = rolls[1].find(r => r.total === roll.total)
    if(find){
      remove_element(rolls[0], roll);
      remove_element(rolls[1], find);
    }
  }

  let [trim_a, trim_b] = rolls;
  trim_a = combine(trim_a);
  trim_b = combine(trim_b);

  console.log(original_a, original_b);
  console.log(trim_a, trim_b);

  let template = `
    <hr>
    <div style="display:flex; flex-direction:row; flex-wrap:nowrap; justify-content:flex-start; align-items:center;">
      ${ img !== "" ? `<img style="flex : 0 0 36px; margin-right:5px" src="${img}" title="${title}" width="42" height="42"/>` : ``}      
      <div style="display:flex; flex-direction:column; flex-wrap:nowrap; justify-content: flex-start; align-items:center;">
        ${title !== "" ? `<h3 style="flex : 1">${title}</h3>` : `` }
        ${flavor !== "" ? `<p>${flavor}</p>` : ``}        
      </div>
      
    </div>
    <hr>
    <div style="display:flex; flex-direction:row; flex-wrap:nowrap; justify-content:nospace; flex-grow:1">
      <span style="flex:1; background:rgba(0, 0, 0, 0.15);border: 1px solid #999;border-radius: 4px;box-shadow: 0 0 2px #fff inset; font-size: 16px; text-align:center; padding: 2px 0px 2px 0px;">
        Positive Dice Pool
      </span>
      <span style="flex:1; background:rgba(0, 0, 0, 0.15);border: 1px solid #999;border-radius: 4px;box-shadow: 0 0 2px #fff inset; font-size: 16px; text-align:center; padding: 2px 0px 2px 0px;">
        Negative Dice Pool
      </span>
    </div>
    <div style="display:flex; flex-direction:row; flex-wrap:nowrap; justify-content:nospace; flex-grow:1">
      <span style="flex:1; background:rgba(0, 0, 0, 0.15);border: 1px solid #999;border-radius: 4px;box-shadow: 0 0 2px #fff inset; font-size: 16px; text-align:center; padding: 2px 0px 2px 0px;">
        ${original_a.dice.reduce((a,v) => a+`${v.total}/`, ``).slice(0,-1)}
      </span>
      <span style="flex:1; background:rgba(0, 0, 0, 0.15);border: 1px solid #999;border-radius: 4px;box-shadow: 0 0 2px #fff inset; font-size: 16px; text-align:center; padding: 2px 0px 2px 0px;">
        ${original_b.dice.reduce((a,v) => a+`${v.total}/`, ``).slice(0,-1)}
      </span>
    </div>
    <div style="display:flex; flex-direction:row; flex-wrap:nowrap; justify-content:nospace; flex-grow:1; padding: 4px 0px 0px 0px">
      <span style="flex:1; background:rgba(0, 0, 0, 0.15);border: 1px solid #999;border-radius: 4px;box-shadow: 0 0 2px #fff inset; font-size: 18px; text-align:center; padding: 2px 0px 2px 0px;">
        <b>${trim_a.dice.reduce((a,v) => a+`${v.total}/`, ``).slice(0,-1)}</b>
      </span>
      <span style="flex:1; background:rgba(0, 0, 0, 0.15);border: 1px solid #999;border-radius: 4px;box-shadow: 0 0 2px #fff inset; font-size: 18px; text-align:center; padding: 2px 0px 2px 0px;">
        <b>${trim_b.dice.reduce((a,v) => a+`${v.total}/`, ``).slice(0,-1)}</b>
      </span>
    </div>`;

  return await ChatMessage.create({ content : template });
}

async function displayRoll(roll){
  return await game.dice3d?.showForRoll(roll, game.user, true, game.users.map(u=> u.id !== game.user.id));
}