import "./index.css"
import { Link } from 'react-router-dom';
import pokeball from '../../assets/images/pokeball.svg'
import backIcon from '../../assets/images/arrow_back.svg'

const Hero = ({ pokemon, search }) => {
    return (
        <div className="hero | w-100 d-flex px-4 py-3 justify-content-between">
            <div className="d-flex gap-3">
                <Link 
                    to={`..${search}`}
                    relative="path"
                >
                    <img
                        src={backIcon}
                        alt="Back Icon"
                        className='back-icon'
                    />
                </Link>
                <span className="h3">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span>
            </div>
            <div>#{pokemon.id.toString().padStart(3, '0')}</div>
            <img
                    src={pokeball}
                    alt="Pokeball"
                    className='pokeball-icon'
            />
        </div>
    )
}

export default Hero