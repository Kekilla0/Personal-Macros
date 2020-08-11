(async () => {
    const charData = game.user.character;
    const fighterLvl = charData.items.find(i=>i.name==="Fighter").data.data.levels;
    game.dnd5e.rollItemMacro("Second Wind").then(() =>{
        const SWroll = new Roll(`1d10+${fighterLvl}`);
        SWroll.roll();
        SWroll.toMessage({
            user : game.user._id,
            speaker : speaker,
            flavor : "Second Wind Dice"
        });
        const actorUpdate ={
            data :{
                attributes:{
                    hp :{
                        value : Math.clamped(
                            charData.data.data.attributes.hp.value + SWroll.total,
                            charData.data.data.attributes.hp.min,
                            charData.data.data.attributes.hp.max
                        )
                    },
                },
            },
        };
        charData.update(actorUpdate);
    });
})();