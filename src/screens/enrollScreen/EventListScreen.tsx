import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import SearchHeader from "../searchScreen/SearchHeader";
import { EventList } from "./component/EventList";
import { widthPercentageToDP as wpSize, 
	heightPercentageToDP as hpSize} from 'react-native-responsive-screen';

const wp = wpSize('100%');
const hp = hpSize('100%');

export type eventData = {
			eventId: number,
			header: string,
			content: string,
			main_image: string,
			date: string,
}

export const EventListScreen: React.FC = () => {
	const [hostEvent, setHostEvent] = useState<eventData[]>([]);
	const [guestEvent, setGuestEvent] = useState<eventData[]>([]);
	const [role, setRole] = useState(true);

	useEffect(()=> {
		getData('host');
		getData('guest');
	}, [])

	const isvaild = (target: string | object) => {
		return (!target ? false : true);
	}

	const arrMap = (dataObj: object[]) => {
		const newArr = dataObj.map((data: any) => ({
			eventId: data.e_eventId,
			header: data.e_header,
			content: data.e_content,
			main_image: data.e_main_image,
			date: data.e_eventDate
			}));
		return (newArr);
	}

	const getData = async(target: string) => {
		const res = target === 'host' ? 
				await axios.get(`http://54.180.201.67:3000/search/event?word=lo&page=1&pageSize=6&sortByViews=true&includeMax=false&sortByRating=false`, 
				{ 
					headers: { Accept: "application/json", }
				}) 
			:	await axios.get(`http://54.180.201.67:3000/search/event?word=so&page=1&pageSize=6&sortByViews=true&includeMax=false&sortByRating=false`, 
				{ 
					headers: { Accept: "application/json", }
				})
		if (!isvaild(res.data))
			return ; // 수정
		const data = arrMap(res.data);
		target === 'host' ? setHostEvent(data) : setGuestEvent(data)
	} 

	const handelPressRole = (role: string) => {
		role === 'host' ? setRole(true) : setRole(false)
	}

  return (
		<>
			<SearchHeader />
			<View style={styles.container}>
				<View style={styles.buttonContainer}>
					<TouchableOpacity onPress={() => handelPressRole('host')} 
					activeOpacity={0.7}
					>
						<View style={role ? styles.clickedRole : styles.unclickedRole}>
						<Text 
							style={role ? styles.ClickedRoleText : styles.roleText}> 
							HOST 
						</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity  onPress={() => handelPressRole('guest')} 
					activeOpacity={0.7}
					>
						<View style={!role ? styles.clickedRole : styles.unclickedRole}>
						<Text 
							style={!role ? styles.ClickedRoleText : styles.roleText}> 
							GUEST 
						</Text>
						</View>
					</TouchableOpacity>
				</View>
				<ScrollView style={styles.scrollContainer} 
				showsVerticalScrollIndicator={false}>
					<EventList dataArr={role ? hostEvent : guestEvent} />
				</ScrollView>
				</View>
		</>
  );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop : hp * 0.02,
		marginHorizontal: wp * 0.06,
	},
	buttonContainer: {
		//width: wp * 0.38,
		height: hp * 0.035,
		flexDirection: 'row',
		marginHorizontal: wp * 0.1,
		marginBottom: hp * 0.01,
		marginTop: hp * 0.002,
		justifyContent: 'space-between',

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
		color: 'grey',
		fontWeight: '700',
	},
	ClickedRoleText: {
		fontSize: wp * 0.055,
		fontWeight: '700',
	},
	scrollContainer: {
		marginVertical: hp * 0.02,
	},
})
