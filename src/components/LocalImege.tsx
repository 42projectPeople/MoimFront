import React from "react";
import { Image as RNImage, ImageProps, StyleProp } from "react-native";

export const LocalImage: React.FC<{
  localAsset: number;
  style: StyleProp<ImageProps>;
}> = (props) => {
  return <RNImage source={props.localAsset} style={props.style} />;
};
