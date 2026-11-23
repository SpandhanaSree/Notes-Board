package com.notesboard.service;

import com.notesboard.model.Note;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class NoteService {

    private final List<Note> notes = new ArrayList<>();
    private final AtomicLong idGenerator = new AtomicLong(0);

    // Get all notes
    public List<Note> getAllNotes() {
        return new ArrayList<>(notes);
    }

    // Add a new note
    public Note addNote(String title, String body) {

        Long id = idGenerator.incrementAndGet();

        Note note = new Note(
                id,
                title,
                body,
                LocalDateTime.now()
        );

        notes.add(0, note);

        return note;
    }

    // Delete a note
    public boolean deleteNote(Long id) {
        return notes.removeIf(note -> note.id().equals(id));
    }
}
