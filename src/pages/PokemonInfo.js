import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";

const PokemonInfo = () => {
    const { pokemonId } = useParams();
    const [pokemon, setPokemon] = useState({});
    const [pokemonSpecies, setPokemonSpecies] = useState({});
    const [flavorText, setFlavorText] = useState('');
    const [loading, setLoading] = useState(false);

    const statsContent = [
        { title: "HP", field: "hp" },
        { title: "Attack", field: "attack" },
        { title: "Defense", field: "defense" },
        { title: "Special Attack", field: "specialAttack" },
        { title: "Special Defense", field: "specialDefense" },
        { title: "Speed", field: "speed" },
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

    if (loading) {
        return (<pre>Loading, please wait...</pre>)
    }
    
    return (
        <>
             <Link
                to=".."
                className="back-button"
            >&larr;</Link>
            <h1>{pokemon.name} {pokemon.id}</h1>
            <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                height={200}
                width={200}
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
        </>
    )
}

export default PokemonInfo;