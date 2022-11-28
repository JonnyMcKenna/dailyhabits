import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "./components/Home";
import { SettingsScreen } from "./components/Settings";
import { HOME, SETTINGS } from "./constants/AppConstants";
import { getTabBarIcon } from "./helpers/AppHelpers";

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
        <Tab.Screen name={HOME} component={HomeScreen} />
        <Tab.Screen name={SETTINGS} component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
