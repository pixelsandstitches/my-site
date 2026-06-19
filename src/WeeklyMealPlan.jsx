import { useState, useEffect } from "react";
import HomeBanner from './HomeBanner'

// ─── PANTRY DATABASE ───────────────────────────────────────────────────────
// Locked = confirmed from photo. Assumed = standard pantry staple to verify.
// approxExpiry: null means pantry staple with no meaningful expiry concern.
export const pantryDB = [
  // CONFIRMED FROM THIS WEEK'S HAUL PHOTO
  { id: "tahini",        name: "TJ's Organic Tahini",           category: "Condiment",  locked: true,  approxExpiry: "2027-06",  note: "New jar from haul" },
  { id: "soy_sauce",    name: "TJ's Soy Sauce (reduced sodium)",category: "Condiment",  locked: true,  approxExpiry: "2027-12",  note: "New bottle from haul" },
  { id: "habanero",     name: "TJ's Habanero Hot Sauce",        category: "Condiment",  locked: true,  approxExpiry: "2027-06",  note: "New bottle from haul" },
  { id: "sweet_chili",  name: "TJ's Sweet Chili Sauce",         category: "Condiment",  locked: true,  approxExpiry: "2027-06",  note: "New bottle from haul" },
  { id: "truffle_aioli",name: "Truffle Aioli",                  category: "Condiment",  locked: true,  approxExpiry: "2026-09",  note: "New jar from haul" },
  { id: "pita_chips",   name: "TJ's Pita Chips",                category: "Snack",      locked: true,  approxExpiry: "2026-09",  note: "New bag from haul" },
  { id: "baguette",     name: "TJ's Artisan Baguette",          category: "Bread",      locked: true,  approxExpiry: "2026-06-17", note: "Fresh — use by Tue/Wed", fresh: true },
  { id: "plumcots",     name: "Plumcots (Family Tree Farms)",   category: "Produce",    locked: true,  approxExpiry: "2026-06-19", note: "Fresh — eat by midweek", fresh: true },
  { id: "iranian_crk",  name: "TJ's Iranian-style Crispbread",  category: "Snack",      locked: true,  approxExpiry: "2027-03",  note: "From haul — good for dipping" },

  // CONFIRMED FROM FRIDGE PHOTO (previous session)
  { id: "tzatziki",     name: "TJ's Tzatziki",                  category: "Condiment",  locked: true,  approxExpiry: "2026-06-28", note: "Confirmed in fridge" },
  { id: "garlic_dip",   name: "TJ's Garlic Spread-Dip",         category: "Condiment",  locked: true,  approxExpiry: "2026-06-28", note: "Confirmed in fridge" },
  { id: "labneh",       name: "TJ's Roasted Tomato Labneh Dip", category: "Condiment",  locked: true,  approxExpiry: "2026-06-28", note: "Confirmed in fridge" },
  { id: "ebagel_dip",   name: "TJ's Everything Bagel Yogurt Dip",category:"Condiment",  locked: true,  approxExpiry: "2026-06-28", note: "Confirmed in fridge" },
  { id: "salsa_verde",  name: "Herdez Salsa Verde",             category: "Condiment",  locked: true,  approxExpiry: "2027-01",  note: "Confirmed in fridge" },
  { id: "grillo_spears",name: "Grillo's Pickle Spears",         category: "Condiment",  locked: true,  approxExpiry: "2026-10",  note: "Confirmed in fridge" },
  { id: "grillo_gallo", name: "Grillo's Pickle de Gallo",       category: "Condiment",  locked: true,  approxExpiry: "2026-08",  note: "Confirmed in fridge" },
  { id: "pico",         name: "Pico de Gallo (La Mexicana)",    category: "Condiment",  locked: true,  approxExpiry: "2026-06-20", note: "Fresh — use this week", fresh: true },
  { id: "edamame",      name: "TJ's Shelled Edamame",           category: "Snack",      locked: true,  approxExpiry: "2026-06-20", note: "Confirmed in fridge — 9g protein", fresh: true },
  { id: "bone_broth",   name: "Chicken Bone Broth",             category: "Pantry",     locked: true,  approxExpiry: "2026-07-24", note: "Confirmed in fridge" },
  { id: "lime_juice",   name: "Santa Cruz Pure Lime Juice",     category: "Condiment",  locked: true,  approxExpiry: "2026-10",  note: "Confirmed in fridge" },
  { id: "corn",         name: "Corn on the Cob",                category: "Produce",    locked: true,  approxExpiry: "2026-06-16", note: "Use Sunday!", fresh: true },
  { id: "mayo",         name: "Best Foods Real Mayonnaise",     category: "Condiment",  locked: true,  approxExpiry: "2027-01",  note: "Value size — confirmed in fridge" },
  { id: "whole_milk",   name: "Darigold Whole Milk",            category: "Dairy",      locked: true,  approxExpiry: "2026-07-24", note: "Confirmed in fridge" },
  { id: "green_beans",  name: "Fresh Green Beans",              category: "Produce",    locked: true,  approxExpiry: "2026-06-18", note: "Use early in week", fresh: true },

  // ASSUMED PANTRY STAPLES — verify not expired
  { id: "olive_oil",    name: "Olive Oil",                      category: "Pantry",     locked: false, approxExpiry: null,       note: "Assumed — check level" },
  { id: "rice_vinegar", name: "Rice Wine Vinegar",              category: "Pantry",     locked: false, approxExpiry: null,       note: "Assumed — check expiry" },
  { id: "chili_oil",    name: "Crispy Chili Oil",               category: "Condiment",  locked: false, approxExpiry: null,       note: "Assumed — check level" },
  { id: "maple_syrup",  name: "Maple Syrup",                    category: "Pantry",     locked: false, approxExpiry: null,       note: "Assumed — check level" },
  { id: "hot_sauce",    name: "Hot Sauce (generic)",            category: "Condiment",  locked: false, approxExpiry: null,       note: "Assumed — now have habanero too" },
  { id: "smk_paprika",  name: "Smoked Paprika",                 category: "Spice",      locked: false, approxExpiry: null,       note: "Assumed — check expiry" },
  { id: "cumin",        name: "Cumin",                          category: "Spice",      locked: false, approxExpiry: null,       note: "Assumed — check expiry" },
  { id: "garlic_pwd",   name: "Garlic Powder",                  category: "Spice",      locked: false, approxExpiry: null,       note: "Assumed — check expiry" },
  { id: "kosher_salt",  name: "Kosher Salt",                    category: "Spice",      locked: false, approxExpiry: null,       note: "Assumed" },
  { id: "blk_pepper",   name: "Black Pepper",                   category: "Spice",      locked: false, approxExpiry: null,       note: "Assumed" },
  { id: "butter",       name: "Butter",                         category: "Dairy",      locked: false, approxExpiry: null,       note: "Assumed — check level" },
  { id: "couscous",     name: "Couscous",                       category: "Pantry",     locked: false, approxExpiry: null,       note: "Assumed — check expiry" },
  { id: "almond_butter",name: "Almond Butter",                  category: "Pantry",     locked: false, approxExpiry: null,       note: "Assumed — check level" },
];

