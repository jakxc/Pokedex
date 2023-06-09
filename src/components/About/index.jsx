import './index.css'
import weightIcon from '../../assets/images/weight.svg'
import rulerIcon from '../../assets/images/ruler.svg'

const Attribute = ({ attributeImg, attributeValue, attributeKey }) => {
    const styles = {
        transform: 'rotate(90deg)'
    }
    return (
        <div className='attribute'>
            <div className='attribute-value-container'>
                <img
                    src={attributeImg}
                    alt='Attribute Icon'
                    style={attributeImg === rulerIcon ? styles : null}
                />
                <span className='attribute-value'>{attributeValue}</span>
            </div>
            <span className='attribute-key'>{attributeKey}</span>
        </div>
    )
}

const About = ({ pokemon, flavorText, pokemonColor}) => {
    const moveElements = pokemon.abilities?.slice(0, 2).map((item, i) => {
        return <div className='attribute-value' key={i}>
                {item.ability?.name.charAt(0).toUpperCase() 
                    + item.ability?.name.slice(1)}
                </div>;
    })

    return (
        <section className='about'>
            <h2 style={{ color: `${pokemonColor}` }}>About</h2>
            <div className='attribute-container'>
                <Attribute 
                    attributeImg={weightIcon}
                    attributeValue={`${pokemon.weight} kg`}
                    attributeKey='Weight'
                />
                <div className='content-divider'></div>
                 <Attribute 
                    attributeImg={rulerIcon}
                    attributeValue={`${pokemon.height} m`}
                    attributeKey='Height'
                />
                <div className='content-divider'></div>
                 <div className='attribute'>
                    {moveElements}
                    <span className='attribute-key'>Moves</span>
                </div>
            </div>
            <div className="description">
              {flavorText}
            </div>
        </section>
    )
}

export default About;