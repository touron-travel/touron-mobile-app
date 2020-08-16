import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loaded, setLoaded] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
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

  const signIn = () => {
    setLoaded(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        setLoaded(false);
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
      animation="bounceInUp"
      duration={3000}
    >
      <View style={styles.skipButton}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <Text style={{ fontSize: 18, color: "#333" }}>Skip</Text>
        </TouchableOpacity>
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
              <Spinner color="white" />
            </View>
          ) : (
            <Text style={styles.signinButton}>Sign In</Text>
          )}
        </View>
      </TouchableOpacity>
      <View style={{ position: "absolute", bottom: 20, left: 30 }}>
        <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
          <Text style={{ fontWeight: "900" }}>
            Don't have a account? Sign Up
          </Text>
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
  },
  inputContainer: {
    height: 60,
    borderRadius: 10,
    backgroundColor: "white",
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
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: HEIGHT / 25,
    marginBottom: 45,
    backgroundColor: "black",
    borderRadius: 10,
    width: WIDTH * 0.9,
    alignContent: "center",
    position: "relative",
  },
});
