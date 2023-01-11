import React, { useState } from "react";
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
import {
  storeHabitsToAsyncStorage,
  storeMonkModeDaysToAsyncStorage,
} from "./HomeAsyncStorage";
import { PlusButton } from "./PlusButton";
import { addEachHabitDetails, addHabitDetails } from "../helpers/HomeHelpers";
import { MonkModeFlatList } from "./MonkModeFlatList";

export const MonkModeModalDetails = ({
  modalVisible,
  setModalVisible,
  onAddHabit,
  setHabits,
  addHabit,
  habits,
}: any) => {
  const [monkModeDays, setMonkModeDays] = React.useState(0);
  const [modalHabits, setModalHabits] = useState<any[]>([]);

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
          <Text style={styles.modalHeaderText}>Create Your Monk Mode</Text>
        </View>
        <View style={styles.modalInputRow}>
          <View style={styles.textInputViewRight}>
            <TextInput
              onChangeText={setMonkModeDays}
              keyboardType="numeric"
              style={styles.textInputStyle}
              numberOfLines={1}
              placeholder={"How Many Days?"}
              placeholderTextColor={"black"}
            ></TextInput>
          </View>
        </View>

        <View style={styles.habitInputRow}>
          <View style={styles.textInputViewRight}>
            <TextInput
              onChangeText={onAddHabit}
              style={styles.textInputStyle}
              numberOfLines={1}
              placeholder={"Add New Item Or Swipe To Delete!"}
              placeholderTextColor={"black"}
            ></TextInput>
          </View>
        </View>

        <View style={{ alignItems: "center", marginTop: 10 }}>
          <PlusButton
            buttonText={"+"}
            onPress={() => {
              const newHabit = addHabitDetails(addHabit, monkModeDays);
              const addedHabits = [...modalHabits, newHabit];
              setModalHabits(addedHabits);
              onAddHabit("");
            }}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <MonkModeFlatList habits={modalHabits} />
        </View>

        <View style={styles.modalButtonContainer}>
          <HabitButton
            buttonText={"Start Monk Mode"}
            isDisabled={modalHabits.length === 0 || monkModeDays === ""}
            onPress={() => {
              var newHabits = [];
              modalHabits.forEach((element) => {
                const returnedHabits = addEachHabitDetails(
                  element.habitName,
                  monkModeDays
                );
                newHabits = [...newHabits, ...returnedHabits];
              });
              storeHabitsToAsyncStorage(newHabits);
              storeMonkModeDaysToAsyncStorage(monkModeDays);
              setHabits(newHabits);
              setMonkModeDays(monkModeDays);
              setModalVisible(!modalVisible);
              setModalHabits([]);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#181818",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  modalContainer: {
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
    marginBottom: "20%",
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    display: "flex",
    marginTop: "20%",
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
  modalInputRow: {
    flexDirection: "row",
    marginTop: "10%",
    marginLeft: 10,
    marginRight: 10,
  },
  habitInputRow: {
    flexDirection: "row",
    marginTop: 2,
    marginLeft: 10,
    marginRight: 10,
  },
  textInputViewLeft: { width: "30%" },
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
  textInputViewRight: { width: "100%" },
  textInputStyle: {
    height: 46,
    color: "#181818",
    justifyContent: "center",
    backgroundColor: "#fff",
    fontSize: 15,
    fontWeight: "500",
    padding: 12,
  },
  habitName: {
    width: "100%",
    paddingTop: 16,
    marginVertical: 2,
    height: 46,
    color: "#fff",
    justifyContent: "center",
    backgroundColor: "#404040",
    alignItems: "center",
    textAlignVertical: "center",
    fontSize: 12,
    textAlign: "justify",
    alignContent: "center",
    paddingLeft: "50%",
  },
});
