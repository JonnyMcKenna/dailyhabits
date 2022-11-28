import Ionicons from "@expo/vector-icons/Ionicons";
import { RouteProp, ParamListBase } from "@react-navigation/native";
import React from "react";
import { OpaqueColorValue } from "react-native";
import {
  HOME,
  SETTINGS,
  HOME_SHARP,
  HOME_OUTLINE,
  IOS_LIST,
  IOS_LIST_OUTLINE,
} from "../constants/AppConstants";

export const getTabBarIcon = (
  route: RouteProp<ParamListBase, string>,
  focused: boolean,
  color: string | OpaqueColorValue | undefined,
  size: number | undefined
) => {
  let iconName: React.ComponentProps<typeof Ionicons>["name"] = HOME_SHARP;

  if (route.name === HOME) {
    iconName = focused ? HOME_SHARP : HOME_OUTLINE;
  } else if (route.name === SETTINGS) {
    iconName = focused ? IOS_LIST : IOS_LIST_OUTLINE;
  }
  return <Ionicons name={iconName} size={size} color={color} />;
};
