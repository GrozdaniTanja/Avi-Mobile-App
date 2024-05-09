import {
    TextInput,
    TextInputProps,
} from "react-native";
import React, { useState } from "react";
import Colors from "../utils/constants/Colors";
import Typography from "../utils/constants/Typography";
import Spacing from "../utils/constants/Spacing";

const AppTextInput: React.FC<TextInputProps> = ({ ...otherProps }) => {
    const [focused, setFocused] = useState<boolean>(false);
    return (
        <TextInput
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholderTextColor={Colors.primary.coolGray}
            style={[
                {
                    fontSize: Typography.paragraphs.p1.fontSize,
                    padding: Spacing.space8 * 2,
                    backgroundColor: Colors.neutral.romance,
                    borderRadius: Spacing.space8,
                    marginVertical: Spacing.space8,
                },
                focused && {
                    borderWidth: 2,
                    borderRadius: Spacing.space8 * 2,
                    borderColor: Colors.primary.darkCerulean,
                    shadowOffset: { width: 4, height: Spacing.space8 },
                    shadowColor: Colors.primary.darkCerulean,
                    shadowOpacity: 0.3,
                    shadowRadius: Spacing.space8,
                },
            ]}
            {...otherProps}
        ></TextInput>
    );
};

export default AppTextInput;