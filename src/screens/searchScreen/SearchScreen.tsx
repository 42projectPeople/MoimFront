import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { View, Text, TextInput, StyleSheet, SafeAreaView } from "react-native";
import { MoimHeader } from "../home/components/MoimHeader";
import { EventFlatList } from "./component/EventFlatList";
import { widthPercentageToDP as wpSize, 
	heightPercentageToDP as hpSize} from 'react-native-responsive-screen';
import SearchHeader from "./SearchHeader";

const wp = wpSize('100%');
const hp = hpSize('100%');

export const SearchScreen: React.FC = () => {
	const [input, setInput] = useState('');

	const handleInputChange = (input: string) => {
		setInput(input);
	}

  return (
    <View style={{flex: 1}}>
		<SearchHeader />
		{/*<MoimHeader showBackButton={true} />*/}
		<TextInput
			style={styles.textinput}
			value={input}
			placeholder="검색어를 입력하세요."
			onChangeText={(handleInputChange)}
		/>
		<EventFlatList input={input} />
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