import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { VideoApiService } from '../services/video-api.service';
import { VideoData, VideoDataDetailed } from '../types/video-data';
import { VideoplayerComponent } from '../videoplayer/videoplayer.component';
import { VideosuggestionsComponent } from '../videosuggestions/videosuggestions.component';

@Component({
    selector: 'videos',
    standalone: true,
    imports: [VideoplayerComponent, VideosuggestionsComponent],
    templateUrl: './videos.component.html',
    styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit, OnDestroy {
    suggestedVideoList: VideoData[] | undefined;
    mainVideo: VideoDataDetailed | undefined;
    private videosUpdateSub: Subscription | undefined;

    constructor(private videoApiService: VideoApiService) { }

    ngOnInit() {
        this.fetchVideos();

        // Subscribe to video updates
        this.videosUpdateSub = this.videoApiService.getVideosUpdatedListener()
            .subscribe(() => {
                this.fetchVideos();
            });
    }

    ngOnDestroy() {
        // Clean up subscription
        if (this.videosUpdateSub) {
            this.videosUpdateSub.unsubscribe();
        }
    }

    fetchVideos() {
        this.videoApiService.getVideos().subscribe(
            videos => {
                this.suggestedVideoList = videos;
                if (this.suggestedVideoList.length > 0) {
                    this.videoApiService.getVideo(this.suggestedVideoList[0].id).subscribe(
                        video => {
                            this.mainVideo = video;
                        },
                        error => {
                            console.error('Error fetching main video:', error);
                        }
                    );
                }
            },
            error => {
                console.error('Error fetching suggested videos:', error);
            }
        );
    }

    changeCurrentVideo(id: string) {
        this.videoApiService.getVideo(id).subscribe(video => this.mainVideo = video);
    }
}
