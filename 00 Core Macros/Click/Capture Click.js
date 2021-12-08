async function captureClick(fn, remove = true){
  const m = () => canvas.app.renderer.plugins.interaction.mouse.getLocalPosition(canvas.app.stage);
  const c = (p) => canvas.grid.getCenter(p.x,p.y);

  return await new Promise(async (resolve) => {
    $(document.body).on("click", async (e) => {
      if(remove) $(document.body).off("click");
      /* args [event, mouse position, center of square] */
      resolve(fn(e,m(),c(m())));
    });
  });
}