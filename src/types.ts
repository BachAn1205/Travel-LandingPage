export interface TimelineItem {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  imageUrl: string;
  handwrittenCaption: string;
  atmosphereAudio?: string;
  likes: number;
}

export interface Collaborator {
  id: string;
  name: string;
  avatarUrl: string;
  status: string;
}

export interface AlbumPhoto {
  id: string;
  title: string;
  caption: string;
  author: string;
  imageUrl: string;
  likes: number;
  date: string;
}

export interface TourConfig {
  tripName: string;
  subtitle: string;
  dates: string;
  narrative: string;
  themeStyle: "vintage" | "sunset" | "charcoal" | "sand";
}
