import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from "axios";
import PokeHeader from '../components/PokeHeader';
import About from '../components/About';
import BaseStats from '../components/BaseStats';
import pokemonTypeColors from '../pokemonTypeColors';
import chevron from '../assets/images/chevron_right.svg'

const PokemonInfo = () => {
    const { pokemonId } = useParams();
    const { state } = useLocation();;
    const { pokemon } = state;
    const [currentPokemon, setCurrentPokemon] = useState(pokemon);
    const [pokemonSpecies, setPokemonSpecies] = useState({});
    const [flavorText, setFlavorText] = useState('');
    const [loading, setLoading] = useState(false);
    const [pokemonColor, setPokemonColor] = useState('');

    const getPokemonSpecies = async () => {
        setLoading(true);
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${currentPokemon.id}`);
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

    const getPrevPokemon = async () => {
        setLoading(true);
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${currentPokemon.id - 1}`);
        setCurrentPokemon(res.data);
        setLoading(false);
    }

    const getNextPokemon = async () => {
        setLoading(true);
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${currentPokemon.id + 1}`);
        setCurrentPokemon(res.data);
        setLoading(false);
    }

    useEffect(() => {
        getPokemonSpecies()
    }, [currentPokemon])

    useEffect(() => {
        if (currentPokemon.types[0]?.type?.name) {
          const [{ color }] = pokemonTypeColors.filter(
            (item) => item.name === currentPokemon.types[0]?.type?.name
          );

          setPokemonColor(color);
        }
      }, [currentPokemon.types]);

    if (loading) {
        return (<pre>Loading, please wait...</pre>)
    }
    
    return (
        <div className='pokeinfo-container' style={{ backgroundColor: pokemonColor }}>
            <PokeHeader pokemon={currentPokemon}/>
            <div className='nav-container'>
                <img
                    src={chevron}
                    width={24}
                    height={24}
                    style={{
                             transform: 'rotate(180deg)', 
                             visibility: currentPokemon.id > 1? "" : "hidden",
                             cursor: "pointer"
                            }}
                    alt='Left Chevron'
                    onClick={getPrevPokemon}
                />
                 <img
                    src={chevron}
                    width={24}
                    height={24}
                    style={{ cursor: "pointer" }}
                    alt='Right Chevron'
                    onClick={getNextPokemon}
                />
            </div>
            <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentPokemon.id}.png`}
                height={200}
                width={200}
                className='pokemon-image'
                alt={`${currentPokemon.name}`}
            />
            <div className='content-container'>
                <section className="types">
                    {currentPokemon.types?.map((item, i) => {
                        const [{ color }] = pokemonTypeColors.filter((el) => el.name === item.type.name);
                    
                        return (
                            <div 
                                key={i}
                                className="type-container" 
                                style={{ backgroundColor: `${color}` }}
                            >
                                <span>{item.type.name.charAt(0).toUpperCase() 
                                        + item.type.name.slice(1)}</span>
                            </div>
                        );
                    })}
                </section>
                <About 
                    pokemon={currentPokemon}
                    flavorText={flavorText} 
                    pokemonColor={pokemonColor}
                />
                <BaseStats
                    pokemon={currentPokemon}
                    pokemonColor={pokemonColor}
                />
            </div>
        </div>
    )
}

export default PokemonInfo;