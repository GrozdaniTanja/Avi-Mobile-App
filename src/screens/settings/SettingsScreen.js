import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../utils/constants/Colors";
import Typography from "../../utils/constants/Typography";
import { auth } from "../../../firebase";
import { getDatabase, ref, remove } from "firebase/database";
const SettingsScreen = ({ navigation }) => {
  // TODO: add FAQ screen

  const handleProfileSettings = () => {
    navigation.navigate("ProfileScreen");
  };

  const handleNotifications = () => {
    navigation.navigate("NotificationSettingsScreen");
  };

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

  // Handle the user logout
  const handleLogout = () => {
    const user = auth.currentUser;

    if (user) {
      console.log(user.toString());
      auth
        .signOut()
        .then(() => {
          console.log("User signed out!");
          navigation.navigate("WelcomeScreen");
        })
        .catch((error) => {
          console.log("Sign out error", error);
        });
    } else {
      console.log("No user is signed in.");
    }
  };

  // Handle the user account deletion
  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: handleConfirmation,
        },
      ],
      { cancelable: true }
    );
  };

  // Handle the confirmation for account deletion
  const handleConfirmation = () => {
    const user = auth.currentUser;
    if (user) {

      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);

      // Delete the user data from the Realtime Database
      remove(userRef)
        .then(() => {
          console.log("User data deleted from Realtime Database!");

          // Delete the user account
          user.delete()
            .then(() => {
              console.log("User account deleted!");
              if (navigation) {
                navigation.navigate("WelcomeScreen");
              } else {
                console.log("navigation is undefined.");
              }
            })
            .catch((error) => {
              console.log("Delete account error", error);
            });
        })
        .catch((error) => {
          console.log("Delete data error", error);
        });
    } else {
      console.log("No user is signed in.");
    }
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

      <TouchableOpacity style={styles.option} onPress={handleProfileSettings}>
        <View style={styles.optionLeft}>
          <Ionicons
            name="person-circle-outline"
            size={24}
            color={Colors.neutral.nightBlack}
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>Profile Settings</Text>
        </View>
        <Ionicons
          name="chevron-forward-outline"
          size={24}
          color={Colors.neutral.nightBlack}
          style={styles.optionArrow}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={handleNotifications}>
        <View style={styles.optionLeft}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={Colors.neutral.nightBlack}
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>Notifications</Text>
        </View>
        <Ionicons
          name="chevron-forward-outline"
          size={24}
          color={Colors.neutral.nightBlack}
          style={styles.optionArrow}
        />
      </TouchableOpacity>

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
      <View style={styles.blankSpace} />

      <TouchableOpacity style={styles.option} onPress={handleLogout}>
        <View style={styles.optionLeft}>
          <Ionicons
            name="log-out-outline"
            size={24}
            color={Colors.neutral.nightBlack}
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>Logout</Text>
        </View>
        <Ionicons
          name="chevron-forward-outline"
          size={24}
          color={Colors.neutral.nightBlack}
          style={styles.optionArrow}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={handleDeleteAccount}>
        <View style={styles.optionLeft}>
          <Ionicons
            name="trash-outline"
            size={24}
            color={Colors.neutral.nightBlack}
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>Delete account</Text>
        </View>
        <Ionicons
          name="chevron-forward-outline"
          size={24}
          color={Colors.neutral.nightBlack}
          style={styles.optionArrow}
        />
      </TouchableOpacity>

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
