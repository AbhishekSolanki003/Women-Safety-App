import React, { useEffect, useState, useRef } from "react";
import { View, Text, Alert, StyleSheet, Button, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import * as Linking from "expo-linking";
import { Audio } from "expo-av";

const EmergencyScreen = () => {
  const recordingRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    (async () => {
      const { status: audioStatus } = await Audio.requestPermissionsAsync();
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();

      if (audioStatus === "granted" && locationStatus === "granted" && mediaStatus === "granted") {
        setHasPermission(true);
      } else {
        setHasPermission(false);
        Alert.alert(
          "Permissions Required",
          "Please enable audio, location, and media permissions in settings."
        );
      }
    })();
  }, []);

  const handleSendEmergencySMS = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const message = `🚨 EMERGENCY! Location: https://maps.google.com/?q=${location.coords.latitude},${location.coords.longitude}`;
      const smsNumber = "1234567890"; // Replace with real emergency contact
      const smsUrl = `sms:${smsNumber}?body=${encodeURIComponent(message)}`;

      await Linking.openURL(smsUrl);
      console.log("📩 SMS sent successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to send SMS or fetch location.");
      console.error("SMS Error:", error);
    }
  };

  const startAudioRecording = async () => {
    try {
      setIsRecording(true);

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      recordingRef.current = recording;
      console.log("🎙️ Recording started");

      // Auto stop after 30 seconds
      const timeout = setTimeout(() => {
        stopAndSaveAudioRecording();
      }, 30000);
      setTimeoutId(timeout);
    } catch (error) {
      console.error("Audio Recording Error:", error);
      Alert.alert("Error", "Failed to start audio recording.");
      setIsRecording(false);
    }
  };

  const stopAndSaveAudioRecording = async () => {
    try {
      const recording = recordingRef.current;
      if (!recording) return;

      clearTimeout(timeoutId);

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      await MediaLibrary.createAssetAsync(uri);
      console.log("🎧 Audio saved:", uri);
    } catch (error) {
      console.error("Stop Recording Error:", error);
      Alert.alert("Error", "Failed to stop/save audio.");
    } finally {
      setIsRecording(false);
    }
  };

  const triggerEmergency = async () => {
    await handleSendEmergencySMS();
    await startAudioRecording();
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Permissions Denied</Text>
        <Text style={styles.subtitle}>Please enable audio, location, and media access in settings.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency SOS</Text>
      <Text style={styles.subtitle}>Press button to trigger SOS</Text>

      <Button
        title={isRecording ? "Recording Audio..." : "Trigger SOS"}
        color="white"
        onPress={triggerEmergency}
        disabled={isRecording}
      />

      {isRecording && (
        <View style={{ marginTop: 20 }}>
          <Button
            title="Stop Recording"
            color="black"
            onPress={stopAndSaveAudioRecording}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
  },
});

export default EmergencyScreen;
