//get init type (???)
const type = "";
const autoRoll = true;
const active = false;
const die = { str : `d20`, value : `10` };

const _Score = function(combatant){
    const actorData = combatant.actor.getRollData();
    let formula = `${die.value} + ${actorData.attributes.init.mod} + ${actorData.attributes.init.prof} + ${actorData.attributes.init.bonus}`;
    
    const tiebreaker = game.settings.get("dnd5e","initiativeDexTiebreaker");
    if(tiebreaker) formula += `+ ${actorData.abilities.dex.value/100}`;
    
    return formula;
}

const _Side = function(combatant){
    //check is combatant is PC or NPC
    let combat = game.combats.find(c=> c.combatants.find(c=> c._id === combatant._id));
    let formula = combatant.actor.hasPlayerOwner 
        ? combat.data.combatants.find(c=> c.actor.hasPlayerOwner && c.initiative)?.initiative 
        : combat.data.combatants.find(c=> !c.actor.hasPlayerOwner && c.initiative)?.initiative;
        
    return formula ? `${formula}` : `1${die.str}`;
}

const _getInitiativeFormula = function(combatant) {
  const actor = combatant.actor;
  if ( !actor ) return `1${die.str}`;
  const init = actor.data.data.attributes.init;

  let nd = 1;
  let mods = "";
  
  if (actor.getFlag("dnd5e", "halflingLucky")) mods += "r1=1";
  if (actor.getFlag("dnd5e", "initiativeAdv")) {
    nd = 2;
    mods += "kh";
  }

  const parts = [`${nd}${die.str}${mods}`, init.mod, (init.prof !== 0) ? init.prof : null, (init.bonus !== 0) ? init.bonus : null];

  // Optionally apply Dexterity tiebreaker
  const tiebreaker = game.settings.get("dnd5e", "initiativeDexTiebreaker");
  if ( tiebreaker ) parts.push(actor.data.data.abilities.dex.value / 100);
  return parts.filter(p => p !== null).join(" + ");
};

const _autoRoll = function (combat,combatant){
    
    combatant.actor = getActor();
    let formula = ``;
    switch(type)
    {
        case "Initiative Score" :
            formula = _Score(combatant);
            break;
        case "Side Initiative" :
            formula = _Side(combatant);
            break;
        default : 
            formula = _getInitiativeFormula(combatant);
    }    
    setProperty(combatant, "initiative", new Roll(formula).roll().total);
    
    function getActor()
    {
        return canvas.tokens.get(combatant.tokenId).actor;
    }
}
const _Variant = function ()
{
    switch(type)
    {
        case "Initiative Score" :
            CONFIG.Combat.initiative.formula = `${die.value} + @attributes.init.mod + @attributes.init.prof + @attributes.init.bonus`;
            Combat.prototype._getInitiativeFormula = _Score;
            break;
        case "Side Initiative" :
            CONFIG.Combat.initiative.formula = `1${die.str}`;
            Combat.prototype._getInitiativeFormula = _Side;
            break;
    }

    //if(autoRoll) Hooks.on(`createCombatant`, (combat,combatant) => _autoRoll(combat,combatant));
    if(autoRoll) Hooks.on(`preCreateCombatant`, (combat,combatant) => _autoRoll(combat,combatant));
}

if(game.user.isGM && active)
{
    _Variant();
}
