import React, { useEffect } from 'react';
import { View, Button, Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function FakeNotification() {
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    if (Device.isDevice) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission not granted for notifications');
        return;
      }

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.HIGH,
        });
      }
    } else {
      Alert.alert('Must use a physical device for notifications');
    }
  };

  const triggerFakeNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '📲 WhatsApp',
        body: 'Hey, are you okay? Call me ASAP!',
        sound: true,
      },
      trigger: null,
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Trigger Fake Alert" onPress={triggerFakeNotification} />
    </View>
  );
}
