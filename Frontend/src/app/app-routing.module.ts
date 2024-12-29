import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { LoginComponent } from './login/login.component'; // Import LoginComponent

const routes: Routes = [
  { path: '', component: LoginComponent }, // Set LoginComponent as the default route
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/update/:id', component: UpdateCourseComponent },
  { path: 'courses/add', component: AddCourseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
