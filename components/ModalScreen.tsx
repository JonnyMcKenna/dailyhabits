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

export const ModalScreen = ({
  modalVisible,
  setModalVisible,
  onAddHabit,
  setHabits,
  addHabit,
  habits,
}: any) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Ionicons
              name={"arrow-back-circle-outline"}
              size={30}
              color={"#fff"}
            />
          </TouchableOpacity>
          <Text style={styles.modalHeaderText}>Add Habit</Text>
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
              placeholder={"e.g. Habit Name"}
              placeholderTextColor={"black"}
            ></TextInput>
          </View>
        </View>

        <View style={styles.modalButtonContainer}>
          <HabitButton
            buttonText={"Save Habit"}
            onPress={() => {
              const newHabit = addHabitDetails(addHabit);
              const addedHabits = [...habits, ...newHabit];
              setHabits(addedHabits);
              setModalVisible(!modalVisible);
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
