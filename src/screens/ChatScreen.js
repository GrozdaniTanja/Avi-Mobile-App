import { View } from "react-native";
import React, { useState, useCallback } from "react";
import { GiftedChat, Send } from "react-native-gifted-chat";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);

  const { bottom } = useSafeAreaInsets();

  const onSend = useCallback((message = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, message)
    );
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: "#282534" },
      headerTintColor: "#282534",
      headerLeft: null,
    });
  }, [navigation]);
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ marginRight: 10, marginBottom: 10 }}>
          <Ionicons name="send" size={24} color="#282534" />
        </View>
      </Send>
    );
  };

  return (
    <View style={{ flex: 1, paddingBottom: bottom }}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1,
          avatar: `https://ui-avatars.com/api/?background=ffffff&color=282534&length=1&name=Test`,
        }}
        alwaysShowSend
        scrollToBottom
        renderSend={renderSend}
        showUserAvatar={true}
      />
    </View>
  );
}
