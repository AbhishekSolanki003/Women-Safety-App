import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width } = Dimensions.get("window");
const VIDEO_HEIGHT = width * (9/16); // 16:9 aspect ratio for YouTube

export default function VideoPlayer({ route }) {
  const { url, title } = route.params;
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract video ID from various YouTube URL formats
  const getVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  useEffect(() => {
    const videoId = getVideoId(url);
    if (videoId) {
      fetchVideoSummary(videoId);
    } else {
      setError("Invalid YouTube URL");
      setLoading(false);
    }
  }, [url]);

  // Fetch AI-generated summary (mock implementation)
  const fetchVideoSummary = async (videoId) => {
    try {
      setLoading(true);
      
      // In production, replace with actual API call:
      // const response = await axios.get(`YOUR_API_ENDPOINT/${videoId}`);
      
      // Mock response - self-defense focused summaries
      const mockSummaries = [
        `This video demonstrates 3 essential self-defense moves for women:\n1. Palm strike to nose\n2. Groin kick technique\n3. Escaping wrist grabs\n\nKey safety tip: Always be aware of your surroundings and trust your instincts.`,
        `Learn how to use everyday objects for self-protection:\n- Keys between fingers\n- Purse as a shield\n- Phone as distraction tool\n\nThe instructor emphasizes creating distance and shouting for help.`,
        `Ground defense techniques against larger attackers:\n1. Protect vital areas first\n2. Use legs to create space\n3. Roll away and stand up quickly\n\nPractice these moves weekly to build muscle memory.`,
        `Verbal de-escalation strategies shown:\n- Calm tone of voice\n- Non-threatening posture\n- Setting clear boundaries\n\nWhen to transition to physical defense is clearly explained.`
      ];
      
      await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate API delay
      setSummary(mockSummaries[Math.floor(Math.random() * mockSummaries.length)]);
      setLoading(false);
    } catch (error) {
      setError("Safety summary unavailable. Watch video carefully.");
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Video Header */}
      <View style={styles.header}>
        <Text style={styles.videoTitle} numberOfLines={2}>
          <Icon name="self-improvement" size={20} color="#FF6B6B" /> {title || "Self-Defense Tutorial"}
        </Text>
      </View>
      
      {/* Embedded YouTube Player */}
      <View style={styles.videoWrapper}>
        <WebView
          source={{
            uri: `https://www.youtube.com/embed/${getVideoId(url)}?playsinline=1&modestbranding=1&rel=0&controls=1&showinfo=0&autoplay=1`
          }}
          style={styles.videoPlayer}
          allowsFullscreenVideo={false}
          allowsInlineMediaPlayback={true}
          javaScriptEnabled={true}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#FF6B6B" />
              <Text style={styles.loadingText}>Loading safety video...</Text>
            </View>
          )}
        />
      </View>

      {/* AI-Generated Safety Summary */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Icon name="security" size={24} color="#FF6B6B" />
          <Text style={styles.summaryTitle}>Key Safety Takeaways</Text>
        </View>
        
        {loading ? (
          <View style={styles.summaryLoading}>
            <ActivityIndicator size="small" color="#FF6B6B" />
            <Text style={styles.summaryLoadingText}>Analyzing defense techniques...</Text>
          </View>
        ) : error ? (
          <View style={styles.summaryError}>
            <Icon name="error-outline" size={20} color="#FF6B6B" />
            <Text style={styles.summaryErrorText}>{error}</Text>
          </View>
        ) : (
          <Text style={styles.summaryContent}>{summary}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  videoWrapper: {
    backgroundColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  videoPlayer: {
    width: "100%",
    height: VIDEO_HEIGHT,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 14,
  },
  summaryCard: {
    flex: 1,
    margin: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  summaryTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 8,
    color: "#333",
  },
  summaryContent: {
    fontSize: 15,
    lineHeight: 22,
    color: "#444",
  },
  summaryLoading: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  summaryLoadingText: {
    marginLeft: 10,
    color: "#666",
    fontSize: 14,
  },
  summaryError: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  summaryErrorText: {
    marginLeft: 10,
    color: "#FF6B6B",
    fontSize: 14,
  },
});