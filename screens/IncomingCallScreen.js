import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar } from "react-native";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getRandomName = () => {
  const names = ["Rahul Sharma", "Priya Singh", "Amit Patel", "Neha Gupta", "Unknown Caller"];
  return names[Math.floor(Math.random() * names.length)];
};

const getRandomNumber = () => {
  return "+91 " + Math.floor(9000000000 + Math.random() * 1000000000);
};

const IncomingCallScreen = ({ navigation }) => {
  const [sound, setSound] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const callerName = getRandomName();
  const callerNumber = getRandomNumber();

  useEffect(() => {
    StatusBar.setHidden(true);
    playRingtone();

    return () => {
      stopRingtone();
      StatusBar.setHidden(false);
      if (timerInterval) clearInterval(timerInterval);
    };
  }, []);

  const playRingtone = async () => {
    const { sound } = await Audio.Sound.createAsync(require("../assets/ringtone.mp3"), {
      shouldPlay: true,
      isLooping: true,
    });
    setSound(sound);
    await sound.playAsync();
  };

  const stopRingtone = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }
  };

  const rejectCall = async () => {
    stopRingtone();
    await AsyncStorage.removeItem("fakeCallScheduled"); // Clear scheduled call
    navigation.goBack();
  };

  const acceptCall = () => {
    stopRingtone();
    setIsAnswered(true);
    startCallTimer();
  };

  const startCallTimer = () => {
    let seconds = 0;
    const interval = setInterval(() => {
      seconds += 1;
      setCallDuration(seconds);
    }, 1000);
    setTimerInterval(interval);
  };

  const endCall = async () => {
    if (timerInterval) clearInterval(timerInterval);
    await AsyncStorage.removeItem("fakeCallScheduled"); // Ensure no duplicate calls
    navigation.goBack();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.callInfo}>
        <Text style={styles.callerName}>{callerName}</Text>
        <Text style={styles.callerNumber}>{callerNumber}</Text>
        <Text style={styles.callingText}>{isAnswered ? formatTime(callDuration) : "Incoming Call..."}</Text>
      </View>

      {!isAnswered ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.rejectButton} onPress={rejectCall}>
            <Image source={require("../assets/reject-calls.png")} style={styles.buttonIcon} />
            <Text style={styles.rejectText}>Decline</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.acceptButton} onPress={acceptCall}>
            <Image source={require("../assets/accept-call.png")} style={styles.buttonIcon} />
            <Text style={styles.acceptText}>Accept</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.endCallButton} onPress={endCall}>
          <Image source={require("../assets/reject-calls.png")} style={styles.buttonIcon} />
          <Text style={styles.rejectText}>End Call</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#1C1C1E" },
  callInfo: { position: "absolute", top: "20%", alignItems: "center" },
  callerName: { fontSize: 32, fontWeight: "600", color: "#FFF" },
  callerNumber: { fontSize: 20, color: "#CCC", marginTop: 5 },
  callingText: { fontSize: 18, color: "#A3A3A3", marginTop: 10 },
  buttonContainer: { position: "absolute", bottom: 80, flexDirection: "row", justifyContent: "space-around", width: "80%" },
  rejectButton: { alignItems: "center" },
  acceptButton: { alignItems: "center" },
  endCallButton: { position: "absolute", bottom: 80, alignItems: "center" },
  buttonIcon: { width: 80, height: 80 },
  rejectText: { color: "#FFF", fontSize: 16, marginTop: 5 },
  acceptText: { color: "#FFF", fontSize: 16, marginTop: 5 },
});

export default IncomingCallScreen;
