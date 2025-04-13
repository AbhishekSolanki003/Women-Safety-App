import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const SafeRouteMap = () => {
  const [dangerZones, setDangerZones] = useState([]);

  const fetchDangerZones = async () => {
    try {
      const snapshot = await getDocs(collection(db, "dangerZones"));
      const zones = snapshot.docs.map((doc) => doc.data());
      setDangerZones(zones);
    } catch (error) {
      console.error("Error fetching danger zones:", error);
    }
  };

  useEffect(() => {
    fetchDangerZones();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#FF3B30" />
      <View style={styles.container}>
        <Text style={styles.title}>Danger Zones Map</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 20.5937,
            longitude: 78.9629,
            latitudeDelta: 10,
            longitudeDelta: 10,
          }}
        >
          {dangerZones.map((zone, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: zone.latitude,
                longitude: zone.longitude,
              }}
              title={zone.location}
              description={zone.message}
              pinColor="red"
            />
          ))}
        </MapView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1 },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 10,
  },
  map: { flex: 1 },
});

export default SafeRouteMap;
