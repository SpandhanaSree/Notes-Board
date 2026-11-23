
import { useState } from "react";

function NoteForm({ onAddNote }) {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            return;
        }

        onAddNote({ title, body });

        setTitle("");
        setBody("");
    };

    return (
        <form className="note-form" onSubmit={handleSubmit}>

            <input
                type="text"
                placeholder="Note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Write your note here..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows="4"
            />

            <button type="submit">
                + Add Note
            </button>

        </form>
    );
}

export default NoteForm;
