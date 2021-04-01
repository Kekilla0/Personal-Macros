/*
  Button Dialog
    Send an array of buttons to create a dialog that will execute specific callbacks based on button pressed.

    returns a promise (no value)

  data = {
    buttons : [[`Label`, ()=>{Callback} ], ...]
    title : `title_label`,
    content : `Html_Content`
  }
*/
async function buttonDialog(data)
{
  return await new Promise(async (resolve) => {
    let buttons = {}, dialog;

    data.buttons.forEach(([str, callback])=>{
      buttons[str] = {
        label : str,
        callback
      }
    });
  
    dialog = new Dialog({
      title : data.title , 
      content : data.content, 
      buttons, 
      close : () => resolve(true) 
    },{
      width : 300,
    });

    await dialog._render(true);
    dialog.element.find('.dialog-buttons').css({'flex-direction':'column'});
  });
}

/*
  Choose
    Send an array of options for a drop down choose menu. (Single)
    returns a promise (value is chosen element of array) 

  options = [`display_return_value`, ...] or [[return_value , `display`],...],
  prompt = `display_prompt_question` 
*/
async function choose(options = [], prompt = ``)
{
  let value = await new Promise((resolve) => {

    let dialog_options = (options[0] instanceof Array)
      ? options.map(o => `<option value="${o[0]}">${o[1]}</option>`).join(``)
      : options.map(o => `<option value="${o}">${o}</option>`).join(``);
  
    let content = `
    <table style="width=100%">
      <tr><th>${prompt}</th></tr>
      <tr><td><select id="choice">${dialog_options}</select></td></tr>
    </table>`;
  
    new Dialog({
      content, 
      buttons : { OK : {label : `OK`, callback : async (html) => { resolve(html.find('#choice').val()); } } }
    }).render(true);
  });
  return value;
}

/*
  Input 
    Send a HTML type input and prompt
    returns a promise (value = input of HTML)

  type = `html input type ie number, text`
  prompt = `display_prompt_question` 
*/
async function input(type, prompt)
{
  let value = await new Promise((resolve)=>{
    new Dialog({
      title : `Input Dialog`, 
      content : `<table style="width:100%"><tr><th style="width:50%"><label>${prompt}</label></th><td style="width:50%"><input type="${type}" name="input"/></td></tr></table>`,
      buttons : {
        Ok : { label : `Ok`, callback : (html) => { resolve(html.find("input").val()); }}
      }
    }).render(true);
  });
  return value;
}

/*
  multiInput
    Send a 2d Array of Multiple Input's
    Returns a promise (result is an array of HTML values)
  data = [[`Label`, `Type`], ...]
*/
async function multiInput({title = ``, data = []} = {})
{
  return await new Promise((resolve)=> {
    new Dialog({
      title,       
      buttons : {
        Ok : { 
          label : `Ok`, 
          callback : (html) => { 
            let html_values = html.find("input"); 
            resolve(
              data.map((e,i) => e[1] == "number" ? html_values[i].valueAsNumber : e[1] == "checkox" ? html_values[i].checked : html_values[i].value)
            );
          }
        }
      },
      content : `<table style="width:100%">${data.map((input, index) => {
        return `<tr>
                  <th style="width:50%">
                    <label>${input[0]}</label>
                  </th>
                  <td style="width:50%">
                    <input type="${input[1]}" name="${index}"/>
                  </td>
                </tr>`;
        }).join(``)}</table>`
    }).render(true);
  });
}

/*
  quickDialog
    Send an array of data to build a Vertical Input Dialog of Multiple Types
    returns a promise (value is an Array of the chosen values)

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