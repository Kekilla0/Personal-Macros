/**
 * Dialog :
 *  Inputs - Time of Day (Morning, Noon, Night)
 *         - Terrain Type (Road, Wood, Foothills, Mountains)
 *         - Hex Traveled (Input)
 *         - Travel Pace (Fast, Normal, Slow)
 * 
 *   Logic - get inputs, iterate over tables -- getting unique #s for both encounters and exploration,
 *           roll mood, store
 *           roll for encounters, if encounters or exploration, store
 *           roll additional times for each 10 miles travelled
 *           if an encounter was rolled for and gotten - roll on Terrain
 *           display & calculate time to destination -- update Simple Calendar time.
 */

let config = {
  _times : ["Morning", "Noon", "Night"],
  _terrain : ["Road", "Wood", "Foothills", "Mountains"],
  _paces : ["Normal", "Fast","Slow"],
  _rest : ["None", "Short", "Long"],
  tables : {
    Road : { 
      Navigation : "DC 0/10. Navigation along these merchant routes is as simple following the path ahead, requiring no navigation check. The surrounding grasslands have no visible landmarks, but the vast, open skies makes discerning direction and distance relatively easy, requiring a DC 10 Wisdom (Survival) check to successfully navigate the plains.",
      Evasion : "DC 25 Dexterity (Stealth); there is little to no visible cover along the trail. Stealth is practically impossible without magic.",
      Foraging : "Foraging. DC 10 Wisdom (Survival); water and small game are plentiful.",
    },
    Wood : { 
      Navigation : "DC 15 Wisdom (Survival); the forest is dense and the canopy is thick. It is difficult to determine a sense of direction, and the sky is scarcely visible.",
      Evasion : "DC 15 Dexterity (Stealth); shadows and cover abound in the Neverwinter Wood, but going is slow.",
      Foraging : "DC 10 Wisdom (Survival); water and game are plentiful.",
    },
    Foothills : {
      Navigation : "DC 10 Wisdom (Survival); while the terrain is sometimes steep and rocky, the sky is free from obscurement. The elevation and lack of tree cover provides good visibility.",
      Evasion : "DC 15 Dexterity (Stealth); the hills and valleys are littered with innumerable crevices and large boulders behind which one might hide.",
      Foraging : "DC 13 Wisdom (Survival); water and game are available, but the hills provide less sustenance than the surrounding forests and grassland.",
    },
    Mountains : {
      Navigation : "DC 15 Wisdom (Survival); the steep elevation, cold climate and treacherous terrain make navigating the mountains a significant challenge. The DC increases to 20 if the party insists on avoiding any climbs.",
      Evasion : " DC 15 Dexterity (Stealth); the cliffsides are strewn with boulders, rocks, and hundreds of crevices in which one may hide.",
      Foraging : "DC 0/18 Wisdom (Survival); water is ever abundant in the form of snow and fresh mountain streams, but there is no edible vegetation and very little game.",
      Climbing : "You may wish to create a skill challenge for your players that can add a layer of excitement to their journey up the mountainside. Divide a segment of cliff into sections. Use the rules found in the description to traverse the surface of the cliff if applicable. Present the players with DC 12 Strength (Athletics) checks for more perilous sections of the cliff. On a failed save, the character immediately begins to fall. ",
      Weather : "The temperature in the Sword Mountains hovers just above freezing, but at night drops to below 0 degrees Fahrenheit. Refer to the Extreme Cold rules found in the DMG (p. 110) or the Dragon of Icespire Peak adventure (p. 30.) Shelter, fire and/or cold weather clothing are required to survive a night on the mountain. (Sources of firewood can be found at the lowest elevations, but not anywhere else.)",
    },
    Mood : { value : null, numbers : [] },
    Terrain : { value : null, numbers : []  },
    Encounters: { value : 5, numbers : [] },
    Exploration : { value : 5, numbers : [] },
  },
  distance : 5,
  pace : { Fast : 4, Normal : 3, Slow : 2 },
  day : { Morning : 04, Noon : 12, Night : 20,},
  data : { },
  date : () => SimpleCalendar.api.timestampToDate(SimpleCalendar.api.timestamp()).display.date,
  time : () => SimpleCalendar.api.timestampToDate(SimpleCalendar.api.timestamp()).display.time,
};

