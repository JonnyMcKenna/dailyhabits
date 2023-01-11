import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MonkModeScreen } from "./components/MonkModeScreen";
import { SettingsScreen } from "./components/Settings";
import { MONK_MODE, QUOTES, SETTINGS } from "./constants/AppConstants";
import { getTabBarIcon } from "./helpers/AppHelpers";
import { QuotesScreen } from "./components/QuotesScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) =>
            getTabBarIcon(route, focused, color, size),
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name={MONK_MODE} children={() => <MonkModeScreen />} />
        <Tab.Screen name={QUOTES} component={QuotesScreen} />
        <Tab.Screen name={SETTINGS} component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
