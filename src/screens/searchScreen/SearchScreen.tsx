import React from "react";
import  DispatchData  from "./component/DispatchData";
import  SearchHeader  from "./component/SearchHeader";
import { View, TextInput, StyleSheet} from "react-native";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/RootStore";
import { SearchSlice, selectInput } from "../../redux/Slices/Search";
import { widthPercentageToDP as wpSize, 
	heightPercentageToDP as hpSize} from 'react-native-responsive-screen';

const wp = wpSize('100%');
const hp = hpSize('100%');

export const SearchScreen: React.FC = () => {
	const dispatch = useAppDispatch();
	const input = useSelector(selectInput);

	const handleInputChange = (input: string) => {
		dispatch(SearchSlice.actions.setInput(input));
	}

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
		<SearchHeader />
		<TextInput
			style={styles.textinput}
			value={input}
			placeholder="검색어를 입력하세요."
			onChangeText={handleInputChange}
		/>
		<DispatchData />
		<View style={styles.lastMargin}></View>
    </View>
  );
};

const styles = StyleSheet.create({
	textinput: {
		fontSize: 15,
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		borderRadius: 30,
	},
	lastMargin: {
		marginBottom: hp * 0.02,
	}
})
