
import { useEffect, useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";
import { getNotes, createNote, deleteNote } from "./services/api";
import "./App.css";

function App() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Load notes when the page opens
    useEffect(() => {
        const loadNotes = async () => {
            try {
                const data = await getNotes();
                setNotes(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadNotes();
    }, []);

    // Add a new note
    const handleAddNote = async (note) => {
        try {
            setError("");
            const newNote = await createNote(note);
            setNotes((previousNotes) => [newNote, ...previousNotes]);
        } catch (err) {
            setError(err.message);
        }
    };

    // Delete a note
    const handleDeleteNote = async (id) => {
        try {
            setError("");
            await deleteNote(id);
            setNotes((previousNotes) =>
                previousNotes.filter((note) => note.id !== id)
            );
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1>Notes Board</h1>
                <p>Capture your thoughts. Keep them organized.</p>
            </header>

            <main className="container">
                <NoteForm onAddNote={handleAddNote} />

                {error && <p className="error-message">{error}</p>}

                <section className="notes-section">
                    <h2>Your Notes</h2>

                    {loading ? (
                        <p>Loading notes...</p>
                    ) : notes.length === 0 ? (
                        <p className="empty-message">
                            No notes yet. Create your first note!
                        </p>
                    ) : (
                        <div className="notes-grid">
                            {notes.map((note) => (
                                <NoteCard
                                    key={note.id}
                                    note={note}
                                    onDelete={handleDeleteNote}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default App;
