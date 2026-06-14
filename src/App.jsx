import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './Landing'
import WeeklyMealPlan from './WeeklyMealPlan'
import Beachcrest from './beachcrest-google-sites'
import BeachcrestRedesign from './beachcrest-redesign'
import Recipes from "./Recipes";
import RecipeDetail from "./RecipeDetail";

// Inside your router:
<Route path="/recipes" element={<Recipes />} />
<Route path="/recipes/:id" element={<RecipeDetail recipeId={useParams().id} />} />

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/meal-plan" element={<WeeklyMealPlan />} />
        <Route path="/beachcrest" element={<Beachcrest />} />
        <Route path="/beachcrest-redesign" element={<BeachcrestRedesign />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetail recipeId={useParams().id} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App