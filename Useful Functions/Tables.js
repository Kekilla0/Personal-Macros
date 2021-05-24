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

/*
  createTabe
  @entries : array of some type => string, item, actor, etc
  @name : name of the new Table

  @return : returns the promise of the new RollTable
*/
async function createTable({ entries, name })
{
  let data = createData(entries, name);
  return await RollTable.create(data);

  function createData(arr = [], tableName)
  {
    let range = [-1,-1], type = 1, weight =1;
    return {
      name : tableName, formula : `d${arr.length}`, replacement : true, displayRoll : true, 
      results : arr.map(c=> {
        range = range.map(r => r+=1);
        let s = c instanceof String || typeof c === 'string';
        return {
          collection : s ? `string` : c.entity,
          drawn : false, 
          img : s ? DEFAULT_TOKEN : c.img, 
          range, type, weight,
          text : s ? s : c.name,
        }
      })
    };
  }
}

/*
  0.8.X non-async Roll
*/
RollTable.prototype.getResult = function(){
  return this.getResultsForRoll(new Roll(this.data.formula).evaluate({ async  : false }).total);
}