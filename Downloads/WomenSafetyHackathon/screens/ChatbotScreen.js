import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const ChatbotScreen = () => {
  const chatbaseScript = `
    (function() {
      if (!window.chatbase || window.chatbase("getState") !== "initialized") {
        window.chatbase = (...arguments) => {
          if (!window.chatbase.q) { window.chatbase.q = []; }
          window.chatbase.q.push(arguments);
        };
        window.chatbase = new Proxy(window.chatbase, {
          get(target, prop) {
            if (prop === "q") { return target.q; }
            return (...args) => target(prop, ...args);
          }
        });
      }
      const onLoad = function() {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "YqdX28f9Wu8orNmN_T5o_"; 
        script.domain = "www.chatbase.co"; 
        document.body.appendChild(script);
      };
      if (document.readyState === "complete") {
        onLoad();
      } else {
        window.addEventListener("load", onLoad);
      }
    })();
  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: "https://www.chatbase.co/chatbot-iframe/YqdX28f9Wu8orNmN_T5o_" }} // Replace with your chatbot URL if different
        injectedJavaScript={chatbaseScript}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatbotScreen;
