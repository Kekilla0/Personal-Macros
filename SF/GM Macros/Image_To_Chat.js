new Dialog({
  title: "Image",
  content: `<div class="form-group"><input type="text" name="url"/><label for="url">URL</label></div>`,
  buttons: {
    ok: {
      label: "OK",
      icon: `<i class="fas fa-check"></i>`,
      callback: (html) => {
        const url = html.find("input").val();
        ChatMessage.create({
          speaker: ChatMessage.getSpeaker(),
          content: `<img src=${url} />`,
          type: CONST.CHAT_MESSAGE_TYPES.OTHER
        });
      }
    }
  }
}).render(true);