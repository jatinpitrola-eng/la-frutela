export type CategoryId = "icecream" | "cakes" | "shakes" | "waffles" | "bakery";

export interface Category {
  id: CategoryId;
  label: string;
  tagline: string;
  img: string;
}

export interface Dessert {
  id: string;
  name: string;
  category: CategoryId;
  desc: string;
  longDesc: string;
  price: number;
  rating: number;
  reviews: number;
  img: string;
  tag?: "Bestseller" | "New" | "Chef's Special" | "Seasonal";
  calories: string;
  servings: string;
  prep: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "icecream",
    label: "Signature Ice Creams",
    tagline: "Small-batch gelato churned at dawn",
    img: "/images/gelato.png",
  },
  {
    id: "cakes",
    label: "Cakes & Slices",
    tagline: "Layered luxury, baked with love",
    img: "/images/redvelvet.png",
  },
  {
    id: "shakes",
    label: "Royal Thick Shakes",
    tagline: "Spoon-thick, sip-worthy legends",
    img: "/images/nutella-shake.png",
  },
  {
    id: "waffles",
    label: "Waffles & Crepes",
    tagline: "Crisp, golden & dangerously good",
    img: "/images/belgian-waffle.png",
  },
  {
    id: "bakery",
    label: "Sweet Bites",
    tagline: "Petite treats from our French patisserie",
    img: "/images/macarons.png",
  },
];

