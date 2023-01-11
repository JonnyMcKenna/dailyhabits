import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const PlusButton = ({ buttonText, onPress, isDelete }: any): any => {
  return (
    <TouchableOpacity style={ styles.addHabitButton} onPress={onPress}>
      <Text style={styles.addHabitText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addHabitButton: {
    justifyContent: 'center',
    width: 40,
    height: 40,
    // marginTop: 10,
    backgroundColor: "#FF4742",
    borderRadius:50,
  },
  addHabitText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
  },
});
