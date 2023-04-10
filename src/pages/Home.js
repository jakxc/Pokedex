import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Card from "../components/Card";

const Home = () => {
    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();

    const setAllData = async () => {
      if (pokeData.length > 0) {
        setPokeData([]);
      }
      setLoading(true);
      const res = await axios.get(url);
      setNextUrl(res.data.next);
      setPrevUrl(res.data.previous);
      setCurrentPokemon(res.data.results);
      setLoading(false);
    };

    const setCurrentPokemon = async (res) => {
      res.forEach(async (pokemon) => {
        const result = await axios.get(pokemon.url);
        setPokeData((prevState) => {
          let newState = [...prevState, result.data];
          newState.sort((a, b) => (a.id > b.id ? 1 : -1));
          return newState;
        });
      });
    };
  
    useEffect(() => {
      setAllData();
    }, [url]);

    if (loading) {
      return (
        <pre>Loading...</pre>
      )
    }
    
    const cardElements = pokeData.length > 0 && pokeData.map(pokemon => {
      return  ( 
                <Link to="/pokemonDetail">
                  <Card
                    key={pokemon.id}
                    pokemon={pokemon}
                  /> 
                </Link>
              )
    })

    return (
        <div>  
          {cardElements}        
        </div>
    )
}

export default Home;