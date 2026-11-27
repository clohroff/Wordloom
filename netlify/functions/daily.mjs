// Daily puzzle: one board a day, a month at a time.
// A day's board (its words and clues) is only sent once that date has begun somewhere on Earth
// (the earliest time zone, UTC+14), so nobody can read ahead in the page. Each player's own phone
// then waits for its own local midnight. Every day's title and spot on the month map are public; its words are not.
// To add or change days, edit MONTHS below (it is generated from the approved board drafts).

const MONTHS = {
 "2026-12": {
  "days": 31,
  "spots": {"1": [0, 0], "2": [1, 0], "3": [1, 1], "4": [0, 1], "5": [-1, 1], "6": [-1, 0], "7": [-1, -1], "8": [0, -1], "9": [1, -1], "10": [2, -1], "11": [2, 0], "12": [2, 1], "13": [2, 2], "14": [1, 2], "15": [0, 2], "16": [-1, 2], "17": [-2, 2], "18": [-2, 1], "19": [-2, 0], "20": [-2, -1], "21": [-2, -2], "22": [-1, -2], "23": [0, -2], "24": [1, -2], "25": [2, -2], "26": [3, -2], "27": [3, -1], "28": [3, 0], "29": [3, 1], "30": [3, 2], "31": [3, 3]},
  "titles": {
   "1": "Winter Wonderland",
   "2": "Hot Cocoa",
   "3": "Gingerbread",
   "4": "Hanukkah",
   "5": "Ice Skating",
   "6": "St. Nicholas Day",
   "7": "Candy Canes",
   "8": "Ugly Sweaters",
   "9": "Reindeer",
   "10": "Nutcracker",
   "11": "Holiday Movies",
   "12": "Holiday Plants",
   "13": "Candlelight",
   "14": "Gift Wrap",
   "15": "Carols",
   "16": "Tea Party",
   "17": "First Flight",
   "18": "Holiday Travel",
   "19": "Elves",
   "20": "Christmas Tree",
   "21": "Winter Solstice",
   "22": "North Pole",
   "23": "Festivus",
   "24": "Christmas Eve",
   "25": "Christmas",
   "26": "Kwanzaa",
   "27": "Leftovers",
   "28": "Card Games",
   "29": "Blizzard",
   "30": "Resolutions",
   "31": "New Year's Eve"
  },
  "boards": [
   {
    "day": 1,
    "id": "d1",
    "title": "Winter Wonderland",
    "at": [
     0,
     0
    ],
    "words": "marshmallow<snowman|White, puffy and stackable@82.0,600\nSwiss Miss<Alps|Cocoa mix with a girl in braids@98.0,600\nsnow<hub|Falls in flakes@109.0,234\nsled<hub|Ride it down the slope@92.9,217\nicicle<hub|Frozen spike hanging from the gutter@276.3,218\nmitten<hub|Glove without fingers@25.7,190\nsnowman<hub|Coal eyes, button smile@49.7,260\nfrost<hub|White coating on the morning lawn@305.8,197\nshovel<snow|Clears the driveway@116.8,290\nhill<sled|What you ride down@80.8,290\ncarrot<snowman|His nose@40.5,398\nscarf<snowman+mitten|Wrapped around your neck@33.6,290\nwindow<frost+icicle|Pane where icy ferns appear@290.2,290\nAlps<snow+sled|Swiss mountains@100.9,315\nRosebud<sled|Last word in Citizen Kane@90.9,323\nJack<frost|He nips at your nose@305.6,290\ncake<carrot|Dessert that sneaks in a vegetable@34.3,440\nfrosting<frost+cake|Sweet topping spread with a knife@22.9,324"
   },
   {
    "day": 2,
    "id": "d2",
    "title": "Hot Cocoa",
    "at": [
     1,
     0
    ],
    "words": "Swiss Miss<chocolate|\nmarshmallow<mug|\nYule log<log+chocolate|Rolled sponge dessert made to look like wood@172.0,600\nsprinkles<whipped cream|Rainbow bits on top@188.0,600\nmug<hub|Big cup for hot drinks@282.1,260\nchocolate<hub|What the powder is made of@226.3,260\nwhipped cream<hub|Sprayed on top from a can@189.1,190\nsteam<hub|Rises off a hot drink@126.5,230\nfireplace<hub|Where you warm your toes@156.9,260\nblanket<hub|Wrap up on the couch@333.2,190\nhandle<mug|What you hold it by@270.6,290\nHershey<chocolate|Kisses maker@222.2,348\nlog<fireplace|Goes on the fire@164.6,332\nchimney<fireplace+steam|Where the smoke goes@130.1,290\nWorld's Best Boss<mug|Michael Scott's prized coffee cup@292.0,290\nPennsylvania<Hershey|Keystone State, home of a famous candy town@223.0,440\nwet blanket<blanket|Party pooper@336.0,290\nengine<steam|What powered the old locomotive@108.7,303"
   },
   {
    "day": 3,
    "id": "d3",
    "title": "Gingerbread",
    "at": [
     1,
     1
    ],
    "words": "sprinkles<icing|\nYule log<oven|\ndoughnut<icing|Glazed ring@284.0,600\ncandle<house|Small flame on a wax stick@273.3,600\nicing<hub|Piped-on glue for the walls@300.9,260\noven<hub|Where the dough bakes@4.1,253\nhouse<hub|What you build from the pieces@275.8,253\nginger<hub|Spicy root in the dough@98.4,260\nmolasses<hub|Dark, sticky sweetener@38.2,190\ngumdrop<hub|Chewy sugared candy dome@227.9,190\nroof<house+icing|Top of the cottage, piped white@285.2,290\ntimer<oven|Dings when it's done@353.6,307\nHansel<house|Found a witch's candy cottage@265.2,290\nginger ale<ginger|Fizzy stomach settler@108.1,290\nGretel<Hansel|His sister@267.5,440\nSpice Girls<ginger|Ginger, Posh, Scary, Sporty and Baby@87.2,305\nEasy-Bake<oven|Toy oven with a light bulb@18.8,320\nCandy Land<gumdrop|Board game with Gumdrop Mountains@224.4,290"
   },
   {
    "day": 4,
    "id": "d4",
    "title": "Hanukkah",
    "at": [
     0,
     1
    ],
    "words": "doughnut<oil|\ncandle<menorah|\nspin<dreidel|What the top does@272.3,600\neight<menorah|Nights of the holiday@256.0,600\nmenorah<hub|Nine-branched lamp lit through the holiday@117.7,190\ndreidel<hub|Four-sided top with Hebrew letters@279.9,236\nlatkes<hub|Crispy fried pancakes, golden at the edges@345.2,244\noil<hub|Burned in the Temple far longer than it should have@82.3,211\ngelt<hub|Foil-wrapped money you can eat@25.2,204\nMaccabees<hub|Rebels who rededicated the Temple@259.6,206\nshamash<menorah|Helper light that kindles the rest@118.8,290\napplesauce<latkes|Topping that isn't sour cream@357.6,290\npotato<latkes|Grated into the batter@336.1,366\ncoins<gelt|What the foil-wrapped treats look like@26.6,290\nhammer<Maccabees|What \"Maccabee\" may mean@251.8,290\nMr. Potato Head<potato|Toy with a mix-and-match face@336.9,440"
   },
   {
    "day": 5,
    "id": "d5",
    "title": "Ice Skating",
    "at": [
     -1,
     1
    ],
    "words": "spin<figure skating|\neight<figure skating|\nboot<blades+lace|Top half of a skate@358.8,600\nrink<hub|Where you go round and round@62.4,190\nfigure skating<hub|Olympic sport with judges and sequins@98.1,260\nblades<hub|What you glide on@354.6,260\nZamboni<hub|Machine that smooths the ice@175.4,190\nhockey<hub|Sticks, skates and a lot of checking@269.0,260\npond<hub|Frozen outdoor skating spot@296.1,236\npuck<hockey|Black rubber disc@269.2,359\ntriple axel<figure skating|Three and a half turns in the air@107.6,290\nRockefeller<rink|Center with the famous city rink@60.9,290\nthin ice<pond|Where you shouldn't be@305.0,290\nlace<blades|Tie it tight@3.6,440\nStanley Cup<hockey|Trophy the champions drink from@259.0,290\ntree<Rockefeller|Giant spruce lit in Midtown each December@62.6,440\nMighty Ducks<hockey+pond|Kids' team from the movies, coached by Gordon Bombay@280.4,290"
   },
   {
    "day": 6,
    "id": "d6",
    "title": "St. Nicholas Day",
    "at": [
     -1,
     0
    ],
    "words": "boot<shoes|\ncrook<bishop|Hooked staff, or a thief@352.0,600\ncandy cane<bishop|Shaped like his staff, legend says@8.0,600\nbishop<hub|Nicholas's job@354.3,260\nshoes<hub|Left out overnight for treats@172.1,260\noranges<hub|Fruit tucked inside@115.9,208\nSinterklaas<hub|His name in the Netherlands@146.7,203\nKrampus<hub|Horned figure for naughty kids@238.5,197\ngifts<hub|What he leaves@214.0,205\nchess<bishop|Game where he moves diagonally@344.4,370\nDutch<Sinterklaas|People of the Netherlands@153.0,290\nswitch<Krampus|Bundle of birch sticks@232.2,291\njuice<oranges|Squeezed at breakfast@117.8,338\ncheckmate<chess|Game over for the king@343.0,440\nclogs<Dutch+shoes|Wooden footwear@165.4,322\nNintendo Switch<switch+gifts|Console you can take on the go@217.9,290\nFlorida<juice|Sunshine State groves@119.2,440"
   },
   {
    "day": 7,
    "id": "d7",
    "title": "Candy Canes",
    "at": [
     -1,
     -1
    ],
    "words": "candy cane<peppermint+stripes|\ncrook<hook|\npattern<stripes|Repeating design@104.0,600\ntacky<sugar|Sticky, or in poor taste@76.0,600\npeppermint<hub|Cool, minty flavor@161.3,260\nstripes<hub|Red and white swirl@122.4,260\nhook<hub|The curved top@216.0,258\nsugar<hub|Mostly what it's made of@79.4,259\nlollipop<hub|Candy on a stick@307.1,190\ncandy shop<hub|Where jars line the walls@241.2,190\nbarber pole<stripes|Striped sign outside a haircut shop@123.3,356\nTootsie Pop<lollipop|Chewy center inside the hard candy@306.7,300\nsugar rush<sugar|Burst of energy after sweets@69.5,290\nPeppermint Patty<peppermint|Charlie Brown's freckled friend@183.9,297\nCaptain Hook<hook|Peter Pan's enemy@237.6,290\nzebra<stripes|Horse in a striped suit@107.9,290\nowl<Tootsie Pop|Counted the licks: \"a-one, a-two-hoo, a-three\"@307.0,440"
   }
  ]
 }
};

const json = (body, status = 200, cache = "no-store") =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": cache } });
const pad = (n) => String(n).padStart(2, "0");

export default async (req) => {
  const url = new URL(req.url);
  const month = url.searchParams.get("month") || "";
  if (!/^\d{4}-\d{2}$/.test(month)) return json({ error: "Bad month" }, 400);
  const m = MONTHS[month];
  const [y, mo] = month.split("-").map(Number);
  const days = new Date(Date.UTC(y, mo, 0)).getUTCDate();
  if (!m) return json({ month, days, titles: {}, spots: {}, boards: [], released: 0 }, 200, "public, max-age=300");
  const first = new Date(Date.now() + 14 * 3600e3);   // the date in the earliest time zone
  const here = `${first.getUTCFullYear()}-${pad(first.getUTCMonth() + 1)}`;
  const released = here > month ? days : here < month ? 0 : first.getUTCDate();
  const boards = m.boards.filter((b) => b.day <= released);
  return json({ month, days, titles: m.titles, spots: m.spots, boards, released }, 200, "public, max-age=60");
};

export const config = { path: "/api/daily", method: ["GET"] };
