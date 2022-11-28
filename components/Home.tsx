import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { HabitButton } from "./HabitButton";

export function HomeScreen({ navigation }: any) {
  const getData = () => [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bg",
      habitName: "First Item",
      emoji: "Cat",
      currentStreak: 5,
      habitEntries: ["2022-11-28", "2022-11-22", "2022-11-16"],
      habitDates: getWeekFromStartDay([
        "2022-11-28",
        "2022-11-22",
        "2022-11-16",
      ]),
    },
  ];

  const getWeekFromStartDay = (habitEntries: any) => {
    var weekDays = [];
    var curr = new Date();
    var first = curr.getDate();

    var weekdays = new Array(7);
    weekdays[0] = "Sun";
    weekdays[1] = "Mon";
    weekdays[2] = "Tue";
    weekdays[3] = "Wed";
    weekdays[4] = "Thu";
    weekdays[5] = "Fri";
    weekdays[6] = "Sat";

    for (let i = first; i > first - 14; i--) {
      let day = new Date(curr.setDate(i)).getDay();
      let dayNumber = new Date(curr.setDate(i)).getDate();
      let date = new Date(curr.setDate(i)).toISOString().slice(0, 10);

      weekDays.push({
        dayName: weekdays[day],
        dayNumber: dayNumber,
        date: date,
        boxSelected: habitEntries.includes(date) ? true : false,
      });
    }
    return weekDays;
  };

  // useEffect(() => {
  // const dates = getWeekFromStartDay();

  // let data = getData();

  // console.log("data bruh: ", JSON.stringify(data[0].habitEntries));
  // const habitEntries = data[0] ? data[0] : { habitEntries: null };

  // for (var i = 0; i < data.length; i++) {
  //   const habbitDataEntry = data[i];

  // if (habitEntries) {
  // data[0].habitDates = getWeekFromStartDay(data[0].habitEntries) || [];
  // }
  // }

  // // const habitEntries = data[i]?.habitEntries;
  // console.log("i: ", i);
  // const date = dates[i].date;
  // console.log("habitEntries: ", JSON.stringify(habitEntries));
  // console.log("date: ", JSON.stringify(date));

  // const legitHabitEntries = habitEntries?.habitEntries || [];

  // if (legitHabitEntries.includes(date)) {
  //   dates[i]["boxSelected"] = true;
  //   console.log("yo");
  //   // dates.push({ label: lab[i], value: val[i] });
  // }
  // }

  // console.log("this is the data: ", JSON.stringify(data));
  // setHabitDates(data);
  // }, []);

  const [habitDates, setHabitDates] = useState<any[]>([]);

  const data = getData();

  const Box = ({ habitEntries, index }: any) => {
    console.log("in box: ", habitEntries);
    return (
      // <TouchableOpacity onPress={() => setHabit(!habit)}>
      <TouchableOpacity onPress={() => console.log("press")}>
        <View
          style={habitEntries.boxSelected ? styles.clickedHabit : styles.square}
        />
      </TouchableOpacity>
    );
  };

  const DateText = ({ dayName, dayNumber }: any) => (
    <View style={{ padding: 10, alignItems: "center" }}>
      <Text style={{ color: "white" }}>{dayName}</Text>
      <Text style={{ color: "white" }}>{dayNumber}</Text>
    </View>
  );

  const Item = ({ habitName, emoji, currentStreak }: any) => (
    <View>
      <Text>{habitName}</Text>
      <Text>{emoji}</Text>
      <Text>{currentStreak}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text>DailyHabits App</Text>

      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} horizontal={true}>
          <FlatList
            data={data[0].habitDates}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <DateText dayName={item.dayName} dayNumber={item.dayNumber} />
                  <Box habitEntries={item} index={index} />
                </View>
              );
            }}
            numColumns={14}
          />
        </ScrollView>
      </SafeAreaView>

      <View style={styles.buttonContainer}>
        {/* <HabitButton navigate={() => navigation} /> */}
        <TouchableOpacity
          style={styles.addHabitButton}
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.navigate("AddHabit", {
              itemId: 86,
              otherParam: "anything you want here",
            });
          }}
        >
          <Text style={styles.addHabitText}>Add Habit</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    marginHorizontal: 20,
    backgroundColor: "#181818",
  },
  text: {
    fontSize: 18,
  },
  square: {
    backgroundColor: "#6A6A6A",
    borderRadius: 3,
    height: 28,
    width: 50,
    margin: 2,
    alignItems: "center",
  },
  clickedHabit: {
    backgroundColor: "#FF4742",
    borderRadius: 3,
    height: 28,
    width: 50,
    margin: 2,
    alignItems: "center",
  },
  row: {
    // flex: 1,
    // justifyContent: "space-around",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addHabitButton: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 13,
    paddingBottom: 13,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: "#FF4742",
    borderRadius: 10,
  },
  addHabitText: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 17,
    fontWeight: "600",
  },
});
