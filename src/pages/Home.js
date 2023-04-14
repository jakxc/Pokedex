import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import axios from "axios";
import Search from "../components/Search";
import Card from "../components/Card";

const Home = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [query, setQuery] = useState('');
    const [sortBy, setSortBy] = useState('id');

    const setAllData = async () => {
      if (pokemonData.length > 0) {
        setPokemonData([]);
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
        setPokemonData((prevState) => {
          let newState = [...prevState, result.data];
          newState.sort((a, b) => (a.id > b.id ? 1 : -1));
          return newState;
        });
      });
    };
  
    useEffect(() => {
      setAllData();
    }, [url]);

    const filteredPokemon = pokemonData.filter(pokemon => {
      return pokemon.name.toLowerCase().includes(query.toLowerCase()) || pokemon.id === Number(query);
    }).sort((a, b) => {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    })
    
    const cardElements = filteredPokemon.map(pokemon => {
      return  ( 
                <>
                  <NavLink to={`/${pokemon.id}`} style={{ textDecoration: 'none' }}>
                    <Card
                      key={pokemon.id}
                      pokemon={pokemon}
                    /> 
                  </NavLink>    
                </>
              )
    })

    return (
        <>  
          <Search 
            query={query}
            onQueryChange={(myQuery) => setQuery(myQuery)}
            sortBy={sortBy}
            onSortByChange={(mySort) => setSortBy(mySort)}
          />
          <div className="cards-container">
            {loading ? <pre>Loading, please wait...</pre> : cardElements}  
          </div>      
        </>
    )
}

export default Home;