import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { TabBar } from "./src/navigations/TabbarNavigation";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "./src/redux/RootStore";
import { useSelector } from "react-redux";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Provider store={store}>
          <View style={{ flex: 1 }}>
            <TabBar />
          </View>
        </Provider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
