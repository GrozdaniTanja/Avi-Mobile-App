import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../utils/constants/Colors';
import Spacing from '../utils/constants/Spacing';
import Typography from '../utils/constants/Typography';

const PrimaryDefaultButton = ({ onPress, title }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btn}
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
        flex: 1,
        marginVertical: Spacing.space8 * 3,
        borderRadius: Spacing.space8,
        shadowColor: Colors.primary.coolGray,
        shadowRadius: Spacing.space8,
    },
    btnText: {
        fontWeight: "600",
        fontSize: Typography.buttons.button1.fontSize,
        color: Colors.neutral.romance,
    },
});

export default PrimaryDefaultButton;
