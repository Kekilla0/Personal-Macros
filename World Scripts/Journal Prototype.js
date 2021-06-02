JournalEntry.prototype.toggle = function () {
  let status = this.sheet.rendered;
  status ? this.sheet.close() : this.sheet.render(true);
  return !status;
}