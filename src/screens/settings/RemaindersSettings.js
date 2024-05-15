import React, { useState, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Colors from "../../utils/constants/Colors";
import { schedulePushNotification } from "../../../BackgroundNotification";
import * as Notifications from "expo-notifications";
import { AppContext } from "../../../AppContext";

import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const RemaindersSettings = ({ navigation }) => {
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
        Toast.show({
            type: "success",
            text1: "Success!",
            text2: "Your Avi remainders have been saved.",
        });
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitleStyle: { color: "#282534" },
            headerTintColor: "#282534",
            headerBackTitle: "Back",
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.blankSpace} />
            <Text style={styles.text}>
                Stay informed and connected with Avi's daily notifications. By
                checking in with Avi every day, you'll receive valuable insights,
                mindfulness exercises, and personalized support to improve your mental
                well-being. Don't miss out on the opportunity to prioritize your
                self-care and unlock a happier and healthier you.
                {"\n"}
                {"\n"}
                When do you want to receive notifications?
            </Text>

            <View style={styles.blankSpace} />

            {selectedTime ? (
                <Text style={styles.optionText}>Your selection: {selectedTime}</Text>
            ) : null}

            <View style={styles.blankSpace} />

            <TouchableOpacity style={styles.option} onPress={showDatePicker}>
                <View style={styles.optionLeft}>
                    <Text style={styles.optionText}>Select time</Text>
                </View>
                <Ionicons
                    name="chevron-forward-outline"
                    size={24}
                    color="#282534"
                    style={styles.optionArrow}
                />
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <Toast position="bottom" style={{ color: "red" }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F4F4",
        paddingVertical: 16,
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: "#EAEAEA",
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
        paddingVertical: 10,
        backgroundColor: "#FFFFFF",
    },
    optionLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        marginLeft: 12,
        fontSize: 14,
        color: Colors.darkGrey,
    },
    optionText: {
        marginLeft: 12,
        fontSize: 14,
        color: "black",
    },
    blankSpace: {
        height: 20,
    },
    optionArrow: {
        marginRight: 15,
        color: Colors.darkGrey,
    },
    selectedTimeText: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "uppercase",
        marginBottom: 15,
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
});

export default RemaindersSettings;
