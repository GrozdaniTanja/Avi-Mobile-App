import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../utils/constants/Colors";
import Typography from "../../utils/constants/Typography";

const SettingsScreen = ({ navigation }) => {
  // TODO: add profile screen, edit profile functionality, notifications screen, logout button, delete account, FAQ screen

  const handlePrivacyPolicy = () => {
    // this is a placeholder link, not a real one!
    Linking.openURL(
      "https://www.termsfeed.com/live/2b9d0068-fceb-4695-9556-e8bd2d148655"
    );
  };

  const handleTermsAndConditions = () => {
    // this is a placeholder link, not a real one!
    Linking.openURL(
      "https://www.termsfeed.com/live/cbb3653b-d517-4b31-b790-9f43a3436033"
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: Colors.neutral.nightBlack },
      headerTintColor: Colors.neutral.nightBlack,
      headerBackTitle: "Back",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.blankSpace} />

      <TouchableOpacity style={styles.option} onPress={handlePrivacyPolicy}>
        <View style={styles.optionLeft}>
          <Ionicons
            name="lock-closed"
            size={24}
            color={Colors.neutral.nightBlack}
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>Privacy Policy</Text>
        </View>
        <Ionicons
          name="chevron-forward-outline"
          size={24}
          color={Colors.neutral.nightBlack}
          style={styles.optionArrow}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={handleTermsAndConditions}
      >
        <View style={styles.optionLeft}>
          <Ionicons
            name="document-text-outline"
            size={24}
            color={Colors.neutral.nightBlack}
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>Terms & Conditions</Text>
        </View>
        <Ionicons
          name="chevron-forward-outline"
          size={24}
          color={Colors.neutral.nightBlack}
          style={styles.optionArrow}
        />
      </TouchableOpacity>

      <View style={styles.blankSpace} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.romance,
    paddingVertical: 16,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.romance,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.romance,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    marginLeft: 12,
    fontSize: Typography.paragraphs.p1.fontSize,
    color: Colors.neutral.nightBlack,
  },

  blankSpace: {
    height: 20,
  },
  optionIcon: {
    marginLeft: 20,
  },
  optionArrow: {
    marginRight: 15,
    color: Colors.neutral.nightBlack,
  },
});

export default SettingsScreen;
