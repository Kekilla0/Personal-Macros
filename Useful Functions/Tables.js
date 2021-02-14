/*
  Get Table Text
*/
function getTableText({name  = ``} = {})
{
  return game.tables.getName(name).roll().results[0].text;
}

/*
  Wandering Monster Table : creates a table that has all of the NPC entities inside it.
*/
function wanderingMonster()
{
  const info = {
    tableName : `Wandering Monsters`,
    tableData : {
      range : -1, type : 1, weight : 1
    }
  };
  let actors = game.actors.filter(a=>a.data.type !== `character`);
  let data = createData(actors);
  RollTable.create(data);

  function createData(arr = [])
  {
    return {
      name : info.tableName,
      formula : `d${arr.length}`,
      replacement : true,
      displayRoll : true,
      results : arr.map(content=>{
        info.tableData.range++;
        return {
          collection : content.entity,
          drawn : false,
          img : content.img,
          range : [info.tableData.range, info.tableData.range],
          resultId : content.id,
          text : content.name,
          type : info.tableData.type,
          weight : info.tableData.weight
        };
      })
    };
  }
}