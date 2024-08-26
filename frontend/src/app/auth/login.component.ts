import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserLogin } from '../types/auth';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./authstyles.scss']
})
export class LoginComponent {
    loginDetails: UserLogin = {
        username: '',
        password: '',
    };

    constructor(private authService: AuthService, private router: Router) { }
    onSubmit() {
        this.authService.postLogin(this.loginDetails).subscribe(
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
