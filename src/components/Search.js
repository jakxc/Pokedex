const DropDown = ({sortBy, onSortByChange}) => {
    return (
        <div>
            <div>
                <input 
                    type="radio" 
                    name="id" 
                    value="id" 
                    id="id" 
                    checked={sortBy === "id"}
                    onChange={(e) => onSortByChange(e.target.value)}
                />
                <label htmlFor="id">Number</label>
            </div>
            <div>
                <input 
                    type="radio"
                    name="name" 
                    value="name" 
                    id="name" 
                    checked={sortBy === "name"}
                    onChange={(e) => onSortByChange(e.target.value)}
                />
                <label htmlFor="name">Name</label>
            </div>
        </div>
    )
}

const Search = ({query, onQueryChange, sortBy, onSortByChange}) => {
    const handleQueryChange = (e) => {
        const { value } = e.target;
        onQueryChange(value);
    }

    return (
        <div>
            <DropDown
                sortBy={sortBy}
                onSortByChange={mySort => onSortByChange(mySort)} 
            />
            <input 
                type="text" 
                name="query" 
                id="query" 
                value={query}
                onChange={handleQueryChange}
                placeholder="Search"
            />
        </div>
    )
}

export default Search;