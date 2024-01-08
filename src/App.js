import './App.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import PokemonInfo from './pages/PokemonInfo';
import {
  Routes,
  Route,
  BrowserRouter as Router
} from "react-router-dom"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/> 
        <Route path="/:id" element={<PokemonInfo />}/>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </Router>
  )
}

export default App;
