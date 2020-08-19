(()=>{
  let statString = `4d6kh3`;
  let stats = Array(6).fill(0).map(e=>new Roll(statString).roll().total);
  
  let stat_string_message = ``;

  for(let stat of stats)
  {
    stat_string_message += `<tr><td>${stat}</td></tr>`;
  }

  ChatMessage.create({content : `<table>${stat_string_message}</table>`});
})();