import React, { useLayoutEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import { useAppDispatch } from "../../../redux/RootStore";
import { SearchSlice, selectInput } from "../../../redux/Slices/Search";
import { getEventData } from "./getEventData";
import { getUserData } from "./getUserData";
import { Loading } from "../../../components/Loading";
import EventFlatList from "./EventFlatList";

const DispatchData: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const input = useSelector(selectInput);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    try {
      dispatch(SearchSlice.actions.deleteEventData());
      dispatch(SearchSlice.actions.deleteEventPage());
      dispatch(SearchSlice.actions.deleteUserData());
      dispatch(SearchSlice.actions.deleteUserPage());
      if (input) {
        delayedQuery();
        setLoading(true);
      }
    } catch (err) {
      console.error(err);
    }
  }, [input]);

  const delayedQuery = useCallback(
    debounce(async () => {
      dispatch(getEventData());
      dispatch(getUserData());
      setLoading(false);
    }, 500),
    []
  );

  return loading ? <Loading /> : <EventFlatList />;
});

export default React.memo(DispatchData);
