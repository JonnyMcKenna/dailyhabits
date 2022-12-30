import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProgressScreen } from "./components/ProgressScreen";
import { SettingsScreen } from "./components/Settings";
import { HOME, PROGRESS, SETTINGS } from "./constants/AppConstants";
import { getTabBarIcon } from "./helpers/AppHelpers";
import { HomeScreen } from "./components/HomeScreen";
import { getMonkModeDays } from "./components/HomeAsyncStorage";

const Tab = createBottomTabNavigator();

export default function App() {
  const [monkModeDays, setMonkModeDays] = React.useState(0);

  React.useEffect(() => {
    getMonkModeDays().then((monkModeDays: any) => {
      if (monkModeDays) {
        setMonkModeDays(monkModeDays);
      }
    });
  }, []);

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
        <Tab.Screen
          name={PROGRESS}
          children={() => (
            <ProgressScreen monkModeDays={Number(monkModeDays)} />
          )}
        />
        <Tab.Screen name={SETTINGS} component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
