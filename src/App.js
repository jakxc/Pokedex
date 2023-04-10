import './style.css';
import Home from './pages/Home'
import PokemonDetail from './pages/PokemonDetail';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/pokemonDetail' element={<PokemonDetail/>} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
