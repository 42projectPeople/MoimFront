import { ImageAction } from "./ImageType";

export const addImage = (url: string, previewUrl: string): ImageAction => ({
  type: "ADD_IMAGE",
  payload: {
    url,
    previewUrl,
  },
});

export const resizeImage = (resizeUrl: string): ImageAction => ({
  type: "RESIZE_IMAGE",
  payload: {
    resizeUrl,
  },
});

export const deleteImage = (
  deleteUrl: string,
  deletePreviewUrl: string
): ImageAction => ({
  type: "DELETE_IMAGE",
  payload: {
    deleteUrl,
    deletePreviewUrl,
  },
});

export const deleteAllImages = (): ImageAction => ({
  type: "DELETE_ALL_IMAGES",
});
