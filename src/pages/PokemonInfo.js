import { useState, useEffect } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import axios from "axios";

const PokemonInfo = () => {
    const { pokemonId } = useParams();
    const [pokemon, setPokemon] = useState([]);
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

    useEffect(() => {
        getPokemonInfo()
    }, [pokemonId])

    if (loading) {
        return (<pre>Loading...</pre>)
    }
    
    return (
        <>
            <h1>{pokemon.name} {pokemon.id}</h1>
            <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                height={200}
                width={200}
                alt={`${pokemon.name}`}
            />
            <div className="types">
                {pokemon.types?.map((item) => {
                    return (
                        <>
                        <div className="type">
                            <span>{item.type.name}</span>
                        </div>
                        </>
                    );
                })}
          </div>
          <div>Weight: {pokemon.weight} | Height: {pokemon.height}</div>
        </>
    )
}

export default PokemonInfo;