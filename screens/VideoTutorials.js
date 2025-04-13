import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const videoData = [
  {
    id: "1",
    title: "Basic Self-Defense Moves",
    thumbnail: "https://img.youtube.com/vi/dFzVKm3Oe5A/hqdefault.jpg",
    url: "https://www.youtube.com/embed/dFzVKm3Oe5A",
  },
  {
    id: "2",
    title: "Escape from Wrist Grab",
    thumbnail: "https://img.youtube.com/vi/HHeWjFybDYo/hqdefault.jpg",
    url: "https://youtu.be/eoYggh5R82E?si=Ln_f0Pesv5CPOqam",
  },
  {
    id: "3",
    title: "How to Block a Punch",
    thumbnail: "https://img.youtube.com/vi/3sV5_4DWF28/hqdefault.jpg",
    url: "https://www.youtube.com/embed/3sV5_4DWF28",
  },
];

export default function VideoTutorials() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  const filteredVideos = videoData.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* 🔍 Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search videos..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* 📜 Video List */}
      <FlatList
        data={filteredVideos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.videoItem}
            onPress={() => navigation.navigate("VideoPlayer", { url: item.url })}
          >
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <Text style={styles.videoTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchIcon: { marginRight: 5 },
  searchInput: { flex: 1, height: 40 },
  videoItem: { marginBottom: 15, alignItems: "center" },
  thumbnail: { width: "100%", height: 180, borderRadius: 10 },
  videoTitle: { marginTop: 5, fontSize: 16, fontWeight: "bold", textAlign: "center" },
});
