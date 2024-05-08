import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../utils/constants/Colors';
import Spacing from '../utils/constants/Spacing';
import Typography from '../utils/constants/Typography';

const PrimaryDefaultButton = ({ onPress, title, flex }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.btn, flex && { flex }]}
            onPress={onPress}
        >
            <Text style={styles.btnText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary.darkCerulean,
        padding: Spacing.space8 * 2,
        marginVertical: Spacing.space8 * 3,
        borderRadius: Spacing.space8,
        shadowColor: Colors.primary.coolGray,
        shadowRadius: Spacing.space8,
        alignSelf: "center",
        width: "40%"

    },
    btnText: {
        color: Colors.neutral.white,
        fontWeight: "600",
        fontSize: Typography.buttons.button1.fontSize,
    },
});

export default PrimaryDefaultButton;
