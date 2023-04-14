const Card = ({ pokemon }) => {
  return (
    <div className="card">
      <div className="card-id"><span>#{pokemon.id.toString().padStart(3, '0')}</span></div>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          alt={`${pokemon.name}`}
        />
      <div className="card-name"><span>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span></div>
    </div>
  )     
};

export default Card;