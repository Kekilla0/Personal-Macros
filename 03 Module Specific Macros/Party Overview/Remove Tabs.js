Hooks.on(`renderPartyOverviewApp`, (...args) => {
  $('.item[data-tab="languages"]').remove();
  $('.item[data-tab="background"]').remove();
});