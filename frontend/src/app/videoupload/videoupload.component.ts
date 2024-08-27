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
  loading = false;

  constructor(
    private authService: AuthService,
    private videoApiService: VideoApiService,
    private router: Router
  ) {
    this.videoData = {
      video_file: null,
      title: '',
      apply_ascii_filter: false,
      description: '',
      likes: 0,
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
      this.loading = true;
      const formData = new FormData();
      formData.append('video_file', this.videoData.video_file);
      formData.append('title', this.videoData.title);
      formData.append('apply_ascii_filter', this.videoData.apply_ascii_filter.toString());
      formData.append('description', this.videoData.description);
      formData.append('likes', this.videoData.likes.toString());
      formData.append('uploader', this.videoData.uploader);

      this.videoApiService.postVideo(formData).subscribe(
        data => {
          this.loading = false;
          alert(`Video uploaded successfully`);
          this.videoApiService.notifyVideosUpdate();
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
