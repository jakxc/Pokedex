import "./index.css";
import pokeball from '../../assets/images/pokeball.svg'

const Header = () => {
    return (
        <div className="header | d-flex align-items-center gap-3 px-4 py-3">
            <img
                src={pokeball}
                alt="Pokeball Icon"
            />
            <span>Pokédex</span>
        </div>
    )
}

export default Header