// ─── WEEK DATA ─────────────────────────────────────────────────────────────
const WEEK = "June 15 – 21, 2026";
const WEEK_START = new Date("2026-06-15");

const dayPlan = [
  { day: "Sun", label: "Sunday",    meal: "Skirt Steak + Charred Corn Salad", note: "Cook after paddleboarding. Use the corn before it turns.", tag: "cook",     emoji: "🥩", date: "2026-06-15", events: ["Tentative - Paddleboarding · 2–5pm"] },
  { day: "Mon", label: "Monday",    meal: "Leftover steak salad",              note: "Eat before or after pickleball",                          tag: "leftover", emoji: "🥗", date: "2026-06-16", events: ["Pickleball · 12–2pm"] },
  { day: "Tue", label: "Tuesday",   meal: "Baguette sandwich",                 note: "Use the baguette — it won't last past today. Brit's evening.", tag: "easy", emoji: "🥖", date: "2026-06-17", events: ["Floral Arrangements with Brit · 6–9pm"] },
  { day: "Wed", label: "Wednesday", meal: "Chimichurri Chicken Bowl",          note: "Cook tonight — oven does the work",                       tag: "cook",     emoji: "🍗", date: "2026-06-18" },
  { day: "Thu", label: "Thursday",  meal: "Leftover chimichurri chicken",      note: "Reheat during lunch block",                               tag: "leftover", emoji: "🍗", date: "2026-06-19" },
  { day: "Fri", label: "Friday",    meal: "Al Pastor Romaine Tacos",           note: "Juneteenth — open day, zero pressure",                    tag: "easy",     emoji: "🌮", date: "2026-06-20", events: ["Holiday: Juneteenth (no work)"] },
  { day: "Sat", label: "Saturday",  meal: "Wild card",                         note: "Eat out or reset into next week",                         tag: "free",     emoji: "✨", date: "2026-06-21" },
];

const breakfasts = [
  { name: "Hash brown + fried egg + habanero hot sauce", note: "New hot sauce upgrade — adds kick without effort" },
  { name: "Hash brown + Everything Bagel yogurt dip", note: "Schmear on top like savory cream cheese" },
  { name: "Hash brown + tzatziki + fresh romaine", note: "Little breakfast wrap situation" },
  { name: "Soft scrambled eggs + butter + salt", note: "5 min, ~14g protein for 2 eggs" },
  { name: "Hash brown + truffle aioli + fried egg", note: "The truffle aioli on eggs is genuinely good — try it" },
];

const snacks = [
  { emoji: "🍑", name: "Plumcots",                         why: "Fresh from haul — part plum, part apricot. Eat by midweek before they turn." },
  { emoji: "🥒", name: "Grillo's pickles + edamame",       why: "Salty crunch combo, 9g protein from edamame. Chip replacement." },
  { emoji: "🫙", name: "Labneh or truffle aioli + pita chips", why: "You now have both — alternate them so pita chips don't get boring." },
  { emoji: "☕", name: "Warm mug of bone broth",           why: "Low appetite days — counts as something, supports muscle preservation." },
  { emoji: "🧀", name: "String cheese or Babybel",         why: "Zero prep, grab-and-go protein." },
  { emoji: "🥚", name: "Hard boiled eggs (batch Sunday)",  why: "6g protein each. Eat with habanero sauce or truffle aioli for variety." },
  { emoji: "🫙", name: "Iranian crispbread + garlic dip",  why: "From haul — thin, crunchy, great with any of the TJ's dips." },
];

const tagStyles = {
  cook:     { bg: "#3A5C3E", color: "#CEC8BE", label: "Cook" },
  leftover: { bg: "#8C8C2A", color: "#F5F3EF", label: "Leftover" },
  easy:     { bg: "#B8A0C8", color: "#3d2a4a", label: "Easy" },
  free:     { bg: "#B8D9C2", color: "#3A5C3E", label: "Free" },
};

