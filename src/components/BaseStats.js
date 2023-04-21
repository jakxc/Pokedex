import ProgressBar from "./ProgressBar"

const StatComponent = ({statName, statValue, pokemonColor}) => {
    return (
        <div className="stat">
            <span className="stat-name"><h4>{statName}</h4></span>
            <div className='content-divider'></div>
            <span className="stat-value">{statValue.toString().padStart(3, '0')}</span>
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
                    statValue={pokemon.stats ? pokemon.stats[i].base_stat : 1}
                    pokemonColor={pokemonColor}
                />
    })

    return (
        <section className="base-stats">
            <h2 style={{ color: `${pokemonColor}` }}>Base Stats</h2>
            <div className="stats-container">
                {statElements}
            </div> 
        </section>
    )
}

export default BaseStats;