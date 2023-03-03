export interface Image {
  url: string;
}

export interface PreviewImage {
  previewUrl: string;
}

export interface ResizeImage {
  resizeUrl: string;
}

export interface ImageState {
  imageCount: number;
  images: Image[];
  previewImages: PreviewImage[];
  resizeImages: ResizeImage[];
}

export type ImageAction =
  | {
      type: "ADD_IMAGE";
      payload: {
        url: string;
        previewUrl: string;
      };
    }
  | { type: "RESIZE_IMAGE"; payload: { resizeUrl: string } }
  | {
      type: "DELETE_IMAGE";
      payload: { deleteUrl: string; deletePreviewUrl: string };
    }
  | { type: "DELETE_ALL_IMAGES" };
