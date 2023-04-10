const Card = ({ pokemon }) => {
  return (
    <div className="card" key={pokemon.id}>
      <span className="card-name">#{pokemon.id}</span>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          height={108}
          width={104}
          alt={`${pokemon.name}`}
        />
      <span className="card-name">{pokemon.name}</span>
    </div>
  )     
};

export default Card;