import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

async function schedulePushNotification(date) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Avi time! 📬",
            body: 'How do you feel today',
            data: { data: 'random' },
        },
        trigger: {
            hour: date.getHours(),
            minute: date.getMinutes(),
            repeats: true,
        },
    });
}

export { schedulePushNotification };