const shoppingCategories = [
  {
    name: "🥩 Protein — Buy",
    color: "#3A5C3E", bg: "#B8D9C2",
    items: [
      { item: "Skirt steak",                       qty: "~1–1.5 lbs", use: "Sunday cook session",         status: "buy" },
      { item: "Eggs",                               qty: "1 dozen",    use: "Breakfast + hard boiled snacks", status: "buy" },
      { item: "TJ's deli turkey or rotisserie chicken", qty: "1 pack", use: "Tuesday baguette sandwich",   status: "buy" },
    ]
  },
  {
    name: "🧊 Freezer — Confirm",
    color: "#3A5C3E", bg: "#B8D9C2",
    items: [
      { item: "TJ's Chimichurri Chicken Skewers", qty: "1 bag",     use: "Wednesday cook session", status: "confirm" },
      { item: "Al Pastor meat",                   qty: "1 portion", use: "Friday tacos",           status: "confirm" },
    ]
  },
  {
    name: "🌽 Produce — Buy",
    color: "#7a6b3a", bg: "#ede8df",
    items: [
      { item: "Corn on the cob",    qty: "—",      use: "Skirt steak salad — USE SUNDAY",          status: "have", note: "✓ In fridge — use this weekend!" },
      { item: "Plumcots",           qty: "—",      use: "Snack this week — eat by Wed",            status: "have", note: "✓ From haul — fresh, perishable" },
      { item: "Avocado",            qty: "1–2",    use: "Skirt steak salad",                       status: "buy" },
      { item: "Cherry tomatoes",    qty: "1 pint", use: "Chimichurri bowl + snacking",             status: "buy" },
    ]
  },
  {
    name: "🧺 Pantry — Locked In From Haul",
    color: "#8C8C2A", bg: "#ede8df",
    items: [
      { item: "TJ's Organic Tahini",          qty: "New jar",    use: "Tahini chili oil sauce",    status: "have", note: "✓ From haul" },
      { item: "TJ's Soy Sauce (reduced)",     qty: "New bottle", use: "Tahini sauce + marinades",  status: "have", note: "✓ From haul" },
      { item: "TJ's Habanero Hot Sauce",      qty: "New bottle", use: "Eggs, snacks, everything",  status: "have", note: "✓ From haul" },
      { item: "TJ's Sweet Chili Sauce",       qty: "New bottle", use: "Dipping, glazing",          status: "have", note: "✓ From haul" },
      { item: "Truffle Aioli",                qty: "New jar",    use: "Eggs, baguette, snacks",    status: "have", note: "✓ From haul" },
      { item: "TJ's Artisan Baguette",        qty: "1 loaf",     use: "Tuesday sandwich — use by Tue", status: "have", note: "✓ From haul — perishable!" },
      { item: "TJ's Iranian-style Crispbread",qty: "1 pack",     use: "Dipping snack all week",    status: "have", note: "✓ From haul" },
      { item: "TJ's Pita Chips",              qty: "New bag",    use: "Dipping snack all week",    status: "have", note: "✓ From haul" },
      { item: "Rice wine vinegar",            qty: "—",          use: "Tahini sauce",              status: "check" },
      { item: "Crispy chili oil",             qty: "—",          use: "Tahini sauce",              status: "check" },
      { item: "Maple syrup or honey",         qty: "—",          use: "Tahini sauce",              status: "check" },
      { item: "Olive oil",                    qty: "—",          use: "Steak salad + cooking",     status: "check" },
      { item: "Couscous",                     qty: "1 box",      use: "Skirt steak salad",         status: "check" },
    ]
  },
  {
    name: "🧊 Fridge Condiments — Confirmed",
    color: "#3A5C3E", bg: "#B8D9C2",
    items: [
      { item: "TJ's Tzatziki",                 qty: "—", use: "Chicken bowl, baguette sandwich",  status: "have", note: "✓ In fridge" },
      { item: "TJ's Garlic Spread-Dip",        qty: "—", use: "Chicken bowl, crispbread",         status: "have", note: "✓ In fridge" },
      { item: "TJ's Roasted Tomato Labneh",    qty: "—", use: "Snack anchor with pita/crispbread",status: "have", note: "✓ In fridge" },
      { item: "TJ's Everything Bagel Yogurt Dip",qty:"—",use: "Hash brown at breakfast",          status: "have", note: "✓ In fridge" },
      { item: "Herdez Salsa Verde",            qty: "—", use: "Al pastor tacos",                  status: "have", note: "✓ In fridge" },
      { item: "Grillo's Pickle Spears + de Gallo",qty:"—",use:"Snacking, al pastor topping",      status: "have", note: "✓ In fridge" },
      { item: "Pico de Gallo (La Mexicana)",   qty: "—", use: "Al pastor topping — use by Fri",   status: "have", note: "✓ In fridge — use this week!" },
    ]
  },
  {
    name: "🥣 Breakfast — Buy",
    color: "#8C8C2A", bg: "#ede8df",
    items: [
      { item: "TJ's Hash Browns (frozen)", qty: "1 box", use: "Default breakfast", status: "buy" },
    ]
  },
  {
    name: "🧀 Snacks — Buy",
    color: "#3A5C3E", bg: "#B8D9C2",
    items: [
      { item: "Edamame (shelled)",      qty: "—",    use: "Grab-and-go protein snack",    status: "have", note: "✓ In fridge — 9g protein!" },
      { item: "String cheese or Babybel",qty: "1 pack",use: "Zero-prep protein",          status: "buy" },
      { item: "Almond butter",          qty: "—",    use: "With plumcots or apple",       status: "check" },
    ]
  },
];

const statusStyle = {
  buy:     { color: "#FAFAF8", bg: "#3A5C3E", label: "Buy" },
  have:    { color: "#3A5C3E", bg: "#B8D9C2", label: "✓ Have" },
  confirm: { color: "#3d2a4a", bg: "#B8A0C8", label: "Confirm" },
  check:   { color: "#FAFAF8", bg: "#8C8C2A", label: "Check expiry" },
};

