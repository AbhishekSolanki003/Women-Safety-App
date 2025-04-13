import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground } from "react-native";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <ImageBackground source={require("../assets/loginBg.jpg")} style={styles.backgroundImage} resizeMode="cover">
            <View style={styles.container}>
                {/* Background Design */}
                <View style={styles.headerBackground} />

                {/* Login Title */}
                <Text style={styles.loginText}>Login</Text>

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

                {/* Forgot Password */}
                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* Social Login */}
                <View style={styles.socialContainer}>
                    <TouchableOpacity>
                        <Image source={require("../assets/google.png")} style={styles.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require("../assets/facebook.png")} style={styles.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require("../assets/insta.png")} style={styles.socialIcon} />
                    </TouchableOpacity>
                </View>

                {/* Login Button */}
                <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Home")}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                {/* Register Text */}
                <Text style={styles.registerText}>
                    New Here?{" "}
                    <Text style={styles.registerLink} onPress={() => navigation.navigate("Register")}>
                        Register
                    </Text>
                </Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    container: {
        flex: 1,
        paddingTop: 250,
        // backgroundColor: "rgba(255, 57, 116, 0.8)", 
        alignItems: "left",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    headerBackground: {
        position: "absolute",
        width: "80%",
        height: "8%",
        // backgroundColor: "#FEE4C4",
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
        top: 175,
    },
    loginText: {
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
    forgotPassword: {
        color: "#FFF",
        textAlign: "left",
        width: "80%",
        marginLeft:10,
        marginBottom: 20,
    },
    socialContainer: {
        flexDirection: "row",
        gap: 20,
        marginBottom: 20,
    },
    socialIcon: {
        width: 30,
        height: 30,
        backgroundColor: "transparent",
    },
    loginButton: {
        backgroundColor: "#FEE4C4",
        paddingVertical: 12,
        paddingLeft: 70,
        borderRadius: 8,
        marginBottom: 20,
        width:200,
    },
    loginButtonText: {
        color: "#ff3974",
        fontWeight: "bold",
        fontSize: 18,
    },
    registerText: {
        color: "#FFF",
        fontSize: 14,
    },
    registerLink: {
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
});

export default LoginScreen;
