import React from "react";
import { StyleSheet, View } from "react-native";
import { SETTINGS_SEPARATOR } from "../constants/AppConstants";

export default function SeparatorComponent() {
  return <View style={settingsStyles.separator} />;
}

export const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: "35%",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    color: "#ffffff",
  },
});
