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
        this.authService.postRegistration(this.userDetails).subscribe(response => {
            this.authService.setAuth(response);
            this.router.navigate(['/']);
        })
    }
}
