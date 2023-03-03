import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ImagePickerTitle } from "./ImagePickerTitleComponent";
import { ImagePickerButton } from "./ImagePickerButtonComponent";

export const ImagePickerComponent: React.FC<{
  selectedImages: string[];
  uploadButtonEnabled: boolean;
  setSelectedImages: (image: string[]) => void;
  setUploadButtonEnabled: (focused: boolean) => void;
}> = (props) => {
  // function to handle image selection
  const handleImageSelection = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      allowsEditing: true,
      quality: 0.2,
    } as ImagePicker.ImagePickerOptions)) as ImagePicker.ImagePickerResult;

    if (result && result.assets) {
      const newSelectedImages = props.selectedImages.concat(
        result.assets.map((asset) => asset.uri)
      );
      props.setSelectedImages(newSelectedImages);

      // enable upload button if the number of images is less than 5
      if (newSelectedImages.length < 5) {
        props.setUploadButtonEnabled(false);
      }
    }
    if (props.selectedImages.length > 4) {
      // disable upload button if maximum number of images has been reached
      props.setUploadButtonEnabled(true);
      return;
    }
  };

  // function to handle image cancellation
  const handleImageCancel = (index: number) => {
    const newSelectedImages = [...props.selectedImages];
    newSelectedImages.splice(index, 1);
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
          width: Dimensions.get("window").width * 0.9,
          height: Dimensions.get("window").width * 0.9 * 0.75,
          borderColor: "rgba(0,0,0,0.2)",
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          paddingHorizontal: 20,
        }}
      >
        {props.selectedImages.length > 0 && (
          <ScrollView horizontal={true}>
            {props.selectedImages.map((imageUri, index) => (
              <View key={index}>
                <Image
                  source={{ uri: imageUri }}
                  style={{
                    width: Dimensions.get("window").width * 0.8,
                    height: Dimensions.get("window").width * 0.8 * 0.75,
                    marginTop:
                      (Dimensions.get("window").width * 0.9 * 0.75) / 25,
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
                      width: Dimensions.get("window").width * 0.1,
                      height: Dimensions.get("window").width * 0.1,
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
      <ImagePickerButton
        handlePreview={handleImageSelection}
        disableUploadButton={props.uploadButtonEnabled}
      />
    </View>
  );
};
