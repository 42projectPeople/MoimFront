import React, { useCallback, useEffect, useState } from "react";
import HashTagHeader from "./component/HashTagHeader";
import { View } from "react-native";
import { useRouteProps } from "../../navigations/Navigation";
import { useAppDispatch } from "../../redux/RootStore";
import { HashtagSlice, selectIsLoading } from "../../redux/Slices/HashTag";
import HashtagFlatList from "./component/HashtagFlatList";
import { getHashtagData } from "./component/getHashtagData";
import { Loading } from "../../components/Loading";
import { useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import {
	widthPercentageToDP as wpSize,
	heightPercentageToDP as hpSize,
  } from "react-native-responsive-screen";

const wp = wpSize("100");
const hp = hpSize("100%");

export const HashtagScreen: React.FC = () => {
  const props = useRouteProps<"HashTag">();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("popular");
  const [items, setItems] = useState([
    {label: "인기글 정렬", value: "popular"},
    {label: "최신순 정렬", value: "recent"}
  ]);

  useEffect(() => {
	dispatch(HashtagSlice.actions.setIsLoading(true));
    dispatch(HashtagSlice.actions.setHashtag(props.params.hashtag));
    dispatch(getHashtagData(value));
	dispatch(HashtagSlice.actions.setIsLoading(false));
  }, []);

  useEffect(() => {
	dispatch(HashtagSlice.actions.setIsLoading(true));
	dispatch(HashtagSlice.actions.deleteDataArr());
	dispatch(getHashtagData(value));
	dispatch(HashtagSlice.actions.setIsLoading(false));
  }, [value])

  return useSelector(selectIsLoading) ? (
    <Loading />
  ) : (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <HashTagHeader />
	  <DropDownPicker
	  	items={items}
		open={open}
		value={value}
		setOpen={setOpen}
		setValue={setValue}
		setItems={setItems}
		containerStyle={{ position: 'relative', width: wp * 0.3,
			alignItems: 'flex-end', marginLeft: wp * 0.65, marginVertical: hp * 0.01, }}
		style={{ borderWidth: 0, minHeight: hp * 0.02, marginTop: hp * 0.005 }}
		/>
      <HashtagFlatList />
    </View>
  );
};
