import React from "react";
import { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Colors from "../utils/constants/Colors";
import Typography from "../utils/constants/Typography";
import Spacing from "../utils/constants/Spacing";
import AppTextInput from "../components/AppTextInput";
import PrimaryDefaultButton from "../components/PrimaryDefaultButton";
import { auth } from "../../firebase";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("ChatScreen");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);
      })

      .catch((err) => {
        if (
          err.code === "auth/user-not-found" ||
          err.code === "auth/wrong-password"
        ) {
          alert("Invalid email or password. Please try again.");
        } else {
          alert(err.message);
        }
      });
  };

  const handleResetPassword = () => {
    navigation.navigate("ResetPasswordScreen");
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: "#282534" },
      headerTintColor: "#282534",
    });
  }, [navigation]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={Colors.white} />
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Login here</Text>
            <Text style={styles.subtitle}>Happy to see you again!</Text>
            <Text style={styles.subtitle}>Please login first.</Text>
          </View>
          <View style={styles.inputContainer}>
            <AppTextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <AppTextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
          </View>

          <Text style={styles.plainText}>
            Forgot your password?{" "}
            <Text style={styles.clickableText} onPress={handleResetPassword}>
              Click here
            </Text>
          </Text>

          <PrimaryDefaultButton title="Sign in" onPress={handleLogin} />
          <Text style={styles.plainText}>
            Don't have an account yet?{" "}
            <Text
              style={styles.clickableText}
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              Register
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.romance,
  },
  contentContainer: {
    padding: Spacing.space8 * 2,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: Spacing.space8 * 4,
  },
  title: {
    fontSize: Typography.headings.h1.fontSize,
    color: Colors.primary.darkCerulean,
    fontWeight: "bold",
    marginVertical: Spacing.space8,
  },
  subtitle: {
    fontSize: Typography.headings.h2.fontSize,
    maxWidth: "80%",
    textAlign: "center",
    color: Colors.primary.darkCerulean,
  },
  inputContainer: {
    marginVertical: Spacing.space8 * 1,
  },
  forgotPasswordText: {
    color: Colors.primary.darkCerulean,
    textAlign: "center",
    fontSize: Typography.paragraphs.p1.fontSize,
  },

  plainText: {
    color: Colors.primary.darkCerulean,
    textAlign: "center",
    fontSize: Typography.paragraphs.p1.fontSize,
  },
  clickableText: {
    color: Colors.primary.darkCerulean,
    textDecorationLine: "underline",
  },
});

export default Login;
