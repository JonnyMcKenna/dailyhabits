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
import uuid from "react-native-uuid";

export function HomeScreen({ navigation }: any) {
  const getWeekFromStartDay = () => {
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
        isSelected: false,
        id: uuid.v4(),
      });
    }

    return weekDays.reverse();
  };

  useEffect(() => {
    setHabits(getWeekFromStartDay());
  }, []);

  const [habits, setHabits] = useState<any[]>([]);

  const Box = ({ id, isSelected }: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          habits.find((obj) => {
            if (obj.id === id) {
              obj.isSelected = !obj.isSelected;
            }
          });
          setHabits([...habits]);
        }}
      >
        <View style={isSelected ? styles.clickedHabit : styles.square} />
      </TouchableOpacity>
    );
  };

  const DateText = ({ dayName, dayNumber, index }: any) => {
    if (index > 13) {
      return <></>;
    } else
      return (
        <View style={{ padding: 10, alignItems: "center" }}>
          <Text style={{ color: "white" }}>{dayName}</Text>
          <Text style={{ color: "white" }}>{dayNumber}</Text>
        </View>
      );
  };

  const Item = ({ habitName, emoji, currentStreak }: any) => (
    <View>
      <Text>{habitName}</Text>
      <Text>{emoji}</Text>
      <Text>{currentStreak}</Text>
    </View>
  );

  const factorOf14 = habits.length % 14 === 0;
  const numberOfHabits = habits.length / 14;

  const numberOfHabitsArray = Array.from(Array(numberOfHabits).keys());

  // If factorOf14 is 3 then we know there is 42 habits and for every index of 14 we should show it.

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 0.4 }}>
          {/* {index % 14 == 0 && ( */}

          <View style={{ height: 54 }}></View>

          {numberOfHabitsArray.map((buttonInfo) => (
            <Text
              style={{
                paddingTop: 16,
                marginVertical: 2,
                // margin: 2,
                height: 46,
                color: "#fff",
                paddingLeft: 10,
                // paddingRight: 10,
                justifyContent: "center",
                backgroundColor: "#404040",
                alignItems: "center",
                textAlignVertical: "center",
                // margin: "auto",
                fontSize: 12,
              }}
              numberOfLines={1}
            >
              🏃🏼 Exercise
            </Text>
          ))}

          {/* )} */}
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
                  <View
                  // style={{
                  //   backgroundColor: "#404040",
                  //   height: 46,
                  //   margin: 2,
                  //   paddingTop: 8,
                  // }}
                  >
                    <DateText
                      dayName={item.dayName}
                      dayNumber={item.dayNumber}
                      index={index}
                    />
                    <View
                      style={{
                        backgroundColor: "#404040",
                        height: 46,
                        marginVertical: 2,
                        paddingTop: 8,
                        paddingHorizontal: 5,
                      }}
                    >
                      {/* <View style={styles.row}> */}
                      <Box id={item.id} isSelected={item.isSelected} />
                    </View>
                    {/* </View> */}
                  </View>
                );
              }}
              numColumns={14}
            />
          </ScrollView>
        </SafeAreaView>
        <View style={{ flex: 0.25 }}>
          {/* {index % 14 == 0 && ( */}

          <View style={{ height: 54 }}>
            <Text
              style={{
                paddingTop: 10,
                marginVertical: 2,
                // margin: 2,
                height: 46,
                color: "#fff",
                paddingLeft: 10,
                // paddingRight: 10,
                justifyContent: "center",
                // backgroundColor: "#404040",
                alignItems: "center",
                textAlignVertical: "center",
                // margin: "auto",
                fontSize: 12,
                textAlign: "center",
              }}
            >
              Current{"\n"}
              Streak
            </Text>
          </View>

          {numberOfHabitsArray.map((buttonInfo) => (
            <Text
              style={{
                paddingTop: 16,
                marginVertical: 2,
                // margin: 2,
                height: 46,
                color: "#fff",
                // paddingLeft: 10,
                // paddingRight: 10,
                justifyContent: "center",
                backgroundColor: "#404040",
                alignItems: "center",
                textAlignVertical: "center",
                // margin: "auto",
                fontSize: 12,
                textAlign: "center",
              }}
              numberOfLines={1}
            >
              2 🔥
            </Text>
          ))}

          {/* )} */}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addHabitButton}
          onPress={() => {
            const newHabit = getWeekFromStartDay();

            const addedHabits = [...habits, ...newHabit];

            setHabits(addedHabits);

            // navigation.navigate("AddHabit", {
            //   itemId: 86,
            //   otherParam: "anything you want here",
            // });
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
    // marginHorizontal: 20,
    backgroundColor: "#181818",
  },
  text: {
    fontSize: 18,
  },
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
    backgroundColor: "#FF4742",
    borderRadius: 3,
    height: 28,
    width: 45,
    marginVertical: 2,
    alignItems: "center",
  },
  row: {
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
