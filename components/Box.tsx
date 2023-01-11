import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { storeHabitsToAsyncStorage } from "./HomeAsyncStorage";

export const Box = ({ id, isSelected, habits, setHabits }: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        habits.find((obj: any) => {
          if (obj.id === id) {
            // obj.currentStreak =

            // let currentDate = new Date(obj.date);
            // currentDate.setDate(currentDate.getDate() - 1);

            // const sdisbfsd = new Date(currentDate).getDate();

            // let yesterdaysDate = new Date(currentDate.setDate(sdisbfsd))
            //   .toISOString()
            //   .slice(0, 10);

            // console.log("yesterdaysDate: ", yesterdaysDate);

            // const yesterdayDate = date. - 1;

            // const newDate = new Date(yesterdayDate);

            // console.log("yesterdayDate: ", yesterdayDate);
            // habits.find((obj: any) => {
            // If yesterday date the isSelected was false, then current Streak is 0
            //
            // if (obj.date === yesterdaysDate) {
            //   const isSelected = obj.isSelected;
            //   if (!isSelected) {
            //     obj.currentStreak = null;
            //     // set currentStreak to 0
            //   }
            // }
            // date.setDate(date.getDate() - 1);
            // });

            // console.log("my date: ", date);
            //TODO: if the previous date isSelected

            // const updatedIsSelected = !obj.isSelected;
            // if (updatedIsSelected) {
            //   const calculatedCurrentStreak =
            //     obj.currentStreak === null ? 0 : obj.currentStreak + 1;
            //   obj.currentStreak = calculatedCurrentStreak;
            // }
            obj.isSelected = !obj.isSelected;
          }
        });
        const updatedHabits = [...habits];
        storeHabitsToAsyncStorage(updatedHabits)
        setHabits(updatedHabits);
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
    backgroundColor: "#36E67F",
    borderRadius: 3,
    height: 28,
    width: 45,
    marginVertical: 2,
    alignItems: "center",
  },
});
