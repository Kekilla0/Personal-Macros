/* This uses the rules from https://www.gmbinder.com/share/-M6xAC_2zw4BzpByxO-c */
let config = {
  runtime_days : 16,
  start_date : { year : 1491, month : 4, day : 5, hour : 4, minute : 0, second : 0 , },
  _start : { year : 1491, month : 4, day : 5, hour : 4, minute : 0, second : 0 , },
  _days : 20,
  _date : { year : 1491, month : 4, day : 5, hour : 4, minute : 0, second : 0, },
  _time : { morning : 04, evening : 12, night : 20, },
  _current : "morning",
  _i : 0,
  _value : new Roll(`1d100`).evaluate({ async : false }).total,
  _old_value : 0,
  value : new Roll(`1d100`).evaluate({ async : false }).total, //or add your own starting value
  wait : async (ms) => new Promise((resolve)=> setTimeout(resolve, ms)),
  macro_id : "xrMBPC5zgzx38P5h",
};

window["weather"] = {};

//set day to config.start_date
SimpleCalendar.api.setDate(config.start_date);
await config.wait(100);

for(let i = 0; i < (config.runtime_days * SimpleCalendar.api.getCurrentCalendar().time.hoursInDay); i++){
  let calendar = SimpleCalendar.api.getCurrentCalendar();
  let season = SimpleCalendar.api.getCurrentSeason().name;
  let {year, month, day, seconds} = calendar.currentDate;
  let table = game.tables.getName(season);
  let str = `${year}.${month}.${day}.${seconds}`;
  let change = Math.round((new Roll(`1d100`).evaluate({ async : false }).total - config.value)/10);
  //let change = (config.value > 80 ? [-3,-2, -1, 0, 1, 2] : [-2, -1, 0, 1, 2, 3]).random();
  
  if(i == 0)  
    await write_note(SimpleCalendar.api.timestampToDate(SimpleCalendar.api.timestamp()), get_table_value(table, config.value), str);
 
  //console.log("Data | ", { /*calendar, season, year, month, day, seconds, table,*/ change, str });

  if(get_table_value(table, config.value) !== get_table_value(table, Math.clamped(config.value + change, 0, 100)))
    await write_note(SimpleCalendar.api.timestampToDate(SimpleCalendar.api.timestamp()), get_table_value(table, Math.clamped(config.value + change, 0, 100)), str);
  
  await config.wait(100);

  config.value = Math.clamped(config.value + change, 0, 100);
  SimpleCalendar.api.changeDate({hour: 1,});
  await config.wait(100);
  
  //maybe every 100 hours, reset the variable.
  if(i % 24 === 0 && i != 0){
    config.value = new Roll(`1d100`).evaluate({ async : false }).total;
    console.log("Value Reset : ", config.value);
  }
}

//set day to config.start_date
SimpleCalendar.api.setDate(config.start_date);
await config.wait(100);

/* Write to Day */
async function write_note(date, note, str = ''){
  //console.log(`Note | ${note} : `, { date });
  
  if(str != '')
    window['weather'][str] = { note, value : config.value };
  
  await SimpleCalendar.api.addNote(
    note ,
    `Weather`, 
    date, 
    date, 
    false, 
    0, 
    [],
    'active',
    config.macro_id,
    ['default'],
    [game.user.id],
  );
}

function get_table_value(table, value){
  let result = table.getResult(value);
  if(result?.documentCollection === "RollTable")
    return get_table_value(game.tables.get(result.documentId));
  return result?.text;
}

/*
SimpleCalendar.api.setDate(config._date);
await config.wait(100);

for(let i=0; i < (config._days * 3); i++){
  let calendar = SimpleCalendar.api.getCurrentCalendar();
  let season = SimpleCalendar.api.getCurrentSeason().name;
  let {year, month, day, seconds} = calendar.currentDate;
  let table = game.tables.getName(season);
  
  if(i % 8 == 0){
    config._value = new Roll(`1d100`).evaluate({ async : false }).total;
  }else{
    config._value += (new Roll(`1d20`).evaluate({ async : false }).total * (new Roll(`1d2`).evaluate({ async : false }).total == 1 ? 1 : -1));
  }
  
  //check if value is the same =>  write_value
  if(get_table_value(table, config._value) !== get_table_value(table, config._old_value)){
    await write_note(SimpleCalendar.api.timestampToDate(SimpleCalendar.api.timestamp() + get_time()), get_table_value(table, config._value));
  }
  
  //go forward 8 hours
  SimpleCalendar.api.changeDate({hour: 8,});
  await config.wait(100);
  
  config._old_value = config._value;
}

SimpleCalendar.api.setDate(config._start);
await config.wait(100);


function get_time(){
  return ((8).random() * 60 * 60) + ((60).random() * 60) + (60).random();
}

async function write_note(date, note, str = ''){
  //console.log(`Note | ${note} : `, { date });
  
  if(str != '')
    window['weather'][str] = { note, value : config.value };
  
  await SimpleCalendar.api.addNote(
    note ,
    `Weather`, 
    date, 
    date, 
    false, 
    0, 
    ['Weather'],
    'active',
    config.macro_id,
    [game.user.id],
    [game.user.id],
  );
}

function get_table_value(table, value){
  let result = table.getResult(value);
  if(result?.documentCollection === "RollTable")
    return get_table_value(game.tables.get(result.documentId));
  return result?.text;
}
*/