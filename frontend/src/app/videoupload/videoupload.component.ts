import { Component } from '@angular/core';
import { VideoDataUpload } from '../types/video-data';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-videoupload',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './videoupload.component.html',
  styleUrl: './videoupload.component.scss',
})
export class VideouploadComponent {
  videoData!: VideoDataUpload;

  constructor(private authService: AuthService) {
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
        this.videoData.video_file = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.videoData.video_file) {
      console.log(this.videoData)
    }
  }
}
