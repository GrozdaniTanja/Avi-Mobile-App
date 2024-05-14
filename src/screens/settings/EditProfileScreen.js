import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import Colors from "../../utils/constants/Colors";
import Typography from "../../utils/constants/Typography";
import { auth, database } from "../../../firebase";
import { getDatabase, ref, onValue, update } from "firebase/database";

const EditProfileScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        fetchUserData();
    }, []);

    // Fetch user data from the database
    const fetchUserData = () => {
        const user = auth.currentUser;
        if (user) {
            const db = getDatabase();
            const userRef = ref(db, `users/${user.uid}`);
            onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                setName(data.name);
                setEmail(data.email);
            });
        }
    };

    // Function to extract initials from a given name
    const getInitials = (name) => {
        const names = name.split(" ");
        const initials = names.map((n) => n.charAt(0).toUpperCase()).join("");
        return initials;
    };

    // Function to generate an avatar component based on the given name
    const generateAvatar = (name) => {
        const initials = getInitials(name);
        const avatarStyle = {
            backgroundColor: Colors.primary,
        };
        return (
            <View style={[styles.avatar, avatarStyle]}>
                <Text style={styles.avatarText}>{initials}</Text>
            </View>
        );
    };

    // Handle submit for saving the profile changes
    const handleSubmit = () => {
        const user = auth.currentUser;
        if (user) {
            const db = getDatabase();
            const userRef = ref(db, `users/${user.uid}`);
            const updates = {
                name: name,
                email: email,
            };

            update(userRef, updates)
                .then(() => {
                    console.log("User data updated successfully");
                    // Update the state to reflect the changes immediately
                    setName(name);
                    setEmail(email);
                    navigation.goBack(); // Navigate back to the previous screen
                })
                .catch((error) => {
                    console.log("Error updating user data:", error);
                });
        }
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitleStyle: { color: "#282534" },
            headerTintColor: "#282534",
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                {generateAvatar(name)}
                <Text style={styles.name}>{name}</Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Name"
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleSubmit({ name, email })}
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    avatarContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        justifyContent: "center",
        alignItems: "center",
    },
    avatarText: {
        fontSize: 60,
        fontWeight: "bold",
        color: "#fff",
    },
    form: {
        width: "80%",
    },
    label: {
        marginTop: 20,
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
    },
    button: {
        marginTop: 20,
        backgroundColor: Colors.neutral.rangoonGreen,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
    },
    name: {
        fontSize: Typography.headings.h1.fontSize,
        fontWeight: "bold",
        marginTop: 10,
    },
});

export default EditProfileScreen;
