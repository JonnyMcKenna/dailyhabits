import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { HabitButton } from "./HabitButton";
import uuid from "react-native-uuid";

export function HomeScreen({ navigation }: any) {
  const getWeekFromStartDay = (habitName: string) => {
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
        habitName: habitName,
      });
    }

    return weekDays.reverse();
  };

  useEffect(() => {
    // setHabits(getWeekFromStartDay());
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
  const [modalVisible, setModalVisible] = useState(false);
  const [addHabit, onAddHabit] = React.useState("");

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View
            style={{
              flexDirection: "row",
              display: "flex",
              // paddingLeft: 30,
              marginTop: "50%",
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
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
            <Text
              style={{
                color: "#fff",
                fontSize: 24,
                fontWeight: "500",
                paddingLeft: 10,
                textAlign: "center",
              }}
            >
              Add Habit
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: "20%" }}>
            <View style={{ flex: 0.5 }}>
              <Text
                style={{
                  // marginTop: 80,
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
                }}
                numberOfLines={1}
              >
                Habit Name:
              </Text>
            </View>

            <View style={{ flex: 0.8 }}>
              <TextInput
                onChangeText={onAddHabit}
                style={{
                  // marginTop: 80,
                  height: 46,
                  color: "#181818",
                  justifyContent: "center",
                  backgroundColor: "#fff",
                  fontSize: 15,
                  fontWeight: "500",
                  padding: 12,
                }}
                numberOfLines={1}
                placeholder={"e.g. Habit Name"}
                placeholderTextColor={"black"}
              ></TextInput>
            </View>
          </View>

          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.addHabitButton}
              onPress={() => {
                const newHabit = getWeekFromStartDay(addHabit);
                //TODO: Add in the habit name to above method
                const addedHabits = [...habits, ...newHabit];
                setHabits(addedHabits);
                setModalVisible(!modalVisible);
                onAddHabit(""); //Sets habit back to empty string for next addition

                // setModalVisible(true);

                // navigation.navigate("AddHabit", {
                //   itemId: 86,
                //   otherParam: "anything you want here",
                // });
              }}
            >
              <Text style={styles.addHabitText}>Save Habit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 0.4 }}>
          <View style={{ height: 54 }}></View>

          {numberOfHabitsArray.map((buttonInfo, index) => (
            <Text
              style={{
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
              }}
              numberOfLines={1}
            >
              {habits[14 * index].habitName}
            </Text>
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
                    <View
                      style={{
                        backgroundColor: "#404040",
                        height: 46,
                        marginVertical: 2,
                        paddingTop: 8,
                        paddingHorizontal: 5,
                      }}
                    >
                      <Box id={item.id} isSelected={item.isSelected} />
                    </View>
                  </View>
                );
              }}
              numColumns={14}
            />
          </ScrollView>
        </SafeAreaView>
        <View style={{ flex: 0.25 }}>
          <View style={{ height: 54 }}>
            <Text
              style={{
                paddingTop: 10,
                marginVertical: 2,
                height: 46,
                color: "#fff",
                justifyContent: "center",
                alignItems: "center",
                textAlignVertical: "center",
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
                height: 46,
                color: "#fff",
                justifyContent: "center",
                backgroundColor: "#404040",
                alignItems: "center",
                textAlignVertical: "center",
                fontSize: 12,
                textAlign: "center",
              }}
              numberOfLines={1}
            >
              2 🔥
            </Text>
          ))}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addHabitButton}
          onPress={() => {
            // const newHabit = getWeekFromStartDay();
            // const addedHabits = [...habits, ...newHabit];
            // setHabits(addedHabits);

            setModalVisible(true);

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
  modalContainer: {
    // borderColor: WHITE,
    // borderTopWidth: 1,
    paddingTop: 100,
    width: "100%",
    flex: 1,
    // flex: 0.6,
    // backgroundColor: "#181818",
    backgroundColor: "#181818",
    color: "white",
    textAlignVertical: "center",
    // bottom: 0,
    // position: "absolute",
  },
  buttonContainer: {
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "flex-end",
    marginBottom: 50,
  },
  modalButtonContainer: {
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "flex-end",
    marginBottom: "70%",
    alignItems: "center",
  },
  scrollView: {
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
