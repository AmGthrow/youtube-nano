import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserCreate } from '../types/auth';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './signup.component.html',
    styleUrls: ['./authstyles.scss']
})
export class SignupComponent {
    userDetails: UserCreate = {
        username: '',
        password1: '',
        password2: '',
    }

    constructor(private authService: AuthService, private router: Router) { }
    onSubmit() {
        this.authService.postRegistration(this.userDetails).subscribe(
            data => {
                alert(`Logged in as ${data.user.username}`);
                this.authService.setAuth(data);
                this.router.navigate(['/']);
            },
            error => {
                alert(JSON.stringify(error.error));
                console.error(error);
            }
        )
    }
}
