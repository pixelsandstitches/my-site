import { useState } from "react";

const WEEK = "June 15 – 21, 2026";

const dayPlan = [
  { day: "Sun", label: "Sunday", meal: "Skirt Steak + Corn Salad", note: "Cook after paddleboarding", tag: "cook", emoji: "🥩" },
  { day: "Mon", label: "Monday", meal: "Leftover steak salad", note: "Eat before or after pickleball", tag: "leftover", emoji: "🥗" },
  { day: "Tue", label: "Tuesday", meal: "Sandwich or skip", note: "Floral arrangements with Brit — eat before", tag: "easy", emoji: "🥪" },
  { day: "Wed", label: "Wednesday", meal: "Chimichurri Chicken Bowl", note: "Cook tonight — oven does the work", tag: "cook", emoji: "🍗" },
  { day: "Thu", label: "Thursday", meal: "Leftover chimichurri chicken", note: "Reheat during lunch block", tag: "leftover", emoji: "🍗" },
  { day: "Fri", label: "Friday", meal: "Al Pastor Romaine Tacos", note: "Juneteenth — open day, zero pressure", tag: "easy", emoji: "🌮" },
  { day: "Sat", label: "Saturday", meal: "Wild card", note: "Eat out or reset into next week", tag: "free", emoji: "✨" },
];

const tagStyles = {
  cook:     { bg: "#2C4A2E", color: "#fff", label: "Cook" },
  leftover: { bg: "#C4714A", color: "#fff", label: "Leftover" },
  easy:     { bg: "#7A8C5E", color: "#fff", label: "Easy" },
  free:     { bg: "#D4C5B0", color: "#3A3228", label: "Free" },
};

const shoppingCategories = [
  {
    name: "🥩 Protein — Buy",
    color: "#2C4A2E",
    bg: "#EEF3EC",
    items: [
      { item: "Skirt steak", qty: "~1–1.5 lbs", use: "Sunday cook session", status: "buy" },
      { item: "Eggs", qty: "1 dozen", use: "Breakfast + hard boiled snacks", status: "buy" },
      { item: "TJ's deli turkey or rotisserie chicken", qty: "1 pack", use: "Sandwiches", status: "buy" },
    ]
  },
  {
    name: "🧊 Freezer — Confirm",
    color: "#1565C0",
    bg: "#E8F0FB",
    items: [
      { item: "TJ's Chimichurri Chicken Skewers", qty: "1 bag", use: "Wednesday cook session", status: "confirm" },
      { item: "Al Pastor meat", qty: "1 portion", use: "Friday tacos", status: "confirm" },
    ]
  },
  {
    name: "🌽 Produce — Buy",
    color: "#827717",
    bg: "#F9FBE7",
    items: [
      { item: "Corn on the cob", qty: "—", use: "Skirt steak salad", status: "have", note: "✓ Already in fridge" },
      { item: "Avocado", qty: "1–2", use: "Skirt steak salad", status: "buy" },
      { item: "Lime", qty: "2–3", use: "Salad + al pastor (or use Santa Cruz lime juice)", status: "buy" },
      { item: "Cherry tomatoes", qty: "1 pint", use: "Chimichurri bowl + snacking", status: "buy" },
    ]
  },
  {
    name: "🧺 Pantry — Check Expiry",
    color: "#C4714A",
    bg: "#FDF3EE",
    items: [
      { item: "Couscous", qty: "1 box", use: "Skirt steak salad", status: "check" },
      { item: "Olive oil", qty: "—", use: "Everything", status: "check" },
      { item: "Soy sauce", qty: "—", use: "Tahini sauce", status: "check" },
      { item: "Rice wine vinegar", qty: "—", use: "Tahini sauce", status: "check" },
      { item: "Tahini", qty: "—", use: "Tahini chili oil sauce", status: "check" },
      { item: "Crispy chili oil", qty: "—", use: "Tahini sauce", status: "check" },
      { item: "Maple syrup or honey", qty: "—", use: "Tahini sauce", status: "check" },
      { item: "Chicken bone broth", qty: "—", use: "Warm mug snack / cooking", status: "have", note: "✓ In fridge" },
      { item: "Smoked paprika", qty: "—", use: "Seasoning", status: "check" },
      { item: "Cumin", qty: "—", use: "Al pastor, general", status: "check" },
      { item: "Hot sauce", qty: "—", use: "Eggs, snacks", status: "check" },
    ]
  },
  {
    name: "🧊 Fridge Condiments — Confirm Not Expired",
    color: "#6A1B9A",
    bg: "#F5EEF8",
    items: [
      { item: "TJ's Tzatziki", qty: "—", use: "Chicken bowl dressing, sandwiches", status: "have", note: "✓ In fridge" },
      { item: "TJ's Garlic Spread-Dip", qty: "—", use: "Chicken bowl, romaine dip", status: "have", note: "✓ In fridge" },
      { item: "TJ's Roasted Tomato Labneh Dip", qty: "—", use: "Snack anchor — with pita chips", status: "have", note: "✓ In fridge" },
      { item: "TJ's Everything Bagel Yogurt Dip", qty: "—", use: "On hash brown at breakfast", status: "have", note: "✓ In fridge" },
      { item: "Herdez Salsa Verde", qty: "—", use: "Al pastor tacos", status: "have", note: "✓ In fridge" },
      { item: "Grillo's Pickle Spears", qty: "—", use: "Snack pairing with edamame", status: "have", note: "✓ In fridge" },
    ]
  },
  {
    name: "🥣 Breakfast — Buy",
    color: "#BF360C",
    bg: "#FBE9E7",
    items: [
      { item: "TJ's Hash Browns (frozen)", qty: "1 box", use: "Default breakfast", status: "buy" },
      { item: "Multigrain bread", qty: "1 loaf", use: "Sandwiches + toast", status: "buy" },
    ]
  },
  {
    name: "🧀 Snacks — Buy",
    color: "#283593",
    bg: "#E8EAF6",
    items: [
      { item: "TJ's Pita chips", qty: "1 bag", use: "With labneh dip — chip replacement", status: "buy" },
      { item: "Edamame (shelled)", qty: "—", use: "Grab-and-go protein snack", status: "have", note: "✓ In fridge — 9g protein!" },
      { item: "String cheese or Babybel", qty: "1 pack", use: "Zero-prep protein", status: "buy" },
      { item: "Apples or fruit", qty: "3–4", use: "Sweet craving", status: "buy" },
      { item: "Almond butter", qty: "—", use: "With apple", status: "check" },
    ]
  },
];

