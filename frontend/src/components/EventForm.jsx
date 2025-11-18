import { useState } from "react";

export default function EventForm() {
    const [form, setForm] = useState({
        date: "",
        time: "",
        sport_id: "",
        venue_id: "",
        team1_id: "",
        team2_id: "",
        description: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:8080/events", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(form)
        });

        if (res.ok) {
            alert("Event added!");
            window.location.reload();
        }
    };

    return (
        <div style={styles.container}>
            <h2>Add New Event</h2>

            <form style={styles.form} onSubmit={handleSubmit}>
                <input name="date" type="date" onChange={handleChange} required />
                <input name="time" type="time" onChange={handleChange} required />
                <input name="sport_id" type="number" placeholder="Sport ID" required onChange={handleChange} />
                <input name="venue_id" type="number" placeholder="Venue ID" required onChange={handleChange} />
                <input name="team1_id" type="number" placeholder="Team 1 ID" required onChange={handleChange} />
                <input name="team2_id" type="number" placeholder="Team 2 ID" required onChange={handleChange} />
                <input name="description" type="text" placeholder="Description" onChange={handleChange} />

                <button type="submit">Add Event</button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        padding: "20px",
        marginTop: "30px"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "400px"
    }
};
