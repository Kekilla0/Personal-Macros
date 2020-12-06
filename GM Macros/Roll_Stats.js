(()=>{
  let statString = `4d6kh3`;
  let stats = Array(6).fill(0).map(e=>new Roll(statString).roll()).sort((a,b)=>{return b.total-a.total});
  
  let total_average = 0, total_low = 0, total_high = 0, total_header = 0, average_kept = 0, average_change = 0;

  average_kept = average(stats.map(x=> x.terms[0].results.filter(i=> i?.discarded !== true && i?.rerolled !== true).length));
  average_change = average(stats.map(x=> x.terms[0].results.filter(i=>i?.discarded === true || i?.rerolled === true).length));
  
  total_average = (((stats[0].terms[0].faces/2) + 0.5) * average_kept) + average_change;
  total_low = Math.ceil(total_average - (stats[0].terms[0].faces/2));
  total_high = Math.ceil(total_average + (stats[0].terms[0].faces/2));

  total_header = Math.max(...stats.map(x=> x.terms[0].results.length));

  let content = `
  <table style="text-align:center">
    <tr>
      <th colspan="${total_header + 2}">New Ability Scores</th>
    </tr>
    <tr style="border-bottom:1px solid #000">
      <th colspan="${total_header + 2}">${statString}</th>
    </tr>
    <tr style="border-bottom:1px solid #000">
      ${Array(total_header).fill(0).map((v,i)=> `<th>D${i+1}</th>`).join(``)}
      <th style ="border-left:1px solid #000">Total</th>
      <th style ="border-left:1px solid #000">Mod</th>
    </tr>
    ${stats.map((stat,stat_i)=> {

      let return_value = `<tr>`;
      return_value += Array(total_header).fill(0).map((v,i)=>
      {
        let roll = stat.terms[0].results[i]?.result;
        let discard = stat.terms[0].results[i]?.discarded;
        let rerolled = stat.terms[0].results[i]?.rerolled;

        if(roll)
        {
          if(discard) return `<td style="${colorSetter(roll,1,stat.terms[0].faces)}">${roll}-d</td>`;
          if(rerolled) return `<td style="${colorSetter(roll,1,stat.terms[0].faces)}">${roll}-r</td>`;

          return `<td style="${colorSetter(roll,1,stat.terms[0].faces)}">${roll}</td>`;
        }else{
          return `<td></td>`;
        }
      }).join(``)

      return return_value += `<td style="border-left:1px solid #000; ${colorSetter(stat.total,total_low,total_high)}">${stat.total}</td><td style="border-left:1px solid #000; ${colorSetter(Math.floor((stat.total-10)/2),-1,1)}">${Math.floor((stat.total-10)/2)}</td></tr>`
    }).join(``)}
    <tr>
      <td colspan="${total_header}" style="border-top:1px solid #000;"> Sum : </td>
      <td style="border-left:1px solid #000; border-top:1px solid #000;">${stats.reduce((a,c,i)=> a+c.total,0)}</td>
      <td style="border-left:1px solid #000; border-top:1px solid #000;">${stats.reduce((a,c,i)=> a+(Math.floor((c.total-10)/2)),0)}</td>
    </tr>
  </table>
  `;

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