const statusStyle = {
  buy:     { color: "#2C4A2E", bg: "#EEF3EC", label: "Buy" },
  have:    { color: "#1565C0", bg: "#E8F0FB", label: "✓ Have" },
  confirm: { color: "#C4714A", bg: "#FDF3EE", label: "Confirm" },
  check:   { color: "#6A1B9A", bg: "#F5EEF8", label: "Check expiry" },
};

const recipes = [
  {
    id: "steak",
    emoji: "🥩",
    title: "Grilled Skirt Steak + Charred Corn Couscous Salad",
    source: "IG Save #5 — Alexandra Wagoner",
    link: "https://www.instagram.com/reel/DZdRQkTSLrv/",
    linkNote: "Full recipe at her IG bio — reel linked here",
    when: "Sunday · Cook Session 1",
    serves: "2 meals (Sun + Mon)",
    protein: "~35–40g per serving",
    time: "~30 min",
    color: "#2C4A2E",
    bg: "#EEF3EC",
    ingredients: [
      ["Skirt steak", "~1–1.5 lbs"],
      ["Corn on the cob", "2 ears (already in fridge!)"],
      ["Couscous", "1 cup dry"],
      ["Avocado", "1 ripe"],
      ["Lime", "2 (or Santa Cruz lime juice)"],
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
      "Store steak separately from the salad so it doesn't overcook when you reheat Monday's leftovers.",
      "Drizzle Monday leftovers with the Tahini Chili Oil Sauce to make it feel like a different meal.",
    ]
  },
  {
    id: "tahini",
    emoji: "🫙",
    title: "Tahini Chili Oil Sauce",
    source: "IG Save #47 — Klara Moderski",
    link: "https://www.instagram.com/reel/DX90W3LS6-t/",
    linkNote: "Full recipe in the reel caption",
    when: "Sunday · Make while the steak rests",
    serves: "All week",
    protein: "+3–5g per use",
    time: "10 min",
    color: "#6A1B9A",
    bg: "#F5EEF8",
    ingredients: [
      ["Tahini", "4 tbsp"],
      ["Crispy chili oil", "2 tbsp (or to taste)"],
      ["Maple syrup or 1 tsp sugar", "1 tbsp"],
      ["Rice wine vinegar", "2 tbsp"],
      ["Light soy sauce", "3 tbsp"],
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
      "Use on: steak salad, chimichurri chicken, eggs, romaine as a dressing, pita chips as a dip.",
      "Optional: add grated garlic, fresh ginger, or Sichuan pepper.",
    ]
  },
  {
    id: "chicken",
    emoji: "🍗",
    title: "Chimichurri Chicken Skewer Bowl",
    source: "From your freezer + garden romaine",
    link: null,
    when: "Wednesday · Cook Session 2",
    serves: "2 meals (Wed + Thu)",
    protein: "~35g per serving",
    time: "~25 min (mostly oven)",
    color: "#1565C0",
    bg: "#E8F0FB",
    ingredients: [
      ["TJ's Chimichurri Chicken Skewers (frozen)", "1 bag"],
      ["Romaine lettuce", "From your garden — pick fresh!"],
      ["TJ's Garlic Dip or Tzatziki", "2–3 tbsp as dressing"],
      ["Cherry tomatoes", "Handful"],
      ["Peeled garlic (crisper drawer)", "1–2 cloves, minced into dressing"],
      ["Lemon or lime", "A squeeze to finish"],
    ],
    steps: [
      "Preheat oven to 400°F. Place frozen skewers on a lined baking sheet.",
      "Cook 20–22 min, flipping halfway, until cooked through with slightly charred edges.",
      "While chicken cooks, tear romaine into a bowl and add tomatoes.",
      "Mix TJ's Garlic Dip or Tzatziki with a little lemon juice and a minced clove of that crisper garlic. This is your dressing.",
      "Slide chicken off skewers, lay over the romaine, squeeze lemon over everything.",
    ],
    notes: [
      "Thursday leftovers: reheat chicken in a pan with a splash of bone broth, assemble fresh lettuce around it.",
      "The Everything Bagel dip also works as dressing here if you want to mix it up.",
    ]
  },
  {
    id: "alpastor",
    emoji: "🌮",
    title: "Al Pastor Romaine Tacos",
    source: "From your freezer — no recipe needed",
    link: null,
    when: "Friday · ~15 min",
    serves: "1–2",
    protein: "~30g",
    time: "15 min",
    color: "#BF360C",
    bg: "#FBE9E7",
    ingredients: [
      ["Al pastor meat (frozen)", "1 portion"],
      ["Romaine leaves (garden)", "6–8 large leaves as shells"],
      ["TJ's Yogurt Dip or Tzatziki", "Drizzle — trust it with al pastor"],
      ["Herdez Salsa Verde", "For heat"],
      ["Lime juice", "Santa Cruz or fresh"],
      ["Pico de Gallo (Grillo's)", "Topping"],
    ],
    steps: [
      "Thaw al pastor in the fridge overnight Thursday, or defrost in a pan over low heat with a splash of water.",
      "Cook in a dry pan over medium-high heat until edges caramelize, ~5–8 min.",
      "Pick 6–8 large romaine leaves — these are your taco shells.",
      "Fill with al pastor, drizzle yogurt dip or tzatziki, top with salsa verde and pico de gallo.",
      "Squeeze lime over everything. Done.",
    ],
    notes: [
      "Romaine leaves as taco shells = built-in crunch, uses your garden harvest, zero extra carbs.",
      "The yogurt dip sounds wrong with al pastor but the creamy tang balances the sweet heat perfectly.",
    ]
  },
];

