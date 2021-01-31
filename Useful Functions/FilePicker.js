/*
  get by extension
*/
async function getFileByExt(source, target, extension)
{
  extension = extension instanceof Array ? extension : [extension];

  return (await getFiles(source, target)).filter(f=> checkExtension(f,extension));

  function checkExtension(f, e)
  {
    let fe = `.${f.split(`.`)[f.split(`.`).length - 1]}`;
    return e.includes(fe);
  }

  async function getFiles(s,t)
  {
    let fileList = await FilePicker.browse(s,t);
    let arr = [...fileList.files];

    for(let dir of fileList.dirs)
    {
      arr = [...arr, ...await getFiles(s,dir)]
    }
    return arr;
  }
}