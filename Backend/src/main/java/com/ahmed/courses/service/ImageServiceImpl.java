package com.ahmed.courses.service;

import com.ahmed.courses.entities.Image;
import com.ahmed.courses.repos.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    private ImageRepository imageRepository;

    // Upload image method
    @Override
    public Image uploadImage(MultipartFile file) throws IOException {
        // Create an Image object and save it in the database
        Image image = Image.builder()
                .name(file.getOriginalFilename())  // Use the original file name
                .type(file.getContentType())       // Set the file type (e.g., image/jpeg)
                .image(file.getBytes())            // Convert the file content to a byte array
                .build();

        return imageRepository.save(image);  // Save the image entity to the database
    }

    // Get image details by ID
    @Override
    public Image getImageDetails(Long id) throws IOException {
        // Fetch the image from the database using its ID
        Optional<Image> dbImage = imageRepository.findById(id);
        if (dbImage.isPresent()) {
            return dbImage.get();  // Return the image if it exists
        } else {
            throw new IOException("Image not found with id: " + id);  // Throw an error if not found
        }
    }

    // Retrieve image as byte array (for displaying purposes)
    @Override
    public ResponseEntity<byte[]> getImage(Long id) throws IOException {
        Optional<Image> dbImage = imageRepository.findById(id);
        if (dbImage.isPresent()) {
            Image image = dbImage.get();
            return ResponseEntity
                    .ok()
                    .contentType(MediaType.valueOf(image.getType())) // Set the content type based on image type
                    .body(image.getImage());  // Return the image bytes
        } else {
            throw new IOException("Image not found with id: " + id);  // Handle case where image is not found
        }
    }

    // Delete image by ID
    @Override
    public void deleteImage(Long id) {
        imageRepository.deleteById(id);  // Delete the image from the database
    }
}
