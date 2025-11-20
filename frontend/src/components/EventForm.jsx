
import { useState, useEffect } from "react";

export default function EventForm({ onAdd }) {
    const [form, setForm] = useState({
        date: "",
        time: "",
        sport_id: "",
        venue_id: "",
        team1_id: "",
        team2_id: "",
        description: ""
    }); //base form values

    //state for options
    const [sports, setSports] = useState([]);
    const [venues, setVenues] = useState([]);
    const [teams, setTeams] = useState([]);
    const [loadingOptions, setLoadingOptions] = useState(true);
    const [optionsError, setOptionsError] = useState(null);

    useEffect(() => {
        const fetchOptions = async () => {
            setLoadingOptions(true);
            setOptionsError(null);
            try {
                const [sRes, vRes, tRes] = await Promise.all([
                    fetch("http://localhost:8080/sports"),
                    fetch("http://localhost:8080/venues"),
                    fetch("http://localhost:8080/teams"),
                ]);

                if (!sRes.ok || !vRes.ok || !tRes.ok) {
                    throw new Error("Failed to load options");
                }

                const s = await sRes.json();
                const v = await vRes.json();
                const t = await tRes.json();

                //support both direct array and wrapped response (had some issues)
                setSports(Array.isArray(s) ? s : (s && Array.isArray(s.sports) ? s.sports : [])); 
                setVenues(Array.isArray(v) ? v : (v && Array.isArray(v.venues) ? v.venues : []));
                setTeams(Array.isArray(t) ? t : (t && Array.isArray(t.teams) ? t.teams : []));

                console.log("Fetched options:", { sports: s, venues: v, teams: t });
            } catch (err) {
                setOptionsError(err.message);
            } finally {
                setLoadingOptions(false);
            }
        };

        fetchOptions();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            date: form.date,
            time: form.time,
            sport_id: Number(form.sport_id),
            venue_id: Number(form.venue_id),
            team1_id: Number(form.team1_id),
            team2_id: Number(form.team2_id),
            description: form.description
        };

        try {
            const res = await fetch("http://localhost:8080/events", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload)
            });

            const body = await res.json().catch(() => ({}));

            if (res.ok) {
                // reset form
                setForm({
                    date: "",
                    time: "",
                    sport_id: "",
                    venue_id: "",
                    team1_id: "",
                    team2_id: "",
                    description: ""
                });
                if (typeof onAdd === "function") onAdd();
                return;
            }

            const msg = body.error || body.message || JSON.stringify(body);
            alert(`Failed to add event: ${res.status} ${msg}`);
        } catch (err) {
            alert(`Request failed: ${err.message}`);
        }
    };

    const selectedSport = sports.find(s => s.id === Number(form.sport_id));
    const filteredTeams =
    selectedSport
        ? teams.filter(t => t.sport === selectedSport.name)
        : [];


    return (
        <div style={styles.container}>
            <h2>Add New Event</h2>

            {loadingOptions ? (
                <p>Loading options...</p>
            ) : optionsError ? (
                <p style={{ color: "red" }}>Options error: {optionsError}</p>
            ) : (
                <form style={styles.form} onSubmit={handleSubmit}>
                    <input name="date" type="date" value={form.date} onChange={handleChange} required />
                    <input name="time" type="time" value={form.time} onChange={handleChange} required />

                    <label>
                        Sport
                        <select name="sport_id" value={form.sport_id} onChange={handleChange} required>
                            <option value="">Select a sport</option>
                            {sports.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </label>

                    <label>
                        Venue
                        <select name="venue_id" value={form.venue_id} onChange={handleChange} required>
                            <option value="">Select a venue</option>
                            {venues.map(v => <option key={v.id} value={v.id}>{v.name}{v.location ? ` — ${v.location}` : ""}</option>)}
                        </select>
                    </label>

                    <label>
                        Team 1
                        <select name="team1_id" value={form.team1_id} onChange={handleChange} required>
                            <option value="">Select team 1</option>
                            {filteredTeams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                    </label>

                    <label>
                        Team 2
                        <select name="team2_id" value={form.team2_id} onChange={handleChange} required>
                            <option value="">Select team 2</option>
                            {filteredTeams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                    </label>

                    <input name="description" type="text" placeholder="Description" value={form.description} onChange={handleChange} />

                    <button type="submit">Add Event</button>
                </form>
            )}
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
        maxWidth: "480px"
    }
};