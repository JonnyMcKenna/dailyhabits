import React from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { LIGHT_THEME_COLOUR } from "../constants/AppConstants";

export default function TitleComponent(props: any) {
  const { title } = props;

  return (
    <View style={{}}>
      <Text style={titleStyles.title}>{title}</Text>
    </View>
  );
}

export const titleStyles = StyleSheet.create({
  title: {
    color: LIGHT_THEME_COLOUR,
    marginTop: 0,
    fontSize: 16,
    fontWeight: "bold",
  },
});
