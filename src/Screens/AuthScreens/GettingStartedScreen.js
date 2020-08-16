import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { Video } from "expo-av";

// import Intro from "../../../assets/introo.mp4";
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const GettingStartedScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View>
        <Video
          source={require("../../../assets/intro.mp4")}
          rate={1.0}
          volume={3.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping={true}
          style={{ width: WIDTH, height: HEIGHT + 40 }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
          <View style={styles.loginButton}>
            <Text style={{ fontSize: 16, color: "#333", fontWeight: "bold" }}>
              Login
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
          <View style={styles.signupButton}>
            <Text style={{ fontSize: 16, color: "#FFF", fontWeight: "bold" }}>
              Sign Up
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ position: "absolute", right: 25, marginTop: 25 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <Text style={{ fontSize: 18, color: "white" }}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GettingStartedScreen;

const styles = new StyleSheet.create({
  loginButton: {
    marginVertical: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 55,
    paddingVertical: 15,
    borderRadius: 10,
  },
  signupButton: {
    marginVertical: 20,
    backgroundColor: "black",
    paddingHorizontal: 45,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: WIDTH,
    alignItems: "center",
  },
});
