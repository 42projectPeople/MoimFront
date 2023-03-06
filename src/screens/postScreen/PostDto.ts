export interface PostEventDto {
  header: string;
  main_image: string;
  images: string[];
  eventDate: string;
  location: string;
  longitude: number;
  latitude: number;
  openTalk: string;
  maxParticipant: number;
  hostId: number;
  hashtagId: number;
}
