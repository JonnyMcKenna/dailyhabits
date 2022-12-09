import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const DateText = ({ dayName, dayNumber, index }: any) => {
  if (index > 13) {
    return <></>;
  } else
    return (
      <View style={styles.dateTextView}>
        <Text style={styles.textColor}>{dayName}</Text>
        <Text style={styles.textColor}>{dayNumber}</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  dateTextView: { padding: 10, alignItems: "center" },
  textColor: { color: "white" },
});
