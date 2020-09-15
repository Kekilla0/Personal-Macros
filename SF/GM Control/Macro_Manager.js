/*
  Fill the constant macros with the names of your macros, when you click the button it will run the macro.

  Dialog Window will not close until the X button is pressed.
*/

(()=>{
  const macros = [
    "Give_Money",
    "Wealth_Check",
    "Experience",
    "Sell",
    "Vendor",
    "Whisper_Dialog", 
    "Token_Icon_Control", 
    "Change_Selected_HP",
    "Open_Character_Sheet",
    "Image_Popout",
    "Image_To_Chat",
    "Delete_Templates"
  ];

  let buttons = {}, dialog, content = `<div sytle="width:100%; text-align:center;><h2>Choose Macro</h2></div>`;
  
  macros.forEach((str)=> {
    buttons[str] = {
      label : str,
      callback : () => {
        game.macros.getName(str).execute();
        dialog.render(true);
      }
    }
  });
  dialog = new Dialog({title = `Macro Manager`,content, buttons}).render(true);
})();