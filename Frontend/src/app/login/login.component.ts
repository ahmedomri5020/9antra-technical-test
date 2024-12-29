import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    // Check if the username and password are both "admin"
    if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['/courses']); // Redirect to the courses list page after successful login
    } else {
      alert('Invalid username or password!');
    }
  }
}
