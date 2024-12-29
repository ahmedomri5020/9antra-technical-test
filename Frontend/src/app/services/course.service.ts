import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../entity/course';
import { Image } from '../entity/Image';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/all`);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/find/${id}`);
  }

  // Upload Image using FormData
  uploadImage(formData: FormData): Observable<Image> {
    const url = `${this.baseUrl}/image/upload`;
    return this.http.post<Image>(url, formData); // Send FormData directly
  }

  loadImage(id: number): Observable<Image> {
    const url = `${this.baseUrl + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.baseUrl}/add`, course);
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}/update`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove/${id}`);
  }
}

