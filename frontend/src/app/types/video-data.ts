export interface VideoDataDetailed {
    id: number;
    video_file: string;
    title: string;
    description: string;
    uploader: string;
    likes: number;
}

export interface VideoData {
    id: number;
    title: string;
    uploader: string;
}
