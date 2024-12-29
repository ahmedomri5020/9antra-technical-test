import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Course } from '../entity/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  displayedColumns: string[] = [
    'idCourse',
    'nomCourse',
    'detailsCourse',
    'image', // Added image column
    'actions',
  ];

  courses: Course[] = []; // List of courses
  filteredCourses: Course[] = []; // Filtered list of courses
  searchTerm: string = ''; // Store the search term
  selectedCourse: Course | null = null; // To store the course selected for editing
  isEditing = false; // Flag to check if we are editing a course

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses(); // Load courses when the component initializes
  }

  // Load courses from the service
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

  // Search functionality: filter courses based on the search term
  searchCourses(): void {
    if (this.searchTerm) {
      this.filteredCourses = this.courses.filter((course) =>
        course.nomCourse?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCourses = this.courses; // If no search term, show all courses
    }
  }

  // Select a course for editing
  selectCourse(course: Course): void {
    this.selectedCourse = { ...course }; // Create a copy of the selected course
    this.isEditing = true; // Enable editing mode
  }

  // Delete a course
  deleteCourse(id: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(id).subscribe({
        next: () => {
          this.loadCourses(); // Reload the course list after deletion
          alert('Course deleted successfully!');
        },
        error: (err) => console.error('Error deleting course:', err),
      });
    }
  }

  // Method to get the image URL
  getImageUrl(imageId: number): string {
    const url = `http://localhost:8080/api/image/get/${imageId}`;
    console.log('Generated Image URL:', url); // Debugging line
    return url;
  }
  // Reset the form (not needed anymore for listing, but kept for potential future use)
  resetForm(): void {
    this.selectedCourse = null;
    this.isEditing = false;
  }
}
