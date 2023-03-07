import React from "react";
import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ImagePickerTitle } from "./ImagePickerTitleComponent";
import { ImagePickerButton } from "./ImagePickerButtonComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/RootReducer";
import { useAppDispatch } from "../../../redux/RootStore";
import { postEventSlice } from "../../../redux/Slices/EventPost";

import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";
const wp = wpSize("100%");
const hp = hpSize("100%");

export const ImagePickerComponent: React.FC<{
  selectedImages: string[];
  setSelectedImages: (selectedImage: string[]) => void;
  uploadButtonEnabled: boolean;
  setUploadButtonEnabled: (focused: boolean) => void;
}> = (props) => {
  const eventImages = useSelector(
    (state: RootState) => state.eventPost.eventImages
  );
  const dispatch = useAppDispatch();

  const handleImageSelection = async () => {
    let result = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      allowsEditing: true,
      quality: 0.2,
    } as ImagePicker.ImagePickerOptions)) as ImagePicker.ImagePickerResult;

    if (result && result.assets) {
      const newSelectedImages = eventImages.concat(
        ...result.assets.map((asset) => asset.uri)
      );
      dispatch(postEventSlice.actions.addImages(newSelectedImages));
      props.setSelectedImages(newSelectedImages);
      // enable upload button if the number of images is less than 5
      if (newSelectedImages.length < 5) {
        props.setUploadButtonEnabled(false);
      }
    }
    if (eventImages.length > 4) {
      // disable upload button if maximum number of images has been reached
      props.setUploadButtonEnabled(true);
      return;
    }
  };

  // function to handle image cancellation
  const handleImageCancel = (index: number) => {
    const newSelectedImages = [...props.selectedImages];
    newSelectedImages.splice(index, 1);
    dispatch(postEventSlice.actions.deleteImages(newSelectedImages));
    props.setSelectedImages(newSelectedImages);

    // enable upload button if the number of images is less than 5
    if (newSelectedImages.length < 5) {
      props.setUploadButtonEnabled(false);
    }
  };

  return (
    <View>
      <ImagePickerTitle ImageCount={props.selectedImages.length} />
      <View
        style={{
          width: wp * 0.9,
          height: wp * 0.9 * 0.75,
          borderColor: "rgba(0,0,0,0.2)",
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          paddingHorizontal: 20,
        }}
      >
        {eventImages.length > 0 && (
          <ScrollView horizontal={true}>
            {props.selectedImages.map((imageUri, index) => (
              <View key={index}>
                <Image
                  source={{ uri: imageUri }}
                  style={{
                    width: wp * 0.8,
                    height: wp * 0.8 * 0.75,
                    marginTop: (wp * 0.9 * 0.75) / 25,
                  }}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  style={{ position: "absolute" }}
                  onPress={() => handleImageCancel(index)}
                >
                  <Image
                    source={require("../../../assets/back.png")}
                    style={{
                      width: wp * 0.1,
                      height: wp * 0.1,
                      backgroundColor: "white",
                      borderRadius: 12,
                    }}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
      <View style={{ paddingBottom: 10 }}>
        <ImagePickerButton
          handlePreview={handleImageSelection}
          disableUploadButton={props.uploadButtonEnabled}
        />
      </View>
    </View>
  );
};
