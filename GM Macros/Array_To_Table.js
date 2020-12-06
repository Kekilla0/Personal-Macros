(() => {
  game.journal.forEach(async (journal)=>{
    const {content, name} = journal.data;
    let data = await create_Data(content.split(`<p>`).join(``).split(`</p>`).join(``).split(`&nbsp;`), name);
    RollTable.create(data);
  });
})();

async function create_Data(text_values, table_name)
{
  let range = -1, type = 0, weight = 1;

  return {
    name : `${table_name}`,
    formula : `d${text_values.length}`,
    replacement : true,
    displayRoll : true,
    results : text_values.map(text=>{
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