import { Link } from 'react-router-dom';
import backIcon from '../assets/images/arrow_back.svg'

const PokeHeader = ({ pokemon }) => {
    return (
        <div className='pokeinfo-header'>
            <Link to="..">
                <img
                    src={backIcon}
                    alt="Back Icon"
                />
            </Link>
            <span><h1>{pokemon.name?.charAt(0).toUpperCase() + pokemon.name?.slice(1)}</h1></span>
            <h3>#{pokemon.id?.toString().padStart(3, '0')}</h3>
        </div>
    )
}

export default PokeHeader