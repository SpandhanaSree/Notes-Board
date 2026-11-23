const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8080/api/notes";
export async function getNotes() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch notes");
    }

    return response.json();
}

export async function createNote(note) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to add note");
    }

    return data;
}

export async function deleteNote(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete note");
    }
}