import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
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
      style={{ paddingLeft: 20, paddingRight: 20 }}
    >
      <View style={styles.linkComponentView}>
        <TabBarIcon name={tabName} color={SETTINGS_ICON_COLOUR} />

        <View style={styles.viewStyle}>
          <View>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.subText}>{subText}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  linkComponentView: { marginTop: 30, flexDirection: ROW },
  titleText: {
    fontSize: 16,
    fontWeight: FONT_WEIGHT_500,
    color: LIGHT_THEME_COLOUR,
  },
  viewStyle: { flexDirection: ROW, marginLeft: 30 },
  subText: {
    fontSize: 14,
    fontWeight: FONT_WEIGHT_300,
    color: MID_THEME_COLOUR,
  },
});
