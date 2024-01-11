import './index.css'

const Card = ({ pokemon }) => {
    return (
      <div className="card | d-flex flex-column justify-content-between align-items-center">
        <div className="card__id | w-100 d-flex justify-content-end p-2">#{pokemon.id.toString().padStart(3, '0')}</div>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            alt={`${pokemon.name}`}
            className="card__img"
          />
        <div className="card__name | w-100 d-flex justify-content-center align-items-center px-4 pt-3 pb-2">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</div>
      </div>
    )     
  };
  
  export default Card;