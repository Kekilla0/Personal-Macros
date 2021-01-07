/*
  data = [{}]
  {} = {
    type : `type of input`, //text, password, radio, checkbox, number, select
    label : `Whatever you want to be listed`,
    options : [``] or ``
  }
*/

async function quickDialog({data, title = `Quick Dialog`} = {})
{
  data = data instanceof Array ? data : [data];

  let value = await new Promise((resolve) => {
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
  return value;
}