export const DESSERTS: Dessert[] = [
  /* ── Signature Ice Creams ── */
  {
    id: "belgian-gelato",
    name: "Belgian Chocolate Gelato",
    category: "icecream",
    desc: "Slow-churned gelato with 70% Belgian couverture & cocoa nibs.",
    longDesc:
      "Our signature gelato is churned in tiny batches every morning using 70% single-origin Belgian couverture, organic milk and a whisper of sea salt. Finished with hand-shaved chocolate curls — dense, silky and unapologetically intense.",
    price: 249,
    rating: 4.9,
    reviews: 1240,
    img: "/images/gelato.png",
    tag: "Bestseller",
    calories: "310 kcal",
    servings: "1 generous scoop bowl",
    prep: "Scooped fresh",
  },
  {
    id: "mango-tango",
    name: "Mango Tango Sundae",
    category: "icecream",
    desc: "Alphonso mango gelato, fresh cubes & saffron mango ribbons.",
    longDesc:
      "A love letter to Alphonso season. Layers of mango gelato, fresh diced Alphonso, saffron-infused mango ribbons and cloud-whipped cream — crowned with a tiny gold flake because every mango deserves royalty treatment.",
    price: 219,
    rating: 4.8,
    reviews: 862,
    img: "/images/mango-sundae.png",
    tag: "Seasonal",
    calories: "340 kcal",
    servings: "Tall sundae glass",
    prep: "5 min assembly",
  },
  {
    id: "pistachio-royale",
    name: "Roasted Pistachio Royale",
    category: "icecream",
    desc: "Iranian pistachio praline gelato with roasted crunch.",
    longDesc:
      "Slow-roasted Iranian pistachios, stone-ground into a silky praline and folded through our house gelato base. Topped with crushed pistachio dukkah for a buttery, savoury-sweet finish that keeps regulars coming back for a decade.",
    price: 239,
    rating: 4.9,
    reviews: 975,
    img: "/images/pistachio.png",
    calories: "330 kcal",
    servings: "1 scoop bowl",
    prep: "Scooped fresh",
  },
  {
    id: "strawberry-cloud",
    name: "Strawberry Cloud Scoop",
    category: "icecream",
    desc: "Mahabaleshwar strawberries folded into vanilla-cream gelato.",
    longDesc:
      "Sun-ripened Mahabaleshwar strawberries are macerated overnight, then hand-folded into Madagascar vanilla cream gelato. Every spoon carries real fruit ribbons — pink, pretty and perfectly tart-sweet.",
    price: 199,
    rating: 4.7,
    reviews: 640,
    img: "/images/strawberry-scoop.png",
    tag: "New",
    calories: "280 kcal",
    servings: "1 scoop bowl",
    prep: "Scooped fresh",
  },

  /* ── Cakes & Slices ── */
  {
    id: "molten-fudge",
    name: "Molten Choco Fudge Cake",
    category: "cakes",
    desc: "Warm 70% chocolate sponge with a flowing lava heart.",
    longDesc:
      "Our most-photographed legend. A warm Belgian chocolate sponge hiding a slow, molten lava heart, served with a scoop of vanilla bean gelato and 24k gold dust. Crack it open and watch the room go quiet.",
    price: 349,
    rating: 5.0,
    reviews: 1830,
    img: "/images/choco-fudge.png",
    tag: "Bestseller",
    calories: "520 kcal",
    servings: "Serves 1 (generously)",
    prep: "Warmed 6 min",
  },
  {
    id: "red-velvet",
    name: "Royal Red Velvet",
    category: "cakes",
    desc: "Buttermilk-red velvet layers, cream cheese frosting, gold leaf.",
    longDesc:
      "Three tender buttermilk-red layers stacked with whipped cream-cheese frosting and finished with edible 24k gold leaf. The slice our founder refuses to ever remove from the menu — and once you taste it, you'll know why.",
    price: 399,
    rating: 4.9,
    reviews: 1512,
    img: "/images/redvelvet.png",
    tag: "Chef's Special",
    calories: "480 kcal",
    servings: "Serves 1",
    prep: "Plated fresh",
  },
  {
    id: "ny-cheesecake",
    name: "New York Cheesecake",
    category: "cakes",
    desc: "Dense baked cheesecake, vanilla bean, berry compote.",
    longDesc:
      "Baked low and slow the true New York way — dense, rich and velvet-smooth with real vanilla bean, a buttery biscuit base and a bright strawberry compote. A masterclass in restraint.",
    price: 379,
    rating: 4.8,
    reviews: 1105,
    img: "/images/cheesecake-v2.png",
    calories: "450 kcal",
    servings: "Serves 1",
    prep: "Chilled & plated",
  },
  {
    id: "fruit-tart",
    name: "La'Frutella Fruit Tart",
    category: "cakes",
    desc: "Buttery tart, Madagascar custard, glazed seasonal fruit.",
    longDesc:
      "A crisp buttery shell filled with silky Madagascar vanilla custard, crowned with the season's finest glazed fruit — strawberries, blueberries, kiwi. Brushed with apricot glaze for that patisserie-window shine.",
    price: 329,
    rating: 4.8,
    reviews: 733,
    img: "/images/fruit-tart.png",
    tag: "New",
    calories: "390 kcal",
    servings: "Serves 1",
    prep: "Assembled fresh",
  },

  /* ── Royal Thick Shakes ── */
  {
    id: "nutella-kiss",
    name: "Nutella Kiss Shake",
    category: "shakes",
    desc: "Double Nutella, hazelnut praline & couverture drizzle.",
    longDesc:
      "Double scoops of Nutella whipped with gelato-thick milk and hazelnut praline, finished with a warm couverture drizzle cascading down the glass. Comes with the spoon — you'll need it.",
    price: 279,
    rating: 4.9,
    reviews: 1671,
    img: "/images/nutella-shake.png",
    tag: "Bestseller",
    calories: "560 kcal",
    servings: "400 ml tall glass",
    prep: "Blended 3 min",
  },
  {
    id: "oreo-crunch",
    name: "Oreo Crunch Shake",
    category: "shakes",
    desc: "Cookies-and-cream shake with cookie rubble & cream.",
    longDesc:
      "A cookies-and-cream dream — vanilla bean gelato blitzed with crushed Oreo, layered with cookie rubble and topped with a cloud of whipped cream. Crunchy, creamy, gone in minutes.",
    price: 249,
    rating: 4.8,
    reviews: 1288,
    img: "/images/oreo-shake.png",
    calories: "510 kcal",
    servings: "400 ml tall glass",
    prep: "Blended 3 min",
  },
  {
    id: "kesar-mango",
    name: "Kesar Mango Shake",
    category: "shakes",
    desc: "Kesar mango pulp, saffron strands & condensed milk.",
    longDesc:
      "Gujarat's finest Kesar mangoes blended with saffron strands, chilled milk and a touch of condensed milk. Tastes like summer in Gujarat tastes — golden, fragrant, nostalgic.",
    price: 229,
    rating: 4.7,
    reviews: 819,
    img: "/images/mango-shake.png",
    tag: "Seasonal",
    calories: "390 kcal",
    servings: "400 ml tall glass",
    prep: "Blended 3 min",
  },
  {
    id: "salted-caramel",
    name: "Salted Caramel Shake",
    category: "shakes",
    desc: "House caramel, flaky sea salt & caramel drizzle.",
    longDesc:
      "House-made caramel cooked to a deep amber, blended with vanilla gelato and finished with flaky sea salt and a caramel drizzle. Sweet, salty, sophisticated — the connoisseur's shake.",
    price: 259,
    rating: 4.8,
    reviews: 903,
    img: "/images/caramel-shake.png",
    calories: "530 kcal",
    servings: "400 ml tall glass",
    prep: "Blended 3 min",
  },

  /* ── Waffles & Crepes ── */
  {
    id: "belgian-waffle",
    name: "Classic Belgian Waffle",
    category: "waffles",
    desc: "Pearl-sugar waffle, vanilla gelato, warm choco sauce.",
    longDesc:
      "The real Liège deal — pearl-sugar waffle pressed till caramelised and crisp, topped with vanilla bean gelato and warm Belgian chocolate sauce. Crackles, melts, repeats.",
    price: 269,
    rating: 4.8,
    reviews: 1054,
    img: "/images/belgian-waffle.png",
    calories: "480 kcal",
    servings: "Serves 1",
    prep: "Pressed 7 min",
  },
  {
    id: "choco-lava-waffle",
    name: "Choco Lava Waffle",
    category: "waffles",
    desc: "Waffle volcano with molten chocolate & gelato snow.",
    longDesc:
      "A waffle built like a volcano — its core filled with molten Belgian chocolate that erupts on first cut, cooled by a scoop of gelato snow. Bring backup. Seriously.",
    price: 299,
    rating: 4.9,
    reviews: 1342,
    img: "/images/lava-waffle.png",
    tag: "Bestseller",
    calories: "560 kcal",
    servings: "Serves 1–2 (brave)",
    prep: "Pressed 9 min",
  },
  {
    id: "berry-crepe",
    name: "Berry Bliss Crêpe",
    category: "waffles",
    desc: "Delicate crêpes, whipped mascarpone, macerated berries.",
    longDesc:
      "Paper-thin crêpes folded over cloud-light whipped mascarpone and macerated garden berries, lacquered with warm berry coulis. Elegant enough for Paris, sweet enough for seconds.",
    price: 289,
    rating: 4.7,
    reviews: 688,
    img: "/images/berry-crepe.png",
    calories: "410 kcal",
    servings: "Serves 1",
    prep: "Crêped to order",
  },
  {
    id: "banana-caramel",
    name: "Caramel Banana Waffle",
    category: "waffles",
    desc: "Torched banana, salted caramel drizzle & walnut crunch.",
    longDesc:
      "Caramelised banana torched till golden, layered on a crisp waffle with salted caramel drizzle and candied walnut crunch. Elvis approved. Nutritionists notified.",
    price: 309,
    rating: 4.8,
    reviews: 774,
    img: "/images/banana-waffle.png",
    calories: "520 kcal",
    servings: "Serves 1",
    prep: "Pressed 7 min",
  },

  /* ── Sweet Bites ── */
  {
    id: "macaron-box",
    name: "French Macaron Box",
    category: "bakery",
    desc: "Six jewel-toned macarons: rose, pistachio, gold & more.",
    longDesc:
      "Six jewel-toned macarons baked each dawn — rose, pistachio, salted caramel, vanilla-gold, raspberry and dark chocolate. Crackly shells, chewy middles, ribbon-tied like the gift they are.",
    price: 349,
    rating: 4.9,
    reviews: 921,
    img: "/images/macarons.png",
    tag: "Chef's Special",
    calories: "65 kcal each",
    servings: "Box of 6",
    prep: "Boxed fresh",
  },
  {
    id: "fudgy-brownie",
    name: "Fudgy Brownie Stack",
    category: "bakery",
    desc: "Triple-chocolate brownies with crackly tops & glaze.",
    longDesc:
      "Three generations of one recipe: dark chocolate batter, walnut rubble, crackly meringue tops and a glossy couverture glaze dripping down the stack. Warm it for ten seconds. Thank us later.",
    price: 249,
    rating: 4.8,
    reviews: 1002,
    img: "/images/brownie.png",
    calories: "380 kcal",
    servings: "Stack of 3",
    prep: "Baked daily",
  },
  {
    id: "cupcake-trio",
    name: "Cloud Cupcake Trio",
    category: "bakery",
    desc: "Triple-butter cupcakes with swirled buttercream clouds.",
    longDesc:
      "Three cloud-soft cupcakes crowned with sky-high Swiss buttercream swirls and gold sprinkles — vanilla bean, Belgian chocolate and strawberry cream. Almost too pretty to eat. Almost.",
    price: 299,
    rating: 4.7,
    reviews: 566,
    img: "/images/cupcake.png",
    calories: "290 kcal each",
    servings: "Trio box",
    prep: "Baked daily",
  },
  {
    id: "donut-duo",
    name: "Glazed Donut Duo",
    category: "bakery",
    desc: "Pillowy donuts: strawberry sprinkle & choc glaze.",
    longDesc:
      "Pillowy brioche donuts fried to a perfect gold — one dipped in strawberry glaze with rainbow sprinkles, one drowned in chocolate glaze. Childhood, but upgraded.",
    price: 279,
    rating: 4.8,
    reviews: 845,
    img: "/images/donut.png",
    tag: "New",
    calories: "320 kcal each",
    servings: "Duo box",
    prep: "Fried fresh",
  },
];

