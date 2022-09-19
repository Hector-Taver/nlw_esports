import * as Notifications from "expo-notifications";

export const getPushNotificationToke = async () => {
  const { granted } = await Notifications.getPermissionsAsync();

  if(!granted) {
    await Notifications.requestPermissionsAsync();
  }

  if(granted) {
    const pushToken = await Notifications.getExpoPushTokenAsync();

    return pushToken.data;
  }
}
