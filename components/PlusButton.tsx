import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const PlusButton = ({ buttonText, onPress, isDisabled }: any): any => {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={isDisabled ? styles.disabled : styles.addHabitButton}
      onPress={onPress}
    >
      <Text style={styles.addHabitText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addHabitButton: {
    justifyContent: "center",
    width: 40,
    height: 40,
    backgroundColor: "#FF4742",
    borderRadius: 50,
  },
  disabled: {
    justifyContent: "center",
    width: 40,
    height: 40,
    backgroundColor: "#6A6A6A",
    borderRadius: 50,
  },
  addHabitText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
  },
});
