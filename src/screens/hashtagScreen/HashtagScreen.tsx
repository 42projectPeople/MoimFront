import React, { useCallback, useEffect, useState } from "react";
import HashTagHeader from "./component/HashTagHeader";
import { View } from "react-native";
import { useRouteProps } from "../../navigations/Navigation";
import { useAppDispatch } from "../../redux/RootStore";
import { HashtagSlice } from "../../redux/Slices/HashTag";
import HashtagFlatList from "./component/HashtagFlatList";
import { getHashtagData } from "./component/getHashtagData";
import { Loading } from "../searchScreen/component/Loading";

export const HashtagScreen: React.FC = () => {
  const props = useRouteProps<"HashTag">();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(HashtagSlice.actions.setHashtag(props.params.hashtag));
    dispatch(getHashtagData());
    function changeLoading() {
      return setTimeout(() => setLoading(false), 500);
    }
    changeLoading();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <HashTagHeader />
      <HashtagFlatList />
    </View>
  );
};
