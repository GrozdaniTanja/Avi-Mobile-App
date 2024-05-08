import { View, StyleSheet, Animated } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Colors from "../utils/constants/Colors";
import Typography from "../utils/constants/Typography";
import Spacing from "../utils/constants/Spacing";

const SplashScreen = (props) => {
  const [authLoaded, setAuthLoaded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      setAuthLoaded(true);
    }, 6000);
  }, []);

  useEffect(() => {
    if (authLoaded) {
      props.navigation.replace("OnboardingScreen");
    }
  }, [authLoaded, props.navigation]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/images/avi-logo.png")}
        style={[styles.splash, { opacity: fadeAnim }]}
      />
      <View style={styles.textContainer}>
        <Animated.Text style={[styles.appName, { opacity: fadeAnim }]}>
          Avi
        </Animated.Text>
        <Animated.Text style={[styles.slogan, { opacity: fadeAnim }]}>
          Your mental health companion
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.neutral.romance,
  },
  contentContainer: {
    alignItems: "center",
  },
  splash: {
    width: 200,
    height: 200,
  },
  textContainer: {
    marginTop: Spacing.space16,
    alignItems: "center",
  },
  appName: {
    color: Colors.primary.darkCerulean,
    fontSize: Typography.headings.h1.fontSize,
    fontWeight: Typography.headings.fontWeight,
  },
  slogan: {
    fontSize: Typography.headings.h4.fontSize,
    color: Colors.primary.darkCerulean,
    marginTop: Spacing.space8,
  },
});

export default SplashScreen;
