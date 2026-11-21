package com.documentai.dto;

import com.documentai.entity.Document;
import java.time.LocalDateTime;

public record DocumentResponse(
        Long id,
        String originalFilename,
        String contentType,
        Long fileSize,
        LocalDateTime uploadedAt
) {
    public static DocumentResponse from(Document document) {
        return new DocumentResponse(
                document.getId(),
                document.getOriginalFilename(),
                document.getContentType(),
                document.getFileSize(),
                document.getUploadedAt()
        );
    }
}
