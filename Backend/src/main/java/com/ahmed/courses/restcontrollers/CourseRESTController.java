package com.ahmed.courses.restcontrollers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.ahmed.courses.entities.Course;
import com.ahmed.courses.service.CourseService;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class CourseRESTController {
    @Autowired
    CourseService courseService;

    @GetMapping("/all")  // -> /api/courses/all
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }
    @GetMapping("/test")  // Let's add a simple test endpoint
    public String test() {
        return "Controller is working!";
    }


    @GetMapping("/find/{id}")  // -> /api/courses/find/{id}
    public Course getCourseById(@PathVariable("id") Long id) {
        return courseService.getCourse(id);
    }

    @PostMapping("/add")  // -> /api/courses/add
    public Course createCourse(@RequestBody Course course) {
        return courseService.saveCourse(course);
    }

    @PutMapping("/update")  // -> /api/courses/update
    public Course updateCourse(@RequestBody Course course) {
        return courseService.updateCourse(course);
    }

    @DeleteMapping("/remove/{id}")  // -> /api/courses/remove/{id}
    public void deleteCourse(@PathVariable("id") Long id) {
        courseService.deleteCourseById(id);
    }
}