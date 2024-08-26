import { Component } from '@angular/core';
import { VideoDataUpload } from '../types/video-data';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { VideoApiService } from '../services/video-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videoupload',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './videoupload.component.html',
  styleUrl: './videoupload.component.scss',
})
export class VideouploadComponent {
  videoData!: VideoDataUpload;

  constructor(
    private authService: AuthService,
    private videoApiService: VideoApiService,
    private router: Router
  ) {
    this.videoData = {
      title: '',
      description: '',
      likes: 0,
      video_file: '',
      uploader: this.authService.user?.username || '',
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        this.videoData.video_file = base64String;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.videoData.video_file) {
      this.videoApiService.postVideo(this.videoData).subscribe(
        data => {
          alert(`Video uploaded successfully`);
          this.router.navigate(['/']);
        },
        error => {
          alert(JSON.stringify(error.error));
          console.error(error);
        }
      );
    }
  };
}
