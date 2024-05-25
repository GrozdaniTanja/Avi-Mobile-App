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
import ProfileScreen from "./src/screens/settings/ProfileScreen";
import EditProfileScreen from "./src/screens/settings/EditProfileScreen";
import RemaindersSettings from "./src/screens/settings/RemaindersSettings";
import NotificationsScreen from "./src/screens/NotificationsScreen";
import NotificationSettingsScreen from "./src/screens/settings/NotificationSettingsScreen";
import ConfirmationScreen from "./src/screens/ConfirmationScreen";
import ChatScreen from "./src/screens/ChatScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "./src/utils/constants/Colors";
import SettingsScreen from "./src/screens/settings/SettingsScreen";
import { AppProvider } from "./AppContext";
import { LogBox } from 'react-native';
const Stack = createStackNavigator();

const App = () => {
  LogBox.ignoreAllLogs(true); 
  return (
    <AppProvider>
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
            name="NotificationsScreen"
            component={NotificationsScreen}
            options={{ headerBackTitleVisible: false, title: " " }}
          />
          <Stack.Screen
            name="ConfirmationScreen"
            component={ConfirmationScreen}
            options={{ headerShown: false, title: " " }}
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
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ title: "My Profile" }}
          />
          <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
            options={{ title: "Edit Profile" }}
          />
          <Stack.Screen
            name="NotificationSettingsScreen"
            component={NotificationSettingsScreen}
            options={{ title: "Notifications" }}
          />
          <Stack.Screen
            name="RemaindersSettings"
            component={RemaindersSettings}
            options={{

              title: "Daily Remainders",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
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
