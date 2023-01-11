import React from "react";
import { StyleSheet, View } from "react-native";

export function QuotesScreen({ navigation }: any) {
  return <View style={styles.container}></View>;
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
});