let [timeofday, terrain, pace, rest, hours] = await quickDialog({
  data : [
    {label : "Time of Day : ",        type : "select", options : config._times},
    {label : "Terrain Traversed : ",  type : "select", options : config._terrain},
    {label : "Travel Pace : ",        type : "select", options : config._paces},
    {label : "Rest Type : ",          type : "select", options : config._rest},
    {label : "Hours Travelled : ",    type : "number", options : 0 },
  ],
  title : "Encounter Calculator",
});

await executeMood();
await executeEncounters();
await executeRest();
await executeDragon("Green");
await executeDragon("White");

//resolve all information to chat
await ChatMessage.create({
  content : `
  <table style="width=100%;border=2px solid black">
  <tbody>
    <tr>
      <td>Date : </td>
      <td>${config.date()}</td>
    </tr>
    <tr>
      <td>Time of Day : </td>
      <td>${timeofday}</td>
    </tr>
    <tr>
      <td>Terrain : </td>
      <td>${terrain}</td>
    </tr>
  </tbody>
  </table>
  <tbody>
  <table>
    <tr>
      <td style="width:25%">Distance : </td>
      <td style="width:25%">Mi/Hex</td>
      <td style="width:50%">${Math.floor(config.pace[pace] * hours)}/${Math.floor(config.pace[pace] * hours / config.distance)}</td>
    </tr>
  </tbody>
  </table>
  <table><tbody>
    <tr>
      <td style="width:50%">Venomfang Location : </td>
      <td style="width:50%">${config.data["Green"] ?? "Thundertree" }</td>
    </tr>
    <tr>
      <td style="width:50%">Cyrovain Location : </td>
      <td style="width:50%">${config.data["White"] ?? "Icespire Hold" }</td>
    </tr>
  </tbody></table>
  ${
    rest !== "None" ? `
    <table><tbody>
      <tr>
        <td style="width:30%">${rest} Rest : </td>
        <td style="width:70%">${config.data[rest] ?? "Nothing Important Occurs" }</td>
      </tr>
    </tbody></table>
    ` : ``
  }
  ${
    rest !== "None" ? `
    <table><tbody>
      <tr>
        <td style="width:30%">${rest} Rest : </td>
        <td style="width:70%">${config.data[rest] ?? "Nothing Important Occurs" }</td>
      </tr>
    </tbody></table>
    ` : ``
  }
  <tbody>
  <table>
    ${
      Object.entries(config.tables[terrain]).reduce((a,[k,v],c,d) => a += `
      <tr>
        <td style="width:30%">${k} : </td>
        <td style="width:70%">${v}</td>
      </tr>`, ``)
    }
    <tr>
      <td style="width:30%">Mood : </td>
      <td style="width:70%">${config.data?.["Mood"] ?? ""}</td>
    </tr>
    ${
      (config.tables.Exploration.numbers.includes(config.data.r2.total) && config.data.r1.total == 2) ? `
      <tr>
        <td>Explore [${config.tables.Exploration.numbers.map(n => n == config.data.r2.total ? `<b>${n}</b>` : n).join(",")}] </td>
        <td>${config.data?.["Exploration"] ?? ""}</td>
      </tr>
      ` : ""
    }
    ${
      (config.tables.Encounters.numbers.includes(config.data.r2.total) && config.data.r1.total == 2) ? `
      <tr>
        <td>Enemy [${config.tables.Encounters.numbers.map(n => n == config.data.r2.total ? `<b>${n}</b>` : n).join(",")}] : </td>
        <td>${config.data?.["Encounters"] ?? ""}</td>
      </tr>
      <tr>
        <td>Terrain  :</td>
        <td>${config.data?.["Terrain"] ?? ""}</td>
      </tr>
      ` : ""
    }
  </tbody>
  </table>
  `,
  whisper : ChatMessage.getWhisperRecipients("GM"),
});

