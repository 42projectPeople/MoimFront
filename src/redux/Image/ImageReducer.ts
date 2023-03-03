import { ImageAction, ImageState } from "./ImageType";

const initialState: ImageState = {
  imageCount: 0,
  images: [],
  previewImages: [],
  resizeImages: [],
};

export const imageReducer = (
  state: ImageState = initialState,
  action: ImageAction
): ImageState => {
  switch (action.type) {
    case "ADD_IMAGE":
      const { url, previewUrl } = action.payload;
      return {
        ...state,
        imageCount: state.imageCount + 1,
        images: [
          ...state.images,
          {
            url,
          },
        ],
        previewImages: [
          ...state.previewImages,
          {
            previewUrl,
          },
        ],
      };
    case "RESIZE_IMAGE":
      const { resizeUrl } = action.payload;
      return {
        ...state,
        resizeImages: [
          ...state.resizeImages,
          {
            resizeUrl,
          },
        ],
      };
    case "DELETE_IMAGE":
      const { deleteUrl, deletePreviewUrl } = action.payload;
      const filteredImages = state.images.filter(
        (image) => image.url !== deleteUrl
      );
      const filteredPreviewImages = state.previewImages.filter(
        (image) => image.previewUrl !== deletePreviewUrl
      );
      return {
        ...state,
        imageCount: state.imageCount - 1,
        images: filteredImages,
        previewImages: filteredPreviewImages,
      };
    case "DELETE_ALL_IMAGES":
      return {
        ...state,
        imageCount: 0,
        images: [],
        previewImages: [],
        resizeImages: [],
      };
    default:
      return state;
  }
};
