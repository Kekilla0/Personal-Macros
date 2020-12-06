(async ()=> {
  const parent = `PJvU6FEnUXZOKEct`;
  const list = game.folders.filter(folder => folder.data.type === "RollTable" && folder.data.parent === parent).map(folder=> ([folder.id, folder.name]));

  let type = await choose(list, `Choose Type :  `);

  const secondary_list = game.folders.filter(folder=> folder.data.type === "RollTable" && folder.data.parent === type).map(folder=> ([folder.id, folder.name]));
  const chosen = secondary_list[Math.ceil(Math.random()*secondary_list.length)];

  execute_folder_tables(game.folders.get(chosen[0]).content, chosen[1]);
})();

async function execute_folder_tables(tables= [], name)
{
  let messages = [];
  tables.forEach(async (table) =>  {
    let random_text = await getText(table,false);
    messages.push([table.name, random_text]);
  });

  await wait(tables.length*10);

  let content = `
  <h2>${name}</h2>
  <table style="border:1px solid black;border-collapse: collapse">
    ${messages.map(([a,b]) => `<tr><td style="border:1px solid black;">${a}</td><td style="border:1px solid black;">${b}</td></tr>`).join(``)}
  </table>`;

  ChatMessage.create({
    content, whisper : ChatMessage.getWhisperRecipients("GM")
  });
}
async function getText(table, display)
{
  try {
    let draw_result = await table.draw({displayChat : display});
    return draw_result.results[0].text;
  }catch (error) { console.error (`${table_name} has had an error.`);}
}

async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

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