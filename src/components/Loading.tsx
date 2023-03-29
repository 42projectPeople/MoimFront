import { Image, View } from "react-native";

export const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Image
        source={require("../assets/loading.gif")}
        style={{ width: 50, height: 50 }}
      />
    </View>
  );
};
