export interface VideoDataDetailed {
    id: string;
    video_file: string;
    title: string;
    apply_ascii_filter: boolean;
    description: string;
    uploader: string;
    likes: number;
    uploaded_at: string;
}

export interface VideoDataUpload {
    video_file: File | null;
    title: string;
    apply_ascii_filter: boolean;
    description: string;
    uploader: string;
    likes: number;
}

export interface VideoData {
    id: string;
    thumbnail_file: string;
    title: string;
    uploader: string;
}
