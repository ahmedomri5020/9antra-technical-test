package com.ahmed.courses.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ahmed.courses.entities.Course;
import com.ahmed.courses.repos.CourseRepository;

@Service
public class CourseServiceImpl implements CourseService {

	@Autowired
	CourseRepository courseRepository;
	
	@Override
	public Course saveCourse(Course p) {
		return courseRepository.save(p);
		
	}

	@Override
	public Course updateCourse(Course p) {
		return courseRepository.save(p);
		
	}

	@Override
	public void deleteCourse(Course p) {
		courseRepository.delete(p);

	}

   @Override
	public void deleteCourseById(Long id) {
		courseRepository.deleteById(id);
		
	}

	@Override
	public Course getCourse(Long id) {
		return  courseRepository.findById(id).get();
	
	}

	@Override
	public List<Course> getAllCourses() {
		return courseRepository.findAll();
	}
	
    @Override
	public List<Course> findByNomCourse(String nom) {
		return courseRepository.findByNomCourse(nom);
	}

	@Override
	public List<Course> findByNomCourseContains(String nom) {
		return courseRepository.findByNomCourseContains(nom);
	}
}
