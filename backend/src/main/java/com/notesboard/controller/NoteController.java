package com.notesboard.controller;

import com.notesboard.model.Note;
import com.notesboard.model.NoteRequest;
import com.notesboard.service.NoteService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://notes-board-39asim785-spandhana-work-space.vercel.app"
})
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    // GET all notes
    @GetMapping
    public List<Note> getAllNotes() {
        return noteService.getAllNotes();
    }

    // POST a new note
    @PostMapping
    public ResponseEntity<?> addNote(@RequestBody NoteRequest request) {

        if (request.title() == null || request.title().isBlank()) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error", "Title is required"));
        }

        Note note = noteService.addNote(
                request.title().trim(),
                request.body() == null ? "" : request.body()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(note);
    }

    // DELETE a note
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable Long id) {

        boolean deleted = noteService.deleteNote(id);

        if (!deleted) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Note not found"));
        }

        return ResponseEntity.noContent().build();
    }
}
