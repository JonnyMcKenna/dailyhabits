import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Box } from "./Box";
import { HabitButton } from "./HabitButton";
import { DateText } from "./DateText";
import { ModalScreen } from "./ModalScreen";
import { EditModalScreen } from "./EditModalScreen";
import { getHabits, getMonkModeDays } from "./HomeAsyncStorage";
import { storeHabitsToAsyncStorage } from "./HomeAsyncStorage";
import { MonkModeModalDetails } from "./MonkModeModalDetails";
import { ConfirmDeleteModalScreen } from "./ConfirmDeleteModalScreen";
import { ConfirmDeleteMonkModeModal } from "./ConfirmDeleteMonkModeModal";

export function HomeScreen({ navigation }: any) {
  const [habits, setHabits] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editHabitID, setEditHabitID] = useState(null);
  const [editHabitGroupID, setEditHabitGroupID] = useState(null);
  const [addHabit, onAddHabit] = React.useState("");
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] =
    useState(false);
  const [monkModeDays, setMonkModeDays] = React.useState("");

  const numberOfHabits = habits.length / 14;
  const numberOfHabitsArray =
    habits && habits.length !== 0
      ? Array.from(Array(numberOfHabits).keys())
      : 0;

  useEffect(() => {
    // storeHabitsToAsyncStorage([])
    getHabits().then((habits: any) => {
      if (habits.length !== 0) {
        // const numberOfHabits = habits.length;
        // const lastHabitDate = habits[numberOfHabits].date
        console.log(habits);
        // add current date
      }
      setHabits(habits);
    });

    getMonkModeDays().then((monkModeDays: any) => {
      setMonkModeDays(monkModeDays);
    });
  }, []);

  return (
    <View style={styles.container}>
      <MonkModeModalDetails
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onAddHabit={onAddHabit}
        setHabits={setHabits}
        addHabit={addHabit}
        habits={habits}
        monkModeDays={monkModeDays}
        setMonkModeDays={setMonkModeDays}
      />

      {/* <EditModalScreen
        editModalVisible={editModalVisible}
        setEditModalVisible={setEditModalVisible}
        onAddHabit={onAddHabit}
        setHabits={setHabits}
        addHabit={addHabit}
        habits={habits}
        editHabitID={editHabitID}
        editHabitGroupID={editHabitGroupID}
      /> */}

      <ConfirmDeleteMonkModeModal
        confirmDeleteModalVisible={confirmDeleteModalVisible}
        setConfirmDeleteModalVisible={setConfirmDeleteModalVisible}
        onAddHabit={onAddHabit}
        setHabits={setHabits}
        addHabit={addHabit}
        habits={habits}
        editHabitID={editHabitID}
        editHabitGroupID={editHabitGroupID}
        setEditModalVisible={setEditModalVisible}
      />

      {habits.length === 0 ? (
        <View style={{ padding: "15%", marginTop: "20%" }}>
          <Text style={{ color: "white", fontSize: 24, fontWeight: "200" }}>
            Take control of{" "}
            <Text style={{ fontWeight: "bold" }}>your life</Text> and achieve{" "}
            <Text style={{ fontWeight: "bold" }}>your goals</Text> faster with{" "}
            <Text style={{ fontWeight: "bold" }}>Monk Mode</Text>.
          </Text>

          <Text
            style={{
              color: "white",
              fontSize: 24,
              marginTop: 40,
              fontWeight: "200",
            }}
          >
            Set your <Text style={{ fontWeight: "bold" }}>daily goals</Text>,
            number of <Text style={{ fontWeight: "bold" }}>days</Text> and start{" "}
            <Text style={{ fontWeight: "bold" }}>your journey</Text> now.
          </Text>
        </View>
      ) : (
        <View style={{ padding: "15%", marginTop: "20%" }}>
          <Text style={{ color: "white", fontSize: 24, fontWeight: "200" }}>
            Don't let distractions get in the way of your progress. Keep your
            eye on the prize and stay focused on your goals. You've got the
            power to achieve anything you set your mind to!
          </Text>

          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              fontSize: 24,
              marginTop: 30,
            }}
          >
            Remaining: {monkModeDays} Days
          </Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        {habits.length === 0 ? (
          <HabitButton
            buttonText={"Add Habits"}
            onPress={() => {
              setModalVisible(true);
            }}
          />
        ) : (
          <HabitButton
            buttonText={"Cancel"}
            onPress={() => {
              setConfirmDeleteModalVisible(true);
              // setHabits([]);
            }}
          />
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#181818",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  buttonContainer: {
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "flex-end",
    marginBottom: 50,
  },
  scrollView: {
    backgroundColor: "#181818",
  },
  text: {
    fontSize: 18,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  habitName: {
    paddingTop: 16,
    marginVertical: 2,
    height: 46,
    color: "#fff",
    paddingLeft: 10,
    justifyContent: "center",
    backgroundColor: "#404040",
    alignItems: "center",
    textAlignVertical: "center",
    fontSize: 12,
  },
  boxView: {
    backgroundColor: "#404040",
    height: 46,
    marginVertical: 2,
    paddingTop: 8,
    paddingHorizontal: 5,
  },
  currentStreakText: {
    paddingTop: 10,
    marginVertical: 2,
    height: 46,
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    fontSize: 12,
    textAlign: "center",
  },
  currentStreakValue: {
    paddingTop: 16,
    marginVertical: 2,
    height: 46,
    color: "#fff",
    justifyContent: "center",
    backgroundColor: "#404040",
    alignItems: "center",
    textAlignVertical: "center",
    fontSize: 12,
    textAlign: "center",
  },
});
