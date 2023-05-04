import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { EnrollHeader } from "./component/EnrollHeader";
import { useAppDispatch } from "../../redux/RootStore";
import { useSelector } from "react-redux";
import { getHostEvent } from "./component/getHostEvent";
import { getGuestEvent } from "./component/getGuestEvent";
import { EnrollSlice, selectRole } from "../../../src/redux/Slices/Enroll";
import HostEnrollFlatList from "./component/HostEnrollFlatList";
import GuestEnrollFlatList from "./component/GuestEnrollFlatList";
import { widthPercentageToDP as wpSize, 
	heightPercentageToDP as hpSize} from 'react-native-responsive-screen';

const wp = wpSize("100%");
const hp = hpSize("100%");

export const EventListScreen: React.FC = () => {
	const dispatch = useAppDispatch();
	const role = useSelector(selectRole);
	
	useEffect(() => {
		dispatch(getHostEvent());
		dispatch(getGuestEvent());
	}, [])

	const handleOnPressRole = (role: boolean) => {
		role 
		? dispatch(EnrollSlice.actions.setRole(true)) 
		: dispatch(EnrollSlice.actions.setRole(false))
	}

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <EnrollHeader />
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => handleOnPressRole(true)}
            activeOpacity={0.7}
          >
            <View style={role ? styles.clickedRole : styles.unclickedRole}>
              <Text style={role ? styles.ClickedRoleText : styles.roleText}>
                HOST
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleOnPressRole(false)}
            activeOpacity={0.7}
          >
            <View style={!role ? styles.clickedRole : styles.unclickedRole}>
              <Text style={!role ? styles.ClickedRoleText : styles.roleText}>
                GUEST
              </Text>
            </View>
          </TouchableOpacity>
        </View>
		{	
			role
			? <HostEnrollFlatList/>
			: <GuestEnrollFlatList />
		}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp * 0.02,
    marginHorizontal: wp * 0.06,
  },
  buttonContainer: {
    //width: wp * 0.38,
    height: hp * 0.035,
    flexDirection: "row",
    marginHorizontal: wp * 0.1,
    marginBottom: hp * 0.035,
    marginTop: hp * 0.002,
    justifyContent: "space-between",
	},
  clickedRole: {
    flex: 1,
    borderBottomWidth: 2,
  },
  unclickedRole: {
    flex: 1,
  },
  roleText: {
    fontSize: wp * 0.055,
    color: "grey",
    fontWeight: "700",
  },
  ClickedRoleText: {
    fontSize: wp * 0.055,
    fontWeight: "700",
  },
  scrollContainer: {
    marginVertical: hp * 0.02,
  },
});
