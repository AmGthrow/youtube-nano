import { Component, Input } from '@angular/core';
import { VideoDataDetailed } from '../types/video-data';
import { AuthService } from '../services/auth.service';
import { VideoApiService } from '../services/video-api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-videoplayer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.scss'
})
export class VideoplayerComponent {
  @Input() videoDataDetailed!: VideoDataDetailed | undefined;
  editing = false;

  constructor(public authService: AuthService, private videoApiService: VideoApiService) { }

  deleteVideo() {
    if (this.videoDataDetailed) {
      this.videoApiService.deleteVideo(this.videoDataDetailed.id).subscribe(
        (response) => {
          alert("Video deleted successfully");
          this.videoApiService.notifyVideosUpdate();
        },
        (error) => alert(JSON.stringify(error))
      );
    }
  }

  startEditing() {
    this.editing = true;
  }
  cancelEditing() {
    this.editing = false;
  }
  saveChanges() {
    if (this.videoDataDetailed) {
      this.videoApiService.patchVideo(this.videoDataDetailed.id, this.videoDataDetailed).subscribe(
        (response) => {
          alert("Changes have been saved successfully");
          this.videoApiService.notifyVideosUpdate();
          this.editing = false;
        },
        (error) => {
          alert(JSON.stringify(error.error));
        }
      );
    }
  };



}
