import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import PokeHeader from '../components/PokeHeader';

const PokemonInfo = () => {
    const { pokemonId } = useParams();
    const [pokemon, setPokemon] = useState({});
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

    const getPokemonInfo = async () => {
        setLoading(true);
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        setPokemon(res.data);
        setLoading(false)
    }

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
        getPokemonInfo()
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
            <PokeHeader pokemon={ pokemon }/>
            <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                height={200}
                width={200}
                className='pokemon-image'
                alt={`${pokemon.name}`}
            />
            <section className="types">
                {pokemon.types?.map((item) => {
                    return (
                        <>
                        <div className="type">
                            <span>{item.type.name}</span>
                        </div>
                        </>
                    );
                })}
          </section>
          <div>Weight: {pokemon.weight} | Height: {pokemon.height}</div>
          <div className="abilities">
            Moves: 
            {pokemon.abilities?.map((item) => {
              return <div>{item.ability?.name}</div>;
            })}
          </div>
          <div className="description">
            {flavorText}
          </div>
          <div className="base-stat">
            {statsContent &&
              statsContent.map((stat, index) => (
                <div className="row" key={stat.field}>
                  <strong>{stat.title}</strong>
                  <span>{pokemon.stats ? pokemon.stats[index].base_stat.toString().padStart(3, '0') : 1}</span>
                </div>
              ))}
          </div>
        </div>
    )
}

export default PokemonInfo;