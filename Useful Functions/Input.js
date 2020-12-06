/*
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
  data = [[`Label`, `Type`], ...]
*/
async function multi_input({title = ``, data = []} = {})
{
  let value = await new Promise((resolve)=> {
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
  return value;
} 