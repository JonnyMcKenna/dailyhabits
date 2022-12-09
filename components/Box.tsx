import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export const Box = ({ id, isSelected, habits, setHabits }: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        habits.find((obj: any) => {
          if (obj.id === id) {
            obj.isSelected = !obj.isSelected;
          }
        });
        setHabits([...habits]);
      }}
    >
      <View style={isSelected ? styles.clickedHabit : styles.square} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  square: {
    backgroundColor: "#6A6A6A",
    borderRadius: 3,
    height: 28,
    width: 45,
    marginVertical: 2,
    paddingHorizontal: 2,
    alignItems: "center",
  },
  clickedHabit: {
    backgroundColor: "#FF4742",
    borderRadius: 3,
    height: 28,
    width: 45,
    marginVertical: 2,
    alignItems: "center",
  },
});
