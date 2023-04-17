import pokeball from '../assets/images/pokeball.svg'

const Header = () => {
    <div className="header-container">
        <img
            src={pokeball}
            alt="Pokeball Icon"
        />
        <span>Pokédex</span>
    </div>
}

export default Header