export const ADDONS = [
  { id: "choco-sauce", label: "Warm Belgian Choco Sauce", price: 30 },
  { id: "extra-scoop", label: "Extra Gelato Scoop", price: 50 },
  { id: "gold-flakes", label: "Edible 24k Gold Flakes", price: 80 },
  { id: "berry-mix", label: "Fresh Berry Mix", price: 40 },
] as const;

export const PARADE_ITEMS = [
  { img: "/images/cone.png", name: "Soft-Serve Swirl" },
  { img: "/images/popsicle.png", name: "Fruit Popsicles" },
  { img: "/images/donut.png", name: "Glazed Donuts" },
  { img: "/images/cupcake.png", name: "Cloud Cupcakes" },
  { img: "/images/macarons.png", name: "French Macarons" },
  { img: "/images/brownie.png", name: "Fudgy Brownies" },
  { img: "/images/gelato.png", name: "Belgian Gelato" },
  { img: "/images/cheesecake-v2.png", name: "NY Cheesecake" },
  { img: "/images/strawberry-scoop.png", name: "Strawberry Scoop" },
  { img: "/images/mango-sundae.png", name: "Mango Tango" },
  { img: "/images/pistachio.png", name: "Pistachio Royale" },
  { img: "/images/lava-waffle.png", name: "Lava Waffle" },
];

