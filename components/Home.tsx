import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Box } from "./Box";
import { HabitButton } from "./HabitButton";
import { DateText } from "./DateText";
import { ModalScreen } from "./ModalScreen";
import { EditModalScreen } from "./EditModalScreen";
import { getHabits } from "./HomeAsyncStorage";

export function HomeScreen({ navigation }: any) {
  const [habits, setHabits] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editHabitID, setEditHabitID] = useState(null);
  const [addHabit, onAddHabit] = React.useState("");

  const numberOfHabits = habits.length / 14;
  const numberOfHabitsArray = habits.length !==0 ? Array.from(Array(numberOfHabits).keys()) : 0;

  useEffect(() => {
    getHabits().then((habits: any) => {
        setHabits(habits);
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
      />

      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 0.35 }}>
          <View style={{ height: 54 }}></View>

          {numberOfHabitsArray !== 0 && numberOfHabitsArray.map((buttonInfo, index) => (
              <TouchableOpacity onPress={(habit) => {
              setEditHabitID(habits[14 * index].id)
              setEditModalVisible(true)}
              }>
            <Text style={styles.habitName} numberOfLines={1}>
              {habits[14 * index].habitName}
            </Text>
             </TouchableOpacity>
          ))}
        </View>

        <SafeAreaView style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ref={(ref) => {
              this.scrollView = ref;
            }}
            onContentSizeChange={() =>
              this.scrollView.scrollToEnd({ animated: true })
            }
          >
            <FlatList
              data={habits}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <DateText
                      dayName={item.dayName}
                      dayNumber={item.dayNumber}
                      index={index}
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
              numColumns={14}
            />
          </ScrollView>
        </SafeAreaView>
        {/* <View style={{ flex: 0.25 }}>
          {numberOfHabits >= 1 && (
            <View style={{ height: 54 }}>
              <Text style={styles.currentStreakText}>
                Current{"\n"}
                Streak
              </Text>
            </View>
          )}
          {numberOfHabitsArray.map((buttonInfo, index) => {
            console.log("habits: ", habits);
            return (
              <Text style={styles.currentStreakValue} numberOfLines={1}>
                {habits[14 * index].currentStreak === null
                  ? 0 + "🙈"
                  : habits[14 * index].currentStreak + "🔥"}
              </Text>
            );
          })}

          {numberOfHabitsArray.map((buttonInfo, index) => (
            <Text style={styles.habitName} numberOfLines={1}>
              {habits[14 * index].habitName}
            </Text>
          ))}
        </View> */}
      </View>

      <View style={styles.buttonContainer}>
        <HabitButton
          buttonText={"Add Habit"}
          onPress={() => {
            setModalVisible(true);
          }}
        />
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
