import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import VideoTutorials from "./VideoTutorials";
import StepByStepGuides from "./StepByStepGuides";

const Tab = createMaterialTopTabNavigator();

export default function SelfDefenseScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#ff3974" },
        tabBarIndicatorStyle: { backgroundColor: "#fff" },
        tabBarLabelStyle: { fontSize: 14, fontWeight: "bold", color: "white" },
      }}
    >
      <Tab.Screen name="Videos" component={VideoTutorials} />
      <Tab.Screen name="Guides" component={StepByStepGuides} />
    </Tab.Navigator>
  );
}
