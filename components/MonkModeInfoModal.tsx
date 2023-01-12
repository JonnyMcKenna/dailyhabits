import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { WHITE } from "../constants/AppConstants";
import { HabitButton } from "./HabitButton";

export const MonkModeInfoModal = ({ modalVisible, setModalVisible }: any) => {
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
          <Text style={styles.modalHeaderText}>What Is Monk Mode?</Text>
        </View>
        <View style={{ marginTop: "10%", marginLeft: 20, marginRight: 20 }}>
          <Text style={{ color: WHITE, fontSize: 22 }}>
            Welcome to Monk Mode, the ultimate productivity and focus app.
          </Text>
          <Text style={{ color: WHITE, marginTop: 20 }}>
            Monk Mode is inspired by the ancient practice of monasticism, where
            monks would eliminate distractions and commit to a specific task or
            set of tasks for a period of time. Our app helps you achieve this
            same state of deep concentration and productivity.
          </Text>
          <Text style={{ color: WHITE, marginTop: 20 }}>
            With our app, you can turn off notifications, disconnect from the
            internet, and set aside specific blocks of time for focused work.
            You can also track your progress and set goals to help you stay on
            track.
          </Text>
          <Text style={{ color: WHITE, marginTop: 20 }}>
            Whether you're a student, entrepreneur, or just someone looking to
            improve their productivity, Monk Mode is the perfect tool to help
            you reach your full potential.
          </Text>
          <Text style={{ color: WHITE, marginTop: 20 }}>
            Try it out and experience the power of monk mode for yourself!
          </Text>
        </View>
        <View style={styles.buttonContainer}>

        <HabitButton
            buttonText={"Start Your Monk Mode"}
            onPress={() => {
              setModalVisible(false);
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
    color: WHITE,
    // flexDirection: "row",
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
  buttonContainer: {
    marginTop: 30,
    flexDirection: "column",
    // flexGrow: 1,
    justifyContent: "flex-end",
    marginBottom: 50,
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
