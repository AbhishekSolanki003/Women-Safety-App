import React from "react";
 import {
   View,
   TouchableOpacity,
   Image,
   StyleSheet,
   Dimensions,
 } from "react-native";
 import { useNavigation } from "@react-navigation/native";
 
 const { width } = Dimensions.get("window"); // Get full screen width
 
 const BottomNav = () => {
   const navigation = useNavigation();
 
   return (
     <View style={styles.bottomNav}>
       <TouchableOpacity
         style={styles.navButton}
         onPress={() => navigation.navigate("FakeCalls")}
       >
         <View style={styles.iconContainer}>
           <Image
             source={require("../assets/fake-call.jpeg")}
             style={styles.navIcon}
           />
         </View>
       </TouchableOpacity>
 
       <TouchableOpacity
         style={styles.navButton}
         onPress={() => navigation.navigate("SafeRouteScreen")}
       >
         <View style={styles.iconContainer}>
           <Image
             source={require("../assets/safe-route-icon.png")}
             style={styles.navIcon}
           />
         </View>
       </TouchableOpacity>
 
       <TouchableOpacity
         style={styles.navButton}
         onPress={() => navigation.navigate("Home")}
       >
         <View style={styles.iconContainer}>
           <Image
             source={require("../assets/home.png")}
             style={styles.navIcon}
           />
         </View>
       </TouchableOpacity>
 
       <TouchableOpacity
         style={styles.navButton}
         onPress={() => navigation.navigate("CommunityForumScreen")}
       >
         <View style={styles.iconContainer}>
           <Image
             source={require("../assets/community.jpeg")}
             style={styles.navIcon}
           />
         </View>
       </TouchableOpacity>
 
       <TouchableOpacity
         style={styles.navButton}
         onPress={() => navigation.navigate("ProfileScreen")}
       >
         <View style={styles.iconContainer}>
           <Image
             source={require("../assets/profile-icon.png")}
             style={styles.navIcon}
           />
         </View>
       </TouchableOpacity>
     </View>
   );
 };
 
 const styles = StyleSheet.create({
   bottomNav: {
     position: "absolute",
     bottom: 0,
     left: 0,
     right: 0,
     width: width,
     flexDirection: "row",
     justifyContent: "space-around",
     alignItems: "center",
     padding: 10,
     backgroundColor: "#ff3974",
     elevation: 5, // Android shadow
     shadowColor: "#000", // iOS shadow
     shadowOffset: { width: 0, height: -2 },
     shadowOpacity: 0.2,
     shadowRadius: 5,
     zIndex: 10, // Ensure it's above other content
   },
   navButton: { padding: 5 },
   iconContainer: {
     width: 48,
     height: 48,
     borderRadius: 50,
     backgroundColor: "white",
     alignItems: "center",
     justifyContent: "center",
   },
   navIcon: { width: 30, height: 30, borderRadius: 20 },
 });
 
 export default BottomNav;