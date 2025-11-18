import Navbar from "./components/Navbar";
import EventList from "./components/EventList";
import EventForm from "./components/EventForm";

export default function App() {
    return (
        <div>
            <Navbar />
            <EventList />
            <EventForm />
        </div>
    );
}
