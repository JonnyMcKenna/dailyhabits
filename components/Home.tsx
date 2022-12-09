import React, { useState } from "react";
import {
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
import { addHabitDetails } from "../helpers/HomeHelpers";
import { Box } from "./Box";
import { HabitButton } from "./HabitButton";

export function HomeScreen({ navigation }: any) {
  const [habits, setHabits] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [addHabit, onAddHabit] = React.useState("");

  const numberOfHabits = habits.length / 14;
  const numberOfHabitsArray = Array.from(Array(numberOfHabits).keys());

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

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View
            style={{
              flexDirection: "row",
              display: "flex",
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
        <View style={{ flex: 0.25 }}>
          {numberOfHabits >= 1 && (
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
          )}
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
  modalContainer: {
    paddingTop: 100,
    width: "100%",
    flex: 1,
    backgroundColor: "#181818",
    color: "white",
    textAlignVertical: "center",
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
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
