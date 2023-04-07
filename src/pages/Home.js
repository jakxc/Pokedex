import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";

const Home = () => {
    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [pokedex, setPokedex] = useState();

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
            return newState
          });
        });
      };
    
      useEffect(() => {
        setAllData();
      }, [url]);
    
    return (
        <div>  
            {pokeData.length > 0 && (
                <Card
                    key={pokeData.id}
                    pokemon={pokeData}
                    loading={loading}
                />
          )}</div>
    )
}

export default Home;