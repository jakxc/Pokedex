import './index.css'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import Hero from '../../components/Hero';
import About from '../../components/About';
import BaseStats from '../../components/BaseStats';
import Modal from "../../components/Modal";
import pokemonTypeColors from '../../pokemonTypeColors';
import chevron from '../../assets/images/chevron_right.svg';
import loadingGif from "../../assets/gifs/pokeball_gif.gif"

const PokemonInfo = () => {
    const { state } = useLocation();;
    const { pokemon, search } = state;
    const [currentPokemon, setCurrentPokemon] = useState(pokemon);
    const [pokemonSpecies, setPokemonSpecies] = useState({});
    const [flavorText, setFlavorText] = useState('');
    const [pokemonColor, setPokemonColor] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getPokemonSpecies = async () => {
        setLoading(true);
        try {
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
            setError(false);
        } catch (e) {
            console.log(e);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const getPrevPokemon = async () => {
        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${currentPokemon.id - 1}`);
            setCurrentPokemon(res.data);
            setError(false);
        } catch (e) {
            console.log(e);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const getNextPokemon = async () => {
        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${currentPokemon.id + 1}`);
            setCurrentPokemon(res.data);
            setError(false);
        } catch (e) {
            console.log(e);
            setError(true);
        } finally {
            setLoading(false);
        }
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

    
    return (
        <div className="h-100 d-flex flex-column justify-content-between pt-3 px-2" style={{ backgroundColor: pokemonColor }}>
            { error && <pre>An unexpected error occured!</pre>}
            { loading && <Modal content={<img src={loadingGif} alt="Pokeball" style={{ width: "350px" }} />} text="Loading...please wait" />}
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
                            }}
                    alt='Left Chevron'
                    onClick={getPrevPokemon}
                />
                <img
                    src={chevron}
                    alt='Right Chevron'
                    onClick={getNextPokemon}
                />
            </div>
            <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentPokemon.id}.png`}
                className='pokemon-image'
                alt={`${currentPokemon.name}`}
            />
            <div className="info-container | w-100 d-flex flex-column pt-3 px-3 pb-4">
                <section className="d-flex justify-content-center align-items-center gap-2 p-4">
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
                <section className="mb-4">
                    <About 
                        pokemon={currentPokemon}
                        flavorText={flavorText} 
                        pokemonColor={pokemonColor}
                    />
                </section>
                <section>
                    <BaseStats
                        pokemon={currentPokemon}
                        pokemonColor={pokemonColor}
                    />
                </section>
            </div>
        </div>
    )
}

export default PokemonInfo;