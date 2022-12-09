import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const HabitButton = ({ buttonText, onPress }: any): any => {
  return (
    <TouchableOpacity style={styles.addHabitButton} onPress={onPress}>
      <Text style={styles.addHabitText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addHabitButton: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 13,
    paddingBottom: 13,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: "#FF4742",
    borderRadius: 10,
  },
  addHabitText: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 17,
    fontWeight: "600",
  },
});
