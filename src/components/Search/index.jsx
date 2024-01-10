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
        <div className="dropdown | d-flex flex-column justify-content-center px-3 py-2 gap-3">
            <div className="d-flex gap-2 align-items-center">
                <input 
                    type="radio" 
                    name="id" 
                    value="id" 
                    id="id"
                    className="radio-btn" 
                    checked={sortBy === "id"}
                    onChange={handleChange}
                />
                <label htmlFor="id">Number</label>
            </div>
            <div className="d-flex gap-2 align-items-center">
                <input 
                    type="radio"
                    name="name" 
                    value="name" 
                    id="name" 
                    className="radio-btn" 
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
        <div className="search-filter | d-flex gap-4">
            {toggle && <DropDown
                sortBy={sortBy}
                onSortByChange={mySort => onSortByChange(mySort)} 
                toggle={toggle}
                onToggleChange={setToggle}
                onIconChange={setIcon}
            />}
            <div className="search | w-100 d-flex align-items-center gap-2 p-3">
                <img
                    src={searchIcon}
                    alt="Search Icon"
                />
                <input 
                    type="text" 
                    name="search" 
                    className="search-input | w-100 px-2" 
                    value={query}
                    onChange={handleQueryChange}
                    placeholder="Search"
                />
                <div className="close-btn | d-flex px-2">
                    {query.length > 0 && <img
                        src={closeIcon}
                        alt="Close Icon"
                        onClick={clearInput}
                    />}
                </div>
            </div>
            <div className="sort-btn | d-flex justify-content-center align-items-center p-2" onClick={toggleDropdown}>
                <img
                    src={icon}
                    alt="Sort"
                />
            </div>
        </div>
    )
}

export default Search;