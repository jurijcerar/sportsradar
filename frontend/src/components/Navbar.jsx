export default function Navbar() {
    return (
        <nav style={styles.nav}>
            <h2>Sports Calendar</h2>

            <ul style={styles.links}>
                <li><a href="#">Home</a></li>
                <li><a href="#">Events</a></li>
                <li><a href="#">Teams</a></li>
                <li><a href="#">About</a></li>
            </ul>
        </nav>
    );
}

const styles = {
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
    }
};
