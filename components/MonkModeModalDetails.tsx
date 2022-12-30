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
import { EditModalScreen } from "./EditModalScreen";
import { ModalScreen } from "./ModalScreen";

export const MonkModeModalDetails = ({
  modalVisible,
  setModalVisible,
  onAddHabit,
  setHabits,
  addHabit,
  habits,
  monkModeDays,
  setMonkModeDays,
}: any) => {
  const [editHabitID, setEditHabitID] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editHabitGroupID, setEditHabitGroupID] = useState(null);
  const [addHabitModalVisible, setAddHabitModalVisible] = useState(false);

  const numberOfHabits =
    monkModeDays && monkModeDays !== 0 ? habits.length / monkModeDays : 0;
  const numberOfHabitsArray =
    habits && habits.length !== 0 && numberOfHabits !== 0
      ? Array.from(Array(numberOfHabits).keys())
      : 0;

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
              Days:
            </Text>
          </View>

          <View style={styles.textInputViewRight}>
            <TextInput
              onChangeText={setMonkModeDays}
              keyboardType="numeric"
              style={styles.textInputStyle}
              numberOfLines={1}
              placeholder={"e.g. 21"}
              placeholderTextColor={"black"}
            ></TextInput>
          </View>
        </View>

        <Text
          style={{
            color: "#fff",
            fontSize: 17,
            fontWeight: "500",
            paddingLeft: 10,
            textAlign: "center",
            marginTop: 30,
            marginBottom: 30,
          }}
        >
          Daily Habits
        </Text>

        <EditModalScreen
          editModalVisible={editModalVisible}
          setEditModalVisible={setEditModalVisible}
          onAddHabit={onAddHabit}
          setHabits={setHabits}
          addHabit={addHabit}
          habits={habits}
          editHabitID={editHabitID}
          editHabitGroupID={editHabitGroupID}
        />

        <ModalScreen
          modalVisible={addHabitModalVisible}
          setModalVisible={setAddHabitModalVisible}
          onAddHabit={onAddHabit}
          setHabits={setHabits}
          addHabit={addHabit}
          habits={habits}
          monkModeDays={monkModeDays}
        />

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            {numberOfHabitsArray !== 0 &&
              numberOfHabitsArray.map((buttonInfo, index) => (
                <TouchableOpacity
                  onPress={(habit) => {
                    setEditHabitID(habits[monkModeDays * index].id);
                    setEditHabitGroupID(
                      habits[monkModeDays * index].habitGroupId
                    );
                    setEditModalVisible(true);
                  }}
                >
                  <Text style={styles.habitName} numberOfLines={1}>
                    {habits[monkModeDays * index].habitName}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>

        <View style={{ alignItems: "center" }}>
          <PlusButton
            buttonText={"+"}
            onPress={() => {
              setAddHabitModalVisible(!addHabitModalVisible);
            }}
          />
        </View>

        <View style={styles.modalButtonContainer}>
          <HabitButton
            buttonText={"Start Monk Mode"}
            isDisabled={habits.length === 0 || monkModeDays === ""}
            onPress={() => {
              storeHabitsToAsyncStorage(habits);
              storeMonkModeDaysToAsyncStorage(monkModeDays);
              setModalVisible(!modalVisible);
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
    marginBottom: "70%",
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
