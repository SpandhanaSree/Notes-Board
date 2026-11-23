package com.notesboard.model;

import java.time.LocalDateTime;

public record Note(
        Long id,
        String title,
        String body,
        LocalDateTime createdAt
) {
}
