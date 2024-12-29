import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/course.service';
import { Course } from '../entity/course';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css'],
})
export class LandingPageComponent implements OnInit {
  courses: any[] = []; // Array to hold courses
  filteredCourses: Course[] = []; // Filtered list of courses

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses(); // Load courses when the component initializes
  }
  getImageUrl(imageId: number): string {
    const url = `http://localhost:8080/api/image/get/${imageId}`;
    console.log('Generated Image URL:', url); // Debugging line
    return url;
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        // Map API response to Course model if necessary
        this.courses = data.map((course) => ({
          idCourse: course.idCourse,
          nomCourse: course.nomCourse,
          detailsCourse: course.detailsCourse,
          prixCourse: course.prixCourse,
          image: course.image,
          imageStr: '', // Include image information
        }));
        this.filteredCourses = this.courses; // Initially, all courses are shown
      },
      error: (err) => console.error('Error fetching courses:', err),
    });
  }
}
