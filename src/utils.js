import axios from "axios";

export const getCurrentPage = async (url) => {
    const res = await axios.get(url);
    const currentData = [];
    res.data.results.forEach(async (pokemon) => {
      const res = await axios.get(pokemon.url);
      currentData.push(res.data)   
    });

    return { 
        currentPage: currentData,
        nextUrl: res.data.next,
        prevUrl: res.data.previous
    }
};

export const getPokemonSpecies = async (id) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const filteredFlavorTextEntries = res.data.flavor_text_entries.filter(
        (element) => element.language.name === "en"
    );
    const flavorTextEntry =
        filteredFlavorTextEntries.length > 0
          ? filteredFlavorTextEntries[0]
          : {};

    return {
        flavorText: flavorTextEntry.flavor_text,
        pokemonSpecies: res.data
    }
}

