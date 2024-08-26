import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './signup.component.html',
    styleUrls: ['./authstyles.scss']
})
export class SignupComponent {
    username = '';
    password = '';

    onSubmit() {
        // Placeholder for signup logic
        console.log('Username:', this.username);
        console.log('Password:', this.password);
    }
}
