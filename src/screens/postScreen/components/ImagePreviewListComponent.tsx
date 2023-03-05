import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  Button,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";

type ImagePreviewListProps = {
  previewUris: string[];
  onImageSelected: (uris: string[]) => void;
  setPreviewUris: React.Dispatch<React.SetStateAction<string[]>>;
  ImageCount: number;
  setImageCount: React.Dispatch<React.SetStateAction<number>>;
};

export const ImagePreviewList: React.FC<ImagePreviewListProps> = ({
  previewUris,
  onImageSelected,
  setPreviewUris,
  setImageCount,
  ImageCount,
}) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    previewUris.forEach((item) => {
      Image.getSize(
        item,
        (width, height) => {
          const ratio = height / width;
          const newHeight = (Dimensions.get("window").width - 120) * ratio;
          setHeight(newHeight);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }, [previewUris]);

  const renderImageItem = ({ item }: { item: string }) => {
    return (
      <View style={{ marginRight: 10, position: "relative" }}>
        <Image
          source={{ uri: item }}
          style={{
            width: Dimensions.get("window").width - 120,
            height: height,
            resizeMode: "stretch",
          }}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setPreviewUris((prevUris) =>
              prevUris.filter((uri) => uri !== item)
            );
            onImageSelected(previewUris.filter((uri) => uri !== item));
          }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <Image
              source={require("../../../assets/back.png")}
              style={{ width: 30, height: 30 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const disableUploadButton = previewUris.length >= 5;

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderColor: "rgba(0,0,0,0.2)",
          borderWidth: 1,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            width: Dimensions.get("window").width - 120,
            height: (Dimensions.get("window").width - 120) * 0.75,
            marginHorizontal: 30,
            marginVertical: 30,
          }}
        >
          <>
            {() => {
              if (ImageCount == 0) {
                setPreviewUris([]);
                setImageCount(0);
              }
            }}
          </>
          {previewUris.length > 0 && (
            <FlatList
              data={previewUris}
              renderItem={renderImageItem}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(uri) => uri}
            />
          )}
        </View>
      </View>
    </View>
  );
};
