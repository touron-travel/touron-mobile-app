import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import * as firebase from "firebase";
import * as Animatable from "react-native-animatable";
import { Spinner } from "native-base";
import { AuthContext } from "../../context/AuthContext";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

function SignInScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loaded, setLoaded] = useState(false);
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(AuthContext);
  console.log(isLoggedIn, "llll");

  const storeToken = async (value) => {
    try {
      const userToken = JSON.stringify(value);
      await AsyncStorage.setItem("userToken", userToken);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      firebase.auth().onAuthStateChanged((user) => {
        console.log(user, "MANIVASAGAM");
        setUser(user);
      });
    }
    return () => (mounted = false);
  }, []);

  const signIn = () => {
    setLoaded(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        setLoaded(false);
        setUser(user);
        storeToken(user);
        setEmail("");
        setPassword("");
        setIsLoggedIn(true);
        navigation.navigate("Main");
      })
      .catch((err) => {
        setLoaded(false);
        console.log(err);
      });
  };

  return (
    <Animatable.View
      style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
      animation="fadeInUp"
      duration={1500}
    >
      <View style={{ position: "absolute" }}>
        <View style={{ marginBottom: HEIGHT / 10, alignItems: "center" }}>
          <Text style={{ fontSize: 40, fontFamily: "Andika", color: "black" }}>
            Sign In
          </Text>
        </View>
        <View>
          <View style={[styles.inputContainer, { marginBottom: 30 }]}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="visible-password"
              keyboardAppearance="dark"
              keyboardType="email-address"
              onChangeText={(value) => setEmail(value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              keyboardType="visible-password"
              keyboardAppearance="dark"
              keyboardType="email-address"
              onChangeText={(value) => setPassword(value)}
            />
          </View>
        </View>

        <TouchableOpacity onPress={() => signIn()}>
          <View style={styles.buttonContainer}>
            {loaded ? (
              <View style={{ paddingVertical: -10 }}>
                {/* <ActivityIndicator size="large" /> */}
                <Spinner color="black" />
              </View>
            ) : (
              <Text style={styles.signinButton}>Sign In</Text>
            )}
          </View>
        </TouchableOpacity>
        <View style={{ position: "absolute", bottom: 20, width: WIDTH * 0.9 }}>
          <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
            <Text
              style={{
                fontWeight: "900",
                color: "white",
                textAlign: "center",
                marginVertical: 20,
              }}
            >
              Don't have a account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ImageBackground
        style={{ width: WIDTH, height: HEIGHT, zIndex: -2 }}
        //source={require("../../../assets/loginimage.jpg")}
        source={{
          uri:
            "https://images.pexels.com/photos/207237/pexels-photo-207237.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        }}
      />
      <View style={styles.skipButton}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <Text style={{ fontSize: 18, color: "#333" }}>Skip</Text>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
}

export default SignInScreen;
const styles = StyleSheet.create({
  input: {
    marginHorizontal: 20,
    width: WIDTH * 0.8,
    height: 60,
    color: "#FFF",
    fontFamily: "Andika",
  },
  inputContainer: {
    height: 60,
    borderRadius: 10,
    backgroundColor: "#0005",
    // borderWidth: 2,
  },
  skipButton: {
    position: "absolute",
    right: 20,
    top: 0,
    marginTop: HEIGHT / 20,
  },
  signinButton: {
    textAlign: "center",
    paddingVertical: 20,
    color: "black",
    fontFamily: "Andika",
    fontSize: 16,
    // fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: HEIGHT / 25,
    marginBottom: HEIGHT / 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    width: WIDTH * 0.9,
    alignContent: "center",
    position: "relative",
  },
});
