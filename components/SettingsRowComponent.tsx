import React from "react";
import { Text, View } from "react-native";

export const SettingsRowComponent = ({
  heading,
  description,
}: {
  heading: any;
  description: any;
}) => {
  return (
    <View style={settingsRowStyles.rowContainer}>
      <View>
        <Text style={settingsRowStyles.heading}>{heading}</Text>
        <Text style={settingsRowStyles.description}>{description}</Text>
      </View>
    </View>
  );
};

import { StyleSheet } from "react-native";
import {
  MID_THEME_COLOUR,
  LIGHT_THEME_COLOUR,
  FONT_WEIGHT_300,
  FONT_WEIGHT_500,
  ROW,
} from "../constants/AppConstants";

export const settingsRowStyles = StyleSheet.create({
  rowContainer: {
    marginTop: 30,
    flexDirection: ROW,
  },
  heading: {
    fontSize: 16,
    fontWeight: FONT_WEIGHT_500,
    color: LIGHT_THEME_COLOUR,
  },
  description: {
    fontSize: 14,
    fontWeight: FONT_WEIGHT_300,
    color: MID_THEME_COLOUR,
  },
});