const snacks = [
  { emoji: "🥒", name: "Grillo's pickles + edamame", why: "Salty crunch combo, 9g protein from edamame alone — your chip replacement this week" },
  { emoji: "🫙", name: "Labneh dip + pita chips", why: "Thick and creamy, feels indulgent, way more protein than regular chips and dip" },
  { emoji: "☕", name: "Warm mug of bone broth", why: "For low-appetite days — counts as something, keeps muscle preservation on track" },
  { emoji: "🧀", name: "String cheese or Babybel", why: "Zero prep, grab-and-go protein when you can't even think about eating" },
  { emoji: "🍎", name: "Apple + almond butter", why: "Sweet craving without a crash — fat + fiber keeps it from spiking" },
  { emoji: "🥚", name: "Hard boiled eggs (batch 4–5 Sunday)", why: "6g protein each, ready all week, eat with a splash of hot sauce or Everything Bagel dip" },
];

const breakfasts = [
  { name: "Hash brown + fried egg + hot sauce", note: "Default upgrade — adds 6–8g protein, 2 extra minutes" },
  { name: "Hash brown + Everything Bagel yogurt dip", note: "Schmear it on top like a savory cream cheese situation" },
  { name: "Hash brown + tzatziki + fresh romaine", note: "Sounds weird, tastes like a little breakfast wrap" },
  { name: "Soft scrambled eggs + whatever's around", note: "Butter, salt, hot sauce — 5 min, ~14g protein for 2 eggs" },
  { name: "Hash brown + labneh + Grillo's pickle de gallo", note: "The pickled element wakes everything up" },
];

