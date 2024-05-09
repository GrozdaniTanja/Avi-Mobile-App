import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import Colors from "../utils/constants/Colors";
import Typography from "../utils/constants/Typography";
import Spacing from "../utils/constants/Spacing";
import PrimaryDefaultButton from "../components/PrimaryDefaultButton";
import SecondaryDefaultButton from "../components/SecondaryDefaultButton";

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundContainer}>
        <ImageBackground
          style={styles.backgroundImage}
          resizeMode="contain"
          source={require("../assets/images/welcome-screen.png")}
        ></ImageBackground>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Start chatting with Avi!</Text>
        <View style={styles.buttonsContainer}>
          <PrimaryDefaultButton
            title="Login"
            onPress={() => navigation.navigate("LoginScreen")}
            flex={1}
          />
          <View style={{ width: 15 }} />
          <SecondaryDefaultButton
            onPress={() => navigation.navigate("RegisterScreen")}
            title="Register"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.romance,
  },
  backgroundContainer: {
    flex: 1,
    marginTop: Spacing.space8 * 2,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: Spacing.space8 * 3,
    paddingTop: Spacing.space8 * 1,
    backgroundColor: Colors.neutral.romance,
  },
  text: {
    fontSize: Typography.headings.h1.fontSize,
    color: Colors.primary.darkCerulean,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: Spacing.space8 * 4,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Spacing.space8 * 10,
  },
});

export default WelcomeScreen;
