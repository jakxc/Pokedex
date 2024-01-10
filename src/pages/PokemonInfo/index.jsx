import './index.css'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import Hero from '../../components/Hero';
import About from '../../components/About';
import BaseStats from '../../components/BaseStats';
import pokemonTypeColors from '../../pokemonTypeColors';
import chevron from '../../assets/images/chevron_right.svg'

const PokemonInfo = () => {
    const { state } = useLocation();;
    const { pokemon, search } = state;
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
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${currentPokemon.id - 1}`);
        setCurrentPokemon(res.data);
    }

    const getNextPokemon = async () => {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${currentPokemon.id + 1}`);
        setCurrentPokemon(res.data);
    }

    useEffect(() => {
        getPokemonSpecies();
        if (currentPokemon.types[0]?.type?.name) {
            const [{ color }] = pokemonTypeColors.filter(
              (item) => item.name === currentPokemon.types[0]?.type?.name
            )
  
            setPokemonColor(color);
        }
    }, [currentPokemon])


    if (loading) return <pre>Loading...please wait</pre>
    
    return (
        <div className="h-100 d-flex flex-column justify-content-between p-2" style={{ backgroundColor: pokemonColor }}>
            <Hero 
                pokemon={currentPokemon}
                search={search}
            />
            <div className="chevrons | w-100 d-flex justify-content-between px-3 py-4">
                <img
                    src={chevron}
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
            <div className="info-container | w-100 d-flex flex-column pt-5 px-3 pb-4">
                <section className="d-flex justify-content-center align-items-center p-4">
                    {currentPokemon.types?.map((item, i) => {
                        const [{ color }] = pokemonTypeColors.filter((el) => el.name === item.type.name);
                    
                        return (
                            <div 
                                key={i}
                                className="type-delegate | d-flex justify-content-center align-items-center px-3 py-2" 
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