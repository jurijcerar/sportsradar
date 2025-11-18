import { useEffect, useState } from "react";

export default function EventList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/events")
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(console.error);
    }, []);

    return (
        <div style={styles.container}>
            <h2>Upcoming Events</h2>

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Sport</th>
                        <th>Teams</th>
                        <th>Venue</th>
                        <th>Description</th>
                    </tr>
                </thead>

                <tbody>
                    {events.map(ev => (
                        <tr key={ev.id}>
                            <td>{ev.date}</td>
                            <td>{ev.time}</td>
                            <td>{ev.sport}</td>
                            <td>{ev.team1} vs {ev.team2}</td>
                            <td>{ev.venue}</td>
                            <td>{ev.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    container: {
        padding: "20px",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "15px",
    },
    th: {
        borderBottom: "2px solid #444",
    }
};
