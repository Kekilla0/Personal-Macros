/*
  constant functions
*/
const randomArrayElement = (arr) => arr[Math.floor(Math.random()* arr.length)];
const weightedArray = (arr, w, e) => { let reArr = []; arr.forEach(ele => { for(let i=0; i< ele[w]; i++) reArr.push(ele[e]); }); return reArr; };
const error = (...args) => {ui.notifications.error(`${this.name} Macro | `, ...args); return new Error(`${this.name} ${args.join(` `)}`); }
const log = (...args) => console.log(`${this.name} Macro | `, ...args);
const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

/*
  Races available = 
    Dragonborn
    Dwarf
    Elf
    Gnome
    Half-Elf
    Half-Orc
    Halfling
    Human
    Tiefling
    Goblin
    Orc
    Demon
*/
function getName(race = ``, sex = ``)
{
  const raceData = [
    {
      name : `Dragonborn`,
      lastName : [
        ["","","","","c","cl","cr","d","dr","f","g","k","kl","kr","l","m","my","n","ny","pr","sh","t","th","v","y"],
        ["a","e","i","a","e","i","o","u","a","e","i","a","e","i","o","u","a","e","i","a","e","i","o","u","aa","ia","ea","ua","uu"],
        ["c","cc","ch","lm","lk","lx","ld","lr","ldr","lt","lth","mb","mm","mp","mph","mr","mt","nk","nx","nc","p","ph","r","rd","rj","rn","rrh","rth","st","tht","x"],
        ["a","e","i","a","e","i","o","u","a","e","i","a","e","i","o","u","a","e","i","a","e","i","o","u","aa","ia","ea","ua","uu"],
        ["c","cm","cn","d","j","k","km","l","n","nd","ndr","nk","nsht","nth","r","s","sht","shkm","st","t","th","x"],
        ["a","e","i","a","e","i","o","u","a","e","i","a","e","i","o","u","a","e","i","a","e","i","o","u","aa","ia","ea","ua","uu"],
        ["d","j","l","ll","m","n","nd","rg","r","rr","rd"],
        ["a","e","i","a","e","i","o","u","a","e","i","a","e","i","o","u","a","e","i","a","e","i","o","u","aa","ia","ea","ua","uu"],
        ["c","d","k","l","n","r","s","sh","th"]
      ],
      firstName : {
        Male : [
          ["Ali","Ar","Ba","Bal","Bel","Bha","Bren","Caer","Calu","Dur","Do","Dra","Era","Faer","Fro","Gre","Ghe","Gora","He","Hi","Ior","Jin","Jar","Kil","Kriv","Lor","Lumi","Mar","Mor","Med","Nar","Nes","Na","Oti","Orla","Pri","Pa","Qel","Ravo","Ras","Rho","Sa","Sha","Sul","Taz","To","Trou","Udo","Uro","Vor","Vyu","Vrak","Wor","Wu","Wra","Wul","Xar","Yor","Zor","Zra"],
          ["barum","bor","broth","ciar","crath","daar","dhall","dorim","farn","fras","gar","ghull","grax","hadur","hazar","jhan","jurn","kax","kris","kul","lasar","lin","mash","morn","naar","prax","qiroth","qrin","qull","rakas","rash","rinn","roth","sashi","seth","skan","trin","turim","varax","vroth","vull","warum","wunax","xan","xiros","yax","ythas","zavur","zire","ziros"]
        ],
        Female : [
          ["Ari","A","Bi","Bel","Cris","Ca","Drys","Da","Erli","Esh","Fae","Fen","Gur","Gri","Hin","Ha","Irly","Irie","Jes","Jo","Ka","Kel","Ko","Lilo","Lora","Mal","Mi","Na","Nes","Nys","Ori","O","Ophi","Phi","Per","Qi","Quil","Rai","Rashi","So","Su","Tha","Ther","Uri","Ushi","Val","Vyra","Welsi","Wra","Xy","Xis","Ya","Yr","Zen","Zof"],
          ["birith","bis","bith","coria","cys","dalynn","drish","drith","faeth","fyire","gil","gissa","gwen","hime","hymm","karyn","kira","larys","liann","lyassa","meila","myse","norae","nys","patys","pora","qorel","qwen","rann","riel","rina","rinn","rish","rith","saadi","shann","sira","thibra","thyra","vayla","vyre","vys","wophyl","wyn","xiris","xora","yassa","yries","zita","zys"]
        ],
      },
      weight : 1,
      parent : null
    },
    {
      name : `Dwarf`,
      lastName : [
        ["Ale", "Amber", "Anvil", "Ash", "Axe", "Barbed", "Barrel", "Battle", "Beast", "Bone", "Beryl", "Bitter", "Black", "Blazing", "Blessed", "Blood", "Blunt", "Bone", "Bottle", "Boulder", "Brew", "Brick", "Bright", "Bristle", "Broad", "Bronze", "Brown", "Cave", "Cask", "Chain", "Crag", "Chaos", "Coal", "Coin", "Copper", "Dark", "Deep", "Dim", "Dragon", "Drake", "Dusk", "Earth", "Ember", "Fiery", "Flint", "Flask", "Flint", "Flat", "Forge", "Frost", "Giant", "Gold", "Golden", "Granite", "Gravel", "Gray", "Great", "Grey", "Grim", "Grumble", "Hammer", "Hard", "Heavy", "Hill", "Honor", "Horn", "Ice", "Ingot", "Iron", "Jade", "Keg", "Kobold", "Krag", "Lead", "Large", "Lava", "Leather", "Light", "Long", "Marble", "Magma", "Merry", "Metal", "Mithril", "Mine", "Mountain", "Mud", "Night", "Noble", "Oak", "Oaken", "Onyx", "Opal", "Ore", "Orc", "Plate", "Pebble", "Red", "Rune", "Ruby", "Sapphire", "Shadow", "Shatter", "Smelt", "Silver", "Snow", "Steel", "Storm", "Strong", "Troll", "Thunder", "Twilight", "Treasure", "Under", "War", "Warm", "Whit", "Wind", "Wold", "Wraith", "Wyvern"],
        ["arm", "armour", "axe", "back", "bane", "beard", "basher", "belly", "belt", "bender", "blade", "born", "bow", "braid", "braids", "branch", "brand", "breaker", "brew", "brewer", "bringer", "brow", "buckle", "buster", "chest", "chin", "cloak", "coat", "delver", "digger", "foot", "fall", "fury", "finger", "flayer", "feet", "forge", "forged", "grog", "grip", "guard", "gut", "granite", "hand", "head", "heart", "helm", "hide", "hood", "horn", "jaw", "mace", "mail", "maker", "mantle", "mane", "master", "maul", "miner", "pike", "rock", "river", "shield", "shaper", "sword", "shoulder", "stone", "spine", "sunder", "thane", "toe", "tank", "view"],
      ],
      firstName : {
        Male : [
          ["Ad","Am","Arm","Baer","Daer","Bal","Ban","Bar","Bel","Ben","Ber","Bhal","Bhar","Bhel","Bram","Bran","Brom","Brum","Bun","Dal","Dar","Dol","Dul","Eb","Em","Erm","Far","Gal","Gar","Ger","Gim","Gral","Gram","Gran","Grem","Gren","Gril","Gry","Gul","Har","Hjal","Hjol","Hjul","Hor","Hul","Hur","Kar","Khar","Kram","Krom","Krum","Mag","Mal","Mel","Mor","Muir","Mur","Rag","Ran","Reg","Rot","Thal","Thar","Thel","Ther","Tho","Thor","Thul","Thur","Thy","Tor","Ty","Um","Urm","Von"],
          ["adin","bek","brek","dahr","dain","dal","dan","dar","dek","dir","dohr","dor","drak","dram","dren","drom","drum","drus","duhr","dur","dus","garn","gram","gran","grim","grom","gron","grum","grun","gurn","gus","iggs","kahm","kam","kohm","kom","kuhm","kum","kyl","man","mand","mar","mek","miir","min","mir","mond","mor","mun","mund","mur","mus","myl","myr","nam","nar","nik","nir","nom","num","nur","nus","nyl","rak","ram","ren","rig","rigg","rik","rim","rom","ron","rum","rus","ryl","tharm","tharn","thran","thrum","thrun"],
        ],
        Female : [
          ["An","Ar","Baer","Bar","Bel","Belle","Bon","Bonn","Braen","Bral","Bralle","Bran","Bren","Bret","Bril","Brille","Brol","Bron","Brul","Bryl","Brylle","Bryn","Bryt","Byl","Bylle","Daer","Dear","Dim","Ed","Ein","El","Gem","Ger","Gwan","Gwen","Gwin","Gwyn","Gym","Ing","Jen","Jenn","Jin","Jyn","Kait","Kar","Kat","Kath","Ket","Las","Lass","Les","Less","Lyes","Lys","Lyss","Maer","Maev","Mar","Mis","Mist","Myr","Mys","Myst","Naer","Nal","Nas","Nass","Nes","Nis","Nys","Raen","Ran","Red","Reyn","Run","Ryn","Sar","Sol","Tas","Taz","Tis","Tish","Tiz","Tor","Tys","Tysh"],
          ["belle","bera","delle","deth","dielle","dille","dish","dora","dryn","dyl","giel","glia","glian","gwyn","la","leen","leil","len","lin","linn","lyl","lyn","lynn","ma","mera","mora","mura","myl","myla","nan","nar","nas","nera","nia","nip","nis","niss","nora","nura","nyl","nys","nyss","ra","ras","res","ri","ria","rielle","rin","ris","ros","ryl","ryn","sael","selle","sora","syl","thel","thiel","tin","tyn","va","van","via","vian","waen","win","wyn","wynn"]
        ],
      },
      weight : 2,
      parent : null,
    },
    {
      name : `Elf`,
      lastName : [
        ["Ad","Ae","Ara","Bal","Bei","Bi","Bry","Cai","Car","Chae","Cra","Da","Dae","Dor","Eil","El","Ela","En","Er","Fa","Fae","Far","Fen","Gen","Gil","Glyn","Gre","Hei","Hele","Her","Hola","Ian","Iar","Ili","Ina","Jo","Kea","Kel","Key","Kris","Leo","Lia","Lora","Lu","Mag","Mia","Mira","Mor","Nae","Neri","Nor","Ola","Olo","Oma","Ori","Pa","Per","Pet","Phi","Pres","Qi","Qin","Qui","Ralo","Rava","Rey","Ro","Sar","Sha","Syl","The","Tor","Tra","Tris","Ula","Ume","Uri","Va","Val","Ven","Vir","Waes","Wran","Wyn","Wysa","Xil","Xyr","Yel","Yes","Yin","Ylla","Zin","Zum","Zyl"],
        ["balar","banise","bella","beros","can","caryn","ceran","cyne","dan","di","dithas","dove","faren","fiel","fina","fir","geiros","gella","golor","gwyn","hana","harice","hice","horn","jeon","jor","jyre","kalyn","kas","kian","krana","lamin","lana","lar","lee","len","leth","lynn","maer","maris","menor","moira","myar","mys","na","nala","nan","neiros","nelis","norin","peiros","petor","phine","phyra","qen","qirelle","quinal","ra","ralei","ran","rel","ren","ric","rie","rieth","ris","ro","rona","rora","roris","salor","sandoral","satra","stina","sys","thana","thyra","toris","tris","tumal","valur","varis","ven","vyre","warin","wenys","wraek","wynn","xalim","xidor","xina","xisys","yarus","ydark","ynore","yra","zana","zeiros","zorwyn","zumin"],
      ],
      firstName : {
        Male : [
          ["Ad", "Ae", "Bal", "Bei", "Car", "Cra", "Dae", "Dor", "El", "Ela", "Er", "Far", "Fen", "Gen", "Glyn", "Hei", "Her", "Ian", "Ili", "Kea", "Kel", "Leo", "Lu", "Mira", "Mor", "Nae", "Nor", "Olo", "Oma", "Pa", "Per", "Pet", "Qi", "Qin", "Ralo", "Ro", "Sar", "Syl", "The", "Tra", "Ume", "Uri", "Va", "Vir", "Waes", "Wran", "Yel", "Yin", "Zin", "Zum"],
          ["balar", "beros", "can", "ceran", "dan", "dithas", "faren", "fir", "geiros", "golor", "hice", "horn", "jeon", "jor", "kas", "kian", "lamin", "lar", "len", "maer", "maris", "menor", "myar", "nan", "neiros", "nelis", "norin", "peiros", "petor", "qen", "quinal", "ran", "ren", "ric", "ris", "ro", "salor", "sandoral", "toris", "tumal", "valur", "ven", "warin", "wraek", "xalim", "xidor", "yarus", "ydark", "zeiros", "zumin"],
        ],
        //keeps failing here --- Female === null?
        Female : [
          ["Ad", "Ara", "Bi", "Bry", "Cai", "Chae", "Da", "Dae", "Eil", "En", "Fa", "Fae", "Gil", "Gre", "Hele", "Hola", "Iar", "Ina", "Jo", "Key", "Kris", "Lia", "Lora", "Mag", "Mia", "Neri", "Ola", "Ori", "Phi", "Pres", "Qi", "Qui", "Rava", "Rey", "Sha", "Syl", "Tor", "Tris", "Ula", "Uri", "Val", "Ven", "Wyn", "Wysa", "Xil", "Xyr", "Yes", "Ylla", "Zin", "Zyl"],
          ["banise", "bella", "caryn", "cyne", "di", "dove", "fiel", "fina", "gella", "gwyn", "hana", "harice", "jyre", "kalyn", "krana", "lana", "lee", "leth", "lynn", "moira", "mys", "na", "nala", "phine", "phyra", "qirelle", "ra", "ralei", "rel", "rie", "rieth", "rona", "rora", "roris", "satra", "stina", "sys", "thana", "thyra", "tris", "varis", "vyre", "wenys", "wynn", "xina", "xisys", "ynore", "yra", "zana", "zorwyn"]
        ],
      },
      weight : 2,
      parent : null,
    },
    {
      name : `Gnome`,
      lastName : [
        ["Achen","Adel","Alter","Ammer","Aschen","Auer","Augen","Bam","Bauern","Baum","Bern","Birn","Bitter","Blumen","Brand","Ehren","Eichen","Eisen","Eulen","Feigen","Feuer","Flei","Freuden","Fried","Gold","Gott","Gross","Grun","Guten","Haber","Hage","Hart","Hassel","Hatten","Haven","Heid","Hein","Heit","Herz","Hilde","Himmel","Hoch","Hoenig","Hof","Holder","Honigs","Horn","Junker","Katzen","Klein","Kloster","Kohl","Korn","Kreutz","Kronen","Krucken","Lands","Lehm","Lem","Lichten","Mengel","Mitter","Molden","Nadel","Neu","Nieder","Pfeffer","Ratzen","Reichen","Rein","Roden","Rohr","Rosen","Roth","Rott","Sauer","Scheide","Schild","Schon","Schul","Schutzen","Schwarz","Seel","Spiegel","Stein","Stern","Stock","Stras","Strom","Thal","Uffer","Unter","Wald","Wasser","Weide","Wein","Weiss"],
        ["bach","bauer","beck","berg","berger","blum","burg","dorf","feld","fried","hal","hardt","hauer","haus","heim","hoff","hold","holdt","holt","holz","horn","lich","mann","mayer","meister","schmidt","stein","told","wald"],
      ],
      firstName : {
        Male : [
          ["Al","Ari","Bil","Bri","Cal","Cor","Dav","Dor","Eni","Er","Far","Fel","Ga","Gra","His","Hor","Ian","Ipa","Je","Jor","Kas","Kel","Lan","Lo","Man","Mer","Nes","Ni","Or","Oru","Pana","Po","Qua","Quo","Ras","Ron","Sa","Sal","Sin","Tan","To","Tra","Um","Uri","Val","Vor","War","Wil","Wre","Xal","Xo","Ye","Yos","Zan","Zil"],
          ["bar","ben","bis","corin","cryn","don","dri","fan","fiz","gim","grim","hik","him","ji","jin","kas","kur","len","lin","min","mop","morn","nan","ner","ni","pip","pos","rick","ros","rug","ryn","ser","ston","tix","tor","ver","vyn","win","wor","xif","xim","ybar","yur","ziver","zu"],
        ],
        Female : [
          ["Alu","Ari","Ban","Bree","Car","Cel","Daphi","Do","Eili","El","Fae","Fen","Fol","Gal","Gren","Hel","Hes","Ina","Iso","Jel","Jo","Klo","Kri","Lil","Lori","Min","My","Ni","Ny","Oda","Or","Phi","Pri","Qi","Que","Re","Rosi","Sa","Sel","Spi","Ta","Tifa","Tri","Ufe","Uri","Ven","Vo","Wel","Wro","Xa","Xyro","Ylo","Yo","Zani","Zin"],
          ["bi","bys","celi","ci","dira","dysa","fi","fyx","gani","gyra","hana","hani","kasys","kini","la","li","lin","lys","mila","miphi","myn","myra","na","niana","noa","nove","phina","pine","qaryn","qys","rhana","roe","sany","ssa","sys","tina","tra","wyn","wyse","xi","xis","yaris","yore","za","zyre"]
        ],
      },
      weight : 1,
      parent : null,
    },
    {
      name : `Half-Elf`,
      lastName : [],
      firstName : {
        Male : [
          ["Al","Aro","Bar","Bel","Cor","Cra","Dav","Dor","Eir","El","Fal","Fril","Gaer","Gra","Hal","Hor","Ian","Ilo","Jam","Kev","Kri","Leo","Lor","Mar","Mei","Nil","Nor","Ori","Os","Pan","Pet","Quo","Raf","Ri","Sar","Syl","Tra","Tyr","Uan","Ul","Van","Vic","Wal","Wil","Xan","Xav","Yen","Yor","Zan","Zyl"],
          ["avor","ben","borin","coril","craes","deyr","dithas","elor","enas","faelor","faerd","finas","fyr","gotin","gretor","homin","horn","kas","koris","lamir","lanann","lumin","minar","morn","nan","neak","neiros","orin","ovar","parin","phanis","qarim","qinor","reak","ril","ros","sariph","staer","torin","tumil","valor","voril","warith","word","xian","xiron","yeras","ynor","zaphir","zaren"]
        ],
        Female : [
          ["Alu","Aly","Ar","Bren","Byn","Car","Co","Dar","Del","El","Eli","Fae","Fha","Gal","Gif","Haly","Ho","Ile","Iro","Jen","Jil","Kri","Kys","Les","Lora","Ma","Mar","Mare","Neri","Nor","Ol","Ophi","Phaye","Pri","Qi","Que","Rel","Res","Sael","Saf","Syl","Ther","Tyl","Una","Uri","Ven","Vyl","Win","Wol","Xil","Xyr","Yes","Yll","Zel","Zin"],
          ["aerys","anys","bellis","bwynn","cerys","charis","diane","dove","elor","enyphe","faen","fine","galyn","gwynn","hana","hophe","kaen","kilia","lahne","lynn","mae","malis","mythe","nalore","noa","nys","ona","phira","pisys","qarin","qwyn","rila","rora","seris","stine","sys","thana","theris","tihne","trana","viel","vyre","walyn","waris","xaris","xipha","yaries","yra","zenya","zira"]
        ],
      },
      weight : 2,
      parent : [`Human`, `Elf`],
    },
    {
      name : `Half-Orc`,
      lastName : [],
      firstName : {
        Male : [
          ["Ag", "Agg", "Ar", "Arn", "As", "At", "Atr", "B", "Bar", "Bel", "Bor", "Br", "Brak", "C", "Cr", "D", "Dor", "Dr", "Dur", "G", "Gal", "Gan", "Gar", "Gna", "Gor", "Got", "Gr", "Gram", "Grim", "Grom", "Grum", "Gul", "H", "Hag", "Han", "Har", "Hog", "Hon", "Hor", "Hun", "Hur", "K", "Kal", "Kam", "Kar", "Kel", "Kil", "Kom", "Kor", "Kra", "Kru", "Kul", "Kur", "Lum", "M", "Mag", "Mahl", "Mak", "Mal", "Mar", "Mog", "Mok", "Mor", "Mug", "Muk", "Mura", "N", "Oggu", "Ogu", "Ok", "Oll", "Or", "Rek", "Ren", "Ron", "Rona", "S", "Sar", "Sor", "T", "Tan", "Th", "Thar", "Ther", "Thr", "Thur", "Trak", "Truk", "Ug", "Uk", "Ukr", "Ull", "Ur", "Urth", "Urtr", "Z", "Za", "Zar", "Zas", "Zav", "Zev", "Zor", "Zur", "Zus"],
          ["a", "a", "a", "o", "o", "e", "i", "u", "u", "u"],
          ["bak", "bar", "bark", "bash", "bur", "burk", "d", "dak", "dall", "dar", "dark", "dash", "dim", "dur", "durk", "g", "gak", "gall", "gar", "gark", "gash", "glar", "gul", "gur", "m", "mak", "mar", "marsh", "mash", "mir", "mur", "n", "nar", "nars", "nur", "rak", "rall", "rash", "rim", "rimm", "rk", "rsh", "rth", "ruk", "sk", "tar", "tir", "tur", "z", "zall", "zar", "zur"]
        ],
        Female : [
          ["Al", "Ar", "Br", "Ek", "El", "Fal", "Fel", "Fol", "Ful", "G", "Gaj", "Gar", "Gij", "Gor", "Gr", "Gry", "Gyn", "Hur", "K", "Kar", "Kat", "Ker", "Ket", "Kir", "Kot", "Kur", "Kut", "Lag", "M", "Mer", "Mir", "Mor", "N", "Ol", "Oot", "Puy", "R", "Rah", "Rahk", "Ras", "Rash", "Raw", "Roh", "Rohk", "S", "Sam", "San", "Sem", "Sen", "Sh", "Shay", "Sin", "Sum", "Sun", "Tam", "Tem", "Tu", "Tum", "Ub", "Um", "Ur", "Van", "Zan", "Zen", "Zon", "Zun"],
          ["a", "a", "o", "o", "e", "i", "i", "u"],
          ["d", "da", "dar", "dur", "g", "gar", "gh", "gri", "gu", "sh", "sha", "shi", "gum", "gume", "gur", "ki", "mar", "mi", "mira", "me", "mur", "ne", "ner", "nir", "nar", "nchu", "ni", "nur", "ral", "rel", "ri", "rook", "ti", "tah", "tir", "tar", "tur", "war", "z", "zar", "zara", "zi", "zur", "zura", "zira"]
        ],
      },
      weight : 2,
      parent : [`Human`, `Orc`],
    },
    {
      name : `Halfling`,
      lastName : [
        ["Adel", "Alt", "And", "Ans", "Arm", "Balden", "Berk", "Biber", "Bil", "Blum", "Bottom", "Boulder", "Brace", "Bramble", "Brand", "Brod", "Cull", "Dew", "Edel", "Eisen", "Fair", "Fallo", "Far", "Fass", "Fein", "Finna", "Flor", "Gal", "Gam", "Gell", "Hal", "Ham", "Hand", "Har", "Hard", "Hay", "Hilde", "Hoch", "Hof", "Hog", "Knot", "Korn", "Land", "Lehm", "Lowen", "Mug", "Neu", "Old", "Rei", "Rosen", "Roth", "Stritt", "Tol", "Vander", "Wahr", "Weg", "Weide", "Wein", "Weis", "Whit"],
        ["bach", "bairn", "bald", "baum", "beck", "berg", "berry", "bottom", "brand", "buck", "buhr", "burg", "burrow", "der", "fast", "fel", "feld", "felt", "foot", "gard", "gart", "gund", "ham", "hand", "hang", "hard", "haupt", "haus", "heimer", "hell", "hill", "kranz", "lein", "lich", "ling", "man", "meier", "ming", "mond", "red", "ric", "rich", "ring", "roth", "stein", "stock", "thal", "thorn", "thran", "tram", "veldt", "ville", "wald", "ward", "wend", "wich", "wise", "wort", "yegg", "zel"]
      ],
      firstName : {
        Male : [
          ["An", "Ar", "Bar", "Bel", "Con", "Cor", "Dan", "Dav", "El", "Er", "Fal", "Fin", "Flyn", "Gar", "Go", "Hal", "Hor", "Ido", "Ira", "Jan", "Jo", "Kas", "Kor", "La", "Lin", "Mar", "Mer", "Ne", "Nor", "Ori", "Os", "Pan", "Per", "Pim", "Quin", "Quo", "Ri", "Ric", "San", "Shar", "Tar", "Te", "Ul", "Uri", "Val", "Vin", "Wen", "Wil", "Xan", "Xo", "Yar", "Yen", "Zal", "Zen"],
          ["ace", "amin", "bin", "bul", "dak", "dal", "der", "don", "emin", "eon", "fer", "fire", "gin", "hace", "horn", "kas", "kin", "lan", "los", "min", "mo", "nad", "nan", "ner", "orin", "os", "pher", "pos", "ras", "ret", "ric", "rich", "rin", "ry", "ser", "sire", "ster", "ton", "tran", "umo", "ver", "vias", "von", "wan", "wrick", "yas", "yver", "zin", "zor", "zu"]
        ],
        Female : [
          ["An", "Ari", "Bel", "Bre", "Cal", "Chen", "Dar", "Dia", "Ei", "Eo", "Eli", "Era", "Fay", "Fen", "Fro", "Gel", "Gra", "Ha", "Hil", "Ida", "Isa", "Jay", "Jil", "Kel", "Kith", "Le", "Lid", "Mae", "Mal", "Mar", "Ne", "Ned", "Odi", "Ora", "Pae", "Pru", "Qi", "Qu", "Ri", "Ros", "Sa", "Shae", "Syl", "Tham", "Ther", "Tryn", "Una", "Uvi", "Va", "Ver", "Wel", "Wi", "Xan", "Xi", "Yes", "Yo", "Zef", "Zen"],
          ["alyn", "ara", "brix", "byn", "caryn", "cey", "da", "dove", "drey", "elle", "eni", "fice", "fira", "grace", "gwen", "haly", "jen", "kath", "kis", "leigh", "la", "lie", "lile", "lienne", "lyse", "mia", "mita", "ne", "na", "ni", "nys", "ola", "ora", "phina", "prys", "rana", "ree", "ri", "ris", "sica", "sira", "sys", "tina", "trix", "ula", "vira", "vyre", "wyn", "wyse", "yola", "yra", "zana", "zira"]
        ],
      },
      weight : 2,
      parent : null,
    },
    {
      name : `Human`,
      lastName : [
        ["b", "bh", "c", "d", "dh", "h", "j", "kh", "m", "n", "p", "r", "rh", "sh", "z"],
        ["a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "a", "a", "ei"],
        ["d", "h", "hr", "hl", "k", "kh", "l", "m", "mm", "n", "nn", "ss", "st", "sh"],
        ["a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "a", "a", "ei"],
        ["", "", "", "", "", "d", "l", "m", "n", "r"]
      ],
      firstName : {
        Male : [
          ["", "", "b", "bh", "f", "h", "j", "kh", "m", "n", "nh", "r", "rh", "s", "z"],
          ["a", "e", "u", "a", "e", "u", "a", "e", "u", "i", "ei"],
          ["b", "d", "hm", "hn", "hl", "kh", "l", "m", "rd", "r", "s", "sh", "z"],
          ["a", "e", "u", "a", "e", "u", "a", "e", "u", "i", "ei"],
          ["d", "m", "n", "r"]
        ],
        Female : [
          ["", "", "c", "f", "h", "j", "m", "n", "r", "s", "sh", "y", "z"],
          ["a", "e", "u", "a", "e", "u", "o", "o", "i", "i", "ei"],
          ["d", "f", "hn", "hl", "hm", "hr", "l", "m", "n", "p", "r", "s", "sh", "sm", "sn", "t", "v", "z"],
          ["a", "e", "u", "a", "e", "u", "o", "o", "i", "i", "ei"],
          ["h", "l"]
        ],
      },
      weight : 3,
      parent : null,
    },
    {
      name : `Tiefling`,
      lastName : [],
      firstName : {
        Male : [
          ["Aet", "Ak", "Am", "Aran", "And", "Ar", "Ark", "Bar", "Car", "Cas", "Dam", "Dhar", "Eb", "Ek", "Er", "Gar", "Gu", "Gue", "Hor", "Ia", "Ka", "Kai", "Kar", "Kil", "Kos", "Ky", "Loke", "Mal", "Male", "Mav", "Me", "Mor", "Neph", "Oz", "Ral", "Re", "Rol", "Sal", "Sha", "Sir", "Ska", "The", "Thy", "Thyne", "Ur", "Uri", "Val", "Xar", "Zar", "Zer", "Zher", "Zor"],
          ["adius", "akas", "akos", "char", "cis", "cius", "dos", "emon", "ichar", "il", "ilius", "ira", "lech", "lius", "lyre", "marir", "menos", "meros", "mir", "mong", "mos", "mus", "non", "rai", "rakas", "rakir", "reus", "rias", "ris", "rius", "ron", "ros", "rus", "rut", "shoon", "thor", "thos", "thus", "us", "venom", "vir", "vius", "xes", "xik", "xikas", "xire", "xius", "xus", "zer", "zire"]
        ],
        Female : [
          ["Af", "Agne", "Ani", "Ara", "Ari", "Aria", "Bel", "Bri", "Cre", "Da", "Di", "Dim", "Dor", "Ea", "Fri", "Gri", "His", "In", "Ini", "Kal", "Le", "Lev", "Lil", "Ma", "Mar", "Mis", "Mith", "Na", "Nat", "Ne", "Neth", "Nith", "Ori", "Pes", "Phe", "Qu", "Ri", "Ro", "Sa", "Sar", "Seiri", "Sha", "Val", "Vel", "Ya", "Yora", "Yu", "Za", "Zai", "Ze"],
          ["bis", "borys", "cria", "cyra", "dani", "doris", "faris", "firith", "goria", "grea", "hala", "hiri", "karia", "ki", "laia", "lia", "lies", "lista", "lith", "loth", "lypsis", "lyvia", "maia", "meia", "mine", "narei", "nirith", "nise", "phi", "pione", "punith", "qine", "rali", "rissa", "seis", "solis", "spira", "tari", "tish", "uphis", "vari", "vine", "wala", "wure", "xibis", "xori", "yis", "yola", "za", "zes"]
        ],
      },
      weight : 1,
      parent : [`Human`, `Demon`],
    },
    {
      name : `Goblin`,
      lastName : [],
      firstName : {
        Male : [
          ["","","c","cr","d","g","h","j","kr","m","n","p","r","s","st","t","v","vr","z","zr"],
          ["a","e","i","o","u","a","u"],
          ["ch","dg","dr","g","gd","gl","gg","gr","j","ll","rr","rd"],
          ["a","e","i","o","u","a","u"],
          ["","b","g","gg","k","lk","rg","rk","s","t"]
        ],
        Female : [
          ["","","b","d","g","j","m","n","p","q","r","v","z"],
          ["a","i","u","a","i","u","o","e"],
          ["b","br","d","dr","g","gn","gv","gr","lg","lgr","ld","ldr","lv","lz","ln","nd","nv","nr","rg","rz","rdr","rgr","rt"],
          ["a","i","u","a","i","u","o","e"],
          ["d","dd","g","l","ld","ll","n","nd","nn","y","v","z"],
          ["a","i","u","a","i","u","o","e"],
          ["","","k","l","n","r","s","t"],
        ],
      },
      weight : 1,
      parent : null,
    },
    {
      name : `Orc`,
      lastName : [
        ["The", ""],
        ["Aberrant", "Ancient", "Angry", "Anguished", "Arrogant", "Barbarian", "Barbaric", "Barren", "Berserk", "Bitter", "Bloody", "Broad", "Broken", "Brutal", "Brute", "Butcher", "Coarse", "Cold", "Colossal", "Crazy", "Crooked", "Cruel", "Dark", "Defiant", "Delirious", "Deranged", "Disfigured", "Enormous", "Enraged", "Fearless", "Feisty", "Fierce", "Filthy", "Forsaken", "Frantic", "Gargantuan", "Giant", "Glorious", "Grand", "Grave", "Grim", "Gross", "Gruesome", "Hollow", "Infernal", "Lethal", "Lost", "Loyal", "Macabre", "Mad", "Maniac", "Merciless", "Mighty", "Miscreant", "Noxious", "Outlandish", "Powerful", "Prime", "Proud", "Putrid", "Radical", "Reckless", "Repulsive", "Rotten", "Ruthless", "Shady", "Sick", "Silent", "Simple", "Smug", "Spiteful", "Swift", "Turbulent", "Ugly", "Unsightly", "Vengeful", "Venomous", "Vicious", "Violent", "Vivid", "Volatile", "Vulgar", "Warped", "Wicked", "Wild", "Worthless", "Wrathful", "Wretched", ""],
        ["Anger", "Ankle", "Ash", "Battle", "Beast", "Bitter", "Black", "Blood", "Bone", "Brain", "Brass", "Breath", "Chaos", "Chest", "Chin", "Cold", "Dark", "Death", "Dirt", "Doom", "Dream", "Elf", "Eye", "Fang", "Feet", "Fiend", "Finger", "Flame", "Flesh", "Foot", "Ghost", "Giant", "Gnoll", "Gnome", "Gore", "Hand", "Hate", "Head", "Heart", "Heel", "Hell", "Horror", "Iron", "Joint", "Kidney", "Kill", "Knee", "Muscle", "Nose", "Pest", "Poison", "Power", "Pride", "Rib", "Scale", "Skin", "Skull", "Slave", "Smoke", "Sorrow", "Spine", "Spite", "Steel", "Storm", "Talon", "Teeth", "Throat", "Thunder", "Toe", "Tooth", "Vein", "Venom", "Vermin", "War", ""],
        ["Axe", "Blade", "Brand", "Breaker", "Bruiser", "Burster", "Butcher", "Carver", "Chopper", "Cleaver", "Clobberer", "Conquerer", "Cracker", "Cruncher", "Crusher", "Cutter", "Dagger", "Defacer", "Despoiler", "Destroyer", "Dissector", "Ender", "Flayer", "Gasher", "Glaive", "Gouger", "Hacker", "Hammer", "Killer", "Lance", "Marauder", "Masher", "Mutilator", "Piercer", "Pummel", "Quasher", "Quelcher", "Queller", "Razer", "Render", "Ripper", "Saber", "Sabre", "Scalper", "Shatterer", "Skinner", "Slayer", "Slicer", "Smasher", "Snapper", "Spear", "Splitter", "Squasher", "Squelcher", "Squisher", "Strangler", "Sunderer", "Sword", "Trampler", "Trasher", "Vanquisher", "Wrecker",""]
      ],
      firstName : {
        Male : [
          ["", "", "", "b", "bh", "br", "d", "dh", "dr", "g", "gh", "gr", "j", "l", "m", "n", "r", "rh", "sh", "z", "zh"],
          ["a", "o", "u"],
          ["b", "br", "bz", "d", "dd", "dz", "dg", "dr", "g", "gg", "gr", "gz", "gv", "hr", "hz", "j", "kr", "kz", "m", "mz", "mv", "n", "ng", "nd", "nz", "r", "rt", "rz", "rd", "rl", "rz", "t", "tr", "v", "vr", "z", "zz"],
          ["a", "o", "u"],
          ["b", "d", "g", "g", "k", "k", "kk", "kk", "l", "ll", "n", "r"],
        ],
        Female : [
          ["", "", "", "", "b", "bh", "d", "dh", "g", "gh", "h", "k", "m", "n", "r", "rh", "s", "sh", "v", "z"],
          ["a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "ee", "au", "ye", "ie", "aa", "ou", "ua", "ao"],
          ["d", "dd", "dk", "dg", "dv", "g", "gg", "gn", "gv", "gz", "l", "ll", "lv", "lz", "m", "md", "mz", "mv", "ng", "nk", "ns", "nz", "t", "thr", "th", "v", "vn", "vr", "vg", "vd", "wnk", "wg", "wn"],
          ["a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "ee", "au", "ye", "ie", "aa", "ou", "ua", "ao"],
          ["", "", "", "", "", "f", "h", "k", "l", "m", "n", "ng", "v", "z"],
        ],
      },
      weight : 1,
      parent : null,
    },
    {
      name : `Demon`,
      lastName : [],
      firstName : {
        Male : [
          ["","","","","b","br","d","dr","g","j","k","m","r","s","t","th","tr","v","x","z"],
          ["a","e","i","o","u","a","a","o","o"],
          ["a","e","i","o","u","a","a","o","o"],
          ["a","e","i","o","u","a","a","o","o","a","e","i","o","u","a","a","o","o","a","e","i","o","u","a","a","o","o","a","e","i","o","u","a","a","o","o","a","e","i","o","u","a","a","o","o","iu","uu","au","aa"],
          ["g","g'dr","g'th","gdr","gg","gl","gm","gr","gth","k","l'g","lg","lgr","llm","lm","lr","lv","n","ngr","nn","r","r'","r'g","rg","rgr","rk","rn","rr","rthr","rz","str","th't","z","z'g","zg","zr","zz"],
          ["ch","d","g","k","l","n","n","n","n","n","r","s","th","th","th","th","th","z"],
        ],
        Female : [
          ["","","","","b","br","d","dr","g","j","k","m","r","s","t","th","tr","v","x","z"],
          ["a","e","i","o","u","a","a","o","o"],
          ["g","g'dr","g'th","gdr","gg","gl","gm","gr","gth","k","l'g","lg","lgr","llm","lm","lr","lv","n","ngr","nn","r","r'","r'g","rg","rgr","rk","rn","rr","rthr","rz","str","th't","z","z'g","zg","zr","zz"],
          ["a","e","i","o","u","a","a","o","o","a","e","i","o","u","a","a","o","o","a","e","i","o","u","a","a","o","o","a","e","i","o","u","a","a","o","o","a","e","i","o","u","a","a","o","o","iu","uu","au","aa"],
          ["ch","d","g","k","l","n","n","n","n","n","r","s","th","th","th","th","th","z"],
        ]
      },
      weight : 1,
      parent : null,
    },
  ];

  // build sex & race is necessary
  if (!sex) sex = randomArrayElement([`Male`,`Female`].shuffle());
  if (!race)
  {
    let weightedRaces = weightedArray(raceData, `weight`, `name`);
    race = randomArrayElement(weightedRaces.shuffle());
  }

  let data = duplicate(raceData.find(ele=> race.toLowerCase().includes(ele.name.toLowerCase())));

  if(data.parent !== null)
  {
    let prnt = randomArrayElement(data.parent);
    data.lastName = duplicate(raceData.find(ele=> ele.name === prnt).lastName);
  }

  lnLength = data.lastName.length * Math.random();
  lnLength = lnLength > 5 ? lnLength : 5;

  if(!data) return error(`You fucked up!`);

  log(data);

  return { 
    firstName : capitalize(data.firstName[sex].map(arr=> randomArrayElement(arr.shuffle())).join(``)),
    lastName : capitalize(data.lastName.map(arr=> randomArrayElement(arr.shuffle())).filter((e,i)=> i < lnLength ).join(``)),
    race, sex
  };
}