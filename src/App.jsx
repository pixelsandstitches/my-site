import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './Landing'
import WeeklyMealPlan from './WeeklyMealPlan'
import Beachcrest from './beachcrest-google-sites'
import BeachcrestRedesign from './beachcrest-redesign'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/meal-plan" element={<WeeklyMealPlan />} />
        <Route path="/beachcrest" element={<Beachcrest />} />
        <Route path="/beachcrest-redesign" element={<BeachcrestRedesign />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App