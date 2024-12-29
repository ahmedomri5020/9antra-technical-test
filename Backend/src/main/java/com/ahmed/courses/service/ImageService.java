package com.ahmed.courses.service;

import com.ahmed.courses.entities.Image;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageService {
    // Method to upload an image
    Image uploadImage(MultipartFile file) throws IOException;

    // Method to get image details by id
    Image getImageDetails(Long id) throws IOException;

    ResponseEntity<byte[]> getImage(Long id) throws IOException;

    // Method to delete an image by id
    void deleteImage(Long id);
}