export const MARQUEE_FLAVORS = [
  "Belgian Gelato",
  "Molten Choco Fudge",
  "Royal Red Velvet",
  "Nutella Kiss Shake",
  "French Macarons",
  "Berry Bliss Crêpe",
  "Mango Tango Sundae",
  "Fudgy Brownies",
  "Kesar Mango Shake",
  "Glazed Donuts",
  "Cloud Cupcakes",
  "Fruit Tart",
];

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/* ══════════════════════════════════════════════
   FLAVOR LAB — Build-your-own sundae data
   ══════════════════════════════════════════════ */

export interface LabBase {
  id: string;
  name: string;
  short: string;
  note: string;
  img: string;
  price: number;
}

export interface LabSauce {
  id: string;
  name: string;
  short: string;
  price: number;
  color: string;
}

export interface LabTopping {
  id: string;
  name: string;
  img: string;
  price: number;
}

export const LAB_BASES: LabBase[] = [
  {
    id: "belgian",
    name: "Belgian Chocolate",
    short: "Belgian",
    note: "70% couverture",
    img: "/images/gelato.png",
    price: 180,
  },
  {
    id: "pistachio",
    name: "Roasted Pistachio",
    short: "Pistachio",
    note: "Iranian praline",
    img: "/images/pistachio.png",
    price: 190,
  },
  {
    id: "strawberry",
    name: "Strawberry Cloud",
    short: "Berry",
    note: "Mahabaleshwar fruit",
    img: "/images/strawberry-scoop.png",
    price: 160,
  },
  {
    id: "mango",
    name: "Mango Tango",
    short: "Mango",
    note: "Alphonso & saffron",
    img: "/images/mango-sundae.png",
    price: 170,
  },
];

