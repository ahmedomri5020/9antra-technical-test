import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation
import { CourseService } from '../services/course.service';
import { Course } from '../entity/course';
import { Image } from '../entity/Image';

@Component({
  selector: 'app-course-add',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit {
  course: Course = {
    idCourse: 0,
    nomCourse: '',
    detailsCourse: '',
    prixCourse: 0,
    image: {} as Image, // Initialize empty image object
    imageStr: '', // Optional, if you need to store base64 string
  };
  selectedFile: File | null = null;

  constructor(
    private courseService: CourseService,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {}

  // Handle file selection
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.course.imageStr = file.name; // Optionally store image name, or set the base64 here
    }
  }

  // Handle form submission
  onSubmit(): void {
    // Check if a file is selected
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      // Upload the image first
      this.courseService.uploadImage(formData).subscribe({
        next: (image: Image) => {
          // After uploading, assign the image to the course
          this.course.image = image;
          this.addCourse(); // Now add the course
        },
        error: (err) => console.error('Error uploading image:', err),
      });
    } else {
      this.addCourse(); // If no image, just create the course
    }
  }

  // Add the course after image upload
  addCourse(): void {
    this.courseService.createCourse(this.course).subscribe({
      next: (data) => {
        console.log('Course added successfully!', data);
        // Redirect to the /courses page after adding the course
        this.router.navigate(['/courses']);
      },
      error: (err) => console.error('Error adding course:', err),
    });
  }
}
