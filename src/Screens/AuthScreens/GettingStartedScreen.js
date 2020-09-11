import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { Video } from "expo-av";
import AppIntroSlider from "react-native-app-intro-slider";
// import Intro from "../../../assets/introo.mp4";
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const GettingStartedScreen = ({ navigation }) => {
  const slides = [
    {
      key: 1,
      title: "Title 1",
      text: "Description.\nSay something cool",
      image: require("../../../assets/intro/1.png"),

      backgroundColor: "#59b2ab",
    },
    {
      key: 2,
      title: "Title 2",
      text: "Other cool stuff",
      image: require("../../../assets/intro/2.png"),
      backgroundColor: "#febe29",
    },
    {
      key: 3,
      title: "Rocket guy",
      text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",

      image: require("../../../assets/intro/3.png"),
      backgroundColor: "#22bcb5",
    },
    {
      key: 4,
      title: "Rocket guy",
      text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",

      image: require("../../../assets/intro/4.png"),
      backgroundColor: "#22bcb5",
    },
  ];
  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        {/* <Text style={styles.title}>{item.title}</Text> */}
        <Image
          source={item.image}
          resizeMode="stretch"
          style={{ height: HEIGHT + 50, width: WIDTH }}
        />
        {/* <Text style={styles.text}>{item.text}</Text> */}
      </View>
    );
  };
  const _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    navigation.navigate("Main");
  };

  return (
    <>
      <AppIntroSlider
        renderItem={_renderItem}
        keyExtractor={(item) => item.key.toString()}
        data={slides}
        onDone={_onDone}
        nextLabel="Next"
        doneLabel="Get Started"
        bottomButton
      />
    </>
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

{
  /* <SafeAreaView style={{ flex: 1 }}>
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
</View
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
</SafeAreaView> */
}
