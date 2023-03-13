import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { TabBar } from "./src/navigations/TabbarNavigation";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./src/redux/RootStore";
import { useSelector } from "react-redux";
import Loading from "./src/components/Loading";

export default function App() {
	const [isloading, setIsLoading] = useState(true);
	
	useEffect(() => {
		setTimeout(() => {setIsLoading(false)}, 2000);
	}, [])

  return (
	isloading ? 
		<Loading />
	:
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
