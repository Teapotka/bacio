import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router) {}

  login(user: string) {
    // Store the selected user in localStorage
    localStorage.setItem('loggedInUser', user);

    // Navigate to the Kiss page
    this.router.navigate(['/kiss']);
  }
}
