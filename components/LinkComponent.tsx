import React from "react";
import { Text, View, TouchableOpacity, Linking } from "react-native";
import {
  MID_THEME_COLOUR,
  LIGHT_THEME_COLOUR,
  ERROR,
  FONT_WEIGHT_300,
  FONT_WEIGHT_500,
  ROW,
  SETTINGS_ICON_COLOUR,
} from "../constants/AppConstants";
import { TabBarIcon } from "./TabBarIcon";

export default function LinkComponent(props: any) {
  const { url, tabName, title, subText } = props;

  return (
    <TouchableOpacity
      onPress={() =>
        Linking.openURL(url).catch((err) => console.error(ERROR, err))
      }
    >
      <View style={{ marginTop: 30, flexDirection: ROW }}>
        <TabBarIcon name={tabName} color={SETTINGS_ICON_COLOUR} />

        <View style={{ flexDirection: ROW, marginLeft: 30 }}>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: FONT_WEIGHT_500,
                color: LIGHT_THEME_COLOUR,
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: FONT_WEIGHT_300,
                color: MID_THEME_COLOUR,
              }}
            >
              {subText}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
