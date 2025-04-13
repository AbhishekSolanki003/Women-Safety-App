import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import FAQ from "./screens/FAQ"; 
import ProfileScreen from "./screens/ProfileScreen";
import EmergencyScreen from "./screens/EmergencyScreen"; 
import CommunityForumScreen from "./screens/CommunityForumScreen"; 
import SafeRouteScreen from "./screens/SafeRouteScreen"; 
import FakeCalls from "./screens/FakeCalls"; 
import IncomingCallScreen from "./screens/IncomingCallScreen";
import ChatbotScreen from "./screens/ChatbotScreen";
import SelfDefenceScreen from "./screens/SelfDefenceScreen";
import VideoPlayer from "./screens/VideoPlayer";
import FakeNotification from "./screens/FakeNotification";


import { StatusBar } from "react-native";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      {/*  Move StatusBar Outside */}
      <StatusBar backgroundColor="#ff3974" barStyle="light-content" />

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="EmergencyScreen" component={EmergencyScreen} /> 
          <Stack.Screen name="FAQ" component={FAQ} />
          <Stack.Screen name="CommunityForumScreen" component={CommunityForumScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="SafeRouteScreen" component={SafeRouteScreen} />
          <Stack.Screen name="FakeCalls" component={FakeCalls} />
          <Stack.Screen name="IncomingCallScreen" component={IncomingCallScreen} />
          <Stack.Screen name="ChatbotScreen" component={ChatbotScreen} options={{ title: "Chatbot" }} />
          <Stack.Screen name="SelfDefenceScreen" component={SelfDefenceScreen} />
          <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
          <Stack.Screen name="FakeNotification" component={FakeNotification} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

