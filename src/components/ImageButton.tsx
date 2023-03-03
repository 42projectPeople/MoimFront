import React from "react";
import {
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  ImageStyle,
} from "react-native";

interface ImageButtonProps {
  onPress: () => void;
  source: ImageSourcePropType;
  style?: ImageStyle;
}

const ImageButton: React.FC<ImageButtonProps> = ({
  onPress,
  source,
  style,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={source} style={style} resizeMode="contain" />
    </TouchableOpacity>
  );
};

export default ImageButton;
