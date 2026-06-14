import { useNavigate } from "react-router-dom";

// ─── Recipe Data ────────────────────────────────────────────────────────────
// Add new recipes here as objects in this array.
// Each recipe needs: id, category, title, description, note, ingredients, steps
const recipeData = {
  "savory-dill-swiss-scones": {
    id: "savory-dill-swiss-scones",
    category: "BAKING",
    title: "Savory Dill & Swiss Scones",
    description:
      "A homemade riff on a beloved Seattle bakery classic — rich, cheesy, and herbaceous. Makes 8 scones.",
    note: "Ingredient ratios are a best-guess reconstruction based on the bakery's published ingredient list, not their actual recipe. Treat it as a strong starting point and adjust to taste — more dill, more cheese, go for it. These freeze beautifully before or after baking.",
    ingredients: [
      { amount: "2 cups", name: "all-purpose flour" },
      { amount: "1 tbsp", name: "baking powder" },
      { amount: "¾ tsp", name: "sea salt" },
      { amount: "6 tbsp", name: "unsalted butter, cold and cubed" },
      { amount: "¾ cup", name: "Swiss cheese, shredded" },
      { amount: "¼ cup", name: "Parmesan cheese, finely grated" },
      { amount: "3", name: "scallions, thinly sliced" },
      { amount: "3 tbsp", name: "fresh dill, roughly chopped" },
      { amount: "2", name: "large eggs" },
      { amount: "½ cup", name: "heavy whipping cream" },
    ],
    steps: [
      {
        title: "Preheat oven",
        body: "Preheat your oven to 400°F. Line a baking sheet with parchment paper.",
      },
      {
        title: "Mix dry ingredients",
        body: "Whisk together flour, baking powder, and sea salt in a large bowl.",
      },
      {
        title: "Cut in butter",
        body: "Add cold cubed butter to the flour mixture. Using your fingertips or a pastry cutter, work the butter in until the mixture resembles coarse crumbs with some pea-sized pieces remaining. Don't overwork — those butter chunks are what make scones flaky.",
      },
      {
        title: "Add cheese and herbs",
        body: "Stir in Swiss cheese, Parmesan, scallions, and dill until evenly distributed.",
      },
      {
        title: "Add wet ingredients",
        body: "Whisk together eggs and cream. Reserve about 2 tablespoons for brushing. Pour the rest into the flour mixture and stir gently with a fork until the dough just comes together — it will be shaggy. Do not overmix.",
      },
      {
        title: "Shape the scones",
        body: "Turn the dough out onto a lightly floured surface and gently pat into a circle about 1 inch thick. Cut into 8 wedges. Place on the prepared baking sheet close together but not quite touching — about ¼ inch apart. This helps them hold their shape.",
      },
      {
        title: "Brush and bake",
        body: "Brush the tops with the reserved egg-cream mixture. Optionally, sprinkle a little extra Parmesan on top. Bake for 18–22 minutes until golden brown on top and set in the center.",
        timer: "18–22 min at 400°F",
      },
      {
        title: "Cool and serve",
        body: "Let cool on the pan for at least 10 minutes before eating. Serve with cream cheese if you want to go full bakery-style.",
        timer: "Rest 10 min",
      },
    ],
  },
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function RecipeDetail({ recipeId }) {
  const navigate = useNavigate();
  const recipe = recipeData[recipeId];

  if (!recipe) {
    return (
      <div style={styles.page}>
        <p style={{ color: "#1a3d2b", textAlign: "center" }}>Recipe not found.</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Back link */}
      <button style={styles.back} onClick={() => navigate("/recipes")}>
        ← all recipes
      </button>

      {/* Header */}
      <div style={styles.header}>
        <p style={styles.eyebrow}>{recipe.category}</p>
        <h1 style={styles.title}>{recipe.title}</h1>
        <div style={styles.divider} />
        <p style={styles.description}>{recipe.description}</p>
      </div>

      {/* Card */}
      <div style={styles.card}>
        {/* Ingredients */}
        <div style={styles.section}>
          <h2 style={styles.sectionLabel}>INGREDIENTS</h2>
          <ul style={styles.ingredientList}>
            {recipe.ingredients.map((ing, i) => (
              <li key={i} style={styles.ingredientItem}>
                <span style={styles.amount}>{ing.amount}</span>
                <span style={styles.ingName}>{ing.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.rule} />

        {/* Steps */}
        <div style={styles.section}>
          <h2 style={styles.sectionLabel}>METHOD</h2>
          <ol style={styles.stepList}>
            {recipe.steps.map((step, i) => (
              <li key={i} style={styles.step}>
                <div style={styles.stepHeader}>
                  <span style={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={styles.stepTitle}>{step.title}</span>
                  {step.timer && <span style={styles.timer}>{step.timer}</span>}
                </div>
                <p style={styles.stepBody}>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Note */}
        {recipe.note && (
          <>
            <div style={styles.rule} />
            <div style={styles.section}>
              <h2 style={styles.sectionLabel}>NOTES</h2>
              <p style={styles.noteText}>{recipe.note}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#b5cfc3",
    padding: "48px 40px 80px",
    fontFamily: "'Georgia', serif",
    color: "#1a3d2b",
  },
  back: {
    background: "none",
    border: "none",
    color: "#2d5a42",
    fontSize: "13px",
    letterSpacing: "0.05em",
    cursor: "pointer",
    padding: 0,
    marginBottom: "40px",
    fontFamily: "'Georgia', serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "48px",
  },
  eyebrow: {
    fontSize: "11px",
    letterSpacing: "0.2em",
    color: "#2d5a42",
    marginBottom: "12px",
  },
  title: {
    fontSize: "clamp(36px, 6vw, 72px)",
    fontWeight: "800",
    color: "#1a3d2b",
    margin: "0 0 20px 0",
    letterSpacing: "-0.02em",
  },
  divider: {
    width: "48px",
    height: "1px",
    backgroundColor: "#2d5a42",
    margin: "0 auto 20px",
  },
  description: {
    fontSize: "16px",
    color: "#2d5a42",
    maxWidth: "520px",
    margin: "0 auto",
    lineHeight: 1.7,
  },
  card: {
    backgroundColor: "#a8c4b6",
    border: "1px solid #2d5a4260",
    borderRadius: "16px",
    padding: "48px",
    maxWidth: "720px",
    margin: "0 auto",
  },
  section: {
    marginBottom: "8px",
  },
  sectionLabel: {
    fontSize: "11px",
    letterSpacing: "0.2em",
    color: "#2d5a42",
    marginBottom: "24px",
    fontWeight: "400",
  },
  ingredientList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  ingredientItem: {
    display: "flex",
    gap: "20px",
    fontSize: "15px",
    lineHeight: 1.5,
    borderBottom: "1px solid #2d5a4220",
    paddingBottom: "12px",
  },
  amount: {
    color: "#2d5a42",
    minWidth: "80px",
    fontStyle: "italic",
  },
  ingName: {
    color: "#1a3d2b",
  },
  rule: {
    border: "none",
    borderTop: "1px solid #2d5a4230",
    margin: "36px 0",
  },
  stepList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },
  step: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  stepHeader: {
    display: "flex",
    alignItems: "baseline",
    gap: "12px",
  },
  stepNum: {
    fontSize: "11px",
    letterSpacing: "0.1em",
    color: "#2d5a42",
    fontStyle: "normal",
    minWidth: "24px",
  },
  stepTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#1a3d2b",
    flexGrow: 1,
  },
  timer: {
    fontSize: "11px",
    letterSpacing: "0.08em",
    color: "#2d5a42",
    border: "1px solid #2d5a4260",
    borderRadius: "20px",
    padding: "2px 10px",
  },
  stepBody: {
    fontSize: "15px",
    color: "#2d5a42",
    lineHeight: 1.7,
    margin: "0 0 0 36px",
  },
  noteText: {
    fontSize: "14px",
    color: "#2d5a42",
    lineHeight: 1.8,
    fontStyle: "italic",
    margin: 0,
  },
};
