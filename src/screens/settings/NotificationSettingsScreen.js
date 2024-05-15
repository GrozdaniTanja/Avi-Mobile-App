import React, { useState, useContext, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../utils/constants/Colors";
import { AppContext } from "../../../AppContext";

const NotificationSettingsScreen = ({ navigation }) => {
    const [toggleValue, setToggleValue] = useState(false);
    const { selectedTime, setReminderTime } = useContext(AppContext);

    // Set up the navigation options
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitleStyle: { color: "#282534" },
            headerTintColor: "#282534",
        });
    }, [navigation]);


    useEffect(() => {
        setToggleValue(!!selectedTime);
    }, [selectedTime]);

    const handleToggle = (value) => {
        setToggleValue(value);
        if (!value) {
            setReminderTime(null);
        }
        else {
            navigation.navigate('RemaindersSettings');
        }
    };

    const handleDailyRemainders = () => {
        navigation.navigate("RemaindersSettings");
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitleStyle: { color: "#282534" },
            headerTintColor: "#282534",
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.blankSpace} />
            <TouchableOpacity style={styles.option}>
                <View style={styles.optionLeft}>
                    <Text style={styles.optionText}>Allow notifications</Text>
                </View>
                <Switch
                    value={toggleValue}
                    onValueChange={handleToggle}
                    style={styles.optionArrow}
                />
            </TouchableOpacity>
            <View style={styles.blankSpace} />
            <View style={styles.blankSpace} />

            <TouchableOpacity
                style={[
                    styles.option,
                    {
                        opacity: toggleValue ? 1 : 0.5,
                        pointerEvents: toggleValue ? "auto" : "none",
                    },
                ]}
                onPress={handleDailyRemainders}
                disabled={!toggleValue}
            >
                <View style={styles.optionLeft}>
                    <Text style={styles.optionText}>Daily remainders</Text>
                </View>
                <Ionicons
                    name="chevron-forward-outline"
                    size={24}
                    color="#282534"
                    style={styles.optionArrow}
                />
            </TouchableOpacity>
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
    optionText: {
        marginLeft: 12,
        fontSize: 16,
        color: "#333333",
    },
    blankSpace: {
        height: 20,
    },
    optionArrow: {
        marginRight: 15,
        color: Colors.darkGrey,
    },
});

export default NotificationSettingsScreen;
