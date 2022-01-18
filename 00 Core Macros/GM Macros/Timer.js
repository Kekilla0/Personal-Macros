let seconds_selected = 0;
let seconds_left = 0;
let seconds_start = 0;

let times = {
  buttons : [
    ["1 Min", ()=> { seconds_selected = seconds_left = 60000; seconds_start = Date.now(); update_dialog();}],
    ["5 Min", ()=> { seconds_selected = seconds_left = 300000; seconds_start = Date.now(); update_dialog();}],
    ["10 Min", ()=> { seconds_selected = seconds_left = 600000; seconds_start = Date.now(); update_dialog(); }],
    ["15 Min", ()=> { seconds_selected = seconds_left = 900000; seconds_start = Date.now(); update_dialog(); }],
    ["20 Min", ()=> { seconds_selected = seconds_left = 1200000; seconds_start = Date.now(); update_dialog(); }],
    ["30 Min", ()=> { seconds_selected = seconds_left = 1800000; seconds_start = Date.now(); update_dialog(); }],
    ["1 Hour", ()=> { seconds_selected = seconds_left = 3600000; seconds_start = Date.now(); update_dialog(); }],
    ["2 Hour", ()=> { seconds_selected = seconds_left = 7200000; seconds_start = Date.now(); update_dialog(); }],
    ["3 Hour", ()=> { seconds_selected = seconds_left = 10800000; seconds_start = Date.now(); update_dialog(); }],
    ["4 Hour", ()=> { seconds_selected = seconds_left = 14400000; seconds_start = Date.now(); update_dialog(); }],
  ],
  content : `<div sytle="width:100%; text-align:center;"><h2> Choose a timer limit : </h2></div>`,
  title : `Timer Selector`
};

async function buttonDialog(data){
  return await new Promise(async (resolve) => {
    let buttons = {}, dialog;

    data.buttons.forEach(([str, callback])=>{
      buttons[str] = {
        label : str,
        callback
      }
    });
  
    dialog = new Dialog({
      title : data.title , 
      content : data.content, 
      buttons, 
      close : () => resolve(true) 
    },{
      width : 225, height : 75 + ( 35 * data.buttons.length)
    });

    await dialog._render(true);
    dialog.element.find('.dialog-buttons').css({'flex-direction':'column'});
  });
}

async function update_dialog(){
  let interval, content, buttons, dialog, interval_time;

  interval_time = 1;
  content = getContent();
  buttons = getButtons();

  dialog = new Dialog({ title : `Timer`, content, buttons, close : () =>  { clearInterval(interval); }}, {width : 200 }).render(true);

  console.log(dialog);

  interval = setInterval(()=> {
    update();
  }, interval_time * 1000);

  function getContent(){
    if(seconds_left !== 0 ){
      seconds_left = Math.floor(seconds_left / 1000);
      let seconds = seconds_left%60;
      let minutes_left = Math.floor(seconds_left/60);
      let minutes = minutes_left%60;
      let hours = Math.floor(minutes_left/60);      
  
      if (hours < 10) hours = `0${hours}`;
      if (minutes < 10) minutes = `0${minutes}`;
      if (seconds < 10) seconds = `0${seconds}`;

      return `<div sytle="width:100%; text-align:center;"><h1>${hours}:${minutes}:${seconds}</h1></div>`;
    }else{
      if(dialog.data.content.includes(`Complete`)){
        return ``;
      }else{
        return `<div sytle="width:100%; text-align:center; color:red;"><h1>Complete</h1></div>`;
      }
    }
  }
  function getButtons(){
    return {
      Reset : { label : `Reset`, callback : () => { clearInterval(interval); buttonDialog(times); }},
      Restart : { label : `Restart`, callback : () => { seconds_left = seconds_selected; seconds_start = Date.now(); update_dialog(); }},
      Cancel : { label : `Cancel`, callback : () => { clearInterval(interval); }}
    };
  }
  function update(){
    if(seconds_left !== 0) seconds_left = seconds_selected - (Date.now() - seconds_start);

    dialog.data.content = getContent();
    dialog.render(true);
  }
}

buttonDialog(times);