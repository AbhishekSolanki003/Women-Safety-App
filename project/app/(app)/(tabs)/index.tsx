import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Shield, Phone, Navigation2 } from 'lucide-react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>ForHer</Text>
        <Text style={styles.welcomeText}>Welcome back, Sarah</Text>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="Your Location"
        />
      </MapView>

      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Shield size={24} color="#FF4B7B" />
          <Text style={styles.actionText}>SOS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Phone size={24} color="#FF4B7B" />
          <Text style={styles.actionText}>Fake Call</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Navigation2 size={24} color="#FF4B7B" />
          <Text style={styles.actionText}>Safe Route</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FF4B7B',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  welcomeText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  map: {
    flex: 1,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    backgroundColor: '#FFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  actionText: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
  },
});