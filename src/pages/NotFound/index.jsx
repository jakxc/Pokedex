import './index.css'
import { Link } from "react-router-dom"

const NotFound = () => {
    const styles = {
        textDecoration: 'none',
        color: '#000000'
    }
    return (
        <div className="not-found-container">
            <h1>Sorry, the page you were looking for was not found.</h1>
            <Link to="/" style={styles} className="link-button">Return to Pokedex</Link>
        </div>
    )
}

export default NotFound;