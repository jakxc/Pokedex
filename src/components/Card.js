const Card = ({ pokemon }) => {
  return (
    <div className="card">
      <div className="card-id">#{pokemon.id.toString().padStart(3, '0')}</div>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          alt={`${pokemon.name}`}
        />
      <div className="card-name">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</div>
    </div>
  )     
};

export default Card;