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

export const HashtagScreen: React.FC = () => {
  const props = useRouteProps<"HashTag">();
  const dispatch = useAppDispatch();

  useEffect(() => {
	dispatch(HashtagSlice.actions.setIsLoading(true));
    dispatch(HashtagSlice.actions.setHashtag(props.params.hashtag));
    dispatch(getHashtagData());
	dispatch(HashtagSlice.actions.setIsLoading(false));
    //function changeLoading() {
    //  return setTimeout(() => setLoading(false), 500);
    //}
    //changeLoading();
  }, []);

  return useSelector(selectIsLoading) ? (
    <Loading />
  ) : (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <HashTagHeader />
      <HashtagFlatList />
    </View>
  );
};
