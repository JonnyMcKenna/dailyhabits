import React from "react";
import { StyleSheet, View } from "react-native";

export default function SeparatorComponent() {
  return <View style={settingsStyles.separator} />;
}

export const settingsStyles = StyleSheet.create({
  separator: {
    marginVertical: 15,
    height: 1,
    color: "#ffffff",
  },
});
