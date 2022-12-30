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
import { DateText } from "./DateText";
import { ModalScreen } from "./ModalScreen";
import { EditModalScreen } from "./EditModalScreen";
import { getHabits } from "./HomeAsyncStorage";

export function ProgressScreen({ navigation, monkModeDays }: any) {
  const [habits, setHabits] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editHabitID, setEditHabitID] = useState(null);
  const [editHabitGroupID, setEditHabitGroupID] = useState(null);
  const [addHabit, onAddHabit] = React.useState("");

  const numberOfHabits =
    monkModeDays && monkModeDays !== 0 ? habits.length / monkModeDays : 0;
  const numberOfHabitsArray =
    habits && habits.length !== 0 && numberOfHabits && numberOfHabits !== 0
      ? Array.from(Array(numberOfHabits).keys())
      : 0;

  useEffect(() => {
    getHabits().then((habits: any) => {
      if (habits.length !== 0) {
        setHabits(habits);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <ModalScreen
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onAddHabit={onAddHabit}
        setHabits={setHabits}
        addHabit={addHabit}
        habits={habits}
      />

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

      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 0.35 }}>
          <View style={{ height: 54 }}></View>

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

        <SafeAreaView style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            // ref={(ref) => {
            //   this.scrollView = ref;
            // }}
            // onContentSizeChange={() =>
            //   this.scrollView.scrollToEnd({ animated: true })
            // }
          >
            <FlatList
              data={habits}
              key={"_"}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <DateText
                      dayName={item.dayName}
                      dayNumber={item.dayNumber}
                      index={index}
                      monkModeDays={monkModeDays}
                    />
                    <View style={styles.boxView}>
                      <Box
                        id={item.id}
                        isSelected={item.isSelected}
                        habits={habits}
                        setHabits={setHabits}
                      />
                    </View>
                  </View>
                );
              }}
              numColumns={monkModeDays}
            />
          </ScrollView>
        </SafeAreaView>
      </View>

      <View style={styles.buttonContainer}></View>
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
