import { useNavigate } from "react-router-dom";

const recipes = [
  {
    id: "savory-dill-swiss-scones",
    category: "BAKING",
    title: "Savory Dill & Swiss Scones",
    description: "A homemade riff on a beloved Seattle bakery classic — rich, cheesy, and herbaceous.",
  },
];

export default function Recipes() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <p style={styles.eyebrow}>A SMALL COLLECTION OF THINGS</p>
        <h1 style={styles.title}>recipes</h1>
        <div style={styles.divider} />
      </div>

      <div style={styles.grid}>
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            style={styles.card}
            onClick={() => navigate(`/recipes/${recipe.id}`)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#9bbdac";
              e.currentTarget.style.cursor = "pointer";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#b5cfC3";
            }}
          >
            <p style={styles.category}>{recipe.category}</p>
            <h2 style={styles.cardTitle}>{recipe.title}</h2>
            <p style={styles.cardDesc}>{recipe.description}</p>
            <div style={styles.arrow}>→</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#b5cfc3",
    padding: "60px 40px",
    fontFamily: "'Georgia', serif",
    color: "#1a3d2b",
  },
  header: {
    textAlign: "center",
    marginBottom: "60px",
  },
  eyebrow: {
    fontSize: "12px",
    letterSpacing: "0.2em",
    color: "#2d5a42",
    marginBottom: "16px",
    fontFamily: "'Georgia', serif",
  },
  title: {
    fontSize: "clamp(48px, 8vw, 96px)",
    fontWeight: "800",
    color: "#1a3d2b",
    margin: "0 0 20px 0",
    letterSpacing: "-0.02em",
    fontFamily: "'Georgia', serif",
  },
  divider: {
    width: "48px",
    height: "1px",
    backgroundColor: "#2d5a42",
    margin: "0 auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 360px))",
    gap: "24px",
    justifyContent: "center",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "#b5cfc3",
    border: "1px solid #2d5a4280",
    borderRadius: "12px",
    padding: "40px 36px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    transition: "background-color 0.2s ease",
    minHeight: "260px",
  },
  category: {
    fontSize: "11px",
    letterSpacing: "0.2em",
    color: "#2d5a42",
    margin: 0,
    fontFamily: "'Georgia', serif",
  },
  cardTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#1a3d2b",
    margin: 0,
    lineHeight: 1.3,
    fontFamily: "'Georgia', serif",
  },
  cardDesc: {
    fontSize: "15px",
    color: "#2d5a42",
    lineHeight: 1.6,
    margin: 0,
    flexGrow: 1,
    fontFamily: "'Georgia', serif",
  },
  arrow: {
    fontSize: "20px",
    color: "#2d5a42",
    marginTop: "12px",
  },
};
