(async ()=>{
  let id = await get_folder(game.folders.find(folder=> folder.name === `Generators` && folder.type === `RollTable`).id);
  let exit_char = ``;

  while(exit_char === ``)
  {
    let tb = await get_table();
    await create_Tables(id,tb);

    if(!tb) exit_char = `1`;
  }
})();

async function get_folder(parent_id)
{
  let data = [{type : `select`, label : `Choose Parent Folder`, options : game.folders.filter(folder=> folder.data.parent === parent_id).map(folder=> folder.name)}];
  let folder_name = (await quick_dialog({data, title : `Text to Table`}))[0];

  return game.folders.filter(folder=> folder.data.parent === parent_id).find(folder=>folder.name === folder_name).id;
}

async function get_table()
{
  let dice_type = [`d4`, `d6`, `d8`,`d10`, `d12`, `d20`, `d100`];

  let data = [{type : `textbox`, label : `10`, options : [] }];
  let table_content = (await quick_dialog({data, title : `Text to Table`}))[0];

  let table_array = table_content.split(`&nbsp;`).join(``).split(`\n`).filter(str=> str !== ``);

  if(!table_array) return false;

  let return_object = {
    name : table_array[0],
    tables : []
  };

  var new_table = new Object({name : ``, entries : []});

  for(let i = 1; i < table_array.length; i++)
  {
    if(table_array[i].split(` `).reduce((a,c)=> a || dice_type.includes(c), false))
    {
      if(new_table.name !== ``) return_object.tables.push(new_table);

      new_table = new Object({name : table_array[i], entries : []});
    }else{
      new_table.entries.push(table_array[i]);
    }

    if(i === table_array.length-1) return_object.tables.push(new_table);
  }

  return return_object;
}

async function create_Tables(parent_id, table_object)
{
  let new_folder = await Folder.create({color : ``, name : table_object.name, parent : parent_id, type : "RollTable"});

  for(let table of table_object.tables)
  {
    await RollTable.create(await create_Data(table.name, table.entries));
  }

  async function create_Data(name, text_arr)
  {
    let range = 0, type = 0, weight = 1;

    return {
      name, formula : `d${text_arr.length}`, folder : new_folder.id,
      replacement : true, displayRoll : true,
      results : text_arr.map(text=>{
        range++;
        return {
          drawn : false,
          img : "icons/svg/d20-black.svg",
          range : [range, range],
          resultId : "",
          text,
          type,
          weight
        };
      })
    };
  }
}

async function quick_dialog({data, title = `Quick Dialog`} = {})
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
        }else if(type.toLowerCase() === `textbox`){
          return `<tr><td colspan="2" rowspan="${label}"><textarea id="${i}qd" rows:"${label}">${options instanceof Array ? options.map(o=>`${o}`).join(` `) : options}</textarea></td></tr>`
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

            switch(type.toLowerCase())
            {
              case `select`:
                return html.find(`select#${i}qd`).val();
              case `textbox`:
                return html.find(`#${i}qd`)[0].value;
              case `text` :
              case `password` :
              case `radio` :
                return html.find(`input#${i}qd`)[0].value;
              case `checkbox` :
                return html.find(`input#${i}qd`)[0].checked;
              case `number` :
                return html.find(`input#${i}qd`)[0].valueAsNumber;
            }
          }));
        }}
      }
    }).render(true);
  });
  return value;
}