export const LAB_SAUCES: LabSauce[] = [
  { id: "choco", name: "Warm Choco Rain", short: "Choco", price: 30, color: "#3b2314" },
  { id: "caramel", name: "Salted Caramel Silk", short: "Caramel", price: 30, color: "#c67f2e" },
  { id: "berry", name: "Berry Coulis", short: "Berry", price: 35, color: "#c4405e" },
  { id: "gold", name: "24k Gold Drizzle", short: "Gold", price: 60, color: "#d9a441" },
];

export const LAB_TOPPINGS: LabTopping[] = [
  { id: "macaron", name: "Mini Macaron", img: "/images/macarons.png", price: 45 },
  { id: "brownie", name: "Brownie Chunk", img: "/images/brownie.png", price: 50 },
  { id: "donut", name: "Donut Bites", img: "/images/donut.png", price: 45 },
  { id: "waffle", name: "Waffle Crisps", img: "/images/belgian-waffle.png", price: 50 },
  { id: "berries", name: "Fresh Berries", img: "/images/fruit-tart.png", price: 40 },
  { id: "cupcake", name: "Cupcake Crown", img: "/images/cupcake.png", price: 55 },
];

/* ══════════════════════════════════════════════
   THE CRAFT — dawn-to-gold process steps
   ══════════════════════════════════════════════ */

export const CRAFT_STEPS = [
  {
    n: "01",
    icon: "sprout",
    title: "Sourced at Dawn",
    text: "Farm fruit arrives before sunrise, Belgian couverture every Friday. Only what's absolutely perfect makes it through our kitchen door.",
  },
  {
    n: "02",
    icon: "flame",
    title: "Churned & Tempered",
    text: "Gelato churned slow and low for that dense, silky body. Chocolate tempered to a glassy snap that sings when you crack it.",
  },
  {
    n: "03",
    icon: "layers",
    title: "Layered & Torched",
    text: "Sponges brushed, glasses streaked, crêpes folded by hand. Layers built one at a time — no shortcuts, no mixes, no rush.",
  },
  {
    n: "04",
    icon: "sparkles",
    title: "Finished in Gold",
    text: "The final flourish: 24k gold flakes, hand-shaved curls, a whisper of saffron. If it isn't beautiful, it doesn't leave the pass.",
  },
] as const;

/* ══════════════════════════════════════════════
   FAQ — everything sweet tooths ask
   ══════════════════════════════════════════════ */

