
function NoteCard({ note, onDelete }) {

    const formattedDate = new Date(note.createdAt)
        .toLocaleString();

    return (
        <div className="note-card">

            <div className="note-card-header">
                <h3>{note.title}</h3>

                <button
                    className="delete-btn"
                    onClick={() => onDelete(note.id)}
                >
                    Delete
                </button>
            </div>

            <p>{note.body || "No description provided."}</p>

            <small>
                Created: {formattedDate}
            </small>

        </div>
    );
}

export default NoteCard;
