import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { db } from "./firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Predefined city-to-coordinate map
const cityCoordinates = {
  "Vile Parle": { lat: 19.1007, lng: 72.8505 },
  "Andheri": { lat: 19.1197, lng: 72.8468 },
  "Bandra": { lat: 19.0602, lng: 72.836 },
  "Churchgate": { lat: 18.9352, lng: 72.8265 },
  "Borivali": { lat: 19.2288, lng: 72.856 },
  "Dadar": { lat: 19.0176, lng: 72.8562 },
  "Goregaon": { lat: 19.1641, lng: 72.8497 },
  "Malad": { lat: 19.186, lng: 72.8485 },
  "Mumbai": { latitude: 19.076, longitude: 72.8777 },
  "Delhi": { latitude: 28.6139, longitude: 77.209 },
  "Bangalore": { latitude: 12.9716, longitude: 77.5946 },
  "Hyderabad": { latitude: 17.385, longitude: 78.4867 },
  "Chennai": { latitude: 13.0827, longitude: 80.2707 },
  "Kolkata": { latitude: 22.5726, longitude: 88.3639 },
  "Ahmedabad": { latitude: 23.0225, longitude: 72.5714 },
  "Pune": { latitude: 18.5204, longitude: 73.8567 },
 "Jaipur": { latitude: 26.9124, longitude: 75.7873 },
 "Lucknow": { latitude: 26.8467, longitude: 80.9462 },
 "Marine Lines": { lat: 18.9455, lng: 72.8235 },
 "Charni Road": { lat: 18.9513, lng: 72.8188 },
 "Grant Road": { lat: 18.9576, lng: 72.8124 },
 "Mumbai Central": { lat: 18.9696, lng: 72.8195 },
 "Mahalaxmi": { lat: 18.9821, lng: 72.8178 },
 "Lower Parel": { lat: 18.9932, lng: 72.8282 },
 "Elphinstone Road": { lat: 19.0033, lng: 72.8292 },
 "Wadala": { lat: 19.0179, lng: 72.8545 },
 "Sion": { lat: 19.0396, lng: 72.8567 },
 "Matunga": { lat: 19.0279, lng: 72.8556 },
 "Kurla": { lat: 19.0728, lng: 72.8826 },
 "Ghatkopar": { lat: 19.0954, lng: 72.8878 },
 "Vikhroli": { lat: 19.1094, lng: 72.9282 },
 "Bhandup": { lat: 19.1425, lng: 72.9351 },
 "Mulund": { lat: 19.1726, lng: 72.9564 },
 "Nahur": { lat: 19.1536, lng: 72.9377 },
 "Kanjurmarg": { lat: 19.1205, lng: 72.9342 },
 "Powai": { lat: 19.1197, lng: 72.9051 },
 "Chembur": { lat: 19.0610, lng: 72.9006 },
 "Govandi": { lat: 19.0523, lng: 72.9114 },
 "Mankhurd": { lat: 19.0472, lng: 72.9283 },
 "Vashi": { lat: 19.0709, lng: 72.9981 },
 "Nerul": { lat: 19.0330, lng: 73.0169 },
 "Belapur": { lat: 19.0190, lng: 73.0438 },
 "Khar": { lat: 19.0726, lng: 72.8365 },
 "Santacruz": { lat: 19.0816, lng: 72.8412 },
 "Jogeshwari": { lat: 19.1347, lng: 72.8479 },
 "Kandivali": { lat: 19.2057, lng: 72.8536 },
 "Dahisar": { lat: 19.2506, lng: 72.8614 },
 "Alibag": { lat: 18.6481, lng: 72.8724 },
  "Panvel": { lat: 18.9894, lng: 73.1175 },
  "Karjat": { lat: 18.9107, lng: 73.3235 },
  "Khopoli": { lat: 18.7856, lng: 73.3459 },
  "Mahad": { lat: 18.0833, lng: 73.4167 },
  "Mangaon": { lat: 18.2500, lng: 73.2800 },
  "Murud": { lat: 18.3258, lng: 72.9646 },
  "Pen": { lat: 18.7333, lng: 73.1000 },
  "Uran": { lat: 18.8762, lng: 72.9396 },
  "Roha": { lat: 18.4363, lng: 73.1193 },
  "Shrivardhan": { lat: 18.0454, lng: 73.0153 },
  "Poladpur": { lat: 17.9891, lng: 73.4686 },
  "Khalapur": { lat: 18.7900, lng: 73.3300 },
  "Tala": { lat: 18.2333, lng: 73.1333 },
  "Mhasla": { lat: 18.1333, lng: 73.1167 },
  "Agar Panchaitan": { lat: 18.3667, lng: 72.9000 },
  "Ambepur": { lat: 18.6833, lng: 72.8833 },
  "Chaul": { lat: 18.5500, lng: 72.9167 },
  "Dadar, Raigad district": { lat: 18.2500, lng: 73.1500 },
  "Goregaon, Raigad district": { lat: 18.1500, lng: 73.3000 },
  "Navi Mumbai": { lat: 19.0330, lng: 73.0297 },
  "Kamothe": { lat: 19.0481, lng: 73.0699 },
  "Kharghar": { lat: 19.0330, lng: 73.0667 },
  "Kalamboli": { lat: 19.0333, lng: 73.1000 },
  "New Panvel": { lat: 18.9939, lng: 73.1097 },
  "Old Panvel": { lat: 18.9889, lng: 73.1167 },
  "Taloja": { lat: 19.0500, lng: 73.1333 },
  "Ulwe": { lat: 18.9500, lng: 72.9500 },
  "Dronagiri": { lat: 18.8500, lng: 72.9500 },
  "Apta": { lat: 18.8167, lng: 73.1333 },
  "Rasayani": { lat: 18.9000, lng: 73.1833 },
  "Pen-Khopoli Road": { lat: 18.7500, lng: 73.2500 },
  "Nagothane": { lat: 18.5333, lng: 73.1333 },
  "Kolad": { lat: 18.4167, lng: 73.2167 },
  "Pali": { lat: 18.5400, lng: 73.2300 },
  "Sudhagad": { lat: 18.5500, lng: 73.2500 },
  "Korlai": { lat: 18.5167, lng: 72.9167 },
  "Revdanda": { lat: 18.5500, lng: 72.9167 },
  "Salav": { lat: 18.5667, lng: 72.9167 },
  "Nagaon Beach": { lat: 18.6000, lng: 72.9000 },
  "Kihim Beach": { lat: 18.7833, lng: 72.8667 },
  "Mandwa": { lat: 18.8000, lng: 72.8667 },
  "Sasawane": { lat: 18.8167, lng: 72.8667 },
  "Varsoli": { lat: 18.6500, lng: 72.8667 },
  "Akshi": { lat: 18.6333, lng: 72.9000 },
  "Diveagar": { lat: 18.1750, lng: 73.0275 },
  "Harihareshwar": { lat: 18.0500, lng: 73.0333 },
  "Velas": { lat: 17.9500, lng: 73.0333 },
  "Bankot": { lat: 17.9833, lng: 73.0500 },
  "Bagmandla": { lat: 18.0833, lng: 73.0333 },
  "Dighi": { lat: 18.1667, lng: 73.0333 },
  "Murud-Janjira": { lat: 18.3300, lng: 72.9700 },

  // Add more cities as needed
};

const CommunityForumReport = () => {
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  const submitReport = async () => {
    if (!location || !message) {
      Alert.alert("Error", "Please fill in both fields.");
      return;
    }

    const city = location.trim();
    const coords = cityCoordinates[city];

    if (!coords) {
      Alert.alert("Error", "City not recognized. Please enter a valid city name.");
      return;
    }

    try {
      await addDoc(collection(db, "dangerZones"), {
        location: city,
        message,
        latitude: coords.lat,
        longitude: coords.lng,
        timestamp: serverTimestamp(),
      });

      Alert.alert("Success", "Your report has been submitted.");
      setLocation("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting report: ", error);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Report a Danger Zone</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your city (e.g., Vile Parle)"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Enter your message (e.g., harassment, robbery, etc.)"
        value={message}
        onChangeText={setMessage}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={submitReport}>
        <Text style={styles.buttonText}>Submit Report</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommunityForumReport;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#ff3b30",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