export const FAQS = [
  {
    q: "Do you deliver, and how fast?",
    a: "Yes — within 8 km of MG Road we deliver in under 40 minutes, packed in insulated boxes that keep gelato at −12°C. Pickup orders are ready in just 15 minutes.",
  },
  {
    q: "Can I order a custom celebration cake?",
    a: "Absolutely. Share your theme 24 hours ahead and we'll design it with you — jewellery-box cakes, cricket-pitch brownies, even a miniature Taj Mahal in red velvet.",
  },
  {
    q: "Are there vegan or no-refined-sugar options?",
    a: "Six gelato bases are coconut-milk vegan and our date-sweetened sorbets carry zero refined sugar. Ask at the counter or look for the green ✦ tag on the menu.",
  },
  {
    q: "How fresh is 'fresh', really?",
    a: "Gelato is churned every morning at 6 AM, bakes leave the oven before 8 AM, and anything unsold at closing goes to the night shelter — never the next day's counter.",
  },
  {
    q: "Do you cater parties and weddings?",
    a: "We do live gelato carts, dessert counters and full hamper tables for 50–2,000 guests. Book 10 days ahead for peak-season weekends — summer dates go fast.",
  },
] as const;

/* ══════════════════════════════════════════════
   ROUND 3 · FLAVOR FINDER QUIZ
   ══════════════════════════════════════════════ */

export interface QuizOption {
  emoji: string;
  label: string;
  sub: string;
  scores: Record<string, number>;
}

export interface QuizQuestion {
  q: string;
  sub: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    q: "What kind of day are you having?",
    sub: "We'll match a dessert to your mood — be honest.",
    options: [
      {
        emoji: "🎉",
        label: "Celebrating something big",
        sub: "Confetti mode: ON",
        scores: { "molten-fudge": 3, "red-velvet": 2, "choco-lava-waffle": 2 },
      },
      {
        emoji: "😌",
        label: "Cozy & calm",
        sub: "Slow morning energy",
        scores: { "ny-cheesecake": 3, "pistachio-royale": 2, "belgian-gelato": 1 },
      },
      {
        emoji: "🌞",
        label: "Bright & fresh",
        sub: "Fruit-forward, please",
        scores: { "strawberry-cloud": 3, "mango-tango": 3, "berry-crepe": 1 },
      },
      {
        emoji: "💫",
        label: "Nostalgic & dreamy",
        sub: "Childhood, but fancy",
        scores: { "nutella-kiss": 3, "fudgy-brownie": 2, "donut-duo": 2 },
      },
    ],
  },
  {
    q: "Your dream texture?",
    sub: "The bite matters as much as the flavor.",
    options: [
      {
        emoji: "☁️",
        label: "Cloud-soft",
        sub: "Sponge, cream, air",
        scores: { "red-velvet": 2, "strawberry-cloud": 2, "berry-crepe": 2, "cupcake-trio": 1 },
      },
      {
        emoji: "🍫",
        label: "Melt-in-mouth rich",
        sub: "Decadent & gooey",
        scores: { "molten-fudge": 3, "nutella-kiss": 2, "choco-lava-waffle": 2 },
      },
      {
        emoji: "🧊",
        label: "Silky & ice-cold",
        sub: "Dense gelato body",
        scores: { "belgian-gelato": 3, "mango-tango": 2, "pistachio-royale": 2 },
      },
      {
        emoji: "✨",
        label: "Crunchy little bites",
        sub: "Snap, crackle, luxe",
        scores: { "macaron-box": 2, "fudgy-brownie": 2, "choco-lava-waffle": 2, "pistachio-royale": 1 },
      },
    ],
  },
  {
    q: "Last one — pick a flavor family.",
    sub: "Your soul dessert is waiting on the other side.",
    options: [
      {
        emoji: "🫐",
        label: "Berry royal",
        sub: "Pink, tart & pretty",
        scores: { "strawberry-cloud": 3, "red-velvet": 2, "berry-crepe": 2 },
      },
      {
        emoji: "🥭",
        label: "Tropical gold",
        sub: "Sunshine in a bite",
        scores: { "mango-tango": 3, "kesar-mango": 2, "salted-caramel": 1 },
      },
      {
        emoji: "🥜",
        label: "Nutty luxe",
        sub: "Roasted & buttery",
        scores: { "pistachio-royale": 3, "nutella-kiss": 2, "salted-caramel": 1 },
      },
      {
        emoji: "🍫",
        label: "Deep chocolate",
        sub: "70% or nothing",
        scores: { "belgian-gelato": 3, "molten-fudge": 2, "fudgy-brownie": 2 },
      },
    ],
  },
];

