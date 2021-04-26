/*
  get by extension
    Source === user/core
    target === folder
    extension
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

async function getFiles(target, extensions = ``, source = `user`)
{
  extensions = extensions instanceof Array ? extensions : [extensions];
  let filePicker = await FilePicker.browse(source, target, { extensions });
  if(filePicker.files)
    return [...filePicker.files];
  return [];
}

async function getFolders(target, source = `user`)
{ 
  let filePicker = await FilePicker.browse(source, target);
  if(filePicker.dirs)
    return [...filePicker.dirs];
  return [];
}