import { useNavigation, useRoute, RouteProp} from "@react-navigation/native";
import { HomeStackParam } from './HomeNavigation'
import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
  } from "@react-navigation/native-stack";

export const useHomeNavigation = <RouteName extends keyof HomeStackParam>() => {
	return useNavigation<NativeStackNavigationProp<HomeStackParam, RouteName>>();
  };
  
  export const useRouteProps = <RouteName extends keyof HomeStackParam>() => {
	  type props = RouteProp<HomeStackParam, RouteName>;
	  return useRoute<props>();
  }