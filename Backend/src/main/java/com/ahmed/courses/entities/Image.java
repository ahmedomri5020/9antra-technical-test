package com.ahmed.courses.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Builder;

@Entity
@Builder
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idImage;
    private String name;
    private String type;

    @Column(name = "IMAGE", length = 4048576)
    @Lob
    private byte[] image;

    @OneToOne(mappedBy = "image")
    @JsonIgnore  // Add this annotation
    private Course course;

    public Image() {
        // No-argument constructor required by JPA
    }

    public Image(Long idImage, String name, String type, byte[] image, Course course) {
        this.idImage = idImage;
        this.name = name;
        this.type = type;
        this.image = image;
        this.course = course;
    }

    // Getters and Setters
    public Long getIdImage() {
        return idImage;
    }

    public void setIdImage(Long idImage) {
        this.idImage = idImage;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
}
