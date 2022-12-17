import React from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HabitButton } from "./HabitButton";
import { addHabitDetails } from "../helpers/HomeHelpers";
import { storeHabitsToAsyncStorage } from "./HomeAsyncStorage";

export const EditModalScreen = ({
  editModalVisible,
  setEditModalVisible,
  onAddHabit,
  setHabits,
  addHabit,
  habits,
  editHabitID
}: any) => {

    const selectedHabit = habits.find((habit) => habit.id === editHabitID);
    const selectedHabitName = selectedHabit ? selectedHabit.habitName : '';
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={editModalVisible}
      onRequestClose={() => {
        setEditModalVisible(!editModalVisible);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity
            onPress={() => {
              setEditModalVisible(!editModalVisible);
            }}
          >
            <Ionicons
              name={"arrow-back-circle-outline"}
              size={30}
              color={"#fff"}
            />
          </TouchableOpacity>
          <Text style={styles.modalHeaderText}>Edit Habit</Text>
        </View>
        <View style={styles.modalInputRow}>
          <View style={styles.textInputViewLeft}>
            <Text style={styles.textInput} numberOfLines={1}>
              Habit Name:
            </Text>
          </View>

          <View style={styles.textInputViewRight}>
            <TextInput
              onChangeText={onAddHabit}
              style={styles.textInputStyle}
              numberOfLines={1}
              defaultValue={selectedHabitName}
              placeholderTextColor={"black"}
            ></TextInput>
          </View>
        </View>

        <View style={styles.modalButtonContainer}>
          <HabitButton
            buttonText={"Update Habit"}
            onPress={() => {
                let newEditHabits = habits

                newEditHabits.forEach(habit => {
                    if(habit.id === editHabitID) {
                         habit["habitName"] = addHabit
                    }
                });

              storeHabitsToAsyncStorage(newEditHabits)
              setHabits(newEditHabits);
              setEditModalVisible(!editModalVisible);
              onAddHabit("");
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    paddingTop: 100,
    width: "100%",
    flex: 1,
    backgroundColor: "#181818",
    color: "white",
    textAlignVertical: "center",
  },
  modalButtonContainer: {
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "flex-end",
    marginBottom: "70%",
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    display: "flex",
    marginTop: "50%",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  modalHeaderText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "500",
    paddingLeft: 10,
    textAlign: "center",
  },
  modalInputRow: { flexDirection: "row", marginTop: "20%" },
  textInputViewLeft: { flex: 0.5 },
  textInput: {
    paddingTop: 14,
    marginVertical: 2,
    height: 46,
    color: "#fff",
    paddingLeft: 16,
    justifyContent: "center",
    backgroundColor: "#404040",
    alignItems: "center",
    textAlignVertical: "center",
    fontSize: 15,
  },
  textInputViewRight: { flex: 0.8 },
  textInputStyle: {
    height: 46,
    color: "#181818",
    justifyContent: "center",
    backgroundColor: "#fff",
    fontSize: 15,
    fontWeight: "500",
    padding: 12,
  },
});
