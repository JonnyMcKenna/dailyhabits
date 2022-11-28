import Ionicons from "@expo/vector-icons/Ionicons";
import {
  HOME,
  SETTINGS,
  HOME_SHARP,
  HOME_OUTLINE,
  IOS_LIST,
  IOS_LIST_OUTLINE,
} from "../constants/AppConstants";

export const getTabBarIcon = (route, focused, color, size) => {
  let iconName;

  if (route.name === HOME) {
    iconName = focused ? HOME_SHARP : HOME_OUTLINE;
  } else if (route.name === SETTINGS) {
    iconName = focused ? IOS_LIST : IOS_LIST_OUTLINE;
  }
  return <Ionicons name={iconName} size={size} color={color} />;
};
