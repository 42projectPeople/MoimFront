import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity, SafeAreaView } from "react-native";
import { useHomeNavigation } from "../../navigations/Navigation";

const SearchHeader = () => {
	const navigation = useHomeNavigation<"Search">();

	const handleGoBack = () => {
		navigation.goBack();
	}

	return (
		<SafeAreaView>
			<TouchableOpacity
				onPress={handleGoBack}>
			<Image
				source={require("../../assets/BackButton.png")}
				style={{ width: 40, height: 40, marginLeft: 10 }}
			/>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

export default SearchHeader;