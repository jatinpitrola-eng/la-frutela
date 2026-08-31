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
