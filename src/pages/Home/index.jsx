import "./index.css"
import { useState, useEffect, useRef } from "react";
import { NavLink, useSearchParams } from 'react-router-dom';
import axios from "axios";
import Header from "../../components/Header";
import Search from "../../components/Search";
import Card from "../../components/Card";
import Modal from "../../components/Modal";
import loadingGif from "../../assets/gifs/pokeball_gif.gif"

const Home = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const pokemonListRef = useRef();

    const query =  searchParams.get('query') || '';
    const sortBy = searchParams.get('sortBy') || '';

    function handleFilterChange(key, value) {
      setSearchParams(prevParams => {
          if (value === null || value.length === 0) {
              prevParams.delete(key)
          } else {
              prevParams.set(key, value)
          }
          return prevParams
      })
    }

    const setAllData = async () => {
      if (pokemonData.length > 0) {
        setPokemonData([]);
      }

      setLoading(true);
     
      try {
        const res = await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        setCurrentPage(res.data.results);
        setError(false);
      } catch (e) {
        console.log(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    const setCurrentPage = async (results) => {
      results.forEach(async (pokemon) => {
        const res = await axios.get(pokemon.url);
        setPokemonData((prevState) => {
          let newState = [...prevState, res.data];
          newState.sort((a, b) => (a.id > b.id ? 1 : -1));
          return newState;
        });
      });
    };
  
    useEffect(() => {
      setAllData();
    }, [url]);

    // const handleScroll = () => {
    //   if (pokemonListRef.current) {
    //     const { scrollTop, scrollHeight, clientHeight } = pokemonListRef.current;
    //     if (scrollTop + clientHeight === scrollHeight) {
    //       setUrl(nextUrl);
    //     }

    //     if (scrollHeight < 0) {
    //       setUrl(prevUrl);
    //     }
    //   }
    // };

    const filteredPokemon = pokemonData.filter(pokemon => {
      return pokemon.name.toLowerCase().includes(query.toLowerCase()) || pokemon.id === Number(query);
    }).sort((a, b) => {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    })
    
    const cardElements = filteredPokemon.map(pokemon => {
      return  ( 
                <NavLink 
                  key={pokemon.id}
                  to={`/${pokemon.id}`} 
                  style={{ textDecoration: 'none' }}
                  state={{ 
                    pokemon: pokemon,
                    search: `?${searchParams.toString()}`,
                   }}
                >
                  <Card
                    pokemon={pokemon}
                  /> 
                </NavLink>    
              )
    })
  
    return (
        <div className="home | h-100 d-flex flex-column gap-2 p-2">  
          <Header />
          <Search 
            query={query}
            onQueryChange={(myQuery) => handleFilterChange('query', myQuery)}
            sortBy={sortBy}
            onSortByChange={(mySort) => handleFilterChange('sortBy', mySort)}
          />

          <div className="cards | h-100 d-flex flex-wrap align-content-start gap-3 px-4 py-3" >
            { error && <pre>An unexpected error occured!</pre>}
            { loading && <Modal content={<img src={loadingGif} alt="Pokeball" style={{ width: "350px" }} />} text="Loading...please wait" />}
            { cardElements.length > 0 ? cardElements : <pre>No matching results, please try again.</pre> } 
          </div> 
          <div className="w-100 d-flex justify-content-between sticky-bottom">
              <div  
                style={{ visibility: prevUrl ? "" : "hidden" }}
                onClick={() => setUrl(prevUrl)}
                className="nav-arrow | p-1"
              >Previous</div>
              <div 
                style={{ visibility: nextUrl ? "" : "hidden" }}
                onClick={() => setUrl(nextUrl)}
                className="nav-arrow | p-1"
              >Next</div>
            </div>
        </div>
    )
}

export default Home;