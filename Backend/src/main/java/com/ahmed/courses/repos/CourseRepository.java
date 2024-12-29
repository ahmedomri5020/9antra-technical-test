package com.ahmed.courses.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ahmed.courses.entities.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
	List<Course> findByNomCourse(String nom);
	List<Course> findByNomCourseContains(String nom);

	              




}
