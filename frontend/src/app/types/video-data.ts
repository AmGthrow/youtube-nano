export interface VideoDataDetailed {
    id: string;
    video_file: string;
    title: string;
    description: string;
    uploader: string;
    likes: number;
}

export interface VideoData {
    id: string;
    title: string;
    uploader: string;
}
