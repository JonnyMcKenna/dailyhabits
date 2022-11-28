import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { HabitButton } from "./HabitButton";
import { HOME } from "../constants/AppConstants";

export function AddHabit({ navigation }: any) {
  const [text, onChangeText] = React.useState("");
  const [emoji, onChangeEmoji] = React.useState("✅");

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#404040",
          height: 50,
          minWidth: "100%",
          marginTop: 40,
          padding: 15,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={{ color: "white", fontSize: 15 }}>✍🏼 Habit Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          numberOfLines={1}
        />
      </View>

      <View
        style={{
          backgroundColor: "#404040",
          height: 50,
          minWidth: "100%",
          marginTop: 10,
          padding: 15,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={{ color: "white", fontSize: 15 }}>👻 Habit Emoji</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmoji}
          value={emoji}
          numberOfLines={1}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addHabitButton}
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.navigate(HOME, {});
          }}
        >
          <Text style={styles.addHabitText}>Save Habit</Text>
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
  input: {
    height: 50,
    margin: 12,
    // borderWidth: 1,
    padding: 15,
    backgroundColor: "#6A6A6A",
    flex: 1,
    color: "white",
    fontSize: 16,
  },
});
