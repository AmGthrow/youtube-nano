export interface VideoDataDetailed {
    id: number;
    videoUrl: string;
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