/* ══════════════════════════════════════════════
   ROUND 3 · FRUIT SEASONS
   ══════════════════════════════════════════════ */

export interface Season {
  id: string;
  name: string;
  months: string;
  emoji: string;
  fruits: string[];
  dessertId: string;
  note: string;
}

export const SEASONS: Season[] = [
  {
    id: "summer",
    name: "Summer",
    months: "March – June",
    emoji: "☀️",
    fruits: ["🥭 Alphonso Mango", "🍒 Lychee", "🍈 Cantaloupe"],
    dessertId: "mango-tango",
    note: "Ratnagiri's king fruit rules our counter — gelato churned at 6 AM with Alphonso picked 36 hours earlier.",
  },
  {
    id: "monsoon",
    name: "Monsoon",
    months: "July – September",
    emoji: "🌧️",
    fruits: ["🫐 Jamun", "🍑 Peach", "🥝 Passion Fruit"],
    dessertId: "berry-crepe",
    note: "Rainy evenings call for warm crêpes piled with macerated fruit while the windows fog up.",
  },
  {
    id: "autumn",
    name: "Autumn",
    months: "October – November",
    emoji: "🍂",
    fruits: ["🍈 Sitaphal (Custard Apple)", "🍎 Pomegranate", "🌰 Fresh Dates"],
    dessertId: "fruit-tart",
    note: "The glazing season — our tarts wear whatever the mandi brims with, brushed gold and shining.",
  },
  {
    id: "winter",
    name: "Winter",
    months: "December – February",
    emoji: "❄️",
    fruits: ["🍓 Mahabaleshwar Strawberry", "🍊 Nagpur Orange", "🍇 Nashik Grapes"],
    dessertId: "strawberry-cloud",
    note: "Mahabaleshwar berries arrive in cold boxes, still smelling of hill air — folded straight into cream.",
  },
];

export const seasonForMonth = (m: number): number =>
  m >= 2 && m <= 5 ? 0 : m >= 6 && m <= 8 ? 1 : m >= 9 && m <= 10 ? 2 : 3;

/* ══════════════════════════════════════════════
   ROUND 3 · PERFECT PAIRS (duets, save ₹50)
   ══════════════════════════════════════════════ */

export interface PairDef {
  id: string;
  name: string;
  a: string;
  b: string;
  note: string;
}

export const PAIRS: PairDef[] = [
  {
    id: "duo-fire-snow",
    name: "Fire & Snow",
    a: "choco-lava-waffle",
    b: "strawberry-cloud",
    note: "Molten Belgian chocolate cooled by strawberry clouds — our most dramatic duet.",
  },
  {
    id: "duo-golden-hour",
    name: "Golden Hour",
    a: "mango-tango",
    b: "pistachio-royale",
    note: "Tropical gold meets royal green. Summer and royalty in one tray.",
  },
  {
    id: "duo-midnight",
    name: "Midnight Kiss",
    a: "molten-fudge",
    b: "nutella-kiss",
    note: "Double Belgian chocolate, zero regrets. Bring a spoon and a witness.",
  },
  {
    id: "duo-patisserie",
    name: "Patisserie Hour",
    a: "macaron-box",
    b: "salted-caramel",
    note: "Parisian bites with a salted caramel swirl — 4 PM, done properly.",
  },
];

export const PAIR_DISCOUNT = 50;

/* ══════════════════════════════════════════════
   ROUND 3 · CELEBRATIONS (party catering)
   ══════════════════════════════════════════════ */

