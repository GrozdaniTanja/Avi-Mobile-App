import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Image,
} from "react-native";
import Colors from "../utils/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ConfirmationScreen = ({ route }) => {
    const { selectedTime } = route.params;
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();


    const handleStartChatting = () => {
        navigation.navigate("ChatScreen");
    };

    return (
        <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={styles.topContainer}>
                <Text style={styles.heading}>Confirmation</Text>
                <Text style={styles.subHeading}>Your notification time has been set to:</Text>
                <Text style={styles.selectedTime}>{selectedTime}</Text>
            </View>
            <Image
                source={require("../assets/images/confirmation.jpg")}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.noteText}>You can always adjust your notification time in the app settings.</Text>
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.button} onPress={handleStartChatting}>
                    <Text style={styles.buttonText}>Start Chatting</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    topContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    bottomContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 20,
    },
    heading: {
        color: Colors.primary,
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subHeading: {
        color: Colors.darkGrey,
        fontSize: 18,
        textAlign: "center",
        marginBottom: 10,
        marginTop: 15,
    },
    noteText: {
        fontSize: 16,
        textAlign: "center",
        marginHorizontal: 20,
        marginBottom: 20,
    },
    selectedTime: {
        color: Colors.primary,
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: Colors.primary,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 15,
        borderRadius: 20,
        width: "100%",
    },
    buttonText: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "uppercase",
    },
    adjustTimeText: {
        color: Colors.darkGrey,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 15,
    },
});

export default ConfirmationScreen;
