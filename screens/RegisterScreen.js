import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      {/* Background Design */}
      <View style={styles.headerBackground} />

      {/* Register Title */}
      <Text style={styles.registerText}>Register</Text>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#fff"
        value={name}
        onChangeText={setName}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#fff"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#fff"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Social Login */}
      <View style={styles.socialContainer}>
        <TouchableOpacity>
          <Image source={require("../assets/google.jpg")} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require("../assets/facebook.png")} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require("../assets/insta.png")} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <Text style={styles.loginText}>
        Already Member?{" "}
        <Text style={styles.loginLink} onPress={() => navigation.navigate("Login")}>
          Login
        </Text>
      </Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff3974",
    alignItems: "center",
    justifyContent: "center",
  },
  headerBackground: {
    position: "absolute",
    width: "100%",
    height: "30%",
    backgroundColor: "#FEE4C4",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    top: 0,
  },
  registerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    color: "#FFF",
  },
  socialContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },
  socialIcon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  registerButton: {
    backgroundColor: "#FEE4C4",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 20,
  },
  registerButtonText: {
    color: "#ff3974",
    fontWeight: "bold",
    fontSize: 18,
  },
  loginText: {
    color: "#FFF",
    fontSize: 14,
  },
  loginLink: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default RegisterScreen;
