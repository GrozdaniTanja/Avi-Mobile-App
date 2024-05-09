import React, { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import AppTextInput from "../components/AppTextInput";
import Colors from "../utils/constants/Colors";
import Typography from "../utils/constants/Typography";
import Spacing from "../utils/constants/Spacing";
import PrimaryDefaultButton from "../components/PrimaryDefaultButton";

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    // TODO: implement reset password functionality
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: "#282534" },
      headerTintColor: "#282534",
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.neutral.romance }}>
      <View style={{ padding: Spacing.space8 * 2 }}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: Typography.headings.h1.fontSize,
              color: Colors.primary.darkCerulean,
              fontWeight: "bold",
              marginVertical: Spacing.space8 * 3,
            }}
          >
            Reset password
          </Text>
          <Text
            style={{
              fontSize: Typography.headings.h2.fontSize,
              maxWidth: "60%",
              textAlign: "center",
              color: Colors.primary.darkCerulean,
            }}
          >
            Please enter your email address and we will send you a link to reset
            your password.
          </Text>
        </View>
        <View style={{ marginVertical: Spacing.space8 * 3 }}>
          <AppTextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          ></AppTextInput>
        </View>

        <PrimaryDefaultButton title="Send link" onPress={handleResetPassword} />
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
