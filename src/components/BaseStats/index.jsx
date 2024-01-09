import './index.css'
import ProgressBar from './ProgressBar'

const StatComponent = ({statName, statValue, pokemonColor}) => {
    return (
        <div className="stat | w-100 d-flex justify-content-center align-items-center gap-2">
            <span className="stat__name">{statName}</span>
            <div className='content-divider'></div>
            <span className="stat__value">{statValue.toString().padStart(3, '0')}</span>
            <ProgressBar 
                bgColor={pokemonColor.slice(0, -2) + "0.2)"}
                fillColor={pokemonColor}
                value={statValue} 
            />
        </div>
    )
}

const BaseStats = ({ pokemon, pokemonColor }) => {
    const statsContent = [
        { title: "HP", field: "hp" },
        { title: "ATK", field: "attack" },
        { title: "DEF", field: "defense" },
        { title: "SATK", field: "specialAttack" },
        { title: "SDEF", field: "specialDefense" },
        { title: "SPD", field: "speed" },
    ];

    const statElements = statsContent.map((stat, i) => {
        return <StatComponent 
                    key={i}
                    statName={stat.title}
                    statValue={pokemon.stats ? pokemon.stats[i].base_stat : 0}
                    pokemonColor={pokemonColor}
                />
    })

    return (
        <section className="w-100 d-flex flex-column gap-3">
            <h2 style={{ color: `${pokemonColor}` }}>Base Stats</h2>
            <div className="d-flex flex-column gap-2">
                {statElements}
            </div> 
        </section>
    )
}

export default BaseStats;