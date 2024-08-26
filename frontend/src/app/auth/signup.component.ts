import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserCreate } from '../types/auth';

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

    constructor(private authService: AuthService) { }
    onSubmit() {
        this.authService.postRegistration(this.userDetails).subscribe(response =>
            console.log(response)
        )
    }
}
