/* BUILD IT */
window["getDescription"] = getDescription;

function getDescription({ race = "", job = "", sex = "" } = {}){

  return getAppearance() + getPersonality() + getVoice();

  function getAppearance(){
    let data = {
      face : [
        ["Sleepy eyes.","Shifty eyes.","Watery eyes.","Bright eyes.","Cold eyes.","Smiling eyes.","Close-set eyes.","Wild eyes.","Distant eyes.","A lazy eye.","Piercing eyes.","Watchful eyes.","Dark eyes.","Hooded eyes.","Eyes of two different colors.","Slightly crossed eyes.","Wide eyes.","Beautiful eyes.","Beady eyes.","Penetrating eyes.",],
        ["Over-sized ears.","Long ear lobes.","Small ears.","Uneven ears.","Hairy ears.","Pointy ears.","Short ear lobes.","Ears that stick out.","Jug-handle ears.","Elaborately pierced ears.","Cauliflower ears.","Ears with improbable tufts of hair.",],
        ["Full lips.","Buck-teeth.","Thin lips.","Rotting teeth.","Crooked teeth.","A broken or missing tooth.","Pursed lips.","Dry, cracked lips.","One or more false teeth.","A mouth that hangs open.",],
        ["A crooked nose.","A bulbous nose.","A narrow nose.","A button nose.","A long nose.","A broad nose.","An angular nose.","A round nose.","A broken nose.","A hawk-like nose.","A wide nose.","A delicate nose.",],
        ["A pronounced chin.","A cleft chin.","A dimple on the chin.","A rounded chin.","A sharp jawline.","A square jaw.","A round jaw.","An underbite.",],
        ["Thick hair.","Wispy hair.","Straight hair.","Wavy hair.","Curly hair.","Wiry hair.","Oily hair.","Lush hair.","Poofy hair.","Long braids.","Braids tight against the head.","Very long hair.","Greasy hair.","Unruly hair.","An unusual hairstyle.","An outdated hairstyle.","A high-maintenance hairstyle.","Short-cropped hair.","A shaved head.","No hair at all.",],
        ["High cheekbones.","Tight, drawn cheeks.","Chubby cheeks.","An unpleasant pustule.","A large mole.","A beauty mark.","Freckles.","Terrible scarring.",]
      ],
      body : [
        ["Unusually short.","Short in stature.","Average height.","Slightly above average height.","Well above average height.","Unusually tall.",],
        ["Thin and delicate.","Of average build.","Well-muscled.","Slightly overweight.","Grotesquely obese.","Lean and lanky.","Lithe and lean.","Thin and wiry.","Sinewy and strong.","Flabby and weak.","Lumpy or bent.","Thin and flimsy.","Soft and chubby.","Thin and petite.","Pudgy.","Big and broad.","Stocky and strong.","Bony.","Wide and ponderous.","Covered in hair.",],
        ["With Powerful hands.","With Delicate hands.","With Rough hands.","With Soft hands.","With A light touch.","With A heavy touch.",]      ,
        ["With A jagged scar.","With A dark purple scar.","With An angry red scar.","With A long, thin scar.",],
      ],
      other : [
        ["A dagger tattoo.","An arrow tattoo.","An anchor tattoo.","A skull tattoo.","A pair of crossed bones tattoo.","A snake tattoo.","A scorpion tattoo.","A spider web tattoo.","A heart tattoo.","A ring of thorns tattoo.","A mermaid tattoo.","A dragon tattoo.",],
        ["An earring.","Two earrings.","A small chain about the neck.","A large chain about the neck.","A tight choker about the neck.","A brooch.","A ring.","Several rings.","A bracelet.","A nose ring.","A medallion.","An ornate belt.",],
        ["Crisp and new clothing","Fashionable and hip clothing","A bit old-fashioned clothing","clothing Of the highest quality","Faded, but in good condition clothing","Faded and patched clothing","clothing is Torn in places; missing buttons","Tattered and worn clothing",],
      ],
    };

    return `<p>
              Appearance : The person's face has ${Array(Math.max(2,(data.face.length).random() + 1)).fill(0).reduce((a,b,c,d) => a += ` ${(c + 1) == d.length ? `and ` : ``}${data.face.shuffle().pop().random()}`, ``)}.
              Their body is ${Array(Math.max(2,(data.body.length).random() + 1)).fill(0).reduce((a,b,c,d) => a += ` ${(c + 1) == d.length ? `and ` : ``}${data.body.shuffle().pop().random()}`, ``)}.
              They also are wearing ${Array(Math.max(2,(data.other.length).random() + 1)).fill(0).reduce((a,b,c,d) => a += ` ${(c + 1) == d.length ? `and ` : ``}${data.other.shuffle().pop().random()}`, ``)}.
            </p>`
  }

  function getPersonality(){
    let data = {
      calm : ["Compassionate","Cheerful","Reserved","Outspoken","Uninterested","Gruff","Eager","Deceitful","Foolish","Strict","Agreeable","Mischeivious","Angry","Fearful","Manipulative","Devout","Greedy","Funny","Dour","Fun-Loving","Lazy","Driven","Boastful","Artistic","Assertive","Carefree","Cautious","Confident","Thoughtful","Loyal","Sophisticated","Weak-Willed",],
      stress : ["Withdrawn","Murderous","Obsessive","Authoritarian","Determined","Brave","Spiteful","Belligerent","Caustic","Reckless","Argumentative","Gluttonous","Overly Protective","Angry","Cowardly","Meticulous","Sarcastic","Stubborn","Destructive","Practical","Pushy","Fanatical","Secretive","Scornful","Courageous","Impractical","Calculating","Industrious","Manipulative","Destructive","Compulsive","Intolerant",],
      faith : ["Quiet true believer.","Casual observer.","Critical student.","Outspoken cynic.","Open-minded seeker.","Broken heretic.","Cautious listener.","Fanatical true believer.",],
      prejudice : [["Other genders."], ["children", "teenagers", "elderly"],["ruling class and authority figures","powerful rich", "destitute poor"], ["beggars","drunks","drug-users"], ["farmers","artists","clergy","soldiers","fishers","harlots","miners","merchants","scholars","herders","sailors","mages"],["dwarves","elves","gnomes","goblins","half-breeds","halflings","humans","orcs",'reptilians'],],
      flaws : ["Fidgets.","Drinks too much.","Eats too much.","Swears often.","Has poor hygiene.","Can’t resist flirting.","Can’t stop staring.","Sweats profusely and easily.","Is a habitual liar.","Embellishes the truth.","Exaggerates details.","Has a short temper.","Is melodramatic.","Gossips.","Chews with an open mouth.","Often sniffs audibly.","Believes what you tell him/her.","Is skeptical of everything.","Paces.","Makes poor eye contact.",],
    }

    return `<p> Personality : When calm they are ${data.calm.random()}, when stressed they often become ${data.stress.random()}. This person is a ${data.faith.random()} and is prejudice against ${data.prejudice.random().random()}. They ${data.flaws.random()}</p>`
  }

  function getVoice(){
    let data = {
      speed : ["slow", "medium", "fast"],
      pitch : ["low", "medium", "high"],
      texture : ["gruff","smooth","strained", "relaxed", "breathy","wolfish", "scratchy", "nasally"],
    }

    return `<p>Voice : ${data.speed.random()} ${data.pitch.random()} pitch with a ${data.texture.random()} texture.</p>`
  }
}



