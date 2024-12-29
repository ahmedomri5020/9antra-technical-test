package com.ahmed.courses.restcontrollers;

import com.ahmed.courses.entities.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.ahmed.courses.service.ImageService;

import java.io.IOException;

@RestController
@RequestMapping("/api/image")
public class ImageRESTController {
    @Autowired
    private ImageService imageService;

    @PostMapping("/upload")
    public ResponseEntity<Image> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            // Call service to upload the image
            Image image = imageService.uploadImage(file);
            return ResponseEntity.ok(image); // Return the uploaded image details
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Error handling
        }
    }
    @GetMapping("/get/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        try {
            // Get image details from the service
            Image image = imageService.getImageDetails(id);

            byte[] imageBytes = image.getImage();  // Extract the image bytes
            String imageType = image.getType();    // Extract the image type (MIME type)

            // Return the image bytes along with the correct content type
            return ResponseEntity.ok()
                    .contentType(MediaType.valueOf(imageType))  // Set content type (image type)
                    .body(imageBytes);  // Return the image bytes in the response body
        } catch (IOException e) {
            return ResponseEntity.status(500).body(null);  // Handle error if image is not found
        }
    }
}
