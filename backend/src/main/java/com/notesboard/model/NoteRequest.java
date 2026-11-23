package com.notesboard.model;

public record NoteRequest(
        String title,
        String body
) {
}
