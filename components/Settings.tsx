import { StyleSheet, Text, View, Button } from "react-native";

export function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button title="Go To Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}