const recipes = [
  {
    id: "steak", type: "ig", emoji: "🥩",
    title: "Grilled Skirt Steak + Charred Corn Couscous Salad",
    source: "IG Save #5 — Alexandra Wagoner",
    link: "https://www.instagram.com/reel/DZdRQkTSLrv/",
    linkNote: "Full recipe at her IG bio — reel linked here",
    when: "Sunday · Cook Session 1",
    serves: "2 meals (Sun + Mon)", protein: "~35–40g per serving", time: "~30 min",
    color: "#3A5C3E", bg: "#B8D9C2",
    ingredients: [
      ["Skirt steak", "~1–1.5 lbs"],
      ["Corn on the cob", "2 ears (in fridge — use now!)"],
      ["Couscous", "1 cup dry"],
      ["Avocado", "1 ripe"],
      ["Lime juice", "Santa Cruz or fresh limes"],
      ["Olive oil", "2–3 tbsp"],
      ["Salt, pepper, garlic powder", "To taste"],
      ["Fresh herbs (cilantro or parsley)", "Small handful"],
    ],
    steps: [
      "Season skirt steak generously with salt, pepper, and garlic powder. Let sit at room temp 15 min.",
      "Grill or cast iron the steak on high heat — ~3–4 min per side for medium rare. Rest 5–10 min before slicing against the grain.",
      "Char the corn: grill directly or in a dry cast iron pan until blackened in spots. Cut kernels off the cob.",
      "Cook couscous per package directions. Fluff with a fork and let cool slightly.",
      "Dice avocado, squeeze lime over it right away so it doesn't brown.",
      "Toss couscous, corn, avocado, herbs, lime juice, and olive oil. Season to taste.",
      "Slice steak and serve over or alongside the salad.",
    ],
    notes: [
      "Store steak separately from the salad so it doesn't overcook for Monday's leftovers.",
      "Drizzle Monday's leftovers with Tahini Chili Oil Sauce to make it feel like a different meal.",
      "The truffle aioli also works surprisingly well as a dipping sauce alongside the steak.",
    ]
  },
  {
    id: "tahini", type: "ig", emoji: "🫙",
    title: "Tahini Chili Oil Sauce",
    source: "IG Save #47 — Klara Moderski",
    link: "https://www.instagram.com/reel/DX90W3LS6-t/",
    linkNote: "Full recipe in the reel caption",
    when: "Sunday · Cook Session 1",
    serves: "All week", protein: "+3–5g per use", time: "10 min",
    color: "#3d2a4a", bg: "#ede8f5",
    ingredients: [
      ["TJ's Organic Tahini", "4 tbsp (new jar from haul ✓)"],
      ["Crispy chili oil", "2 tbsp (or to taste)"],
      ["Maple syrup or 1 tsp sugar", "1 tbsp"],
      ["Rice wine vinegar", "2 tbsp"],
      ["TJ's Soy Sauce (reduced sodium)", "3 tbsp (new bottle from haul ✓)"],
      ["Ice cold water if too thick", "1–2 tbsp"],
    ],
    steps: [
      "Add everything to a jar and shake, or whisk together in a bowl.",
      "Taste and adjust — more chili oil for heat, maple for sweetness, vinegar for tang.",
      "If too thick, add ice cold water one tablespoon at a time until pourable.",
      "Store in a jar in the fridge. Shake before each use. Keeps 2 weeks.",
    ],
    notes: [
      "Triple it. Klara's words, and she's right.",
      "Use on: steak salad, chimichurri chicken, eggs, romaine as a dressing, crispbread or pita chips.",
      "Optional add-ins: grated crisper garlic, fresh ginger, or Sichuan pepper.",
    ]
  },
  {
    id: "baguette", type: "claude", emoji: "🥖",
    title: "Truffle Aioli Baguette Sandwich",
    source: "Built around your haul — baguette needs to be used by Tue",
    link: null,
    when: "Tuesday · No cook — assembly only",
    serves: "1", protein: "~25–30g (with protein)", time: "5 min",
    color: "#8C8C2A", bg: "#f5f3e0",
    ingredients: [
      ["TJ's Artisan Baguette", "Half loaf (use it — won't last past Tue)"],
      ["Deli turkey or rotisserie chicken", "3–4 oz"],
      ["Truffle Aioli", "Spread generously — this is the move"],
      ["Romaine from garden", "A few leaves"],
      ["Grillo's Pickle Spears", "Slice lengthwise alongside or inside"],
      ["Salt + pepper", "To taste"],
    ],
    steps: [
      "Slice baguette lengthwise. Spread truffle aioli on both cut sides.",
      "Layer turkey or chicken, romaine leaves, and sliced pickles.",
      "Season with salt and pepper. Press together, slice in half.",
      "Eat half now, wrap the other half for later if you're not hungry.",
    ],
    notes: [
      "The truffle aioli makes this feel way more intentional than a regular sandwich — it's the whole point.",
      "The baguette is fresh and won't last — use the full thing Tuesday, or toast the other half for breakfast Wednesday.",
      "Add habanero hot sauce if you want heat.",
    ]
  },
  {
    id: "chicken", type: "claude", emoji: "🍗",
    title: "Chimichurri Chicken Skewer Bowl",
    source: "Built around your freezer + garden romaine",
    link: null,
    when: "Wednesday · Cook Session 2",
    serves: "2 meals (Wed + Thu)", protein: "~35g per serving", time: "~25 min (mostly oven)",
    color: "#B8A0C8", bg: "#ede8f5",
    ingredients: [
      ["TJ's Chimichurri Chicken Skewers (frozen)", "1 bag"],
      ["Romaine lettuce", "From your garden — pick fresh!"],
      ["TJ's Garlic Dip or Tzatziki", "2–3 tbsp as dressing"],
      ["Cherry tomatoes", "Handful"],
      ["Peeled garlic (crisper drawer)", "1–2 cloves, minced into dressing"],
      ["Lemon or lime juice", "A squeeze to finish"],
    ],
    steps: [
      "Preheat oven to 400°F. Place frozen skewers on a lined baking sheet.",
      "Cook 20–22 min, flipping halfway, until cooked through with slightly charred edges.",
      "While chicken cooks, tear romaine into a bowl and add tomatoes.",
      "Mix TJ's Garlic Dip or Tzatziki with lemon juice and a minced clove of crisper garlic.",
      "Slide chicken off skewers, lay over the romaine, squeeze lemon over everything.",
    ],
    notes: [
      "Thursday leftovers: reheat chicken in a pan with a splash of bone broth, assemble fresh lettuce.",
      "The Everything Bagel dip also works as dressing if you want to mix it up.",
      "Drizzle habanero sauce on top if you want heat.",
    ]
  },
  {
    id: "alpastor", type: "claude", emoji: "🌮",
    title: "Al Pastor Romaine Tacos",
    source: "Built around your freezer + garden romaine",
    link: null,
    when: "Friday · Light cooking",
    serves: "1–2", protein: "~30g", time: "15 min",
    color: "#6B5550", bg: "#ede8e2",
    ingredients: [
      ["Al pastor meat (frozen)", "1 portion"],
      ["Romaine leaves (garden)", "6–8 large leaves as taco shells"],
      ["TJ's Yogurt Dip or Tzatziki", "Drizzle — trust it with al pastor"],
      ["Herdez Salsa Verde", "For heat"],
      ["Pico de Gallo (La Mexicana)", "Topping — use it up, it's been open"],
      ["Lime juice", "Santa Cruz or fresh"],
    ],
    steps: [
      "Thaw al pastor in the fridge overnight Thursday, or defrost in a pan with a splash of water.",
      "Cook in a dry pan over medium-high heat until edges caramelize, ~5–8 min.",
      "Pick 6–8 large romaine leaves — these are your taco shells.",
      "Fill with al pastor, drizzle yogurt dip, top with salsa verde and pico de gallo.",
      "Squeeze lime over everything. Done.",
    ],
    notes: [
      "Romaine leaves as taco shells = built-in crunch, uses your garden harvest.",
      "The pico de Gallo has been open — Friday is the day to use it up.",
      "The sweet chili sauce from your haul also works as a drizzle here.",
    ]
  },
];

