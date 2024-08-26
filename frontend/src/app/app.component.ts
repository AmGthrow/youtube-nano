import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(public authService: AuthService) { }

  logOut() {
    this.authService.postLogout().subscribe(
      data => {
        alert("Logged out successfully");
        this.authService.logout();
      },
      error => {
        alert(JSON.stringify(error.error));
        console.error(error);
      }
    );
  }
};