console.log({ config, timeofday, terrain, pace, hours, });

async function executeMood(){
  await executeTable({ terrain, name : "Mood"});
}

async function executeEncounters(){
  let r1 = await new Roll(`1d2`).evaluate({ async : true });
  await game.dice3d.showForRoll(r1, game.user);
  let r2 = await new Roll(`1d20`).evaluate({ async : true });

  config.data.r1 = r1;
  config.data.r2 = r2;

  if(pace == "Fast"){ config.tables.Encounters.value += 3; config.tables.Exploration.value -= 2; }
  if(pace == "Slow"){ config.tables.Encounters.value -= 2; config.tables.Exploration.value += 3; }

  buildValues();

  if(r1.total === 2){
    await game.dice3d.showForRoll(r2, game.user);
    if(config.tables.Encounters.numbers.includes(r2.total)){
      await executeTable({ terrain, name : "Encounters"});
      await executeTable({ terrain, name : "Terrain" });

      //add time
      getTime({ name : "Encounters" });
    }

    if(config.tables.Exploration.numbers.includes(r2.total)){
      await executeTable({ terrain, name : "Exploration"});

      //add time
      getTime({ name : "Exploration"});
    }
  }
}

async function executeRest(){
  if(rest != "None"){
    let r3 = await new Roll(`1d6`).evaluate({ async : true });
    await game.dice3d.showForRoll(r3, game.user);
    config.data.r3 = r3;

    if(r3.total == 1 || r3.total == 8)
      executeTable({ terrain : "Rest", name : rest });
  }
}

async function executeDragon(type = ""){
  if(!["Green", "White"].includes(type)) return;

  let r4 = await new Roll(`1d20`).evaluate({ async : true });
  await game.dice3d.showForRoll(r4, game.user);

  config.data[`${type}roll`] = r4;

  if(r4.total <= 2 || r4.total >= 19 && timeofday == "Morning"){
    await executeTable({ terrain : "Dragon", name : type });
  }

  if(r4.total <= 3 || r4.total >= 18 && timeofday == "Noon"){
    await executeTable({ terrain : "Dragon", name : type });
  }

  if(r4.total == 1 || r4.total == 20 && timeofday == "Night"){
    await executeTable({ terrain : "Dragon", name : type });
  }
}

async function executeTable({ /* time = "" ,*/ terrain = "", name = "" }){
  let table = game.tables.getName(`${terrain}_${name}`);
  if(!table) return;

  //if table results available < half => reset the table.
  if(!table.replacement && table.results.filter(r => r.drawn).length * 2 > table.results.size)
    await table.resetResults();

  let {results, roll} = await table.draw({ displayChat : false });
  await game.dice3d.showForRoll(roll, game.user);

  config.data[name] = results.map(r => r.text).join("<br>");
}

function getUnique(arr, max){
  let val = (max).random() + 1;

  if(arr.includes(val))
    return getUnique(arr, max);
  else
    return val;
}

function buildValues(){
  Array(config.tables.Encounters.value + config.tables.Exploration.value)
    .fill(0).map((a,b,c) =>{
        if(b < config.tables.Encounters.value)
          config.tables.Encounters.numbers.push(getUnique([...config.tables.Encounters.numbers, ...config.tables.Exploration.numbers], 20))
        else
          config.tables.Exploration.numbers.push(getUnique([...config.tables.Encounters.numbers, ...config.tables.Exploration.numbers], 20))
    });
}

function getTime({ name = "" }){
  if(name == "") return;

  let start = config.day[timeofday];
  let hour = start + (8).random();
  let minute = (60).random();

  if(hour > 24) hour -= 24;

  config.data[name] = `(${hour}:${minute}) ` + config.data[name];
}