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
  timeofday : ["Morning", "Noon", "Night"],
  terrain : ["Road", "Wood", "Foothills", "Mountains"],
  tables : [
    { name : "Mood", value : 100 },
    { name : "Terrain", value : 100 },
    { name : "Encounters", value : 15 },
    { name : "Exploration", value : 15 },
  ],
  distance : 5,
  pace : { Fast : 4, Normal : 3, Slow : 2 },
};

let [timeofday, terrain, pace, hex] = await quickDialog({
  data : [
    {label : "Time of Day : ", type : "select", options : config.timeofday},
    {label : "Terrain Traversed : ", type : "select", options : config.terrain},
    {label : "Travel Pace : ", type : "select", options : Object.keys(config.pace)},
    {label : "Number of Hexes : ", type : "number", options : 0 },
  ],
  title : "Encounter Calculator",
});

