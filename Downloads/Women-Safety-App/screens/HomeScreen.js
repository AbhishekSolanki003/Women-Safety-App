import React, { useState, useEffect } from "react";
import {
  View, Text, StyleSheet, Image, TouchableOpacity, Alert, Animated, Dimensions
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Linking from "expo-linking";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import * as SMS from "expo-sms";
import BottomNav from "../components/BottomNav";
import FAQScreen from "./FAQ";
import { Audio } from "expo-av";


const screenWidth = Dimensions.get("window").width;

const HomeScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-screenWidth))[0];
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);

  //  Get real-time location updates
  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required to fetch live location.");
        return;
      }

      //  Start watching live location
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // Update every 5 seconds
          distanceInterval: 10, // Update when user moves 10 meters
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );
    };

    getLocation();
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); //  First update state
    Animated.timing(slideAnim, {
      toValue: menuVisible ? -screenWidth : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };


  const shareLiveLocation = async () => {
    if (!location) {
      Alert.alert("Error", "Fetching live location... Please try again in a few seconds.");
      return;
    }

    const locationUrl = `https://www.google.com/maps?q=${location.coords.latitude},${location.coords.longitude}`;
    const message = `I'm sharing my live location: ${locationUrl}`;

    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      await SMS.sendSMSAsync(["8010155124"], message);
      Alert.alert("Success", "Live location sent successfully!");
    } else {
      Alert.alert("SMS Not Available", "Your device does not support sending SMS.");
    }
  };

  // SOS Button Functionality
  const sosAction = () => {
    Alert.alert(
      "Emergency SOS",
      "Choose an action:",
      [
        { text: "Call Emergency Contacts", onPress: callEmergencyContacts },
        { text: "Call Ambulance", onPress: () => Linking.openURL("tel:102") },
        { text: "Call Police", onPress: () => Linking.openURL("tel:100") },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const callEmergencyContacts = async () => {
    const emergencyNumbers = ["8010155124", "9876543210"]; // Add your saved numbers here
    for (const number of emergencyNumbers) {
      await Linking.openURL(`tel:${number}`);
    }
  };

  //urgent btn functionality
  const [soundObj, setSoundObj] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playAlertSound = async () => {
    try {
      await shareLiveLocation();
      if (!isPlaying) {
        const { sound } = await Audio.Sound.createAsync(
          require("../assets/siren.mp3")
        );
        setSoundObj(sound);
        await sound.playAsync();
        setIsPlaying(true);
      } else {
        if (soundObj) {
          await soundObj.stopAsync();
          await soundObj.unloadAsync(); // Free up memory
          setIsPlaying(false);
          setSoundObj(null);
        }
      }
    } catch (error) {
      console.error("Error handling siren:", error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.safeArea}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={toggleMenu} style={styles.hamburgerContainer}>
            <Image source={require("../assets/hamburger-iconNoBg.png")} style={styles.hamburgerIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>ForHer</Text>
          <TouchableOpacity style={styles.sosButton} onPress={sosAction}>
            <Text style={styles.sosText}>SOS</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/*  Map Section */}
      <View style={styles.mapContainer}>
        <MapView style={styles.map} region={location ? {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        } : {
          latitude: 19.219610,
          longitude: 73.164493,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
          {location && (
            <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }} title="Your Location" />
          )}
        </MapView>

        {/*  Floating Buttons */}
        <View style={styles.floatingButtons}>
        <TouchableOpacity style={styles.fabBtn} onPress={playAlertSound}>
            <Text style={styles.helpText}>
              {isPlaying ? "STOP SIREN" : "URGENT HELP"}
            </Text>
          </TouchableOpacity>

        <TouchableOpacity style={styles.fabBtn} onPress={playAlertSound}>
            <Text style={styles.helpText}>
              {isPlaying ? "STOP SIREN" : "URGENT HELP"}
            </Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.fab} onPress={shareLiveLocation}>
            <Image source={require("../assets/liveLocation-icon.png")} style={styles.fabIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("ChatbotScreen")}>
            <Image source={require("../assets/chatbot-icon.png")} style={styles.fabIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Side Menu */}
      <Animated.View style={[styles.menu, { left: slideAnim }]}>
        <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
          <Text style={{ fontSize: 24 }}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={shareLiveLocation} style={styles.menuItem}>
          <Text style={styles.menuText}>Share Location</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("FAQ")} style={styles.menuItem}>
          <Text style={styles.menuText}>FAQs</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("SelfDefenceScreen")} style={styles.menuItem}>
          <Text style={styles.menuText}>Self Defense Tutorials</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Rate us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Refer to a friend</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("FakeNotification")} style={styles.menuItem}>
          <Text style={styles.menuText}>Fake Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("EmergencyScreen")} style={styles.menuItem}>
          <Text style={styles.menuText}>Emergency screen</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("Logout")} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </Animated.View>


      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  safeArea: { backgroundColor: "#ff3974" },
  topBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15 },
  title: { fontSize: 20, fontWeight: "bold", color: "white", textAlign: "center", flex: 1 },
  sosButton: { backgroundColor: "white", paddingVertical: 5, paddingHorizontal: 15, borderRadius: 20 },
  sosText: { color: "#ff3974", fontWeight: "bold" },
  hamburgerContainer: { width: 30, height: 30, justifyContent: "center", alignItems: "center" },
  hamburgerIcon: { width: 40, height: 40, tintColor: "white", transform: [{ rotateY: "180deg" }] },
  helpText: { paddingVertical: 5, paddingHorizontal: 5, borderRadius: 20, color: "white", textAlign: "center", fontWeight: "bold" },
  mapContainer: { flex: 1, position: "relative" },
  map: { flex: 1 },

  floatingButtons: {
    position: "absolute",
    bottom: 80,
    right: 20,
    flexDirection: "column",
    alignItems: "flex-end",
  },

  fab: {
    backgroundColor: "#ff3974",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabBtn: {
    backgroundColor: "#ff3974",
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabIcon: {
    width: 40,
    height: 40,
    tintColor: "white",
  }, menu: {
    position: "absolute",
    top: 0,
    left: -screenWidth, 
    width: screenWidth * 0.75,
    height: "100%",
    backgroundColor: "#E6E6E6",
    paddingTop: 50,
    paddingHorizontal: 20,
    zIndex: 10,
  },

  closeButton: {
    position: "absolute",
    top: 15,
    left: 15,
  },

  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  menuText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  logoutButton: {
    backgroundColor: "#ff3974",
    padding: 15,
    borderRadius: 5,
    marginTop: 30,
  },

  logoutText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

});

export default HomeScreen;