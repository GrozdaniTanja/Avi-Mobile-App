import React, { useState, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../utils/constants/Colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import { schedulePushNotification } from "../../BackgroundNotification";
import * as Notifications from "expo-notifications";
import { AppContext } from "../../AppContext";

// Set up the notification handler to customize the notification behavior
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const NotificationsScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const { selectedTime, setReminderTime } = useContext(AppContext);

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirm = (date) => {
        const formattedTime = date.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
        });
        setReminderTime(formattedTime);
        hideDatePicker();
        console.log(date.getMinutes() + "----" + date.getHours());
        schedulePushNotification(date);
        navigation.navigate("ConfirmationScreen", { selectedTime: formattedTime });
    };

    const handleNotNow = () => {
        navigation.navigate("ChatScreen");
    };

    return (
        <SafeAreaView
            style={[
                styles.container,
                { paddingTop: insets.top, paddingBottom: insets.bottom },
            ]}
        >
            <View style={styles.topContainer}>
                <Text style={styles.heading}>Before you start</Text>
                <Text style={styles.subHeading}>
                    Choose when you want to receive reminders to check in with Avi.
                </Text>
            </View>
            <View style={styles.middleContainer}>
                <Image
                    source={require("../assets/images/pushNotifications.jpg")}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.bottomContainer}>
                {selectedTime ? (
                    <Text style={styles.selectedTimeText}>
                        Selected Time: {selectedTime}
                    </Text>
                ) : (
                    <TouchableOpacity style={styles.button} onPress={showDatePicker}>
                        <Text style={styles.buttonText}>SELECT TIME</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={handleNotNow}>
                    <Text testID={'notNowButton'} style={styles.nextText}>Not now</Text>
                </TouchableOpacity>
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    topContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    middleContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    bottomContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    heading: {
        color: Colors.primary,
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
        alignSelf: "center",
    },
    subHeading: {
        color: Colors.darkGrey,
        fontSize: 18,
        textAlign: "center",
        marginBottom: 10,
        marginTop: 15,
    },
    image: {
        width: 350,
        height: 350,
        marginTop: 20,
    },
    button: {
        backgroundColor: "transparent",
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 15,
        borderRadius: 20,
        width: "80%",
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    buttonText: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "uppercase",
    },
    nextText: {
        color: Colors.darkGrey,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "uppercase",
        marginTop: 15,
    },
    selectedTimeText: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "uppercase",
        marginBottom: 15,
    },
});

export default NotificationsScreen;
