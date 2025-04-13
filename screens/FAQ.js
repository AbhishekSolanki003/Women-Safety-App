import React, { useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";

import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const FAQScreen = () => {
  // State to track expanded question
  const [expanded, setExpanded] = useState(null);

  // FAQ Data
  const faqData = [
    {
      question: "What should I do if I am a victim of rape?",
      answer: "1. Ensure your safety and seek medical attention immediately.\n2. Do not change clothes or bathe to preserve evidence.\n3. Report the incident to the police and provide as much detail as possible.\n4. Seek support from family, friends, or professional counselors.\n5. Legal aid is available—know your rights and options.",
    },
    {
      question: "How to report a burglary?",
      answer: "1. Call the police immediately and do not touch anything.\n2. Take pictures of the scene and list missing items.\n3. Inform your insurance provider.\n4. Strengthen security measures at home to prevent future incidents.",
    },
    {
      question: "What are my rights as a victim of domestic violence?",
      answer: "1. You have the right to file a police complaint.\n2. Seek protection orders or restraining orders against the abuser.\n3. Access legal aid and shelters if needed.\n4. Document evidence (photos, messages, medical reports) to strengthen your case.",
    },
    {
      question: "How to stay safe while traveling alone at night?",
      answer: "1. Share your live location with trusted contacts.\n2. Avoid deserted areas and use well-lit roads.\n3. Keep an emergency SOS app (like this one) ready.\n4. Carry self-defense tools like pepper spray or a whistle.",
    },
  ];

  // Function to handle expansion toggle
  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Frequently Asked Questions</Text>
      {faqData.map((item, index) => (
        <View key={index} style={styles.faqItem}>
          <TouchableOpacity style={styles.questionContainer} onPress={() => toggleExpand(index)}>
            <Text style={styles.question}>{item.question}</Text>
            <Text style={styles.expandIcon}>{expanded === index ? "▲" : "▼"}</Text>
          </TouchableOpacity>
          {expanded === index && <Text style={styles.answer}>{item.answer}</Text>}
        </View>
      ))}

<SafeAreaView style={styles.safeArea}>
  <StatusBar barStyle="light-content" backgroundColor="#FF3B30" />
  <View style={styles.container}>
    {/* Your existing UI */}
  </View>
</SafeAreaView>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    marginBottom: 10,
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  expandIcon: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF3B30",
  },
  answer: {
    fontSize: 14,
    color: "#333",
    paddingTop: 10,
  },

//   safeArea: {
//     flex: 1,
//     backgroundColor: "#FF3B30", 
//     paddingTop: StatusBar.currentHeight || 20, 
//   },
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#fff",
// //     borderTopLeftRadius: 30, 
// //     borderTopRightRadius: 30,
// //     padding: 10,
// //   },
  
});

export default FAQScreen;
