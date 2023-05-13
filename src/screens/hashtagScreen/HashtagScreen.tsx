import React, { useCallback, useEffect, useState } from "react";
import HashTagHeader from "./component/HashTagHeader";
import { View, Text, StyleSheet } from "react-native";
import { useRouteProps } from "../../navigations/Navigation";
import { useAppDispatch } from "../../redux/RootStore";
import { HashtagSlice, selectHashtag, selectIsLoading } from "../../redux/Slices/HashTag";
import HashtagFlatList from "./component/HashtagFlatList";
import { getHashtagData } from "./component/getHashtagData";
import { Loading } from "../../components/Loading";
import { useSelector } from "react-redux";
import NavigationBar from "./component/NavigationBar";
import DropDownPicker from "react-native-dropdown-picker";
import {
	widthPercentageToDP as wpSize,
	heightPercentageToDP as hpSize,
  } from "react-native-responsive-screen";

const wp = wpSize("100%");
const hp = hpSize("100%");

export const HashtagScreen: React.FC = () => {
  const props = useRouteProps<"HashTag">();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("popular");
  const [items, setItems] = useState([
    {label: "인기글 정렬", value: "popular"},
    {label: "최신순 정렬", value: "recent"},
    {label: "오래된순 정렬", value: "oldest"}
  ]);

useEffect(() => {
	dispatch(HashtagSlice.actions.setIsLoading(true));
	dispatch(HashtagSlice.actions.setHashtag(props.params.hashtag));
	dispatch(HashtagSlice.actions.setIsLoading(false));
  }, []);

  useEffect(() => {
		dispatch(HashtagSlice.actions.setIsLoading(true));
		dispatch(HashtagSlice.actions.deleteDataArr());
		dispatch(HashtagSlice.actions.setPage(1));
		if (value === 'popular') {
			dispatch(HashtagSlice.actions.setSortRecommend(true));
			dispatch(HashtagSlice.actions.setSortDate(false));
		}
		else if (value === 'recent') {
			dispatch(HashtagSlice.actions.setSortRecommend(false));
			dispatch(HashtagSlice.actions.setSortDate(true));
		}
		else {
			dispatch(HashtagSlice.actions.setSortRecommend(false));
			dispatch(HashtagSlice.actions.setSortDate(false));
		}
		dispatch(getHashtagData());
		dispatch(HashtagSlice.actions.setIsLoading(false));
  }, [value]);
	

  return useSelector(selectIsLoading) ? (
    <Loading />
  ) : (
    <View style={styles.rootContainer}>
      <HashTagHeader />
	  <View style={styles.hashTagContainer}>
		<View style={{height: hp * 0.04}}>
	  	<Text style={{fontSize: 24, fontWeight: "800"}}>
			# 해시태그
		</Text>
		</View>
	  </View>
	  <View style={{justifyContent: 'center', alignItems: 'center', zIndex: 1,}}>
		<View style={styles.topNaviContainer}>
			<View style={styles.naviContainer}>
				<NavigationBar/>
			</View>
			<View style={styles.dropContainer}>
				<DropDownPicker
					items={items}
					open={open}
					value={value}
					setOpen={setOpen}
					setValue={setValue}
					setItems={setItems}
					containerStyle={styles.dropContainerStyle}
					style={styles.dropStyle}
				/>
			</View>
		</View>
	  </View>
	  {/*<View>*/}
      	<HashtagFlatList />
	  {/*</View>
	  <View style={{height: hp * 0.1}}>
	  </View>*/}
    </View>
  );
};

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: "white",
	},
	topNaviContainer: {
		height: hp * 0.06,
		justifyContent: 'space-between',
		width: wp * 0.9,
		flexDirection: 'row',
		//backgroundColor: 'red'
	},
	naviContainer: {
		width: wp * 0.55,
	},
	dropContainer: {
		width: wp * 0.33,
		justifyContent: 'center'
	},
	dropContainerStyle: {
		position: 'relative',
		marginVertical: hp * 0.01,
	},
	dropStyle: {
		borderWidth: 0,
		minHeight: hp * 0.02,
	},
	hashTagContainer: {
		width: wp * 0.3,
		marginLeft: wp * 0.05,
		marginTop: hp * 0.02,
	},
})