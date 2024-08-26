import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    username: string = '';
    password: string = '';

    constructor() { }

    onSubmit() {
        // Placeholder for login logic
        console.log('Username:', this.username);
        console.log('Password:', this.password);
    }
}
