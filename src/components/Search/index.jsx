import './index.css'
import { useState } from "react"
import searchIcon from "../../assets/images/search.svg"
import closeIcon from "../../assets/images/close.svg"
import sortIcon from "../../assets/images/sort.svg"
import nameIcon from "../../assets/images/name.svg"
import numberIcon from "../../assets/images/number.svg"


const DropDown = ({sortBy, onSortByChange, toggle, onToggleChange, onIconChange}) => {
    const handleChange = (e) => {
        onSortByChange(e.target.value);
        sortBy === "id" ? onIconChange(numberIcon) : onIconChange(nameIcon)
        onToggleChange(!toggle);
    }

    return (
        <div className="sort-container">
            <div className="input-container">
                <input 
                    type="radio" 
                    name="id" 
                    value="id" 
                    id="id"
                    className="radio-button" 
                    checked={sortBy === "id"}
                    onChange={handleChange}
                />
                <label htmlFor="id">Number</label>
            </div>
            <div className="input-container">
                <input 
                    type="radio"
                    name="name" 
                    value="name" 
                    id="name" 
                    className="radio-button" 
                    checked={sortBy === "name"}
                    onChange={handleChange}
                />
                <label htmlFor="name">Name</label>
            </div>
        </div>
    )
}

const Search = ({query, onQueryChange, sortBy, onSortByChange}) => {
    const [toggle, setToggle] = useState(false);
    const [icon, setIcon] = useState(sortIcon)

    const handleQueryChange = (e) => {
        const { value } = e.target;
        onQueryChange(value);
    }

    const clearInput = () => {
        onQueryChange('');
    }

    const toggleDropdown = () => {
        setToggle(!toggle);
    }

    return (
        <div className="search-filter-container">
            {toggle && <DropDown
                sortBy={sortBy}
                onSortByChange={mySort => onSortByChange(mySort)} 
                toggle={toggle}
                onToggleChange={setToggle}
                onIconChange={setIcon}
            />}
            <div className="search-container">
                <img
                    src={searchIcon}
                    alt="Search Icon"
                />
                <input 
                    type="text" 
                    name="search" 
                    className="search-input" 
                    value={query}
                    onChange={handleQueryChange}
                    placeholder="Search"
                />
                <div className="close-container">
                    {query.length > 0 && <img
                        src={closeIcon}
                        alt="Close Icon"
                        onClick={clearInput}
                    />}
                </div>
            </div>
            <div className="sort-button" onClick={toggleDropdown}>
                <img
                    src={icon}
                    alt="Sort Icon"
                />
            </div>
        </div>
    )
}

export default Search;