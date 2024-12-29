import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../entity/course'; // Ensure this model matches the backend's entity
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
  loadImage(id: number): Observable<Image> {
    const url = `${this.baseUrl + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }
}
