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
  videoData: VideoDataUpload;

  constructor(
    private authService: AuthService,
    private videoApiService: VideoApiService,
    private router: Router
  ) {
    this.videoData = {
      title: '',
      description: '',
      likes: 0,
      video_file: null,
      uploader: this.authService.user?.username || '',
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.videoData.video_file = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.videoData.video_file) {
      const formData = new FormData();
      formData.append('video_file', this.videoData.video_file);
      formData.append('title', this.videoData.title);
      formData.append('description', this.videoData.description);
      formData.append('likes', this.videoData.likes.toString());
      formData.append('uploader', this.videoData.uploader);

      this.videoApiService.postVideo(formData).subscribe(
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
