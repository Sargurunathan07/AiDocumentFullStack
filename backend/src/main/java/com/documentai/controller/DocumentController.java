package com.documentai.controller;

import com.documentai.dto.DocumentResponse;
import com.documentai.entity.Document;
import com.documentai.service.DocumentService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "http://localhost:5173")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @PostMapping("/upload")
    public ResponseEntity<DocumentResponse> uploadDocument(
            @RequestParam("file") MultipartFile file) {

        Document document = documentService.uploadDocument(file);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(DocumentResponse.from(document));
    }

    @GetMapping
    public ResponseEntity<List<DocumentResponse>> getAllDocuments() {

        List<DocumentResponse> documents = documentService
                .getAllDocuments()
                .stream()
                .map(DocumentResponse::from)
                .toList();

        return ResponseEntity.ok(documents);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable Long id) {

        documentService.deleteDocument(id);

        return ResponseEntity.noContent().build();
    }
}
