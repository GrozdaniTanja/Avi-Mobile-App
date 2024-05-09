import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import SplashScreen from "./src/screens/SplashScreen";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";
import ChatScreen from "./src/screens/ChatScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "./src/utils/constants/Colors";
import SettingsScreen from "./src/screens/settings/SettingsScreen";
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
          transitionSpec: {
            open: {
              animation: "timing",
              config: {
                duration: 700,
              },
            },
            close: {
              animation: "timing",
              config: {
                duration: 700,
              },
            },
          },
        }}
      >
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{ headerShown: false, title: " " }}
        />
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false, title: " " }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerBackTitleVisible: false, title: " " }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerBackTitleVisible: false, title: " " }}
        />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
          options={{ headerBackTitleVisible: false, title: "" }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={({ navigation }) => ({
            title: "Avi",
            headerBackTitle: null,
            headerRight: () => (
              <Ionicons
                name="settings-outline"
                size={24}
                style={{ marginRight: 20, color: Colors.primary.darkCerulean }}
                onPress={() => navigation.navigate("SettingsScreen")}
              />
            ),
          })}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{ title: "Settings" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
