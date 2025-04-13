import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";

export default function StepByStepGuides() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Step-by-Step Self-Defense Guides</Text>

      {/* Guide 1 */}
      <View style={styles.guide}>
        <Image source={require("../assets/google.jpg")} style={styles.image} />
        <Text style={styles.text}>1. Maintain a strong stance and balance.</Text>
      </View>

      {/* Guide 2 */}
      <View style={styles.guide}>
        <Image source={require("../assets/google.jpg")} style={styles.image} />
        <Text style={styles.text}>2. Use your elbows and knees for powerful strikes.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  guide: {
    alignItems: "center",
    marginBottom: 15,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    marginTop: 5,
    textAlign: "center",
  },
});
