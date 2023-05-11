import "./index.css"
import { Link } from 'react-router-dom';
import pokeball from '../../assets/images/pokeball.svg'
import backIcon from '../../assets/images/arrow_back.svg'

const PokeHeader = ({ pokemon }) => {
    return (
        <div className='pokeinfo-header'>
            <Link to="..">
                <img
                    src={backIcon}
                    alt="Back Icon"
                    className='back-icon'
                />
            </Link>
            <span><h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1></span>
            <h3>#{pokemon.id.toString().padStart(3, '0')}</h3>
            <img
                    src={pokeball}
                    alt="Pokeball Image"
                    className='pokeball-image'
            />
        </div>
    )
}

export default PokeHeader