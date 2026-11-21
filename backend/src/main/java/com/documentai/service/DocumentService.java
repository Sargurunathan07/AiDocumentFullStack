package com.documentai.service;

import com.documentai.entity.Document;
import com.documentai.repository.DocumentRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;

    @Value("${app.file.upload-dir:uploads}")
    private String uploadDir;

    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024;

    private static final Set<String> ALLOWED_EXTENSIONS =
            Set.of(".pdf", ".docx", ".txt");

    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    public Document uploadDocument(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Please select a file"
            );
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "File size must not exceed 10 MB"
            );
        }

        String originalFilename = file.getOriginalFilename();

        if (originalFilename == null || originalFilename.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Invalid filename"
            );
        }

        String safeOriginalName =
                Paths.get(originalFilename.replace("\\", "/"))
                        .getFileName().toString();

        String extension = safeOriginalName.contains(".")
                ? safeOriginalName.substring(
                        safeOriginalName.lastIndexOf(".")
                ).toLowerCase()
                : "";

        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Only PDF, DOCX and TXT files are allowed"
            );
        }

        String storedFilename = UUID.randomUUID() + extension;

        try {
            Path storageLocation =
                    Paths.get(uploadDir).toAbsolutePath().normalize();

            Files.createDirectories(storageLocation);

            Path targetPath = storageLocation
                    .resolve(storedFilename)
                    .normalize();

            if (!targetPath.startsWith(storageLocation)) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "Invalid file path"
                );
            }

            Files.copy(file.getInputStream(), targetPath);

            Document document = Document.builder()
                    .originalFilename(safeOriginalName)
                    .storedFilename(storedFilename)
                    .contentType(file.getContentType())
                    .fileSize(file.getSize())
                    .storagePath(targetPath.toString())
                    .build();

            return documentRepository.save(document);

        } catch (IOException exception) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Could not save the uploaded file"
            );
        }
    }

    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    public void deleteDocument(Long id) {

        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Document not found"
                ));

        try {
            Files.deleteIfExists(Paths.get(document.getStoragePath()));
        } catch (IOException exception) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Could not delete the file"
            );
        }

        documentRepository.delete(document);
    }
}
