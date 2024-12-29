package com.ahmed.courses.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ahmed.courses.entities.Image;
public interface ImageRepository extends JpaRepository<Image , Long> {
}
