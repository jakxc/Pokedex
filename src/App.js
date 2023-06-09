import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import PokemonInfo from './pages/PokemonInfo';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route 
      index 
      element={<Home/>} 
    />
    <Route path=':pokemonId' element={<PokemonInfo />} />
    <Route path='*' element={<NotFound/>} />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
