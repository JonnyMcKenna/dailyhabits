import React from "react";
import { Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HabitButton } from "./HabitButton";
import {
  storeHabitsToAsyncStorage,
  storeMonkModeDaysToAsyncStorage,
} from "./HomeAsyncStorage";

export const ConfirmDeleteMonkModeModal = ({
  confirmDeleteModalVisible,
  setConfirmDeleteModalVisible,
  onAddHabit,
  setHabits,
  habits,
  editHabitID,
  setEditModalVisible,
}: any) => {
  const selectedHabit = habits.find((habit) => habit.id === editHabitID);
  const selectedHabitName = selectedHabit ? selectedHabit.habitName : "";

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={confirmDeleteModalVisible}
      onRequestClose={() => {
        setConfirmDeleteModalVisible(!confirmDeleteModalVisible);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.confirmDeleteInnerView}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => {
                setConfirmDeleteModalVisible(!confirmDeleteModalVisible);
              }}
            >
              <Ionicons
                name={"arrow-back-circle-outline"}
                size={30}
                color={"#fff"}
              />
            </TouchableOpacity>
            <Text style={styles.modalHeaderText}>Are You Sure?</Text>
          </View>

          <View style={styles.buttonsRow}>
            <View style={styles.modalDeleteButtonContainer}>
              <HabitButton
                buttonText={"Delete"}
                onPress={() => {
                  storeHabitsToAsyncStorage([]);
                  storeMonkModeDaysToAsyncStorage("");
                  setHabits([]);
                  setConfirmDeleteModalVisible(!confirmDeleteModalVisible);
                  setEditModalVisible(false);
                  onAddHabit("");
                }}
                isDelete={true}
              />
            </View>

            <View style={styles.modalButtonContainer}>
              <HabitButton
                buttonText={"Cancel"}
                onPress={() => {
                  setConfirmDeleteModalVisible(!confirmDeleteModalVisible);
                }}
              />
            </View>
          </View>
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
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "white",
    textAlignVertical: "center",
  },
  modalButtonContainer: {
    flexDirection: "column",
    flexGrow: 0.5,
    alignItems: "center",
  },
  confirmDeleteInnerView: {
    backgroundColor: "#181818",
    flex: 0.5,
    marginTop: "50%",
    margin: "10%",
  },
  modalDeleteButtonContainer: {
    flexDirection: "column",
    flexGrow: 0.5,
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    display: "flex",
    marginTop: "15%",
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
  buttonsRow: { flexDirection: "row", marginTop: "15%" },
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