// ─── PANTRY PAGE ───────────────────────────────────────────────────────────
function PantryPage({ onBack }) {
  const categories = [...new Set(pantryDB.map(i => i.category))];
  const categoryColors = {
    Condiment: "#3A5C3E", Pantry: "#3A5C3E", Spice: "#8C8C2A",
    Dairy: "#3A5C3E", Produce: "#7a6b3a", Snack: "#3A5C3E", Bread: "#8C8C2A",
  };
  return (
    <div style={{ fontFamily: "'Zilla Slab', serif", background: "#F5F3EF", minHeight: "100vh" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;1,9..144,400&family=Zilla+Slab:wght@300;400;500;600&display=swap'); *{box-sizing:border-box;margin:0;padding:0;}`}</style>
      <div style={{ background: "#3A5C3E", padding: "2rem 1.5rem 1.5rem", color: "#F5F3EF" }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", padding: "0.4rem 1rem", borderRadius: 20, cursor: "pointer", fontSize: "0.82rem", marginBottom: "1rem" }}>← Back</button>
        <p style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.7, marginBottom: "0.4rem" }}>Pantry Database</p>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "2rem", fontWeight: 700, color: "#F5F3EF" }}>What You Have</h1>
        <p style={{ opacity: 0.8, fontSize: "0.85rem", marginTop: "0.5rem" }}>🔒 Locked = confirmed from photo · ○ Assumed = verify not expired · ⚡ = fresh item, use soon</p>
      </div>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "1.5rem 1.25rem 4rem", textAlign: "left" }}>
          {categories.map(cat => {
          const items = pantryDB.filter(i => i.category === cat);
          const col = categoryColors[cat] || "#444";
          return (
            <div key={cat} style={{ marginBottom: "1.25rem" }}>
              <div style={{ background: col, color: "#fff", borderRadius: "10px 10px 0 0", padding: "0.6rem 1rem", fontSize: "0.82rem", fontWeight: 700 }}>{cat}</div>
              <div style={{ background: "#FAFAF8", border: "1.5px solid #B8D9C2", borderTop: "none", borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
                {items.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.7rem 1rem", borderBottom: i < items.length - 1 ? "1px solid #B8D9C2" : "none" }}>
                    <span style={{ fontSize: "1rem", flexShrink: 0 }}>{item.locked ? "🔒" : "○"}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "0.86rem", fontWeight: 600, color: item.fresh ? "#8C8C2A" : "#3A5C3E" }}>{item.name}{item.fresh ? " ⚡" : ""}</p>
                      <p style={{ fontSize: "0.73rem", color: "#6B5550", marginTop: "0.1rem" }}>{item.note}</p>
                    </div>
                    {item.approxExpiry && (
                      <span style={{ fontSize: "0.68rem", fontWeight: 600, padding: "0.2rem 0.55rem", borderRadius: 8, background: item.fresh ? "#ede8df" : "#F5F5F5", color: item.fresh ? "#8C8C2A" : "#666", flexShrink: 0, whiteSpace: "nowrap" }}>
                        exp ~{item.approxExpiry}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── TODAY PAGE ────────────────────────────────────────────────────────────
function TodayPage({ onBack }) {
  const today = new Date();
  const weekStart = new Date("2026-06-15");
  const weekEnd = new Date("2026-06-21");
  const inRange = today >= weekStart && today <= weekEnd;
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  const todayPlan = inRange ? dayPlan.find(d => d.date === todayStr) : dayPlan[0];
  const displayDate = todayPlan
    ? new Date(todayPlan.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
    : "";
  const ts = todayPlan ? tagStyles[todayPlan.tag] : tagStyles.free;
  const todayRecipe = todayPlan ? recipes.find(r => r.id === {
    "🥩": "steak", "🥗": "steak", "🥖": "baguette",
    "🍗": "chicken", "🌮": "alpastor", "✨": null
  }[todayPlan.emoji]) : null;

  return (
    <div style={{ fontFamily: "'Zilla Slab', serif", background: "#F5F3EF", minHeight: "100vh" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;1,9..144,400&family=Zilla+Slab:wght@300;400;500;600&display=swap'); *{box-sizing:border-box;margin:0;padding:0;} ol{padding-left:1.25rem;}`}</style>

      <HomeBanner />

      {/* Header */}
      <div style={{ background: "#3A5C3E", padding: "2rem 1.5rem 1.5rem", color: "#F5F3EF" }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", padding: "0.4rem 1rem", borderRadius: 20, cursor: "pointer", fontSize: "0.82rem", marginBottom: "1rem" }}>← Meal Plan</button>
        <p style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.7, marginBottom: "0.4rem" }}>Today</p>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "2rem", fontWeight: 700, lineHeight: 1.2, color: "#F5F3EF" }}>{displayDate}</h1>
        {!inRange && <p style={{ opacity: 0.7, fontSize: "0.82rem", marginTop: "0.5rem" }}>Showing Sunday's plan — check back during the week</p>}
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "1.5rem 1.25rem 4rem" }}>

        {/* Today's Meal */}
        {todayPlan && (
          <div style={{ background: "#FAFAF8", borderRadius: 16, border: `2px solid ${ts.bg}`, padding: "1.25rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6B5550" }}>Today's Meal</p>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: 10, background: ts.bg, color: ts.color }}>{ts.label}</span>
            </div>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{todayPlan.emoji}</div>
            <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.4rem", color:"#3A5C3E" }}>{todayPlan.meal}</h2>
            <p style={{ fontSize: "0.83rem", color: "#6B5550" }}>{todayPlan.note}</p>
          </div>
        )}

        {/* Today's Recipe (collapsed inline) */}
        {todayRecipe && (
          <div style={{ background: "#FAFAF8", borderRadius: 14, border: `1.5px solid ${todayRecipe.bg}`, marginBottom: "1.5rem", overflow: "hidden" }}>
            <div style={{ background: todayRecipe.bg, padding: "0.7rem 1.1rem" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: todayRecipe.color, textTransform: "uppercase", letterSpacing: "0.08em" }}>Recipe</p>
            </div>
            <div style={{ padding: "1rem 1.1rem" }}>
              <h3 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.85rem" }}>{todayRecipe.title}</h3>
              <p style={{ fontSize: "0.78rem", fontWeight: 700, color: todayRecipe.color, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>Ingredients</p>
              <div style={{ background: "#F5F3EF", borderRadius: 8, overflow: "hidden", marginBottom: "1rem" }}>
                {todayRecipe.ingredients.map(([ing, amt], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "0.45rem 0.8rem", background: i % 2 === 0 ? "#F5F3EF" : "#fff", fontSize: "0.82rem" }}>
                    <span>{ing}</span>
                    <span style={{ color: todayRecipe.color, fontWeight: 600, marginLeft: "0.75rem", textAlign: "right" }}>{amt}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "0.78rem", fontWeight: 700, color: todayRecipe.color, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>Method</p>
              <ol style={{ textAlign: "left" }}>
                {todayRecipe.steps.map((s, i) => (
                  <li key={i} style={{ fontSize: "0.84rem", color: "#3A5C3E", lineHeight: 1.6, marginBottom: "0.4rem", paddingLeft: "0.2rem" }}>{s}</li>
                ))}
              </ol>
              {todayRecipe.link && (
                <div style={{ marginTop: "0.85rem", padding: "0.6rem 0.8rem", background: todayRecipe.bg, borderRadius: 8 }}>
                  <p style={{ fontSize: "0.75rem", color: todayRecipe.color, fontWeight: 600, marginBottom: "0.2rem" }}>📎 {todayRecipe.linkNote}</p>
                  <a href={todayRecipe.link} target="_blank" rel="noreferrer" style={{ fontSize: "0.75rem", color: todayRecipe.color, wordBreak: "break-all" }}>{todayRecipe.link}</a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Breakfast Options */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.25rem", color:"#3A5C3E" }}>Breakfast Options</h2>
          <p style={{ fontSize: "0.82rem", color: "#6B5550", marginBottom: "0.85rem" }}>Pick whatever sounds good. Just don't eat it alone.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {breakfasts.map((b, i) => (
              <div key={i} style={{ background: "#FAFAF8", borderRadius: 11, padding: "0.8rem 1rem", border: "1.5px solid #B8D9C2", display: "flex", gap: "0.7rem" }}>
                <span style={{ background: "#B8D9C2", color: "#3A5C3E", borderRadius: "50%", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                <div style={{ textAlign: "left" }}>
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.15rem" }}>{b.name}</p>
                  <p style={{ fontSize: "0.76rem", color: "#6B5550" }}>{b.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Snack Options */}
        <div>
          <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.25rem", color:"#3A5C3E" }}>Snack Options</h2>
          <p style={{ fontSize: "0.82rem", color: "#6B5550", marginBottom: "0.85rem" }}>For when appetite is low or chips are calling.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {snacks.map((s, i) => (
              <div key={i} style={{ background: "#FAFAF8", borderRadius: 11, padding: "0.8rem 1rem", border: "1.5px solid #B8D9C2", display: "flex", gap: "0.75rem" }}>
                <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{s.emoji}</span>
                <div style={{ textAlign: "left" }}>
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.15rem" }}>{s.name}</p>
                  <p style={{ fontSize: "0.76rem", color: "#6B5550", lineHeight: 1.45 }}>{s.why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── MAIN MEAL PLAN PAGE ───────────────────────────────────────────────────
function MealPlanPage({ onNavigate }) {
  const [activeSection, setActiveSection] = useState("week");
  const [checkedItems, setCheckedItems] = useState({});
  const [openRecipe, setOpenRecipe] = useState(null);

  const toggleCheck = (key) => setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Scroll-spy: update active nav based on which section is in view
  useEffect(() => {
    const sectionIds = ["week", "shopping", "recipes", "snacks", "archive"];
    const observers = [];
    const handler = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };
    const obs = new IntersectionObserver(handler, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) { obs.observe(el); observers.push(el); }
    });
    return () => observers.forEach(el => obs.unobserve(el));
  });

  const navItems = [
    { id: "week", label: "Week" },
    { id: "shopping", label: "Shop" },
    { id: "recipes", label: "Recipes" },
    { id: "snacks", label: "Snacks" },
    { id: "archive", label: "Archive" },
  ];

  return (
    <div style={{ fontFamily: "'Zilla Slab', serif", background: "#F5F3EF", minHeight: "100vh", color: "#3A5C3E" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;1,9..144,400&family=Zilla+Slab:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #F5F3EF; }
        .recipe-card { transition: box-shadow 0.2s; }
        .recipe-card:hover { box-shadow: 0 8px 32px rgba(44,74,46,0.13); }
        .nav-btn { transition: all 0.15s; }
        .nav-btn:hover { background: #3A5C3E !important; color: #fff !important; }
        .check-row:hover { background: rgba(44,74,46,0.04); }
        .today-btn:hover { background: #fff !important; color: #3A5C3E !important; }
        a { color: #3A5C3E; }
        @media (max-width: 600px) {
          .hero-title { font-size: 2rem !important; }
          .day-grid { grid-template-columns: 1fr 1fr !important; }
          .top-btns { flex-direction: column !important; gap: 0.5rem !important; }
        }
      `}</style>
      
      <HomeBanner />

      {/* Hero */}
      <div style={{ background: "#3A5C3E", padding: "2.5rem 1.5rem 1.75rem", color: "#F5F3EF" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div className="top-btns" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", gap: "0.75rem" }}>
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.7, fontFamily: "Zilla Slab" }}>This Week's Meal Plan</p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button className="today-btn" onClick={() => onNavigate("today")} style={{ background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.5)", color: "#fff", padding: "0.35rem 0.9rem", borderRadius: 20, cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, transition: "all 0.15s" }}>📅 Today</button>
              <button className="today-btn" onClick={() => onNavigate("pantry")} style={{ background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.5)", color: "#fff", padding: "0.35rem 0.9rem", borderRadius: 20, cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, transition: "all 0.15s" }}>🧺 Pantry</button>
            </div>
          </div>
          <h1 className="hero-title" style={{ fontFamily: "'Georgia', serif", fontSize: "2.6rem", fontWeight: 700, lineHeight: 1.15, color: "#F5F3EF" }}>{WEEK}</h1>
        </div>
      </div>

      {/* Sticky Nav */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "#F5F3EF", borderBottom: "1.5px solid #B8D9C2", padding: "0.6rem 1.5rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {navItems.map(n => (
            <button key={n.id} className="nav-btn" onClick={() => scrollTo(n.id)}
              style={{ fontFamily: "Zilla Slab", fontSize: "0.82rem", fontWeight: 600, padding: "0.4rem 1rem", borderRadius: 20, border: "1.5px solid #3A5C3E", background: activeSection === n.id ? "#3A5C3E" : "transparent", color: activeSection === n.id ? "#fff" : "#3A5C3E", cursor: "pointer", letterSpacing: "0.02em" }}>
              {n.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.25rem 4rem" }}>

        {/* WEEK AT A GLANCE */}
        <section id="week" style={{ paddingTop: "2.5rem" }}>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.25rem", color: "#3A5C3E" }}>Week at a Glance</h2>
          <p style={{ color: "#6B5550", fontSize: "0.88rem", marginBottom: "1.5rem" }}>One main meal a day. Breakfast is separate. Leftovers do the heavy lifting.</p>
          <div className="day-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
            {dayPlan.map(d => {
              const ts = tagStyles[d.tag];
              return (
                <div key={d.day} style={{ background: "#FAFAF8", borderRadius: 14, padding: "1rem", border: "1.5px solid #B8D9C2", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                    <span style={{ fontFamily: "'Georgia', serif", fontWeight: 700, fontSize: "1.05rem", color: "#3A5C3E" }}>{d.day}</span>
                    <span style={{ fontSize: "0.65rem", fontWeight: 600, padding: "0.15rem 0.5rem", borderRadius: 10, background: ts.bg, color: ts.color }}>{ts.label}</span>
                  </div>
                  <div style={{ fontSize: "1.3rem", marginBottom: "0.3rem" }}>{d.emoji}</div>
                  <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#3A5C3E", lineHeight: 1.3, marginBottom: "0.3rem" }}>{d.meal}</p>
                  <p style={{ fontSize: "0.73rem", color: "#6B5550", lineHeight: 1.4 }}>{d.note}</p>
                  {d.events && (
                    <div style={{ marginTop: "0.4rem", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                      {d.events.map((ev, i) => (
                        <p key={i} style={{ fontSize: "0.68rem", color: "#B8A0C8", lineHeight: 1.3 }}>📅 {ev}</p>
                        ))}
                        </div>
                      )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SHOPPING LIST */}
        <section id="shopping" style={{ paddingTop: "2.5rem" }}>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.25rem", color: "#3A5C3E" }}>Shopping List</h2>
          <p style={{ color: "#6B5550", fontSize: "0.88rem", marginBottom: "1.5rem" }}>Tap to check off as you shop. ✓ Have = confirmed in fridge or haul.</p>
          {shoppingCategories.map((cat, ci) => (
            <div key={ci} style={{ marginBottom: "1.25rem" }}>
              <div style={{ background: cat.color, color: "#fff", borderRadius: "10px 10px 0 0", padding: "0.6rem 1rem", fontSize: "0.82rem", fontWeight: 700 }}>{cat.name}</div>
              <div style={{ background: "#FAFAF8", border: "1.5px solid #B8D9C2", borderTop: "none", borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
                {cat.items.map((item, ii) => {
                  const key = `${ci}-${ii}`;
                  const checked = checkedItems[key];
                  const ss = statusStyle[item.status];
                  return (
                    <div key={ii} className="check-row" onClick={() => toggleCheck(key)}
                      style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem", borderBottom: ii < cat.items.length - 1 ? "1px solid #B8D9C2" : "none", cursor: "pointer", opacity: checked ? 0.45 : 1, transition: "opacity 0.2s" }}>
                      <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${checked ? cat.color : "#B8D9C2"}`, background: checked ? cat.color : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
                        {checked && <span style={{ color: "#fff", fontSize: "0.75rem", fontWeight: 700 }}>✓</span>}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: "0.88rem", fontWeight: 600, textDecoration: checked ? "line-through" : "none", color: "#3A5C3E" }}>{item.item}</p>
                        <p style={{ fontSize: "0.74rem", color: "#6B5550", marginTop: "0.1rem" }}>{item.note || item.use}{item.qty && item.qty !== "—" ? ` · ${item.qty}` : ""}</p>
                      </div>
                      <span style={{ fontSize: "0.68rem", fontWeight: 700, padding: "0.2rem 0.55rem", borderRadius: 8, background: ss.bg, color: ss.color, flexShrink: 0 }}>{ss.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* RECIPES */}
        <section id="recipes" style={{ paddingTop: "2.5rem" }}>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.25rem", color: "#3A5C3E" }}>Recipes</h2>
          <p style={{ color: "#6B5550", fontSize: "0.88rem", marginBottom: "1.5rem" }}>Tap any recipe to expand it.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {recipes.map(r => {
              const isOpen = openRecipe === r.id;
              return (
                <div key={r.id} className="recipe-card" style={{ background: "#FAFAF8", borderRadius: 16, border: `2px solid ${isOpen ? r.color : "#B8D9C2"}`, overflow: "hidden", transition: "border-color 0.2s, box-shadow 0.2s" }}>
                  <div onClick={() => setOpenRecipe(isOpen ? null : r.id)} style={{ padding: "1.1rem 1.25rem", cursor: "pointer", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "2rem", flexShrink: 0 }}>{r.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem", flexWrap: "wrap" }}>
                        <p style={{ fontSize: "0.7rem", color: r.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{r.when}</p>
                        <span style={{ fontSize: "0.62rem", fontWeight: 700, padding: "0rem 0.5rem", borderRadius: 8, background: r.type === "ig" ? "#FFF8E1" : "#B8D9C2", color: r.type === "ig" ? "#B45309" : "#3A5C3E", border: r.type === "ig" ? "1px solid #FDE68A" : "1px solid #BFDBFE" }}>
                          {r.type === "ig" ? "📱 From IG saves" : "✦ Claude-built"}
                        </span>
                      </div>
                      <h3 style={{ fontFamily: "'Georgia', serif", fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.25, marginBottom: "0.4rem", marginTop: "0.4rem" }}>{r.title}</h3>
                      <p style={{ fontSize: "0.74rem", color: "#6B5550" }}>{r.source}</p>
                      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.6rem", flexWrap: "wrap", justifyContent: "center" }}>
                        {[["⏱", r.time], ["🍽", r.serves], ["💪", r.protein]].map(([icon, val]) => (
                          <span key={val} style={{ fontSize: "0.72rem", background: r.bg, color: r.color, padding: "0.2rem 0.55rem", borderRadius: 8, fontWeight: 600 }}>{icon} {val}</span>
                        ))}
                      </div>
                    </div>
                    <span style={{ color: "#B8D9C2", fontSize: "1.2rem", flexShrink: 0, marginTop: 4 }}>{isOpen ? "▲" : "▼"}</span>
                  </div>
                  {isOpen && (
                    <div style={{ borderTop: `1.5px solid ${r.bg}`, padding: "1.25rem", textAlign: "left" }}>                      {r.link && (
                        <div style={{ background: r.bg, borderRadius: 10, padding: "0.7rem 1rem", marginBottom: "1.25rem" }}>
                          <p style={{ fontSize: "0.78rem", color: r.color, fontWeight: 600, marginBottom: "0.2rem" }}>📎 {r.linkNote}</p>
                          <a href={r.link} target="_blank" rel="noreferrer" style={{ fontSize: "0.78rem", wordBreak: "break-all" }}>{r.link}</a>
                        </div>
                      )}
                      <h4 style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: r.color, marginBottom: "0.75rem" }}>Ingredients</h4>
                      <div style={{ background: "#F5F3EF", borderRadius: 10, overflow: "hidden", marginBottom: "1.25rem" }}>
                        {r.ingredients.map(([ing, amt], i) => (
                          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "0.55rem 0.9rem", background: i % 2 === 0 ? "#F5F3EF" : "#fff", fontSize: "0.84rem" }}>
                            <span style={{ color: "#3A5C3E" }}>{ing}</span>
                            <span style={{ color: r.color, fontWeight: 600, textAlign: "right", marginLeft: "1rem" }}>{amt}</span>
                          </div>
                        ))}
                      </div>
                      <h4 style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: r.color, marginBottom: "0.75rem" }}>Method</h4>
                      <ol style={{ paddingLeft: "1.25rem", marginBottom: "1.25rem" }}>
                        {r.steps.map((s, i) => (
                          <li key={i} style={{ fontSize: "0.86rem", color: "#3A5C3E", lineHeight: 1.6, marginBottom: "0.5rem", paddingLeft: "0.25rem" }}>{s}</li>
                        ))}
                      </ol>
                      {r.notes.length > 0 && (
                        <>
                          <h4 style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: r.color, marginBottom: "0.6rem" }}>Notes</h4>
                          {r.notes.map((n, i) => (
                            <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.4rem", alignItems: "flex-start" }}>
                              <span style={{ color: r.color, flexShrink: 0, marginTop: 2 }}>💡</span>
                              <p style={{ fontSize: "0.82rem", color: "#3A5C3E", lineHeight: 1.55, fontStyle: "italic" }}>{n}</p>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* BREAKFAST */}
        <section style={{ paddingTop: "2.5rem" }}>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.25rem", color: "#3A5C3E" }}>Breakfast Options</h2>
          <p style={{ color: "#6B5550", fontSize: "0.88rem", marginBottom: "1.25rem" }}>Small but protein-anchored. Hash brown is always an option — just don't eat it alone.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {breakfasts.map((b, i) => (
              <div key={i} style={{ background: "#FAFAF8", borderRadius: 12, padding: "0.9rem 1.1rem", border: "1.5px solid #B8D9C2", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ background: "#B8D9C2", color: "#3A5C3E", borderRadius: "50%", width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                <div style={{ textAlign: "left" }}>
                  <p style={{ fontSize: "0.88rem", fontWeight: 600, marginBottom: "0.15rem" }}>{b.name}</p>
                  <p style={{ fontSize: "0.78rem", color: "#6B5550" }}>{b.note}</p>
                  </div>
              </div>
            ))}
          </div>
        </section>

        {/* SNACKS */}
        <section id="snacks" style={{ paddingTop: "2.5rem" }}>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.25rem", color: "#3A5C3E" }}>Snack Rotation</h2>
          <p style={{ color: "#6B5550", fontSize: "0.88rem", marginBottom: "1.25rem" }}>For days when appetite is low or chips are calling.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {snacks.map((s, i) => (
              <div key={i} style={{ background: "#FAFAF8", borderRadius: 12, padding: "0.9rem 1.1rem", border: "1.5px solid #B8D9C2", display: "flex", gap: "0.9rem", alignItems: "flex-start" }}>
                <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{s.emoji}</span>
                <div style={{ textAlign: "left" }}>
                  <p style={{ fontSize: "0.88rem", fontWeight: 600, marginBottom: "0.2rem" }}>{s.name}</p>
                  <p style={{ fontSize: "0.78rem", color: "#6B5550", lineHeight: 1.5 }}>{s.why}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ARCHIVE */}
        <section id="archive" style={{ paddingTop: "2.5rem" }}>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.25rem", color: "#3A5C3E" }}>Past Weeks</h2>
          <p style={{ color: "#6B5550", fontSize: "0.88rem", marginBottom: "1.25rem" }}>Previous meal plans will live here as each week rolls over.</p>
          <div style={{ background: "#FAFAF8", borderRadius: 14, border: "1.5px dashed #B8D9C2", padding: "2.5rem 1.5rem", textAlign: "center" }}>
            <p style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>📂</p>
            <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#3A5C3E", marginBottom: "0.35rem" }}>Nothing here yet</p>
            <p style={{ fontSize: "0.8rem", color: "#6B5550" }}>This week's plan will move here when next week's is ready.</p>
          </div>
        </section>

        {/* Footer */}
        <div style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1.5px solid #B8D9C2", textAlign: "center" }}>
          <p style={{ fontSize: "0.75rem", color: "#B8D9C2" }}>Built with Claude · Week of {WEEK}</p>
        </div>
      </div>
    </div>
  );
}

// ─── APP ROUTER ────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("main");
  if (page === "today")  return <TodayPage   onBack={() => setPage("main")} />;
  if (page === "pantry") return <PantryPage  onBack={() => setPage("main")} />;
  return <MealPlanPage onNavigate={setPage} />;
}
