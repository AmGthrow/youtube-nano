import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./authstyles.scss']
})
export class LoginComponent {
    username = '';
    password = '';

    onSubmit() {
        // Placeholder for login logic
        console.log('Username:', this.username);
        console.log('Password:', this.password);
    }
}
