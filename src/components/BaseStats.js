import ProgressBar from "./ProgressBar"

const StatComponent = ({statName, statValue}) => {
    return (
        <div className="stat">
            <span className="stat-name"><h4>{statName}</h4></span>
            <div className='content-divider'></div>
            <span className="stat-value">{statValue.toString().padStart(3, '0')}</span>
            <ProgressBar 
                bgColor='rgba(116, 203, 72, 0.2)' 
                fillColor='rgba(116, 203, 72, 1)'
                value={statValue} 
            />
        </div>
    )
}

const BaseStats = ({ pokemon }) => {
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
                statName={stat.title}
                statValue={pokemon.stats ? pokemon.stats[i].base_stat : 1}/>
    })

    return (
        <section className="base-stats">
            <h2>Base Stats</h2>
            <div className="stats-container">
                {statElements}
            </div> 
        </section>
    )
}

export default BaseStats;