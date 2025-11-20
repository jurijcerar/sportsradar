import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav style={styles.nav}>
            <h2 style={{ margin: 0 }}><Link to="/" style={{ color: "white", textDecoration: "none" }}>Sports Calendar</Link></h2>

            <ul style={styles.links}>
                <li><Link to="/" style={linkStyle}>Home</Link></li>
                <li><Link to="/events" style={linkStyle}>Events</Link></li>
                <li><Link to="/teams" style={linkStyle}>Teams</Link></li>
                <li><Link to="/about" style={linkStyle}>About</Link></li>
            </ul>
        </nav>
    );
}

const linkStyle = { color: "white", textDecoration: "none" };

const styles = { //Style was done using copilot
    nav: {
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 20px",
        backgroundColor: "#222",
        color: "white",
        alignItems: "center",
    },
    links: {
        display: "flex",
        gap: "20px",
        listStyle: "none",
        margin: 0,
        padding: 0,
    }
};