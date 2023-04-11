import './style.css';
import Home from './pages/Home'
import PokemonInfo from './pages/PokemonInfo';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/pokemonInfo/:pokemonId' element={<PokemonInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
