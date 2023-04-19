import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from "axios";
import PokeHeader from '../components/PokeHeader';
import About from '../components/About';

const PokemonInfo = () => {
    const { pokemonId } = useParams();
    const location = useLocation();
    const { state } = location;
    const { pokemon } = state;
    const [pokemonSpecies, setPokemonSpecies] = useState({});
    const [flavorText, setFlavorText] = useState('');
    const [loading, setLoading] = useState(false);

    const statsContent = [
        { title: "HP", field: "hp" },
        { title: "ATK", field: "attack" },
        { title: "DEF", field: "defense" },
        { title: "SATK", field: "specialAttack" },
        { title: "SDEF", field: "specialDefense" },
        { title: "SPD", field: "speed" },
      ];

    const getPokemonSpecies = async () => {
        setLoading(true);
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
        const filteredFlavorTextEntries = res.data.flavor_text_entries.filter(
            (element) => element.language.name === "en"
        );
        const flavorTextEntry =
            filteredFlavorTextEntries.length > 0
              ? filteredFlavorTextEntries[0]
              : {};
        setFlavorText(flavorTextEntry.flavor_text)
        setPokemonSpecies(res.data);
        setLoading(false)
    }

    useEffect(() => {
        getPokemonSpecies()
    }, [pokemonId])

    const styles = {
      backgroundColor: "#74CB48"
    }

    if (loading) {
        return (<pre>Loading, please wait...</pre>)
    }
    
    return (
        <div className='pokeinfo-container' style={styles}>
            <PokeHeader pokemon={pokemon}/>
            <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                height={200}
                width={200}
                className='pokemon-image'
                alt={`${pokemon.name}`}
            />
            <div className='content-container'>
              <section className="types">
                  {pokemon.types?.map((item) => {
                      return (
                          <>
                          <div className="type-container">
                              <span>{item.type.name.charAt(0).toUpperCase() 
                                      + item.type.name.slice(1)}</span>
                          </div>
                          </>
                      );
                  })}
            </section>
            <About pokemon={pokemon} flavorText={flavorText}/>
            {/* <div className="base-stat">
              {statsContent &&
                statsContent.map((stat, index) => (
                  <div className="row" key={stat.field}>
                    <strong>{stat.title}</strong>
                    <span>{pokemon.stats ? pokemon.stats[index].base_stat.toString().padStart(3, '0') : 1}</span>
                  </div>
                ))}
            </div> */}
          </div>
        </div>
    )
}

export default PokemonInfo;