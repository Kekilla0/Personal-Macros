let log = (...args) => console.log("Test Macro | ", ...args);

let wait = async (ms) => new Promise((resolve)=> setTimeout(resolve, ms));

let randColor = () => `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`;

function colorSetter(number,low,high)
{
  const colorHigh = `green`;
  const colorLow = `red`

  return number <= low ? `color:${colorLow}`
    : number >= high ? `color:${colorHigh}`
    : ``;
}