export interface Celebration {
  id: string;
  emoji: string;
  name: string;
  from: number;
  blurb: string;
  features: string[];
  featured?: boolean;
}

export const CELEBRATIONS: Celebration[] = [
  {
    id: "birthday",
    emoji: "🎂",
    name: "Birthday Bash",
    from: 4999,
    blurb: "Turn the candles up — a full dessert table for your crew of 18.",
    features: [
      "Showstopper cake, serves 18",
      "2 dessert platters of your choice",
      "Custom name topper & sparklers",
      "Free delivery within 8 km",
    ],
  },
  {
    id: "wedding",
    emoji: "💍",
    name: "Wedding Royale",
    from: 24999,
    blurb: "The golden counter your guests will photograph all evening.",
    features: [
      "Live gelato cart, 100–500 guests",
      "5-dessert golden counter",
      "24k gold-leaf showstopper",
      "Chef on-site + tasting for two",
    ],
    featured: true,
  },
  {
    id: "corporate",
    emoji: "💼",
    name: "Corporate Sweet Box",
    from: 2499,
    blurb: "Client gifts and team Fridays, wrapped in branded gold.",
    features: [
      "Boxes of 10+ with branded sleeves",
      "Macaron, brownie & bakes mix",
      "Bulk pricing from 50 boxes",
      "Same-week delivery, city-wide",
    ],
  },
];

/* ══════════════════════════════════════════════
   ROUND 3 · SWEET CLUB (loyalty tiers)
   ══════════════════════════════════════════════ */

export interface ClubTier {
  id: string;
  emoji: string;
  name: string;
  price: number;
  tag: string;
  perks: string[];
  featured?: boolean;
}

export const CLUB_TIERS: ClubTier[] = [
  {
    id: "sprinkle",
    emoji: "✨",
    name: "Sprinkle",
    price: 0,
    tag: "Free forever",
    perks: [
      "1 Scoop Point per ₹10 spent",
      "Birthday gelato on the house",
      "First taste of new flavors",
    ],
  },
  {
    id: "sundae",
    emoji: "👑",
    name: "Sundae",
    price: 499,
    tag: "Most loved",
    perks: [
      "2× Scoop Points on everything",
      "Free sundae every month",
      "Priority weekend pickup line",
      "Access to the secret menu",
    ],
    featured: true,
  },
  {
    id: "royal",
    emoji: "💎",
    name: "Royal Gold",
    price: 1499,
    tag: "For true regulars",
    perks: [
      "3× points + ₹200 joining credit",
      "Quarterly dessert hamper",
      "Free delivery, always",
      "2 seats at the Chef's Tasting Lab",
    ],
  },
];

/* ══════════════════════════════════════════════
   ROUND 3 · LIVE FROM THE PARLOUR (ticker feed)
   ══════════════════════════════════════════════ */

export interface LiveEntry {
  who: string;
  what: string;
  emoji: string;
  mins: number;
}

export const LIVE_FEED: LiveEntry[] = [
  { who: "Aarav from C-Scheme", what: "2 × Mango Tango Sundae", emoji: "🥭", mins: 2 },
  { who: "Priya from Vaishali Nagar", what: "Red Velvet + 24k Gold Flakes", emoji: "❤️", mins: 5 },
  { who: "Kabir's birthday crew", what: "Wedding Royale enquiry", emoji: "🎉", mins: 8 },
  { who: "Meera from Malviya Road", what: "3 × Nutella Kiss Shake", emoji: "🥤", mins: 11 },
  { who: "Rohan's cricket team", what: "6 × Belgian Chocolate Gelato", emoji: "🍨", mins: 14 },
  { who: "Anaya & family", what: "Choco Lava Waffle + Berry Crêpe", emoji: "🧇", mins: 17 },
  { who: "Zoya from Amber Road", what: "French Macaron Box", emoji: "🧁", mins: 21 },
  { who: "Dev from Tech Park One", what: "Corporate Box · 24 treats", emoji: "🏢", mins: 26 },
];
