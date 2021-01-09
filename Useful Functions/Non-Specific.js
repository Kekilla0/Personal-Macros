let log = (...args) => console.log("Test Macro | ", ...args);

let wait = async (ms) => new Promise((resolve)=> setTimeout(resolve, ms));

let randColor = () => `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`;

/*
  Create A Blank Character for a User (and attach it to their account)
*/
(async ()=>{
  let user_id = await choose(users, `Choose User to create Character for : `);
  let user = game.users.get(user_id);

  let data = {
    name : `${user.name} - Character`,
    type : `character`,
    permission : { }
  };

  data.permission[user_id] = 3;

  let actor = await Actor.create(data);
  await user.update({ character : actor.id });
})();