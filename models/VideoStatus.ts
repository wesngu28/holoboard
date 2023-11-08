export interface VideoStatus {
  id?: string
  status: string
  video: string
  time?: string
}

export interface SubStatus {
  id: string;
  name: string,
  group: string,
  thumbnail?: string;
  color?: string;
  subs: number;
  view_count: number;
  video_count: number;
}