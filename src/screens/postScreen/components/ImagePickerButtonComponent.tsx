import React from "react";
import { TouchableOpacity, View, Text, Dimensions } from "react-native";
import { Spacer } from "../../../components/Spacer";

import {
  widthPercentageToDP as wpSize,
  heightPercentageToDP as hpSize,
} from "react-native-responsive-screen";

const wp = wpSize("100%");
const hp = hpSize("100%");

type ImagePickerButtonProps = {
  handlePreview: () => void;
  disableUploadButton: boolean;
};

export const ImagePickerButton: React.FC<ImagePickerButtonProps> = ({
  handlePreview,
  disableUploadButton,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: wp * 0.9,
        marginTop: 10,
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: disableUploadButton ? "#ccc" : "#e0321f",
          padding: 10,
          borderRadius: 10,
          width: wp - 300,
        }}
        onPress={handlePreview}
        disabled={disableUploadButton}
        hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
      >
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            업로드
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
