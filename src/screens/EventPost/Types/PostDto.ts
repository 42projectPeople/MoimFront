export interface PostEventDto {
  header: string;
  images: string[];
  eventDate: string;
  tradeName: string;
  address: string;
  longitude: number;
  latitude: number;
  openTalk: string;
  maxParticipant: number;
  hostId: number;
  hashtagId: number;
}