export default function WeeklyMealPlan() {
  const [activeSection, setActiveSection] = useState("week");
  const [checkedItems, setCheckedItems] = useState({});
  const [openRecipe, setOpenRecipe] = useState(null);

  const toggleCheck = (key) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  };

  const navItems = [
    { id: "week", label: "Week" },
    { id: "shopping", label: "Shop" },
    { id: "recipes", label: "Recipes" },
    { id: "snacks", label: "Snacks" },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#FAF7F2", minHeight: "100vh", color: "#2A2420" }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #FAF7F2; }
        .recipe-card { transition: box-shadow 0.2s; }
        .recipe-card:hover { box-shadow: 0 8px 32px rgba(44,74,46,0.13); }
        .nav-btn { transition: all 0.15s; }
        .nav-btn:hover { background: #2C4A2E !important; color: #fff !important; }
        .check-row:hover { background: rgba(44,74,46,0.04); }
        a { color: #2C4A2E; }
        @media (max-width: 600px) {
          .hero-title { font-size: 2rem !important; }
          .day-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #2C4A2E 0%, #3D6640 60%, #7A8C5E 100%)", padding: "3rem 1.5rem 2rem", color: "#FAF7F2" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.7, marginBottom: "0.75rem", fontFamily: "Inter" }}>
            Weekly Meal Plan
          </p>
          <h1 className="hero-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.6rem", fontWeight: 700, lineHeight: 1.15, marginBottom: "0.5rem" }}>
            {WEEK}
          </h1>
          <p style={{ opacity: 0.8, fontSize: "0.95rem", marginTop: "0.75rem" }}>
            2 cook sessions · Protein-forward · GLP-1 friendly · Leftovers by design
          </p>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
            {[["🥩","Skirt Steak (Sun)"],["🍗","Chimichurri Chicken (Wed)"],["🌮","Al Pastor (Fri)"]].map(([e,l]) => (
              <span key={l} style={{ background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "0.3rem 0.8rem", fontSize: "0.8rem", backdropFilter: "blur(4px)" }}>{e} {l}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Nav */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "#FAF7F2", borderBottom: "1.5px solid #E8E0D5", padding: "0.6rem 1.5rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", gap: "0.4rem" }}>
          {navItems.map(n => (
            <button key={n.id} className="nav-btn" onClick={() => scrollTo(n.id)}
              style={{ fontFamily: "Inter", fontSize: "0.82rem", fontWeight: 600, padding: "0.4rem 1rem", borderRadius: 20, border: "1.5px solid #2C4A2E", background: activeSection === n.id ? "#2C4A2E" : "transparent", color: activeSection === n.id ? "#fff" : "#2C4A2E", cursor: "pointer", letterSpacing: "0.02em" }}>
              {n.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.25rem 4rem" }}>

        {/* WEEK AT A GLANCE */}
        <section id="week" style={{ paddingTop: "2.5rem" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.25rem" }}>Week at a Glance</h2>
          <p style={{ color: "#7A6E65", fontSize: "0.88rem", marginBottom: "1.5rem" }}>One main meal a day. Breakfast is separate. Leftovers do the heavy lifting.</p>
          <div className="day-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
            {dayPlan.map(d => {
              const ts = tagStyles[d.tag];
              return (
                <div key={d.day} style={{ background: "#fff", borderRadius: 14, padding: "1rem", border: "1.5px solid #EDE6DC", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.05rem", color: "#2C4A2E" }}>{d.day}</span>
                    <span style={{ fontSize: "0.65rem", fontWeight: 600, padding: "0.15rem 0.5rem", borderRadius: 10, background: ts.bg, color: ts.color }}>{ts.label}</span>
                  </div>
                  <div style={{ fontSize: "1.3rem", marginBottom: "0.3rem" }}>{d.emoji}</div>
                  <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#2A2420", lineHeight: 1.3, marginBottom: "0.3rem" }}>{d.meal}</p>
                  <p style={{ fontSize: "0.73rem", color: "#9A8C82", lineHeight: 1.4 }}>{d.note}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* BREAKFAST */}
        <section style={{ paddingTop: "2.5rem" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.25rem" }}>Breakfast Rotation</h2>
          <p style={{ color: "#7A6E65", fontSize: "0.88rem", marginBottom: "1.25rem" }}>Small but protein-anchored. Hash brown is always an option — just don't eat it alone.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {breakfasts.map((b, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "0.9rem 1.1rem", border: "1.5px solid #EDE6DC", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ background: "#EEF3EC", color: "#2C4A2E", borderRadius: "50%", width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                <div>
                  <p style={{ fontSize: "0.88rem", fontWeight: 600, marginBottom: "0.15rem" }}>{b.name}</p>
                  <p style={{ fontSize: "0.78rem", color: "#9A8C82" }}>{b.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SHOPPING LIST */}
        <section id="shopping" style={{ paddingTop: "2.5rem" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.25rem" }}>Shopping List</h2>
          <p style={{ color: "#7A6E65", fontSize: "0.88rem", marginBottom: "1.5rem" }}>Tap to check items off as you shop. ✓ Have = already in your fridge.</p>
          {shoppingCategories.map((cat, ci) => (
            <div key={ci} style={{ marginBottom: "1.25rem" }}>
              <div style={{ background: cat.color, color: "#fff", borderRadius: "10px 10px 0 0", padding: "0.6rem 1rem", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.03em" }}>
                {cat.name}
              </div>
              <div style={{ background: "#fff", border: "1.5px solid #EDE6DC", borderTop: "none", borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
                {cat.items.map((item, ii) => {
                  const key = `${ci}-${ii}`;
                  const checked = checkedItems[key];
                  const ss = statusStyle[item.status];
                  return (
                    <div key={ii} className="check-row" onClick={() => toggleCheck(key)}
                      style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem", borderBottom: ii < cat.items.length - 1 ? "1px solid #F0EBE1" : "none", cursor: "pointer", opacity: checked ? 0.45 : 1, transition: "opacity 0.2s" }}>
                      <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${checked ? cat.color : "#C8BEB4"}`, background: checked ? cat.color : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
                        {checked && <span style={{ color: "#fff", fontSize: "0.75rem", fontWeight: 700 }}>✓</span>}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: "0.88rem", fontWeight: 600, textDecoration: checked ? "line-through" : "none", color: "#2A2420" }}>{item.item}</p>
                        <p style={{ fontSize: "0.74rem", color: "#9A8C82", marginTop: "0.1rem" }}>{item.note || item.use}{item.qty && item.qty !== "—" ? ` · ${item.qty}` : ""}</p>
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
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.25rem" }}>Recipes</h2>
          <p style={{ color: "#7A6E65", fontSize: "0.88rem", marginBottom: "1.5rem" }}>Tap any recipe to expand it.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {recipes.map(r => {
              const isOpen = openRecipe === r.id;
              return (
                <div key={r.id} className="recipe-card" style={{ background: "#fff", borderRadius: 16, border: `2px solid ${isOpen ? r.color : "#EDE6DC"}`, overflow: "hidden", transition: "border-color 0.2s, box-shadow 0.2s" }}>
                  {/* Recipe Header */}
                  <div onClick={() => setOpenRecipe(isOpen ? null : r.id)}
                    style={{ padding: "1.1rem 1.25rem", cursor: "pointer", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "2rem", flexShrink: 0 }}>{r.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "0.7rem", color: r.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.2rem" }}>{r.when}</p>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.25, marginBottom: "0.4rem" }}>{r.title}</h3>
                      <p style={{ fontSize: "0.74rem", color: "#9A8C82" }}>{r.source}</p>
                      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.6rem", flexWrap: "wrap" }}>
                        {[["⏱", r.time], ["🍽", r.serves], ["💪", r.protein]].map(([icon, val]) => (
                          <span key={val} style={{ fontSize: "0.72rem", background: r.bg, color: r.color, padding: "0.2rem 0.55rem", borderRadius: 8, fontWeight: 600 }}>{icon} {val}</span>
                        ))}
                      </div>
                    </div>
                    <span style={{ color: "#C8BEB4", fontSize: "1.2rem", flexShrink: 0, marginTop: 4 }}>{isOpen ? "▲" : "▼"}</span>
                  </div>

                  {/* Expanded Content */}
                  {isOpen && (
                    <div style={{ borderTop: `1.5px solid ${r.bg}`, padding: "1.25rem" }}>
                      {r.link && (
                        <div style={{ background: r.bg, borderRadius: 10, padding: "0.7rem 1rem", marginBottom: "1.25rem" }}>
                          <p style={{ fontSize: "0.78rem", color: r.color, fontWeight: 600, marginBottom: "0.2rem" }}>📎 {r.linkNote}</p>
                          <a href={r.link} target="_blank" rel="noreferrer" style={{ fontSize: "0.78rem", wordBreak: "break-all" }}>{r.link}</a>
                        </div>
                      )}

                      <h4 style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: r.color, marginBottom: "0.75rem" }}>Ingredients</h4>
                      <div style={{ background: "#FAF7F2", borderRadius: 10, overflow: "hidden", marginBottom: "1.25rem" }}>
                        {r.ingredients.map(([ing, amt], i) => (
                          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "0.55rem 0.9rem", background: i % 2 === 0 ? "#FAF7F2" : "#fff", fontSize: "0.84rem" }}>
                            <span style={{ color: "#2A2420" }}>{ing}</span>
                            <span style={{ color: r.color, fontWeight: 600, textAlign: "right", marginLeft: "1rem" }}>{amt}</span>
                          </div>
                        ))}
                      </div>

                      <h4 style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: r.color, marginBottom: "0.75rem" }}>Method</h4>
                      <ol style={{ paddingLeft: "1.25rem", marginBottom: "1.25rem" }}>
                        {r.steps.map((s, i) => (
                          <li key={i} style={{ fontSize: "0.86rem", color: "#3A3228", lineHeight: 1.6, marginBottom: "0.5rem", paddingLeft: "0.25rem" }}>{s}</li>
                        ))}
                      </ol>

                      {r.notes.length > 0 && (
                        <>
                          <h4 style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: r.color, marginBottom: "0.6rem" }}>Notes</h4>
                          {r.notes.map((n, i) => (
                            <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.4rem", alignItems: "flex-start" }}>
                              <span style={{ color: r.color, flexShrink: 0, marginTop: 2 }}>💡</span>
                              <p style={{ fontSize: "0.82rem", color: "#5A4E45", lineHeight: 1.55, fontStyle: "italic" }}>{n}</p>
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

        {/* SNACKS */}
        <section id="snacks" style={{ paddingTop: "2.5rem" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.25rem" }}>Snack Rotation</h2>
          <p style={{ color: "#7A6E65", fontSize: "0.88rem", marginBottom: "1.25rem" }}>For days when appetite is low or chips are calling. All of these are already in your fridge or on your list.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {snacks.map((s, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "0.9rem 1.1rem", border: "1.5px solid #EDE6DC", display: "flex", gap: "0.9rem", alignItems: "flex-start" }}>
                <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{s.emoji}</span>
                <div>
                  <p style={{ fontSize: "0.88rem", fontWeight: 600, marginBottom: "0.2rem" }}>{s.name}</p>
                  <p style={{ fontSize: "0.78rem", color: "#9A8C82", lineHeight: 1.5 }}>{s.why}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1.5px solid #EDE6DC", textAlign: "center" }}>
          <p style={{ fontSize: "0.75rem", color: "#B5A99E" }}>Built with Claude · Week of {WEEK}</p>
        </div>

      </div>
    </div>
  );
}
