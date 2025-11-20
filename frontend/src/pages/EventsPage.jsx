import { useEffect, useState } from "react";
import EventList from "../components/EventList";
import EventForm from "../components/EventForm";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8080/events");
      if (!res.ok) throw new Error(res.statusText || "Failed to fetch");
      const data = await res.json();
      // normalize response shape
      const list = Array.isArray(data) ? data : (data && Array.isArray(data.events) ? data.events : []);
      setEvents(list);
    } catch (err) {
      setError(err.message);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Events</h1>
      <EventForm onAdd={fetchEvents} />
      <EventList events={events} loading={loading} error={error} />
    </div>
  );
}