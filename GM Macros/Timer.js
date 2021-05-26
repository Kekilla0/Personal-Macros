let seconds_selected = 0;
let seconds_left = 0;

let times = {
  buttons : [
    ["1 Min", ()=> { seconds_selected = seconds_left = 60; update_dialog();}],
    ["5 Min", ()=> { seconds_selected = seconds_left = 300; update_dialog();}],
    ["10 Min", ()=> { seconds_selected = seconds_left = 600; update_dialog(); }],
    ["15 Min", ()=> { seconds_selected = seconds_left = 900; update_dialog(); }],
    ["20 Min", ()=> { seconds_selected = seconds_left = 1200; update_dialog(); }],
    ["30 Min", ()=> { seconds_selected = seconds_left = 1800; update_dialog(); }]
  ],
  content : `<div sytle="width:100%; text-align:center;"><h2> Choose a timer limit : </h2></div>`,
  title : `Timer Selector`
};

async function button_dialog(data)
{
  let value = await new Promise((resolve) => {
    let buttons = {}, dialog;

    data.buttons.forEach(([str, callback])=>{
      buttons[str] = {
        label : str,
        callback
      }
    });
  
    dialog = new Dialog({title : data.title , content : data.content, buttons, close : () => resolve(true) }).render(true);
  });
  return value;
}

async function update_dialog()
{
  let interval, content, buttons, dialog, interval_time;

  interval_time = 1;
  content = getContent();
  buttons = getButtons();

  dialog = new Dialog({ title : `Timer`, content, buttons, close : () =>  { clearInterval(interval); }}, {width : 200 }).render(true);

  console.log(dialog);

  interval = setInterval(()=> {
    update();
  }, interval_time * 1000);

  function getContent()
  {

    if(seconds_left !== 0 )
    {
      let minutes = Math.floor(seconds_left/60);
      let seconds = seconds_left%60;
  
      if (minutes < 10) minutes = `0${minutes}`;
      if (seconds < 10) seconds = `0${seconds}`;

      return `<div sytle="width:100%; text-align:center;"><h1>${minutes}:${seconds}</h1></div>`;
    }else{
      if(dialog.data.content.includes(`Complete`))
      {
        return ``;
      }else{
        return `<div sytle="width:100%; text-align:center; color:red;"><h1>Complete</h1></div>`;
      }
    }
  }
  function getButtons()
  {
    return {
      Restart : { label : `Restart`, callback : () => { seconds_left = seconds_selected; update_dialog(); }},
      Cancel : { label : `Cancel`, callback : () => { clearInterval(interval); }}
    };
  }
  function update()
  {
    if(seconds_left !== 0) seconds_left--;

    dialog.data.content = getContent();
    dialog.render(true);
  }
}

button_dialog(times);