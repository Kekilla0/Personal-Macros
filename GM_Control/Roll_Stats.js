(()=>{
  let statString = `4d6kh3`;
  let stats = Array(6).fill(0).map(e=>new Roll(statString).roll()).sort((a,b)=>{return b.total-a.total});
  
  let stat_string_message = ``, total_average = 0, total_low = 0, total_high = 0, total_header = 0, average_kept = 0, average_change = 0;

  average_kept = average(stats.map(x=> x.parts[0].rolls.filter(i=> i?.discarded !== true && i?.rerolled !== true).length));
  average_change = average(stats.map(x=> x.parts[0].rolls.filter(i=>i?.discarded === true || i?.rerolled === true).length));
  
  total_average = (((stats[0].parts[0].faces/2) + 0.5) * average_kept) + average_change;
  total_low = Math.ceil(total_average - (stats[0].parts[0].faces/2));
  total_high = Math.ceil(total_average + (stats[0].parts[0].faces/2));

  total_header = Math.max(...stats.map(x=> x.parts[0].rolls.length));

  let header = ``;
  for(let i = 1; i <= total_header; i++)
  {
    header += `<th>D${i}</th>`; 
  }

  for(let stat of stats)
  {
    stat_string_message += `<tr>`;
    for(let i = 0; i < total_header; i++)
    {
      let roll = stat.parts[0].rolls[i]?.roll;
      let discard = stat.parts[0].rolls[i]?.discarded;
      let rerolled = stat.parts[0].rolls[i]?.rerolled;

      if(roll)
      {
        if(discard){
          stat_string_message += `<td style="${colorSetter(roll,1,stat.parts[0].faces)}">${roll}-d</td>`;
        }else if (rerolled){
          stat_string_message += `<td style="${colorSetter(roll,1,stat.parts[0].faces)}">${roll}-r</td>`;
        }else{
          stat_string_message += `<td style="${colorSetter(roll,1,stat.parts[0].faces)}">${roll}</td>`;
        }
      }else{
        stat_string_message += `<td></td>`;
      }         
    } 
    stat_string_message += `<td style="border-left:1px solid #000; ${colorSetter(stat.total,total_low,total_high)}">${stat.total}</td></tr>`;
  }

  let content = `    
  <table style="text-align:center">
    <tr>
      <th colspan="${total_header + 1}">New Ability Scores</th>
    </tr>
    <tr style="border-bottom:1px solid #000">
      <th colspan="${total_header + 1}">${statString}</th>
    </tr>
    <tr style="border-bottom:1px solid #000">
      ${header}
      <th style ="border-left:1px solid #000">Total</th>
    </tr>
      ${stat_string_message}
  </table>`;


  ChatMessage.create({content});
})();

function colorSetter(number,low,high)
{
  if(number <= low) return `color:red`;
  if(number >= high) return `color:green`;
  return ``;
}

function average(nums)
{
  return nums.reduce((a,b) => (a+b))/nums.length;
}