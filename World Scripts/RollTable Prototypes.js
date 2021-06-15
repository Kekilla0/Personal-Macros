RollTable.prototype.getResult = function(){
  const roll = new Roll(this.data.formula).evaluate({ async : false });
  return {
    roll,
    result : this.getResultsForRoll(roll.total)
  }
}

RollTable.prototype.getText = function(){
  const { roll, result } = this.getResult();
  return result[0].getChatText();
}

RollTable.prototype.getHTML = async function(){
  const { roll, result } = this.getResult();
  const speaker = ChatMessage.getSpeaker({ user : game.user });

  // Render the chat card which combines the dice roll with the drawn results
   return await renderTemplate(CONFIG.RollTable.resultTemplate, {
    description: TextEditor.enrichHTML(this.data.description, {entities: true}),
    results: result.map(r => {
      r.text = r.getChatText();
      return r;
    }),
    rollHTML: this.data.displayRoll ? await roll.render() : null,
    table: this
  });
}