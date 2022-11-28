import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const HabitButton = ({ navigation }: any) => {
  return (
    <TouchableOpacity
      style={styles.addHabitButton}
      onPress={() => {
        /* 1. Navigate to the Details route with params */
        navigation.navigate("AddHabit", {
          itemId: 86,
          otherParam: "anything you want here",
        });
      }}
    >
      <Text style={styles.addHabitText}>Add Habit</Text>
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
