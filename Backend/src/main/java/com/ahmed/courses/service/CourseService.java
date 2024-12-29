package com.ahmed.courses.service;

import java.util.List;

import com.ahmed.courses.entities.Course;

public interface CourseService {
	
	 Course saveCourse(Course p);
	 Course updateCourse(Course p);
	 void deleteCourse(Course p);
     void deleteCourseById(Long id);
	 Course getCourse(Long id);
	 List<Course> getAllCourses();
	 
	 List<Course> findByNomCourse(String nom);
	 List<Course> findByNomCourseContains(String nom);


}
