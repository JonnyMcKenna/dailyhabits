import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MonkModeScreen } from "./components/MonkModeScreen";
import { SettingsScreen } from "./components/Settings";
import { MONK_MODE, QUOTES, SETTINGS, WHITE } from "./constants/AppConstants";
import { getTabBarIcon } from "./helpers/AppHelpers";
import { QuotesScreen } from "./components/QuotesScreen";
import { View } from "react-native";
import { MonkModeInfoModal } from "./components/MonkModeInfoModal";

const Tab = createBottomTabNavigator();

export default function App() {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <NavigationContainer>
      <MonkModeInfoModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) =>
            getTabBarIcon(route, focused, color, size),
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name={MONK_MODE}
          children={() => <MonkModeScreen />}
          options={{
            headerRight: () => (
              <View style={{ marginRight: "30%" }}>
                <Ionicons.Button
                  name={"information-circle-outline"}
                  onPress={() => setModalVisible(true)}
                  size={28}
                  color={"black"}
                  style={{ paddingLeft: 15 }}
                  backgroundColor={WHITE}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen name={QUOTES} component={QuotesScreen} />
        <Tab.Screen name={SETTINGS} component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
