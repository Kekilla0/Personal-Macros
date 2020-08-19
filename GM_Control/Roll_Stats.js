(()=>{
  let statString = `4d6kh3`;
  let stats = Array(6).fill(0).map(e=>new Roll(statString).roll());
  
  let stat_string_message = ``, total_average = 0, total_low = 0, total_high = 0;

  total_average = ((stats[0].parts[0].faces/2) + 0.5) * stats[0].parts[0].rolls.filter(i=> i?.discarded !== true).length;
  total_low = Math.ceil(total_average - (stats[0].parts[0].faces/2));
  total_high = Math.ceil(total_average + (stats[0].parts[0].faces/2));


  let header = ``;
  for(let i = 1; i <= stats[0].parts[0].rolls.length; i++)
  {
    header += `<th>D${i}</th>`; 
  }

  for(let stat of stats)
  {
    stat_string_message += `<tr>`; 
    for(let roll of stat.parts[0].rolls)
    {
      stat_string_message += `<td style="${colorSetter(roll.roll,1,stat.parts[0].faces)}">${roll.roll}</td>`;      
    }
    stat_string_message += `<td style="border-left:1px solid #000; ${colorSetter(stat.total,total_low,total_high)}">${stat.total}</td></tr>`;
  }

  let content = `    
  <table style="text-align:center">
    <tr>
      <th colspan="${stats[0].parts[0].rolls.length + 1}">New Ability Scores</th>
    </tr>
    <tr style="border-bottom:1px solid #000">
      <th colspan="${stats[0].parts[0].rolls.length + 1}">${statString}</th>
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