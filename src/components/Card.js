const Card = ({ pokemon, loading }) => {
    return (
        <>
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            pokemon.map((item) => {
              if (item.name) {
                return (
                  <>
                    <div
                      className="card" key={item.id}>
                      <span className="card-name">#{item.id}</span>
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`}
                        height={108}
                        width={104}
                        alt={`${item.name}`}
                      />
                      <span className="card-name">{item.name}</span>
                    </div>
                  </>
                );
              }
            })
          )}
        </>
      );
    };

export default Card;