import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomNav from "../components/BottomNav"; 

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("Prachi Naik");
  const [email, setEmail] = useState("prachi@gmail.com");
  const [emergencyContact, setEmergencyContact] = useState("Add Now");
  const [homeAddress, setHomeAddress] = useState("Address goes here");

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <Text style={styles.title}>Profile</Text>

      {/* Profile Image */}
      <View style={styles.profileContainer}>
        <Image
          source={require("../assets/profile-icon.png")} 
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Image
            source={require("../assets/edit-icon.jpg")} 
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
      </View>

      {/* Profile Details */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Emergency Contact</Text>
        <TextInput style={styles.input} value={emergencyContact} onChangeText={setEmergencyContact} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Home Address</Text>
        <TextInput style={styles.input} value={homeAddress} onChangeText={setHomeAddress} />
      </View>

      {/* Log Out Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Update</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff3974", 
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
  },
  profileContainer: {
    alignItems: "center",
    position: "relative",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 5,
    elevation: 5, // Shadow for floating effect
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#4B3F2F",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#F8E0B0",
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    color: "#4B3F2F",
  },
  logoutButton: {
    backgroundColor: "black",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  logoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  }
});

export default ProfileScreen;