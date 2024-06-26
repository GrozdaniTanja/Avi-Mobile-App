import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Alert,
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
import { getDatabase, ref, set } from "firebase/database";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    if (!name || !email || !password) {
      alert("Please fill out all inputs.");
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        const email = user.email;
        const uid = user.uid;
        db = getDatabase();
        set(ref(db, "users/" + uid), {
          name: name,
          email: email,
          password: password,
        });
        navigation.navigate("NotificationsScreen");
      })
      .then((data) => {
        console.log("data ", data);
      })
      .catch((err) => {
        let errorMessage = "An error occurred. Please try again.";
        switch (err.code) {
          case "auth/weak-password":
            errorMessage = "Password should be at least 6 characters.";
            break;
          case "auth/email-already-in-use":
            errorMessage = "The email address is already in use.";
            break;
          case "auth/invalid-email":
            errorMessage = "The email address is invalid.";
            break;
          default:
            break;
        }
        Alert.alert("Error", errorMessage);
      });
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
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Create an account</Text>
            <Text style={styles.subheadingText}>
              Let's start our journey together!
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <AppTextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <AppTextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <AppTextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <AppTextInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>
          <PrimaryDefaultButton title="Register" onPress={handleRegister} />
          <View style={styles.haveAccountContainer}>
            <Text style={styles.plainText}>
              Already have an account?{" "}
              <Text
                style={styles.clickableText}
                onPress={() => navigation.navigate("LoginScreen")}
              >
                Log in
              </Text>
            </Text>
          </View>
          <Text style={styles.privacyText}>
            By signing up, you agree to our{" "}
            <Text style={styles.privacyLink}>Privacy Policy</Text> and{" "}
            <Text style={styles.privacyLink}>Terms and Conditions</Text>.
          </Text>
          <View style={styles.spacing} />
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
  headingContainer: {
    alignItems: "center",
  },
  headingText: {
    fontSize: Typography.headings.h1.fontSize,
    color: Colors.primary.darkCerulean,
    fontWeight: "bold",
    marginVertical: Spacing.space8 / 2,
  },
  subheadingText: {
    fontSize: Typography.headings.h2.fontSize,
    maxWidth: "80%",
    textAlign: "center",
    color: Colors.primary.darkCerulean,
  },
  inputContainer: {
    marginVertical: Spacing.space8 * 2,
  },
  registerButton: {
    padding: Spacing.space8 * 2,
    backgroundColor: Colors.primary.darkCerulean,
    marginVertical: Spacing.space8 / 2,
    borderRadius: Spacing.space8,
    shadowColor: Colors.primary.darkCerulean,
    shadowOffset: {
      width: 0,
      height: Spacing.space8,
    },
    shadowOpacity: 0.1,
    shadowRadius: Spacing.space8,
  },
  registerButtonText: {
    color: Colors.primary.darkCerulean,
    textAlign: "center",
    fontSize: Typography.buttons.button1.fontSize,
  },
  haveAccountContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: Spacing.space8,
  },
  privacyText: {
    color: Colors.primary.darkCerulean,
    textAlign: "center",
    fontSize: Typography.paragraphs.p1.fontSize,
  },
  privacyLink: {
    color: Colors.primary.darkCerulean,
    textDecorationLine: "underline",
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

export default Register;
