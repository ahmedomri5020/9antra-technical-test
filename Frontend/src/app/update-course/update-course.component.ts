import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { Course } from '../entity/course';
import { Image } from '../entity/Image';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css'],
})
export class UpdateCourseComponent implements OnInit {
  courseForm: FormGroup;
  isEditing: boolean = false;
  selectedCourseId: number | null = null;
  selectedFile: File | null = null;
  imagePreviewUrl: string | null = null; // For displaying the image preview

  constructor(
    private courseService: CourseService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Define the form group with form controls and validators
    this.courseForm = this.fb.group({
      idCourse: ['', Validators.required],
      nomCourse: ['', Validators.required],
      prixCourse: ['', [Validators.required, Validators.min(1)]],
      detailsCourse: ['', Validators.required],
      imageStr: [''], // To hold the base64 string of the current image (optional, if used)
    });
  }

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.isEditing = true;
      this.selectedCourseId = +courseId;
      this.loadCourse(courseId); // Load the course details on component initialization
    }
  }

  // Load the course data by ID
  loadCourse(id: string): void {
    this.courseService.getCourseById(+id).subscribe({
      next: (data) => {
        this.courseForm.patchValue({
          idCourse: data.idCourse,
          nomCourse: data.nomCourse,
          prixCourse: data.prixCourse,
          detailsCourse: data.detailsCourse,
          imageStr: data.imageStr, // Use base64 string or URL to display the image (if available)
        });

        // If the image exists, set it for preview
        if (data.imageStr) {
          this.imagePreviewUrl = data.imageStr;
        }
      },
      error: (err) => console.error('Error fetching course:', err),
    });
  }

  // Handle file selection and set the image preview URL
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Set the preview image URL
      this.imagePreviewUrl = URL.createObjectURL(file);
      this.courseForm.patchValue({
        imageStr: this.imagePreviewUrl, // Store the base64 string or URL (optional)
      });
    }
  }

  // Handle form submission
  onSubmit(): void {
    if (this.courseForm.invalid) {
      return;
    }

    const updatedCourse: Course = this.courseForm.value;

    if (this.selectedFile) {
      // Create FormData and append the selected file
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      // Upload the image first
      this.courseService.uploadImage(formData).subscribe({
        next: (image: Image) => {
          updatedCourse.image = image; // Attach the uploaded image to the course
          this.saveCourse(updatedCourse);
        },
        error: (err) => console.error('Error uploading image:', err),
      });
    } else {
      this.saveCourse(updatedCourse); // If no file, proceed to save the course without image
    }
  }

  // Save the course (update or create depending on the editing state)
  saveCourse(course: Course): void {
    if (this.isEditing) {
      this.courseService.updateCourse(course).subscribe({
        next: () => {
          alert('Course updated successfully!');
          this.router.navigate(['/courses']); // Redirect to courses list
        },
        error: (err) => console.error('Error updating course:', err),
      });
    } else {
      this.courseService.createCourse(course).subscribe({
        next: () => {
          alert('Course created successfully!');
          this.router.navigate(['/courses']); // Redirect to courses list
        },
        error: (err) => console.error('Error creating course:', err),
      });
    }
  }

  // Reset the form and navigate to the course list
  resetForm(): void {
    this.courseForm.reset();
    this.router.navigate(['/courses']);
  }
}
