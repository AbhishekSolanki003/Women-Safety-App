import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Login");
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logoCircular.png")} style={styles.logo} />
      <Text style={styles.title}>ForHer</Text>
      <Text style={styles.tagline}>Your Safety, Our Priority</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff3974",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  tagline: {
    fontSize: 16,
    color: "#fff",
    marginTop: 5,
  },
});

export default SplashScreen;
